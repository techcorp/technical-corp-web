"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
    BarChart3,
    FileEdit,
    Plus,
    Trash2,
    Settings,
    LogOut,
    Eye,
    LayoutDashboard,
    Tag,
    Package,
    ShoppingBag,
    Mail
} from "lucide-react";
import Link from "next/link";

import { supabase } from "@/lib/supabase";

const AdminDashboard = () => {
    const router = useRouter();
    const [blogs, setBlogs] = useState([
        { id: 1, title: "The Future of AI in Enterprise Solutions", category: "AI Technology", date: "2026-03-05", views: 1245 },
        { id: 2, title: "Cybersecurity Trends: Protecting Your Digital Assets", category: "Security", date: "2026-03-01", views: 890 },
        { id: 3, title: "Why Startups are Choosing Next.js for Scalability", category: "Web Dev", date: "2026-02-24", views: 2310 }
    ]);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push("/error-404");
            }
        };
        checkAuth();
    }, [router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };

    const deleteBlog = (id: number) => {
        if (confirm("Are you sure you want to delete this post?")) {
            setBlogs(blogs.filter(b => b.id !== id));
        }
    };

    return (
        <div className="min-h-screen bg-bg-dark flex">
            {/* Sidebar */}
            <div className="w-80 glass border-r border-white/5 flex flex-col p-8 fixed h-full">
                <div className="flex items-center gap-3 mb-12 group">
                    <div className="relative w-10 h-10 overflow-hidden rounded-lg glow-shadow bg-bg-dark border border-brand-primary/20">
                        <Image
                            src="/logo.png"
                            alt="Technical Corp Logo"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <span className="font-black text-xl text-white">Admin Panel</span>
                </div>

                <nav className="flex-grow space-y-4">
                    <Link href="/secure-admin-dashboard/dashboard" className="flex items-center gap-4 p-4 rounded-2xl bg-brand-primary text-bg-dark font-bold">
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>
                    <Link href="/secure-admin-dashboard/products" className="flex items-center gap-4 p-4 rounded-2xl text-white/60 hover:text-white hover:bg-white/5 transition-all font-bold">
                        <Package size={20} />
                        Products
                    </Link>
                    <Link href="/secure-admin-dashboard/categories" className="flex items-center gap-4 p-4 rounded-2xl text-white/60 hover:text-white hover:bg-white/5 transition-all font-bold">
                        <Tag size={20} />
                        Categories
                    </Link>
                    <Link href="/secure-admin-dashboard/create" className="flex items-center gap-4 p-4 rounded-2xl text-white/60 hover:text-white hover:bg-white/5 transition-all font-bold">
                        <Plus size={20} />
                        Create Post
                    </Link>
                    <Link href="/secure-admin-dashboard/orders" className="flex items-center gap-4 p-4 rounded-2xl text-white/60 hover:text-white hover:bg-white/5 transition-all font-bold">
                        <ShoppingBag size={20} />
                        Orders
                    </Link>
                    <Link href="/secure-admin-dashboard/messages" className="flex items-center gap-4 p-4 rounded-2xl text-white/60 hover:text-white hover:bg-white/5 transition-all font-bold">
                        <Mail size={20} />
                        Messages
                    </Link>
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 p-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all font-bold mt-auto"
                >
                    <LogOut size={20} />
                    Logout
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-grow ml-80 p-12">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2">Welcome Back, Admin</h1>
                        <p className="text-white/40">Manage your company&apos;s digital content effortlessly.</p>
                    </div>
                    <Link
                        href="/secure-admin-dashboard/create"
                        className="px-8 py-4 rounded-2xl bg-brand-primary text-bg-dark font-black flex items-center gap-2 glow-shadow"
                    >
                        <Plus size={20} />
                        New Blog Post
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {[
                        { label: "Total Posts", val: blogs.length, icon: FileEdit, color: "text-brand-primary" },
                        { label: "Total Read Time", val: "45h", icon: Clock, color: "text-brand-secondary" },
                        { label: "Active Visitors", val: "24", icon: User, color: "text-green-400" }
                    ].map((stat, i) => (
                        <div key={i} className="glass p-8 rounded-3xl border border-white/5">
                            <div className="flex justify-between items-start mb-4">
                                <stat.icon size={24} className={stat.color} />
                                <span className="text-xs font-bold text-green-400 opacity-60">+12% Since last month</span>
                            </div>
                            <div className="text-3xl font-black text-white mb-1">{stat.val}</div>
                            <div className="text-sm font-bold text-white/30 uppercase tracking-widest">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="glass rounded-[32px] border border-white/5 overflow-hidden">
                    <div className="p-8 border-b border-white/5">
                        <h2 className="font-bold text-xl text-white">Recent Articles</h2>
                    </div>
                    <div className="w-full">
                        <table className="w-full text-left">
                            <thead className="bg-white/[0.02] text-[10px] font-black uppercase tracking-widest text-white/30">
                                <tr>
                                    <th className="px-8 py-4">Article Title</th>
                                    <th className="px-8 py-4">Category</th>
                                    <th className="px-8 py-4">Publish Date</th>
                                    <th className="px-8 py-4">Views</th>
                                    <th className="px-8 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-white/80">
                                {blogs.map(blog => (
                                    <tr key={blog.id} className="hover:bg-white/[0.01] transition-colors group">
                                        <td className="px-8 py-6 font-bold">{blog.title}</td>
                                        <td className="px-8 py-6">
                                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/40">
                                                {blog.category}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-sm opacity-60">{blog.date}</td>
                                        <td className="px-8 py-6 text-sm opacity-60">{blog.views}</td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-all">
                                                    <Eye size={18} />
                                                </button>
                                                <button className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-brand-primary transition-all">
                                                    <FileEdit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => deleteBlog(blog.id)}
                                                    className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-red-500 transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Clock = ({ size, className }: { size: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
);

const User = ({ size, className }: { size: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);

export default AdminDashboard;
