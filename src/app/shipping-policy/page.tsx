"use client";

import React from "react";
import { Zap, Globe, Download, Mail, ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const ShippingPolicy = () => {
    const sections = [
        {
            title: "Digital Delivery Protocol",
            icon: Zap,
            content: "Technical Corp is a 100% digital enterprise. We do not ship physical parcels. All assets are delivered via secured digital nodes instantly upon payment synchronization. No shipping fees or physical logistics apply to any transaction on our platform."
        },
        {
            title: "Fulfillment Timeline",
            icon: Clock,
            content: "Standard fulfillment time is under 15 seconds. Once bSecure or Stripe confirms your payment, a high-priority delivery trigger is sent to your registered email address and your personal Orders Dashboard simultaneously."
        },
        {
            title: "Global Accessibility",
            icon: Globe,
            content: "Our digital assets are available globally. As long as you have an active internet connection, you can acquire and download our technologies from any geographic location. No customs, duties, or cross-border shipping delays apply."
        },
        {
            title: "Re-Download Access",
            icon: Download,
            content: "Lost your files? Your digital assets are stored securely on our cloud infrastructure. You can re-download your acquired tech at any time by logging into your account, with no additional 're-shipping' costs."
        }
    ];

    return (
        <main className="min-h-screen pt-40 pb-20 bg-bg-dark relative overflow-hidden">
            <div className="hero-mesh opacity-20" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="container relative z-10 max-w-4xl mx-auto px-6">
                <Link href="/" className="inline-flex items-center gap-3 text-white/40 hover:text-brand-primary transition-all text-xs font-black uppercase tracking-[0.2em] mb-12 group">
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-primary/50 transition-all">
                        <ArrowLeft size={14} />
                    </div>
                    Back Home
                </Link>

                <div className="mb-16">
                    <h2 className="text-xs font-black text-brand-primary uppercase tracking-[0.5em] mb-6">Delivery Protocol</h2>
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter italic leading-none mb-8">
                        Shipping <br /><span className="text-gradient">& Fulfillment</span>
                    </h1>
                    <p className="text-white/40 text-sm font-medium uppercase tracking-widest">Digital-First Policy: March 2026</p>
                </div>

                <div className="space-y-12">
                    {sections.map((section, i) => (
                        <motion.section
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass p-10 rounded-[40px] border border-white/10 hover:border-brand-primary/30 transition-all group"
                        >
                            <div className="flex items-center gap-6 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
                                    <section.icon size={24} />
                                </div>
                                <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">{section.title}</h3>
                            </div>
                            <p className="text-white/60 leading-relaxed font-medium">
                                {section.content}
                            </p>
                        </motion.section>
                    ))}
                </div>

                <div className="mt-20 p-12 rounded-[48px] bg-white/[0.03] border border-white/5 text-center">
                    <p className="text-white/20 text-xs font-black uppercase tracking-widest leading-loose">
                        Technical Corp facilitates instant digital deployment. 
                        No physical infrastructure is required for the delivery of acquired assets.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default ShippingPolicy;
