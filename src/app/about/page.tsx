"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Rocket, Target, Heart, Zap } from "lucide-react";

const AboutPage = () => {
    return (
        <main className="min-h-screen bg-bg-dark">
            <div className="hero-mesh opacity-20" />

            {/* Hero Section */}
            <div className="pt-48 pb-32 relative z-10">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto text-center mb-24"
                    >
                        <h1 className="text-sm font-black uppercase tracking-[0.4em] text-brand-primary mb-6">Our Legacy & Future</h1>
                        <h2 className="text-6xl md:text-8xl font-black font-heading text-white mb-8 leading-tight tracking-tighter uppercase italic">
                            Redefining <br />
                            The <span className="text-gradient">Standard</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-white/50 leading-relaxed mx-auto max-w-2xl font-medium">
                            Technical Corp is a high-performance digital collective dedicated to building the infrastructure of tomorrow&apos;s digital economy.
                        </p>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-40">
                        {[
                            { label: "Founded", value: "2024" },
                            { label: "Global Clients", value: "150+" },
                            { label: "Solutions Built", value: "400+" },
                            { label: "NPS Score", value: "98%" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass p-8 rounded-[32px] border border-white/5 text-center group hover:border-brand-primary/20 transition-all"
                            >
                                <div className="text-4xl font-black text-white mb-2 italic tracking-tighter group-hover:text-brand-primary transition-colors">{stat.value}</div>
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Vision Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-48">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="relative aspect-square rounded-[60px] overflow-hidden glass border border-white/5"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 via-transparent to-brand-secondary/20" />
                            <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-bg-dark to-transparent">
                                <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-4">Innovation First</h3>
                                <p className="text-white/40 font-bold text-sm tracking-widest uppercase">The Technical Corp Philosophy</p>
                            </div>
                        </motion.div>

                        <div className="space-y-10">
                            <h3 className="text-4xl md:text-5xl font-black font-heading text-white uppercase italic tracking-tighter">Empowering Businesses Globally</h3>
                            <div className="space-y-6 text-white/50 text-lg leading-relaxed font-medium">
                                <p>
                                    At Technical Corp, we don&apos;t just build applications; we engineer business growth. Our team specializes in the intersection of AI-automated systems, enterprise-grade cloud architecture, and cutting-edge user experience design.
                                </p>
                                <p>
                                    Founded with a mission to bridge the gap between complex technology and everyday business needs, we have evolved into a global force for digital transformation, helping startups and Fortune 500 companies alike navigate the rapidly changing tech landscape.
                                </p>
                            </div>

                            <div className="pt-6">
                                <button className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs hover:bg-brand-primary hover:text-bg-dark transition-all">
                                    Our Core Methodology
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Missions Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-48">
                        {[
                            {
                                title: "Our Mission",
                                desc: "To democratize high-end creative and technical solutions, making elite digital transformation accessible to ambitious entrepreneurs worldwide.",
                                icon: Target
                            },
                            {
                                title: "Our Vision",
                                desc: "To be the ultimate global engine of innovation, where complex problems meet elegant, AI-driven solutions that feel like magic.",
                                icon: Rocket
                            },
                            {
                                title: "Our Values",
                                desc: "We operate with radical transparency, relentless innovation, and an unwavering commitment to our clients' long-term success above all else.",
                                icon: Heart
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="glass-card p-12 rounded-[48px] text-center border border-white/5 relative group hover:border-brand-primary/30 transition-all overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-[60px] rounded-full group-hover:bg-brand-primary/10 transition-all" />
                                <div className="w-20 h-20 rounded-3xl bg-brand-primary/10 flex items-center justify-center mx-auto mb-10 group-hover:rotate-12 transition-transform">
                                    <item.icon size={36} className="text-brand-primary" />
                                </div>
                                <h4 className="text-2xl font-black font-heading text-white mb-6 uppercase italic tracking-tight">{item.title}</h4>
                                <p className="text-white/40 leading-relaxed font-medium text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* The Process */}
                    <div className="glass p-16 rounded-[60px] border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

                        <div className="text-center mb-20 relative z-10">
                            <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">The Technical <span className="text-brand-primary">Process</span></h2>
                            <p className="text-white/30 uppercase tracking-[0.3em] font-black text-xs">How we turn ideas into industry leaders</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                            {[
                                { step: "01", title: "Discover", desc: "Deep dive into your business core." },
                                { step: "02", title: "Strategize", desc: "Mapping the path to market dominance." },
                                { step: "03", title: "Execute", desc: "Precision engineering and rapid build." },
                                { step: "04", title: "Optimize", desc: "Continuous refinement and scaling." }
                            ].map((p, i) => (
                                <div key={i} className="relative">
                                    {i < 3 && <div className="hidden md:block absolute top-10 left-[70%] right-[-30%] h-px bg-gradient-to-r from-brand-primary/50 to-transparent" />}
                                    <div className="text-6xl font-black text-white/5 mb-6">{p.step}</div>
                                    <h4 className="text-xl font-black text-white mb-3 uppercase italic">{p.title}</h4>
                                    <p className="text-white/40 text-sm font-medium">{p.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AboutPage;
