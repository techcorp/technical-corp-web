"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Calendar, ChevronRight, Filter } from "lucide-react";

// In a real app, this would come from Supabase
const ALL_BLOGS = [
    {
        id: 1,
        title: "The Future of AI in Enterprise Solutions",
        excerpt: "Discover how AI is transforming business automation and decision-making processes in 2026.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        date: "March 5, 2026",
        category: "AI Technology",
        slug: "ai-enterprise-future"
    },
    {
        id: 2,
        title: "Cybersecurity Trends: Protecting Your Digital Assets",
        excerpt: "Essential strategies for modern businesses to combat evolving cyber threats and data breaches.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
        date: "March 1, 2026",
        category: "Security",
        slug: "cybersecurity-trends-2026"
    },
    {
        id: 3,
        title: "Why Startups are Choosing Next.js for Scalability",
        excerpt: "A deep dive into why Next.js has become the go-to framework for modern web applications.",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
        date: "Feb 24, 2026",
        category: "Web Dev",
        slug: "nextjs-startup-scalability"
    },
    {
        id: 4,
        title: "Cloud Migration: A Comprehensive Guide",
        excerpt: "Step-by-step approach to moving your legacy infrastructure to the cloud securely.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
        date: "Feb 18, 2026",
        category: "Cloud",
        slug: "cloud-migration-guide"
    },
    {
        id: 5,
        title: "Designing for the Next Billion Users",
        excerpt: "How to create inclusive and accessible UI/UX for global audiences.",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800",
        date: "Feb 10, 2026",
        category: "UI/UX",
        slug: "designing-inclusive-ux"
    },
    {
        id: 6,
        title: "The Rise of Edge Computing",
        excerpt: "Why processing data closer to the source is becoming critical for IoT and real-time apps.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=800",
        date: "Feb 1, 2026",
        category: "Infrastructure",
        slug: "edge-computing-rise"
    }
];

const useCategories = () => {
    const [cats, setCats] = useState<string[]>(["All", "AI Technology", "Security", "Web Dev", "Cloud", "UI/UX", "Infrastructure"]);
    useEffect(() => {
        const saved = localStorage.getItem("blog_categories");
        if (saved) {
            setCats(["All", ...JSON.parse(saved)]);
        }
    }, []);
    return cats;
};

const BlogsPage = () => {
    const categories = useCategories();
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredBlogs = ALL_BLOGS.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === "All" || blog.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="pt-40 pb-32">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-primary mb-6">Technical Insights</h1>
                    <h2 className="text-5xl md:text-6xl font-black font-heading text-white mb-8">
                        The Digital <span className="text-gradient">Knowledge hub</span>
                    </h2>
                    <p className="text-xl text-white/50 leading-relaxed">
                        Stay updated with the latest trends, tutorials, and insights from the world of IT and AI.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col lg:flex-row gap-8 mb-16 items-center justify-between">
                    <div className="relative w-full lg:w-96">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" size={20} />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all"
                        />
                    </div>

                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-3 rounded-xl border text-sm font-black uppercase tracking-widest transition-all ${activeCategory === cat
                                    ? "bg-brand-primary border-brand-primary text-bg-dark"
                                    : "border-white/10 text-white/60 hover:border-white/30 hover:text-white"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredBlogs.map((blog, index) => (
                        <motion.div
                            key={blog.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="glass-card rounded-3xl overflow-hidden group"
                        >
                            <Link href={`/blogs/${blog.slug}`} className="block relative aspect-video overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 glass border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-brand-primary">
                                        {blog.category}
                                    </span>
                                </div>
                            </Link>

                            <div className="p-8">
                                <div className="flex items-center gap-4 text-xs text-white/40 mb-4">
                                    <span className="flex items-center gap-1.5 font-bold uppercase tracking-widest">
                                        <Calendar size={14} className="text-brand-primary" />
                                        {blog.date}
                                    </span>
                                </div>

                                <Link href={`/blogs/${blog.slug}`}>
                                    <h4 className="text-2xl font-bold mb-4 text-white group-hover:text-brand-primary transition-colors line-clamp-2">
                                        {blog.title}
                                    </h4>
                                </Link>

                                <p className="text-white/50 text-sm leading-relaxed mb-8 line-clamp-3">
                                    {blog.excerpt}
                                </p>

                                <Link
                                    href={`/blogs/${blog.slug}`}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/10 text-xs font-black uppercase tracking-widest text-white hover:bg-white/5 transition-all"
                                >
                                    Read Full Article
                                    <ChevronRight size={14} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredBlogs.length === 0 && (
                    <div className="text-center py-20">
                        <Filter size={48} className="text-white/10 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-2">No results found</h3>
                        <p className="text-white/40">Try adjusting your search or category filters.</p>
                    </div>
                )}

                {/* Pagination Placeholder */}
                <div className="mt-20 flex justify-center gap-4">
                    <button className="w-12 h-12 rounded-xl glass border border-brand-primary text-brand-primary flex items-center justify-center font-bold">1</button>
                    <button className="w-12 h-12 rounded-xl glass border border-white/10 text-white/40 flex items-center justify-center font-bold hover:border-white/30 transition-all">2</button>
                    <button className="w-12 h-12 rounded-xl glass border border-white/10 text-white/40 flex items-center justify-center font-bold hover:border-white/30 transition-all">3</button>
                </div>
            </div>
        </div>
    );
};

export default BlogsPage;
