"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
    CreditCard,
    Smartphone,
    ShieldCheck,
    ChevronRight,
    Lock,
    ArrowLeft,
    CheckCircle2,
    Loader2,
    ShoppingBag,
    Clock,
    Zap
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";
import { useAuth } from "@/hooks/useAuth";

const CheckoutContent = () => {
    const { user, loading: authLoading } = useAuth();
    const searchParams = useSearchParams();
    const router = useRouter();
    const productId = searchParams.get('product');

    useEffect(() => {
        if (!authLoading && !user && searchParams.get('status') !== 'success') {
            router.push(`/login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`);
        }
    }, [user, authLoading, router, searchParams]);

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState<'international' | 'local'>('international');
    const [selectedGateway, setSelectedGateway] = useState<'stripe' | 'paymob' | 'bsecure'>('stripe');
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!productId && searchParams.get('status') !== 'success') {
            router.push('/products');
            return;
        }

        if (searchParams.get('status') === 'success') {
            setSuccess(true);
        }

        const fetchProduct = async () => {
            const idToFetch = productId || searchParams.get('product_id');
            if (!idToFetch) return;

            const { data } = await supabase
                .from('products')
                .select('*, category:categories(*)')
                .eq('id', idToFetch)
                .single();

            if (data) setProduct(data);
            setLoading(false);
        };
        fetchProduct();
    }, [productId, router, searchParams]);

    const handleCheckout = async () => {
        setProcessing(true);

        if (selectedGateway === 'bsecure') {
            try {
                // Get the current URL to pass to bSecure for redirects (needed for ngrok testing)
                const currentNgrokUrl = window.location.origin;

                const response = await fetch('/api/checkout/bsecure', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        productId: product?.id,
                        userId: user?.id,
                        ngrokUrl: currentNgrokUrl
                    })
                });

                const data = await response.json();

                if (data.checkout_url) {
                    // Redirect the user to the REAL bSecure hosted checkout page
                    window.location.href = data.checkout_url;
                } else {
                    throw new Error(data.error || "Failed to get checkout URL");
                }

            } catch (error: any) {
                console.error("Checkout Error:", error);
                alert(error.message || "Payment initiation failed. Please try again.");
                setProcessing(false);
            }
        } else if (selectedGateway === 'stripe') {
            // Stripe logic would go here
            setTimeout(() => {
                setProcessing(false);
                setSuccess(true);
            }, 2000);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-bg-dark flex items-center justify-center">
            <Loader2 className="animate-spin text-brand-primary" size={48} />
        </div>
    );

    if (success) return (
        <div className="min-h-screen bg-bg-dark flex items-center justify-center p-6 relative">
            <div className="hero-mesh opacity-20" />
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-xl w-full glass p-12 rounded-[40px] border border-white/10 text-center relative overflow-hidden shadow-2xl"
            >
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-brand-primary to-emerald-500" />
                <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-10 border border-emerald-500/20 group">
                    <CheckCircle2 size={48} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase italic tracking-tighter leading-none">Order <span className="text-emerald-500">Initiated</span></h1>
                <p className="text-white/40 mb-12 text-lg font-medium leading-relaxed">We&apos;ve received your request! Once verified, your digital assets will be available for instant download. Order Reference: <span className="text-brand-primary font-black">#{searchParams.get('order_ref')?.slice(0, 8).toUpperCase() || 'TX-892'}</span></p>

                <div className="p-10 rounded-[48px] bg-white/[0.03] border border-white/5 mb-12 text-left group hover:border-brand-primary/20 transition-all">
                    <div className="flex items-center gap-6">
                        <div className="relative w-24 h-24 rounded-3xl overflow-hidden shrink-0 border border-white/5">
                            <Image src={product?.thumb_url || "/placeholder.png"} alt="Product" fill className="object-cover" />
                        </div>
                        <div>
                            <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">Item Secured</div>
                            <div className="text-xl font-black text-white uppercase italic leading-none mb-1">{product?.title}</div>
                            <div className="text-[10px] text-brand-primary font-black uppercase tracking-widest flex items-center gap-2">
                                <Clock size={12} /> Awaiting Verification
                            </div>
                        </div>
                    </div>
                </div>

                <Link
                    href="/orders"
                    className="w-full py-5 rounded-2xl bg-brand-primary text-bg-dark font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all glow-shadow"
                >
                    <ShoppingBag size={20} />
                    Go to Orders portal
                </Link>
            </motion.div>
        </div>
    );

    return (
        <div className="min-h-screen pt-40 pb-20 bg-bg-dark flex items-center justify-center p-6 relative">
            <div className="hero-mesh opacity-20" />
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-brand-primary/5 blur-[150px] rounded-full -translate-x-1/3 -translate-y-1/3 pointer-events-none" />

            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 relative z-10">
                {/* Product Summary */}
                <div className="lg:col-span-7 flex flex-col">
                    <Link href="/products" className="inline-flex items-center gap-3 text-white/40 hover:text-brand-primary transition-all text-xs font-black uppercase tracking-[0.2em] mb-12 group">
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-primary/50 transition-all">
                            <ArrowLeft size={14} />
                        </div>
                        Cancel and return
                    </Link>

                    <h2 className="text-[10px] font-black text-brand-primary uppercase tracking-[0.4em] mb-6">Transaction Security</h2>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-10 uppercase tracking-tight italic leading-tight">Secure <br /><span className="text-gradient">Acquisition</span></h1>

                    <div className="glass p-10 rounded-[40px] border border-white/10 relative overflow-hidden mb-12 shadow-xl">
                        <div className="absolute top-0 right-0 p-8 border-l border-b border-white/5 bg-white/[0.02] rounded-bl-3xl">
                            <Lock size={20} className="text-white/20" />
                        </div>

                        <div className="flex justify-between items-center mb-12">
                            <div className="flex gap-6 items-center">
                                <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                                    <Image src={product?.thumb_url || "/placeholder.png"} alt="Product" fill className="object-cover" />
                                </div>
                                <div className="space-y-3">
                                    <div className="inline-flex px-4 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-widest">{product?.category?.name}</div>
                                    <h3 className="text-xl font-black text-white uppercase italic tracking-tight">{product?.title}</h3>
                                    <div className="text-[10px] text-white/30 uppercase font-black tracking-widest flex items-center gap-2">
                                        <ShieldCheck size={14} className="text-emerald-500" /> Digital Asset ID: {product?.id.slice(0, 12).toUpperCase()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 pt-10 border-t border-white/10">
                            <div className="flex justify-between items-center text-white/40 font-bold text-sm uppercase tracking-widest">
                                <span>Unit Price</span>
                                <span className="text-white">{product?.currency} {product?.price}</span>
                            </div>
                            <div className="flex justify-between items-center text-white/40 font-bold text-sm uppercase tracking-widest">
                                <span>Licensing Fee</span>
                                <span className="text-emerald-500">$0.00</span>
                            </div>
                            <div className="flex justify-between items-center pt-8 border-t border-white/5">
                                <span className="text-xl font-black text-white uppercase italic tracking-tighter">Net Total</span>
                                <div className="text-right">
                                    <span className="text-3xl font-black text-brand-primary italic tracking-tighter">{product?.currency} {product?.price}</span>
                                    <div className="text-[9px] text-white/20 uppercase font-black tracking-widest mt-1">all taxes included</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="p-6 rounded-3xl glass border border-white/5 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <div className="text-[11px] font-black text-white uppercase tracking-widest mb-1">Guaranteed Protocol</div>
                                <div className="text-[9px] text-white/30 uppercase tracking-widest leading-relaxed">Bank-grade encryption applied.</div>
                            </div>
                        </div>
                        <div className="p-6 rounded-3xl glass border border-white/5 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                                <Zap size={24} />
                            </div>
                            <div>
                                <div className="text-[11px] font-black text-white uppercase tracking-widest mb-1">Instant Fulfillment</div>
                                <div className="text-[9px] text-white/30 uppercase tracking-widest leading-relaxed">Unlock access in seconds.</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Selection */}
                <div className="lg:col-span-5 flex flex-col pt-8">
                    <div className="glass p-10 rounded-[40px] border border-white/10 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[100px] rounded-full pointer-events-none" />

                        <div className="mb-10">
                            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-6">Execution Method</h3>
                            <div className="flex gap-4 p-1.5 rounded-2xl bg-white/5 border border-white/5">
                                <button
                                    onClick={() => { setPaymentMethod('international'); setSelectedGateway('stripe'); }}
                                    className={`flex-1 py-4 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${paymentMethod === 'international' ? 'bg-brand-primary text-bg-dark shadow-lg shadow-brand-primary/20' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                                >
                                    Global Card
                                </button>
                                <button
                                    onClick={() => { setPaymentMethod('local'); setSelectedGateway('bsecure'); }}
                                    className={`flex-1 py-4 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${paymentMethod === 'local' ? 'bg-brand-primary text-bg-dark shadow-lg shadow-brand-primary/20' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                                >
                                    Regional (PK)
                                </button>
                            </div>
                        </div>

                        <div className="space-y-6 mb-12">
                            <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] ml-1">Payment Engine Selection</div>

                            {paymentMethod === 'international' ? (
                                <button
                                    onClick={() => setSelectedGateway('stripe')}
                                    className={`w-full p-6 rounded-3xl border flex items-center justify-between group transition-all relative overflow-hidden ${selectedGateway === 'stripe' ? 'bg-white/[0.05] border-brand-primary shadow-xl' : 'glass border-white/5 hover:border-white/20'}`}
                                >
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 rounded-xl bg-[#635BFF]/10 flex items-center justify-center text-[#635BFF] shrink-0">
                                            <CreditCard size={24} />
                                        </div>
                                        <div className="text-left">
                                            <div className="text-lg font-black text-white uppercase italic tracking-tight group-hover:translate-x-1 transition-transform">Stripe Protocol</div>
                                            <div className="text-[9px] text-white/30 font-black uppercase tracking-widest">Visa, Mastercard, Amex</div>
                                        </div>
                                    </div>
                                    {selectedGateway === 'stripe' && <CheckCircle2 size={20} className="text-brand-primary" />}
                                </button>
                            ) : (
                                <div className="space-y-4">
                                    <button
                                        onClick={() => setSelectedGateway('bsecure')}
                                        className={`w-full p-6 rounded-3xl border flex items-center justify-between group transition-all relative overflow-hidden ${selectedGateway === 'bsecure' ? 'bg-white/[0.05] border-brand-primary shadow-xl' : 'glass border-white/5 hover:border-white/20'}`}
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                                                <Smartphone size={24} />
                                            </div>
                                            <div className="text-left">
                                                <div className="text-lg font-black text-white uppercase italic tracking-tight group-hover:translate-x-1 transition-transform">bSecure Node</div>
                                                <div className="text-[9px] text-white/30 font-black uppercase tracking-widest">JazzCash, EasyPaisa, NetBanking</div>
                                            </div>
                                        </div>
                                        {selectedGateway === 'bsecure' && <CheckCircle2 size={20} className="text-brand-primary" />}
                                    </button>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={processing}
                            className="w-full py-5 rounded-2xl bg-brand-primary text-bg-dark font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all glow-shadow disabled:opacity-50 relative group overflow-hidden text-xs"
                        >
                            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            {processing ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Synchronizing...
                                </>
                            ) : (
                                <>
                                    <Lock size={16} />
                                    Validate & Purchase
                                </>
                            )}
                        </button>

                        <div className="mt-10 text-center px-12">
                            <p className="text-[10px] text-white/20 font-black uppercase tracking-widest leading-loose">
                                By confirming this acquisition, you authorize Technical Corp to facilitate the digital delivery of selected assets.
                                <br />All sales are governed by the EULA.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 flex justify-center gap-12 opacity-10">
                        <CreditCard size={32} />
                        <ShieldCheck size={32} />
                        <Lock size={32} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const CheckoutPage = () => {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-bg-dark flex items-center justify-center">
                <Loader2 className="animate-spin text-brand-primary" size={48} />
            </div>
        }>
            <CheckoutContent />
        </Suspense>
    );
};

export default CheckoutPage;
