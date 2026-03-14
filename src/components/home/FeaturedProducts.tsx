"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ShoppingBag, Download, Star } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";

const FeaturedProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            const { data } = await supabase
                .from('products')
                .select('*, category:categories(*)')
                .eq('is_featured', true)
                .limit(3);

            if (data) setProducts(data);
            setLoading(false);
        };
        fetchFeatured();
    }, []);

    if (!loading && products.length === 0) return null;

    return (
        <section className="py-32 bg-bg-dark relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-primary/[0.02] blur-[120px] rounded-full pointer-events-none" />

            <div className="container relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-6">
                            <Star size={12} className="text-brand-primary fill-brand-primary" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">Digital Marketplace</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black font-heading text-white mb-6 uppercase italic tracking-tighter">
                            FEATURED <span className="text-gradient">DOWNLOADS</span>
                        </h2>
                        <p className="text-lg text-white/50 leading-relaxed">
                            Hand-picked premium software and digital assets to accelerate your business growth.
                        </p>
                    </div>
                    <Link href="/products" className="group flex items-center gap-2 text-white/60 hover:text-brand-primary transition-colors font-bold uppercase tracking-widest text-xs">
                        Browse All Products
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        [1, 2, 3].map((i) => (
                            <div key={i} className="h-[450px] rounded-[32px] glass animate-pulse" />
                        ))
                    ) : (
                        products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group h-full flex flex-col glass border border-white/5 rounded-[32px] overflow-hidden hover:border-brand-primary/30 transition-all hover:scale-[1.02]"
                            >
                                <div className="relative aspect-video overflow-hidden">
                                    <Image
                                        src={product.thumb_url || "/placeholder-product.png"}
                                        alt={product.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/60 to-transparent" />
                                    <div className="absolute top-6 right-6">
                                        <div className="px-4 py-2 rounded-2xl glass border border-white/10 backdrop-blur-xl text-xs font-black text-white">
                                            {product.is_free ? "FREE" : `$${product.price}`}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="text-[10px] font-black text-brand-primary uppercase tracking-widest mb-3">
                                        {product.category?.name || "Premium Asset"}
                                    </div>
                                    <h3 className="text-2xl font-black text-white mb-4 line-clamp-1 uppercase italic">{product.title}</h3>
                                    <p className="text-white/40 text-sm leading-relaxed mb-8 line-clamp-2">
                                        {product.description}
                                    </p>

                                    <div className="mt-auto">
                                        <Link
                                            href={`/products/${product.slug}`}
                                            className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-primary hover:text-bg-dark transition-all group/btn"
                                        >
                                            {product.is_free ? <Download size={14} /> : <ShoppingBag size={14} />}
                                            {product.is_free ? "Download Now" : "Get It Now"}
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
