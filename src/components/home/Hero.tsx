"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, Zap, ShieldCheck, Cpu } from "lucide-react";

const Hero = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants: any = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        },
    };

    return (
        <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
            {/* Professional Background Layers */}
            <div className="hero-mesh" />
            <div className="hero-grid animate-grid-shift" />

            {/* Dynamic Glow Orbs */}
            <div className="glow-orb w-[600px] h-[600px] bg-brand-primary/10 top-0 -left-40 animate-pulse-slow" />
            <div className="glow-orb w-[500px] h-[500px] bg-brand-secondary/10 bottom-0 -right-20 animate-pulse-slow" style={{ animationDelay: '2s' }} />
            <div className="glow-orb w-[300px] h-[300px] bg-brand-accent/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float" />

            <div className="container relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="w-full lg:w-2/3 text-center lg:text-left">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div variants={itemVariants}>
                                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass border border-white/10 mb-8 shadow-2xl">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="w-6 h-6 rounded-full border-2 border-bg-dark bg-brand-primary/20 flex items-center justify-center">
                                                <Zap size={10} className="text-brand-primary" />
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">
                                        Trusted by <span className="text-brand-primary">250+</span> Companies
                                    </span>
                                </div>
                            </motion.div>

                            <motion.h1
                                variants={itemVariants}
                                className="text-6xl md:text-8xl lg:text-9xl font-black font-heading leading-[0.95] mb-8 tracking-tighter text-white"
                            >
                                DIGITAL <br />
                                <span className="text-gradient">EVOLUTION</span>
                            </motion.h1>

                            <motion.p
                                variants={itemVariants}
                                className="text-lg md:text-xl text-white/50 mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium"
                            >
                                Empowering global enterprises with professional IT infrastructure, high-performance web applications, and cutting-edge artificial intelligence.
                            </motion.p>

                            <motion.div
                                variants={itemVariants}
                                className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
                            >
                                <Link
                                    href="/services"
                                    className="group px-12 py-5 rounded-2xl bg-brand-primary text-bg-dark font-black flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all glow-shadow text-lg"
                                >
                                    Explore Services
                                    <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <Link
                                    href="/contact"
                                    className="px-12 py-5 rounded-2xl glass border border-white/10 text-white font-black flex items-center justify-center gap-3 hover:bg-white/5 transition-all text-lg shadow-xl"
                                >
                                    Work With Us
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>

                    <div className="w-full lg:w-1/3 hidden lg:block">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                            className="relative"
                        >
                            <motion.div
                                animate={{
                                    y: [0, -25, 0],
                                }}
                                transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="relative z-10 w-full aspect-[4/5] rounded-[40px] overflow-hidden glass border border-white/10 shadow-[0_0_80px_rgba(0,242,255,0.05)] p-2"
                            >
                                <div className="relative w-full h-full rounded-[32px] overflow-hidden">
                                    <Image
                                        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop"
                                        alt="Digital Infrastructure Technical Illustration"
                                        fill
                                        className="object-cover transition-transform duration-1000 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent text-left p-8 flex flex-col justify-end">
                                        <div className="text-sm font-black text-brand-primary uppercase tracking-[0.2em] mb-2">Systems Status</div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-[10px] font-bold text-white/60">Core Infrastructure Nominal</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Layered Tech Chips */}
                                <motion.div
                                    animate={{ x: [0, 10, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -top-6 -left-10 glass px-6 py-4 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-2xl"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 rounded-lg bg-brand-primary/20 flex items-center justify-center">
                                            <ShieldCheck size={16} className="text-brand-primary" />
                                        </div>
                                        <div className="text-[10px] font-black text-white/40 uppercase tracking-widest">Security</div>
                                    </div>
                                    <div className="text-xl font-black text-white uppercase italic">Active Antivirus</div>
                                </motion.div>

                                <motion.div
                                    animate={{ x: [0, -10, 0] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute bottom-20 -right-12 glass px-6 py-4 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-2xl"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 rounded-lg bg-brand-accent/20 flex items-center justify-center">
                                            <Cpu size={16} className="text-brand-accent" />
                                        </div>
                                        <div className="text-[10px] font-black text-white/40 uppercase tracking-widest">Intelligence</div>
                                    </div>
                                    <div className="text-xl font-black text-white uppercase italic">Neural Core L3</div>
                                </motion.div>
                            </motion.div>

                            {/* Decorative Glows */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-primary/5 blur-[120px] rounded-full -z-10 animate-pulse-slow" />
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Scroll to Explore</span>
                    <div className="w-px h-12 bg-gradient-to-b from-brand-primary/50 to-transparent" />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
