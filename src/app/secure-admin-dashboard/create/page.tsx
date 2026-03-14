"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Plus,
    ArrowLeft,
    Image as ImageIcon,
    CheckCircle,
    Save,
    Globe,
    Settings
} from "lucide-react";
import Link from "next/link";

import { supabase } from "@/lib/supabase";

const CreateBlog = () => {
    const router = useRouter();
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push("/error-404");
            }
        };
        checkAuth();
    }, [router]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess(true);
        setTimeout(() => {
            router.push("/secure-admin-dashboard/dashboard");
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-bg-dark p-6 md:p-12">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <Link
                        href="/secure-admin-dashboard/dashboard"
                        className="flex items-center gap-2 text-white/40 hover:text-white transition-all font-bold uppercase tracking-widest text-xs"
                    >
                        <ArrowLeft size={16} />
                        Back to Dashboard
                    </Link>

                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Draft Saved at 12:45 PM</span>
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8">
                        <div className="glass p-10 rounded-[32px] border border-white/5">
                            <h1 className="text-3xl font-black text-white mb-10 flex items-center gap-3">
                                <Plus className="text-brand-primary" />
                                Create New Article
                            </h1>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-3">
                                    <label className="text-xs font-black uppercase tracking-widest text-white/40">Article Title</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. The Future of AI in 2026"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-2xl font-bold text-white focus:outline-none focus:border-brand-primary/50 transition-all placeholder:text-white/10"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-xs font-black uppercase tracking-widest text-white/40">Slug (URL)</label>
                                        <div className="flex items-center gap-2 px-4 bg-white/5 border border-white/10 rounded-2xl focus-within:border-brand-primary/50 transition-all">
                                            <span className="text-white/20 text-xs font-bold">/blog/</span>
                                            <input
                                                required
                                                type="text"
                                                placeholder="ai-future-2026"
                                                className="w-full bg-transparent py-4 text-white focus:outline-none text-sm font-medium"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black uppercase tracking-widest text-white/40">Category</label>
                                        <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all appearance-none cursor-pointer">
                                            {(() => {
                                                const [cats, setCats] = useState<string[]>([]);
                                                useEffect(() => {
                                                    const saved = localStorage.getItem("blog_categories");
                                                    if (saved) setCats(JSON.parse(saved));
                                                    else setCats(["AI Technology", "Cybersecurity", "Web Development", "Infrastructure"]);
                                                }, []);
                                                return cats.map(cat => (
                                                    <option key={cat} className="bg-bg-dark" value={cat}>{cat}</option>
                                                ));
                                            })()}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-black uppercase tracking-widest text-white/40">Content Editor</label>
                                    <div className="border border-white/10 rounded-2xl overflow-hidden focus-within:border-brand-primary/50 transition-all">
                                        {/* Rich Editor Toolbar Mock */}
                                        <div className="bg-white/5 p-3 flex gap-2 border-b border-white/10 overflow-x-auto">
                                            {['B', 'I', 'U', 'H1', 'H2', 'Link', 'Image', 'Code'].map(tool => (
                                                <button
                                                    key={tool}
                                                    type="button"
                                                    className="px-3 py-1.5 rounded-lg bg-white/5 text-[10px] font-black text-white/60 hover:text-white hover:bg-white/10 transition-all"
                                                >
                                                    {tool}
                                                </button>
                                            ))}
                                        </div>
                                        <textarea
                                            required
                                            rows={15}
                                            placeholder="Start writing your masterpiece here... HTML, CSS, and JS code blocks are supported."
                                            className="w-full bg-transparent p-8 text-white/80 focus:outline-none resize-none leading-relaxed font-mono text-sm"
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        disabled={success}
                                        className="flex-grow py-5 rounded-2xl bg-brand-primary text-bg-dark font-black flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all glow-shadow disabled:bg-green-500 disabled:scale-100"
                                    >
                                        {success ? (
                                            <>
                                                <CheckCircle size={22} />
                                                PUBLISHED SUCCESSFULLY
                                            </>
                                        ) : (
                                            <>
                                                <Plus size={22} />
                                                PUBLISH ARTICLE
                                            </>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        className="px-8 py-5 rounded-2xl glass border border-white/10 text-white font-black flex items-center gap-2 hover:bg-white/5 transition-all"
                                    >
                                        <Save size={20} />
                                        SAVE DRAFT
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-8">
                        <div className="glass p-8 rounded-[32px] border border-white/5">
                            <h4 className="text-xl font-black text-white mb-6 uppercase tracking-tight">Featured Image</h4>
                            <div className="aspect-video rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-4 hover:border-brand-primary/30 transition-all cursor-pointer group">
                                <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:scale-110 transition-all">
                                    <ImageIcon size={24} />
                                </div>
                                <div className="text-center">
                                    <p className="text-xs font-bold text-white mb-1 uppercase tracking-widest">Upload Image</p>
                                    <p className="text-[10px] text-white/20 uppercase tracking-widest">JPG, PNG, WEBP (Max 5MB)</p>
                                </div>
                            </div>
                        </div>

                        <div className="glass p-8 rounded-[32px] border border-white/5">
                            <h4 className="text-xl font-black text-white mb-6 uppercase tracking-tight">SEO Strategy</h4>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Meta Description</label>
                                    <textarea
                                        rows={3}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-brand-primary/20"
                                        placeholder="Brief summary for search results..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Tags (Comma separated)</label>
                                    <input
                                        type="text"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-brand-primary/20"
                                        placeholder="AI, Future, Tech..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="glass p-8 rounded-[32px] border border-white/5 bg-gradient-to-br from-brand-secondary/10 to-transparent">
                            <div className="flex items-center gap-3 mb-4">
                                <Globe className="text-brand-primary" size={24} />
                                <h4 className="text-xl font-black text-white uppercase tracking-tight">Visibility</h4>
                            </div>
                            <p className="text-sm text-white/40 leading-relaxed mb-8">
                                Once published, this article will be immediately visible on the public blog page and indexed by search engines.
                            </p>
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                                <span className="text-xs font-bold text-white/60">Search Indexing</span>
                                <div className="w-12 h-6 bg-brand-primary rounded-full relative">
                                    <div className="absolute right-1 top-1 w-4 h-4 bg-bg-dark rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateBlog;
