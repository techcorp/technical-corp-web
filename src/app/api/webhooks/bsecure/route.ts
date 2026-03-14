import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // 1. Verify bSecure Signature (Recommended for production)
        // const signature = req.headers.get('x-bsecure-signature');

        // 2. Extract Data from bSecure payload
        // bSecure typically sends order_id, product_details, and status
        const { order_ref, status, customer_details } = body;

        if (status === 'completed' || status === 'paid') {
            // 3. Update Order in Supabase
            // We use the reference bSecure gave us to find our order
            const { error } = await supabase
                .from('orders')
                .update({
                    status: 'paid',
                    payment_ref: order_ref
                })
                .eq('payment_ref', order_ref); // This assumes you saved the bSecure ref first

            if (error) console.error('Database update error:', error);

            return NextResponse.json({ message: 'Order Processed Successfully' }, { status: 200 });
        }

        return NextResponse.json({ message: 'Status not paid' }, { status: 200 });
    } catch (error) {
        console.error('Webhook Error:', error);
        return NextResponse.json({ error: 'Webhook Failed' }, { status: 500 });
    }
}
