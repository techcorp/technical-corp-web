"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Calendar, ChevronRight } from "lucide-react";

const latestBlogs = [
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
    }
];

const LatestBlogs = () => {
    return (
        <section className="py-32 bg-bg-dark relative overflow-hidden">
            {/* Subtle background decorative elements */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px] -translate-x-1/2" />
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-[100px] translate-x-1/2" />

            <div className="container relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-4"
                        >
                            Insights
                        </motion.h2>
                        <motion.h3
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-black font-heading text-white"
                        >
                            Latest From Our Blog
                        </motion.h3>
                    </div>
                    <Link href="/blogs" className="group flex items-center gap-2 text-white/60 hover:text-brand-primary transition-colors font-bold uppercase tracking-widest text-[10px]">
                        View All Insights
                        <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {latestBlogs.map((blog, index) => (
                        <motion.div
                            key={blog.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="glass-card rounded-[32px] overflow-hidden group hover:translate-y-[-10px] transition-all duration-500 shadow-2xl"
                        >
                            <Link href={`/blogs/${blog.slug}`} className="block relative aspect-[16/10] overflow-hidden">
                                <Image
                                    src={blog.image}
                                    alt={blog.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute top-6 left-6">
                                    <span className="px-4 py-1.5 glass border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">
                                        {blog.category}
                                    </span>
                                </div>
                            </Link>

                            <div className="p-8">
                                <div className="flex items-center gap-4 text-[10px] text-white/30 mb-5">
                                    <span className="flex items-center gap-2 font-black uppercase tracking-[0.2em]">
                                        <Calendar size={12} className="text-brand-primary" />
                                        {blog.date}
                                    </span>
                                </div>

                                <Link href={`/blogs/${blog.slug}`}>
                                    <h4 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
                                        {blog.title}
                                    </h4>
                                </Link>

                                <p className="text-white/40 text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
                                    {blog.excerpt}
                                </p>

                                <Link
                                    href={`/blogs/${blog.slug}`}
                                    className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:text-brand-primary transition-colors group/link"
                                >
                                    Read Article
                                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover/link:border-brand-primary/50 transition-colors">
                                        <ChevronRight size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
                                    </div>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestBlogs;
