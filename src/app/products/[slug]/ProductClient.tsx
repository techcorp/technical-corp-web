"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
    Download,
    ShoppingBag,
    CheckCircle2,
    ArrowLeft,
    Zap,
    Shield,
    Globe,
    FileText,
    Clock,
    CreditCard,
    Smartphone
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";

const ProductClient = () => {
    const params = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await supabase
                .from('products')
                .select('*, category:categories(*)')
                .eq('slug', params.slug)
                .single();

            if (data) setProduct(data);
            setLoading(false);
        };
        fetchProduct();
    }, [params.slug]);

    const handlePurchase = () => {
        router.push(`/checkout?product=${product?.id}`);
    };

    const handleDownload = async () => {
        if (!product?.file_path) return;
        const { data } = await supabase.storage
            .from('product-files')
            .createSignedUrl(product.file_path, 60);

        if (data?.signedUrl) {
            window.open(data.signedUrl, '_blank');
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-bg-dark flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
        </div>
    );

    if (!product) return (
        <div className="min-h-screen bg-bg-dark flex flex-col items-center justify-center">
            <h1 className="text-4xl font-black text-white mb-4 uppercase italic">Product Not Found</h1>
            <Link href="/products" className="text-brand-primary font-bold uppercase tracking-widest text-xs">Back to Market</Link>
        </div>
    );

    return (
        <main className="min-h-screen pt-32 pb-20 bg-bg-dark overflow-hidden relative">
            <div className="hero-mesh opacity-20" />

            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-secondary/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="container relative z-10">
                <Link href="/products" className="inline-flex items-center gap-3 text-white/40 hover:text-brand-primary transition-all text-xs font-black uppercase tracking-[0.2em] mb-12 group">
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-primary/50 transition-all">
                        <ArrowLeft size={14} />
                    </div>
                    Back to Market
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
                    {/* Left Column: Visuals & Info */}
                    <div className="lg:col-span-7 space-y-16">
                        <section>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                 className="relative aspect-video rounded-3xl overflow-hidden glass border border-white/10 shadow-xl group max-w-2xl mx-auto lg:mx-0"
                            >
                                <Image
                                    src={product.thumb_url || "/placeholder-product.png"}
                                    alt={product.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-bg-dark/80 to-transparent">
                                    <div className="flex gap-4">
                                        <span className="px-4 py-1.5 rounded-full bg-brand-primary text-bg-dark text-[9px] font-black uppercase tracking-widest">Featured Asset</span>
                                        <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-white text-[9px] font-black uppercase tracking-widest backdrop-blur-md">Verified Secure</span>
                                    </div>
                                </div>
                            </motion.div>
                        </section>

                        <section className="space-y-10">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <span className="h-px w-12 bg-brand-primary/50"></span>
                                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-primary">Product Architecture</span>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight italic leading-tight">
                                    {product.title}
                                </h1>
                                <div className="flex flex-wrap gap-4 pt-2">
                                    <div className="px-6 py-2.5 rounded-2xl glass border border-white/5 text-[10px] font-black text-white/50 uppercase tracking-widest flex items-center gap-3">
                                        <Globe size={14} className="text-brand-primary" />
                                        {product.category?.name} ecosystem
                                    </div>
                                    <div className="px-6 py-2.5 rounded-2xl glass border border-white/5 text-[10px] font-black text-white/50 uppercase tracking-widest flex items-center gap-3">
                                        <Clock size={14} className="text-brand-primary" />
                                        Deployment Ready
                                    </div>
                                </div>
                            </div>

                            <p className="text-base text-white/40 leading-relaxed font-normal max-w-xl">
                                {product.description}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                                {product.features?.map((feature, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-start gap-5 p-6 rounded-3xl glass border border-white/5 hover:border-white/10 transition-all group"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                                            <CheckCircle2 size={16} className="text-emerald-500" />
                                        </div>
                                        <span className="text-xs font-medium text-white/60 leading-snug pt-1 uppercase tracking-wider">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* Tech Specs */}
                        <section className="glass rounded-[48px] border border-white/5 p-12">
                            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-10">Technical Specifications</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
                                {[
                                    { label: "Format", value: "Digital Delivery" },
                                    { label: "Resolution", value: "Vector Ready" },
                                    { label: "Licensing", value: "Extended" },
                                    { label: "Integration", value: "API Ready" },
                                    { label: "Last Sync", value: "24h ago" },
                                    { label: "Status", value: "Live" }
                                ].map((spec, i) => (
                                    <div key={i}>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">{spec.label}</div>
                                        <div className="text-sm font-black text-white uppercase italic">{spec.value}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Transaction Card */}
                    <div className="lg:col-span-5 relative">
                        <div className="lg:sticky lg:top-32 h-fit">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass p-8 rounded-[40px] border border-white/10 shadow-2xl relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />

                                <div className="mb-12">
                                    <div className="text-[10px] font-black text-brand-primary uppercase tracking-[0.5em] mb-4">Total Acquisition Price</div>
                                    <div className="flex flex-col gap-2">
                                        <div className="text-4xl font-black text-white tracking-tight italic leading-none">
                                            {product.is_free ? "FREE" : `${product.currency} ${product.price}`}
                                        </div>
                                        {!product.is_free && (
                                            <div className="text-xs font-bold text-emerald-500/60 uppercase tracking-widest mt-2 flex items-center gap-2">
                                                <Zap size={10} /> includes lifetime system updates
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-1 mb-10">
                                    {[
                                        { label: "Global License", value: "Unlimited" },
                                        { label: "Support Tier", value: "Priority" },
                                        { label: "Source Files", value: "Included" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex justify-between items-center py-4 border-b border-white/5 last:border-0 group">
                                            <span className="text-white/40 font-bold text-xs group-hover:text-white/60 transition-colors">{item.label}</span>
                                            <span className="text-white font-bold uppercase tracking-wider text-[10px] bg-white/5 px-3 py-1 rounded-full">{item.value}</span>
                                        </div>
                                    ))}
                                </div>

                                {product.is_free ? (
                                    <button
                                        onClick={handleDownload}
                                        className="w-full py-4 rounded-xl bg-emerald-500 text-bg-dark font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-emerald-500/20 relative group"
                                    >
                                        <Download size={14} />
                                        Initialize Download
                                    </button>
                                ) : (
                                    <button
                                        onClick={handlePurchase}
                                        className="w-full py-4 rounded-xl bg-brand-primary text-bg-dark font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-brand-primary/20 relative group"
                                    >
                                        <ShoppingBag size={14} />
                                        Unlock Full Access
                                    </button>
                                )}

                                <div className="mt-12 flex flex-col gap-6">
                                    <div className="flex items-center gap-5 p-6 rounded-[32px] bg-white/[0.03] border border-white/5 group hover:border-brand-primary/30 transition-all">
                                        <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0 group-hover:rotate-12 transition-transform">
                                            <Shield size={22} />
                                        </div>
                                        <div>
                                            <div className="text-xs font-black text-white uppercase tracking-widest mb-0.5">Encrypted Protocol</div>
                                            <div className="text-[10px] text-white/30 uppercase tracking-widest">End-to-End Secure Transaction</div>
                                        </div>
                                    </div>

                                    <div className="flex justify-center gap-8 opacity-20 hover:opacity-40 transition-opacity">
                                        <CreditCard size={24} className="text-white" />
                                        <Smartphone size={24} className="text-white" />
                                        <Globe size={24} className="text-white" />
                                    </div>
                                </div>
                            </motion.div>

                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-2xl glass border border-white/5 flex flex-col gap-3 group hover:border-brand-primary/20 transition-all">
                                    <Zap className="text-brand-primary" size={18} />
                                    <div className="text-[9px] font-black text-white/40 uppercase tracking-[0.1em] leading-tight">Instant Node<br />Delivery</div>
                                </div>
                                <div className="p-4 rounded-2xl glass border border-white/5 flex flex-col gap-3 group hover:border-brand-primary/20 transition-all">
                                    <FileText className="text-brand-primary" size={18} />
                                    <div className="text-[9px] font-black text-white/40 uppercase tracking-[0.1em] leading-tight">Comprehensive<br />Documentation</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductClient;
