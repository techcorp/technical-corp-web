"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, Shield, Users, Zap, DollarSign } from "lucide-react";

const reasons = [
    {
        title: "Experienced IT Professionals",
        description: "Our team consists of certified experts with decades of combined experience.",
        icon: Users
    },
    {
        title: "Fast Technical Support",
        description: "Minimizing downtime with rapid response times and efficient resolution.",
        icon: Zap
    },
    {
        title: "AI Powered Development",
        description: "Leveraging the latest AI technologies to build smarter and faster applications.",
        icon: Shield
    },
    {
        title: "Secure & Reliable Solutions",
        description: "Enterprise-level security for every project we undertake.",
        icon: Shield
    },
    {
        title: "Affordable Pricing",
        description: "High-quality solutions tailored to fit your budget perfectly.",
        icon: DollarSign
    }
];

const WhyChooseUs = () => {
    return (
        <section className="py-32 bg-bg-card/30 relative">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-4">Why Technical Corp</h2>
                        <h3 className="text-4xl md:text-5xl font-black font-heading text-white mb-8">
                            Reliability Meets <br />
                            Digital Innovation
                        </h3>
                        <p className="text-xl text-white/50 mb-12 leading-relaxed">
                            We don&apos;t just provide services; we build partnerships. Our holistic approach ensures your technology stack is future-proof.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {reasons.map((reason, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center shrink-0">
                                        <CheckCircle2 size={20} className="text-brand-primary" />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-white mb-2">{reason.title}</h5>
                                        <p className="text-sm text-white/40 leading-relaxed">{reason.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-square glass rounded-[60px] p-4 flex items-center justify-center overflow-hidden shadow-2xl">
                            <div className="relative w-full h-full rounded-[45px] overflow-hidden group">
                                <Image
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop"
                                    alt="Technical Innovation Team"
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-bg-dark/20 to-transparent" />

                                <div className="absolute inset-x-0 bottom-10 flex justify-center">
                                    <div className="glass px-8 py-5 rounded-3xl border border-white/10 text-center shadow-2xl backdrop-blur-3xl">
                                        <div className="text-5xl font-black text-brand-primary mb-1 tracking-tighter">10+</div>
                                        <div className="text-[10px] text-white/50 font-black uppercase tracking-[0.3em]">Years of Excellence</div>
                                    </div>
                                </div>

                                <motion.div
                                    animate={{
                                        y: [0, -10, 0],
                                        rotate: [0, 5, 0]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-8 right-8 p-5 glass rounded-2xl shadow-2xl border border-white/10"
                                >
                                    <Shield className="text-brand-primary" size={24} />
                                </motion.div>

                                <motion.div
                                    animate={{
                                        y: [0, 15, 0],
                                        rotate: [0, -5, 0]
                                    }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute top-32 left-8 p-5 glass rounded-2xl shadow-2xl border border-white/10"
                                >
                                    <Zap className="text-brand-secondary" size={24} />
                                </motion.div>
                            </div>
                        </div>
                        <div className="absolute -inset-20 bg-brand-primary/5 blur-[120px] rounded-full -z-10 animate-pulse-slow" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
