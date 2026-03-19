"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Filter,
    Download,
    ShoppingBag,
    ArrowRight,
    Tag,
    Zap,
    Layout,
    Globe,
    Cpu,
    Smartphone
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Product, Category } from "@/types/product";

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        setLoading(true);
        try {
            // Fetch categories
            const { data: catData } = await supabase.from('categories').select('*');
            if (catData) setCategories(catData);

            // Fetch products
            const { data: prodData } = await supabase
                .from('products')
                .select('*, category:categories(*)');

            if (prodData) setProducts(prodData);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = products.filter(product => {
        const matchesCategory = activeCategory === "all" || product.category_id === activeCategory;
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <main className="min-h-screen pt-32 pb-20 bg-bg-dark">
            <div className="hero-mesh opacity-30" />

            <div className="container relative z-10">
                {/* Header */}
                <div className="max-w-4xl mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-7xl font-black font-heading text-white mb-6 uppercase tracking-tighter"
                    >
                        DIGITAL <span className="text-gradient">MARKETPLACE</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-white/50 leading-relaxed"
                    >
                        Premium software, high-converting UI kits, and cutting-edge AI assets developed by Technical Corp.
                    </motion.p>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center justify-between">
                    <div className="flex flex-wrap gap-3 items-center">
                        <button
                            onClick={() => setActiveCategory("all")}
                            className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeCategory === "all"
                                    ? "bg-brand-primary text-bg-dark"
                                    : "glass text-white/40 hover:text-white"
                                }`}
                        >
                            All Products
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeCategory === cat.id
                                        ? "bg-brand-primary text-bg-dark"
                                        : "glass text-white/40 hover:text-white"
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full lg:w-96 group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-primary transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search digital products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-primary/50 focus:ring-4 focus:ring-brand-primary/10 transition-all font-medium"
                        />
                    </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-[500px] rounded-[32px] glass animate-pulse" />
                        ))}
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredProducts.map((product, index) => (
                                <motion.div
                                    layout
                                    key={product.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    className="group relative h-full"
                                >
                                    <div className="h-full flex flex-col glass border border-white/5 rounded-[32px] overflow-hidden hover:border-white/20 transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-brand-primary/10">
                                        {/* Thumbnail Area */}
                                        <div className="relative aspect-video overflow-hidden">
                                            <Image
                                                src={product.thumb_url || "/placeholder-product.png"}
                                                alt={product.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent" />

                                            {/* Badges */}
                                            <div className="absolute top-6 left-6 flex flex-col gap-2">
                                                {product.is_free ? (
                                                    <div className="px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-md text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                                                        FREE
                                                    </div>
                                                ) : (
                                                    <div className="px-4 py-1.5 rounded-full bg-brand-primary/20 border border-brand-primary/30 backdrop-blur-md text-[10px] font-black text-brand-primary uppercase tracking-widest">
                                                        PREMIUM
                                                    </div>
                                                )}
                                                {product.is_featured && (
                                                    <div className="px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 backdrop-blur-md text-[10px] font-black text-purple-400 uppercase tracking-widest">
                                                        FEATURED
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Content Area */}
                                        <div className="p-8 flex flex-col flex-grow">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                    <Tag size={10} />
                                                    {product.category?.name || "General"}
                                                </div>
                                                <div className="text-xl font-black text-white uppercase italic">
                                                    {product.is_free ? "Free" : `${product.currency} ${product.price}`}
                                                </div>
                                            </div>

                                            <h3 className="text-2xl font-black text-white mb-4 line-clamp-1 uppercase italic tracking-tight">{product.title}</h3>
                                            <p className="text-white/40 text-sm leading-relaxed line-clamp-2 mb-8 flex-grow">
                                                {product.description}
                                            </p>

                                            <div className="flex gap-4">
                                                <Link
                                                    href={`/products/${product.slug}`}
                                                    className="flex-1 px-6 py-4 rounded-2xl glass border border-white/10 text-white text-[10px] font-black uppercase tracking-widest text-center hover:bg-white/5 transition-all"
                                                >
                                                    Details
                                                </Link>
                                                {product.is_free ? (
                                                    <button
                                                        className="flex-1 px-6 py-4 rounded-2xl bg-emerald-500 text-bg-dark text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.05] active:scale-95 transition-all shadow-lg shadow-emerald-500/20"
                                                    >
                                                        <Download size={14} /> Download
                                                    </button>
                                                ) : (
                                                    <Link
                                                        href={`/products/${product.slug}`}
                                                        className="flex-1 px-6 py-4 rounded-2xl bg-brand-primary text-bg-dark text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.05] active:scale-95 transition-all shadow-lg shadow-brand-primary/20"
                                                    >
                                                        <ShoppingBag size={14} /> Buy Now
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="text-center py-40 glass rounded-[60px] border border-white/5">
                        <div className="inline-flex w-20 h-20 rounded-full bg-white/5 items-center justify-center mb-8">
                            <Search size={32} className="text-white/20" />
                        </div>
                        <h2 className="text-3xl font-black text-white mb-2 uppercase italic">No Products Found</h2>
                        <p className="text-white/30">Try adjusting your filters or search keywords.</p>
                        <button
                            onClick={() => { setActiveCategory("all"); setSearchQuery(""); }}
                            className="mt-8 text-brand-primary font-black uppercase tracking-widest text-xs hover:gap-3 transition-all flex items-center gap-2 mx-auto"
                        >
                            Reset Filters <ArrowRight size={14} />
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
};

export default ProductsPage;
