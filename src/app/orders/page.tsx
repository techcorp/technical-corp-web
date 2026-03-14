"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ShoppingBag,
    Clock,
    CheckCircle2,
    XCircle,
    Download,
    ExternalLink,
    Upload,
    Loader2,
    FileText,
    Image as ImageIcon
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { Product } from "@/types/product";

interface Order {
    id: string;
    status: 'pending' | 'awaiting_approval' | 'approved' | 'rejected';
    created_at: string;
    payment_method: string;
    screenshot_url?: string;
    product: Product;
}

const OrdersPage = () => {
    const { user, loading: authLoading } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState<string | null>(null);

    useEffect(() => {
        if (!authLoading && user) {
            fetchOrders();
        }
    }, [user, authLoading]);

    const fetchOrders = async () => {
        setLoading(true);
        console.log('Fetching orders for user:', user?.id);
        const { data, error } = await supabase
            .from('orders')
            .select('*, product:products(*)')
            .eq('user_id', user?.id)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Fetch Orders Error:', error);
        } else if (data) {
            console.log('Orders found:', data.length);
            setOrders(data);
        }
        setLoading(false);
    };

    const handleScreenshotUpload = async (orderId: string, file: File) => {
        setUploading(orderId);
        console.log('Starting upload for order:', orderId);

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${user?.id}/${orderId}-${Math.random()}.${fileExt}`;
            const filePath = `screenshots/${fileName}`;

            // 1. Upload to Storage
            const { error: uploadError } = await supabase.storage
                .from('payments')
                .upload(filePath, file);

            if (uploadError) {
                console.error('Storage Upload Error:', uploadError);
                throw uploadError;
            }

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('payments')
                .getPublicUrl(filePath);

            console.log('File uploaded to storage. Public URL:', publicUrl);

            // 3. Update Order Record
            const { error: updateError } = await supabase
                .from('orders')
                .update({
                    screenshot_url: publicUrl,
                    status: 'awaiting_approval'
                })
                .eq('id', orderId);

            if (updateError) {
                console.error('Order Record updateError:', JSON.stringify(updateError, null, 2));
                throw new Error(updateError.message || "Database update failed");
            }

            console.log('Order record updated successfully.');
            alert("Screenshot uploaded successfully! Your order is now awaiting approval.");

            // 4. Refresh List
            fetchOrders();
        } catch (error: any) {
            console.error('--- Full Upload Flow Error ---');
            console.error(error);
            alert(`Upload failed: ${error.message || "An unknown error occurred"}`);
        } finally {
            setUploading(null);
        }
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-bg-dark flex items-center justify-center">
                <Loader2 className="animate-spin text-brand-primary" size={48} />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 bg-bg-dark p-6">
            <div className="hero-mesh opacity-20" />

            <div className="max-w-6xl mx-auto relative z-10">
                <header className="mb-12">
                    <div className="flex items-center gap-4 mb-4 text-brand-primary uppercase font-black tracking-[0.3em] text-[10px]">
                        <ShoppingBag size={14} />
                        Account Dashboard
                    </div>
                    <h1 className="text-5xl font-black font-heading text-white uppercase italic tracking-tighter">My Orders</h1>
                </header>

                {orders.length === 0 ? (
                    <div className="glass p-20 rounded-[40px] border border-white/5 text-center">
                        <ShoppingBag className="mx-auto mb-6 text-white/10" size={64} />
                        <h2 className="text-2xl font-black text-white/40 uppercase mb-4 tracking-tight">No orders found yet</h2>
                        <Link href="/products" className="inline-flex py-4 px-10 rounded-2xl bg-brand-primary text-bg-dark font-black uppercase tracking-widest text-xs glow-shadow">
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {orders.map((order) => (
                            <motion.div
                                key={order.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass p-8 rounded-[40px] border border-white/5 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
                            >
                                <div className={`absolute top-0 right-0 px-6 py-2 rounded-bl-3xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${order.status === 'approved' ? 'bg-emerald-500 text-bg-dark' :
                                    order.status === 'rejected' ? 'bg-red-500 text-white' :
                                        order.status === 'awaiting_approval' ? 'bg-amber-500 text-bg-dark' :
                                            'bg-white/10 text-white/40'
                                    }`}>
                                    {order.status === 'approved' && <CheckCircle2 size={12} />}
                                    {order.status === 'rejected' && <XCircle size={12} />}
                                    {order.status === 'awaiting_approval' && <Clock size={12} />}
                                    {order.status.replace('_', ' ')}
                                </div>

                                <div className="relative w-32 h-32 rounded-3xl overflow-hidden shrink-0 border border-white/5 shadow-2xl">
                                    <Image src={order.product?.thumb_url || "/placeholder.png"} alt={order.product?.title || "Product"} fill className="object-cover" />
                                </div>

                                <div className="flex-1 text-center md:text-left">
                                    <div className="text-[10px] text-brand-primary font-black uppercase tracking-widest mb-1">OrderID: #{order.id.slice(0, 8)}</div>
                                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tight mb-2">{order.product?.title}</h3>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-white/40 text-xs font-bold">
                                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                                            <Clock size={14} /> {new Date(order.created_at).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 capitalize">
                                            <FileText size={14} /> {order.payment_method}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 min-w-[200px] w-full md:w-auto">
                                    {order.status === 'approved' ? (
                                        <button
                                            onClick={async () => {
                                                const path = order.product?.file_path;
                                                if (!path) {
                                                    alert("Download link not available.");
                                                    return;
                                                }

                                                try {
                                                    setLoading(true);
                                                    // Generate a secure 60-second link for the private bucket
                                                    const { data, error: signError } = await supabase.storage
                                                        .from('product-files')
                                                        .createSignedUrl(path, 60);

                                                    if (signError || !data?.signedUrl) {
                                                        throw new Error(signError?.message || "Could not generate download link");
                                                    }

                                                    // Open the secure link
                                                    window.open(data.signedUrl, '_blank');
                                                } catch (err: any) {
                                                    console.error('Download Error:', err);
                                                    alert("Error downloading file: " + err.message);
                                                } finally {
                                                    setLoading(false);
                                                }
                                            }}
                                            className="w-full py-4 rounded-2xl bg-emerald-500 text-bg-dark font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                                        >
                                            <Download size={18} />
                                            Download Asset
                                        </button>
                                    ) : (order.status === 'pending' || order.status === 'rejected') ? (
                                        <label className="secondary-btn w-full cursor-pointer flex items-center justify-center gap-3">
                                            {uploading === order.id ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
                                            {uploading === order.id ? 'Uploading...' : 'Upload Screenshot'}
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) handleScreenshotUpload(order.id, file);
                                                }}
                                            />
                                        </label>
                                    ) : (
                                        <div className="w-full py-4 rounded-2xl bg-white/5 border border-white/5 text-white/20 font-black uppercase tracking-widest text-[10px] text-center">
                                            {order.status === 'awaiting_approval' ? 'Waiting for Admin' : 'Processing...'}
                                        </div>
                                    )}

                                    {order.screenshot_url && (
                                        <a
                                            href={order.screenshot_url}
                                            target="_blank"
                                            className="text-white/20 hover:text-brand-primary transition-colors text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2"
                                        >
                                            <ImageIcon size={12} /> View Proof
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;
