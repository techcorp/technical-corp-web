"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldX, Home, ArrowRight } from "lucide-react";

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-dark p-6 relative overflow-hidden">
            <div className="hero-mesh opacity-30" />

            <div className="text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-12"
                >
                    <div className="w-32 h-32 bg-red-500/10 rounded-[40px] border border-red-500/20 flex items-center justify-center mx-auto mb-10 relative">
                        <ShieldX size={64} className="text-red-500" />
                        <div className="absolute inset-0 bg-red-500 rounded-[40px] blur-[40px] opacity-20" />
                    </div>

                    <h1 className="text-[12rem] font-black leading-none text-white/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
                        404
                    </h1>

                    <h2 className="text-4xl md:text-6xl font-black font-heading text-white mb-6 relative">
                        Access <span className="text-red-500">Denied</span>
                    </h2>

                    <p className="text-xl text-white/40 max-w-lg mx-auto leading-relaxed mb-12">
                        The page you are looking for doesn&apos;t exist or you don&apos;t have the necessary permissions to view it.
                    </p>
                </motion.div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link
                        href="/"
                        className="px-10 py-5 rounded-2xl bg-brand-primary text-bg-dark font-black flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all glow-shadow"
                    >
                        <Home size={22} />
                        BACK TO SAFETY
                    </Link>

                    <Link
                        href="/contact"
                        className="px-10 py-5 rounded-2xl glass border border-white/10 text-white font-black flex items-center justify-center gap-3 hover:bg-white/5 transition-all"
                    >
                        REPORT AN ISSUE
                        <ArrowRight size={22} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
