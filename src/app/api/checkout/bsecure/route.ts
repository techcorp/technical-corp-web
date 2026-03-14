import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// We'll use a manual fetch with the proven 'dI' secret and correct endpoints
export async function POST(req: Request) {
    try {
        const { productId, userId, ngrokUrl } = await req.json();

        if (!userId) {
            return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
        }

        // 1. Fetch Product
        const { data: product, error: pError } = await supabase
            .from('products')
            .select('*, category:categories(*)')
            .eq('id', productId)
            .single();

        if (pError || !product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        // Strip any quotes that might be in the environment variables
        const clientId = (process.env.BSECURE_CLIENT_ID || '').replace(/['"]/g, '');
        const clientSecret = (process.env.BSECURE_CLIENT_SECRET || '').replace(/['"]/g, '');
        const storeId = (process.env.BSECURE_STORE_ID || '').replace(/['"]/g, '');

        const BSECURE_API_BASE = 'https://api.bsecure.pk/v1';

        // 2. Authenticate with bSecure (Get Token)
        // This flow is proven to work with the 'dI' secret
        const authResponse = await fetch(`${BSECURE_API_BASE}/oauth/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'client_credentials'
            })
        });

        const authData = await authResponse.json();
        const accessToken = authData.access_token || authData.body?.access_token;

        if (!accessToken) {
            console.error('--- bSecure Auth Failure ---');
            console.error('Status:', authResponse.status);
            console.error('Data:', JSON.stringify(authData, null, 2));
            throw new Error(`bSecure authentication failed: ${authData.message || authData.error || 'Check credentials'}`);
        }

        // 3. Create Order on bSecure
        const orderRef = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        // Create the order record in our database FIRST
        const { error: orderEntryError } = await supabase
            .from('orders')
            .insert({
                user_id: userId,
                product_id: productId,
                status: 'pending',
                amount: product.price,
                payment_method: 'bsecure',
                payment_ref: orderRef
            });

        if (orderEntryError) {
            console.error('Database Order Entry Error:', orderEntryError);
            throw new Error("Failed to initialize order tracking");
        }

        const baseUrl = ngrokUrl || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

        // Payload format based on official docs and SDK tests
        const orderBody = {
            order_id: orderRef,
            total_amount: product.price,
            sub_total_amount: product.price, // Required: Subtotal before discounts
            discount_amount: 0,              // Required: even if 0
            currency: product.currency || 'PKR',
            customer_callback_url: `${baseUrl}/checkout?status=success&product_id=${product.id}&order_ref=${orderRef}`,
            webhook_url: `${baseUrl}/api/webhooks/bsecure`,
            store_id: storeId,
            products: [
                {
                    id: product.id,
                    name: product.title,
                    sku: product.slug,
                    quantity: 1,
                    price: product.price,
                    sale_price: product.price, // Required: The actual price charged
                    image: product.thumb_url
                }
            ]
        };

        const orderResponse = await fetch(`${BSECURE_API_BASE}/order/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(orderBody)
        });

        const orderData = await orderResponse.json();
        const checkoutUrl = orderData.checkout_url || orderData.body?.checkout_url;

        if (checkoutUrl) {
            return NextResponse.json({ checkout_url: checkoutUrl });
        } else {
            console.error('bSecure Order Creation Failed:', JSON.stringify(orderData, null, 2));
            const errorMsg = orderData.message || orderData.error || 'Failed to create bSecure order';
            throw new Error(errorMsg);
        }

    } catch (error: any) {
        console.error('Checkout API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
