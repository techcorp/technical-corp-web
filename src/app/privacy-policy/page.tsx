"use client";

import React from "react";
import { Shield, Lock, Eye, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
    const sections = [
        {
            title: "Information We Collect",
            icon: Eye,
            content: "We collect information you provide directly to us when you create an account, purchase digital assets, or contact support. This includes your name, email address, and purchase history. For digital deliveries, we may collect technical data such as IP addresses for security and license verification."
        },
        {
            title: "Data Protection",
            icon: Lock,
            content: "Your data is protected using enterprise-grade AES-256 encryption. Financial transactions are facilitated by secured third-party protocols (Stripe, bSecure) and are never stored on our local servers. We implement strict SSL/TLS encryption for all data transmissions."
        },
        {
            title: "How We Use Your Data",
            icon: Shield,
            content: "Collected data is primarily used to facilitate the delivery of digital assets, verify your licensing rights, and provide technical support. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties."
        },
        {
            title: "Contact Information",
            icon: Mail,
            content: "For any privacy-related inquiries or to request data deletion, please contact our transparency office at support@technicalcorpofficial.com. Our typical response time for data requests is under 48 hours."
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
                    <h2 className="text-xs font-black text-brand-primary uppercase tracking-[0.5em] mb-6">Transparency Protocol</h2>
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter italic leading-none mb-8">
                        Privacy <br /><span className="text-gradient">Policy</span>
                    </h1>
                    <p className="text-white/40 text-sm font-medium uppercase tracking-widest">Effective Date: March 20, 2026</p>
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
                        Technical Corp is committed to protecting the privacy of our digital architects. 
                        By using this platform, you acknowledge your synchronization with these protocols.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default PrivacyPolicy;
