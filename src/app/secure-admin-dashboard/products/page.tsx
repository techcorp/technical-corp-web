"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
    ShoppingBag,
    Plus,
    Edit,
    Trash2,
    ExternalLink,
    Tag,
    Star,
    LayoutDashboard,
    Package,
    ArrowLeft,
    Download
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";

const ProductManagement = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select('*, category:categories(*)');

        if (data) setProducts(data);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        const { error } = await supabase.from('products').delete().eq('id', id);
        if (!error) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    return (
        <div className="min-h-screen bg-bg-dark flex">
            {/* Sidebar (Simple version for now) */}
            <div className="w-80 glass border-r border-white/5 flex flex-col p-8 fixed h-full">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center border border-brand-primary/20">
                        <ShoppingBag size={20} className="text-brand-primary" />
                    </div>
                    <span className="font-black text-xl text-white">Marketplace</span>
                </div>

                <nav className="flex-grow space-y-4">
                    <Link href="/secure-admin-dashboard/dashboard" className="flex items-center gap-4 p-4 rounded-2xl text-white/60 hover:text-white hover:bg-white/5 transition-all font-bold">
                        <LayoutDashboard size={20} />
                        Main Admin
                    </Link>
                    <Link href="/secure-admin-dashboard/products" className="flex items-center gap-4 p-4 rounded-2xl bg-brand-primary text-bg-dark font-bold shadow-lg shadow-brand-primary/20">
                        <Package size={20} />
                        Products
                    </Link>
                    <Link href="/secure-admin-dashboard/categories" className="flex items-center gap-4 p-4 rounded-2xl text-white/60 hover:text-white hover:bg-white/5 transition-all font-bold">
                        <Tag size={20} />
                        Categories
                    </Link>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-grow ml-80 p-12">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <Link href="/secure-admin-dashboard/dashboard" className="inline-flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-widest mb-4">
                            <ArrowLeft size={16} /> Back to Dashboard
                        </Link>
                        <h1 className="text-4xl font-black text-white mb-2 uppercase italic">Product Inventory</h1>
                        <p className="text-white/40">Manage your digital products, pricing, and availability.</p>
                    </div>
                    <Link
                        href="/secure-admin-dashboard/products/create"
                        className="px-8 py-4 rounded-2xl bg-brand-primary text-bg-dark font-black flex items-center gap-2 hover:scale-105 transition-all glow-shadow"
                    >
                        <Plus size={20} />
                        Add New Product
                    </Link>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-40">
                        <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="glass rounded-[32px] border border-white/5 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-white/[0.02] text-[10px] font-black uppercase tracking-widest text-white/30 border-b border-white/5">
                                <tr>
                                    <th className="px-8 py-6">Product</th>
                                    <th className="px-8 py-6">Category</th>
                                    <th className="px-8 py-6">Price</th>
                                    <th className="px-8 py-6">Status</th>
                                    <th className="px-8 py-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {products.map(product => (
                                    <tr key={product.id} className="hover:bg-white/[0.01] transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/10 shrink-0">
                                                    <Image
                                                        src={product.thumb_url || "/placeholder-product.png"}
                                                        alt={product.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-white mb-0.5">{product.title}</div>
                                                    <div className="text-[10px] text-white/30 truncate max-w-[200px]">{product.slug}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/40">
                                                {product.category?.name || "General"}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="font-bold text-white">
                                                {product.is_free ? "FREE" : `${product.currency} ${product.price}`}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex gap-2">
                                                {product.is_featured && (
                                                    <div className="w-6 h-6 rounded-lg bg-yellow-500/20 flex items-center justify-center border border-yellow-500/30" title="Featured">
                                                        <Star size={12} className="text-yellow-500 fill-yellow-500" />
                                                    </div>
                                                )}
                                                <div className={`w-6 h-6 rounded-lg ${product.is_free ? 'bg-emerald-500/20 border-emerald-500/30' : 'bg-brand-primary/20 border-brand-primary/30'} flex items-center justify-center border`} title={product.is_free ? "Free Product" : "Premium Product"}>
                                                    {product.is_free ? <Download size={12} className="text-emerald-500" /> : <ShoppingBag size={12} className="text-brand-primary" />}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end gap-2 text-white/40">
                                                <Link href={`/products/${product.slug}`} className="p-2 hover:bg-white/5 hover:text-white transition-all rounded-lg">
                                                    <ExternalLink size={18} />
                                                </Link>
                                                <Link href={`/secure-admin-dashboard/products/edit/${product.id}`} className="p-2 hover:bg-white/5 hover:text-brand-primary transition-all rounded-lg">
                                                    <Edit size={18} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="p-2 hover:bg-white/5 hover:text-red-500 transition-all rounded-lg"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {products.length === 0 && (
                            <div className="text-center py-24">
                                <Package size={48} className="text-white/10 mx-auto mb-6" />
                                <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
                                <p className="text-white/30 mb-8">Start by adding your first digital product.</p>
                                <Link
                                    href="/secure-admin-dashboard/products/create"
                                    className="inline-flex items-center gap-2 text-brand-primary font-black uppercase tracking-widest text-xs"
                                >
                                    <Plus size={16} /> Create Product
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductManagement;
