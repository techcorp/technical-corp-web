"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { supabase } from "@/lib/supabase";

const ManageCategories = () => {
    const router = useRouter();
    const [categories, setCategories] = useState<string[]>([]);
    const [newCategory, setNewCategory] = useState("");

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push("/error-404");
            }
        };
        checkAuth();

        const saved = localStorage.getItem("blog_categories");
        if (saved) {
            setCategories(JSON.parse(saved));
        } else {
            const defaults = ["AI Technology", "Cybersecurity", "Web Development", "Infrastructure", "Cloud", "UI/UX"];
            setCategories(defaults);
            localStorage.setItem("blog_categories", JSON.stringify(defaults));
        }
    }, [router]);

    const addCategory = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategory.trim()) return;
        if (categories.includes(newCategory.trim())) return;

        const updated = [...categories, newCategory.trim()];
        setCategories(updated);
        localStorage.setItem("blog_categories", JSON.stringify(updated));
        setNewCategory("");
    };

    const deleteCategory = (cat: string) => {
        const updated = categories.filter(c => c !== cat);
        setCategories(updated);
        localStorage.setItem("blog_categories", JSON.stringify(updated));
    };

    return (
        <div className="min-h-screen bg-bg-dark p-6 md:p-12">
            <div className="max-w-3xl mx-auto">
                <Link
                    href="/secure-admin-dashboard/dashboard"
                    className="flex items-center gap-2 text-white/40 hover:text-white transition-all font-bold uppercase tracking-widest text-xs mb-12"
                >
                    <ArrowLeft size={16} />
                    Back to Dashboard
                </Link>

                <div className="glass p-10 rounded-[32px] border border-white/5">
                    <h1 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
                        <Tag className="text-brand-primary" />
                        Blog Categories
                    </h1>
                    <p className="text-white/40 mb-10">Manage the categories available for your blog posts.</p>

                    <form onSubmit={addCategory} className="flex gap-4 mb-12">
                        <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="New category name..."
                            className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all font-medium"
                        />
                        <button
                            type="submit"
                            className="px-8 py-4 rounded-2xl bg-brand-primary text-bg-dark font-black flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all glow-shadow"
                        >
                            <Plus size={20} />
                            Add
                        </button>
                    </form>

                    <div className="space-y-3">
                        <AnimatePresence>
                            {categories.map((cat) => (
                                <motion.div
                                    key={cat}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/[0.08] transition-all group"
                                >
                                    <span className="text-white font-bold">{cat}</span>
                                    <button
                                        onClick={() => deleteCategory(cat)}
                                        className="p-2 text-white/20 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageCategories;
