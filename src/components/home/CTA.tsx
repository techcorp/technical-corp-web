"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MessageSquare, ArrowRight, Zap, Shield } from "lucide-react";

const CTA = () => {
    return (
        <section className="py-32 relative overflow-hidden">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full rounded-[60px] glass p-12 md:p-24 overflow-hidden border border-white/10 glow-shadow group"
                >
                    {/* Animated Background Highlights */}
                    <div className="hero-grid animate-grid-shift opacity-30" />
                    <div className="absolute top-0 -right-20 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
                    <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-brand-accent/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />

                    {/* Floating Decorative Elements */}
                    <motion.div
                        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-20 left-20 hidden lg:block opacity-20 group-hover:opacity-100 transition-opacity duration-1000"
                    >
                        <Zap size={40} className="text-brand-primary" />
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-20 right-20 hidden lg:block opacity-20 group-hover:opacity-100 transition-opacity duration-1000"
                    >
                        <Shield size={40} className="text-brand-accent" />
                    </motion.div>

                    <div className="relative z-10 text-center max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 0 }}
                                className="w-24 h-24 bg-brand-primary rounded-[30px] flex items-center justify-center mx-auto mb-10 glow-shadow rotate-3 shadow-2xl transition-all"
                            >
                                <MessageSquare size={40} className="text-bg-dark" />
                            </motion.div>

                            <h2 className="text-4xl md:text-7xl font-black font-heading text-white mb-8 leading-[0.95] tracking-tighter">
                                READY TO <br />
                                <span className="text-gradient uppercase">Scale?</span>
                            </h2>

                            <p className="text-lg md:text-xl text-white/50 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
                                Transform your digital infrastructure today. Our experts are ready to help you scale and secure your business operations with elite solutions.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <Link
                                    href="/contact"
                                    className="group px-12 py-5 rounded-2xl bg-brand-primary text-bg-dark font-black flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all glow-shadow text-lg"
                                >
                                    Contact Our Team
                                    <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <Link
                                    href="/services"
                                    className="px-12 py-5 rounded-2xl glass border border-white/10 text-white font-black hover:bg-white/5 transition-all text-lg shadow-xl"
                                >
                                    Explore Services
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTA;
