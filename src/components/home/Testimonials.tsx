"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        name: "James Wilson",
        role: "CEO, TechLaunch Systems",
        content: "Technical Corp completely transformed our infrastructure. Their AI-driven approach saved us thousands in operational costs.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=james"
    },
    {
        name: "Sarah Chen",
        role: "CTO, NanoSec Solutions",
        content: "Professional, fast, and highly skilled. Their cybersecurity team is second to none. We feel much more secure now.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=sarah"
    },
    {
        name: "Michael Ross",
        role: "Founder, GreenEnergy Ltd",
        content: "The web application they built for us is world-class. Scalable, clean, and incredible performance. Highly recommended.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=michael"
    }
];

const Testimonials = () => {
    return (
        <section className="py-32 relative overflow-hidden bg-bg-card/20">
            <div className="container relative z-10">
                <div className="max-w-3xl mb-20">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-4"
                    >
                        Success Stories
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black font-heading text-white tracking-tighter"
                    >
                        HEAR FROM OUR <br />
                        <span className="text-gradient">GLOBAL PARTNERS</span>
                    </motion.h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((test, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="p-10 glass rounded-[40px] border-white/5 relative group hover:bg-white/5 transition-all duration-500 shadow-2xl"
                        >
                            <Quote className="absolute top-8 right-10 text-brand-primary/10 group-hover:text-brand-primary/20 transition-colors" size={60} />

                            <div className="flex gap-1 mb-6">
                                {[...Array(test.rating)].map((_, i) => (
                                    <Star key={i} size={14} className="fill-brand-primary text-brand-primary" />
                                ))}
                            </div>

                            <p className="text-white/60 text-lg leading-relaxed mb-10 italic font-medium">
                                &quot;{test.content}&quot;
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-brand-primary/20">
                                    <img src={test.avatar} alt={test.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h5 className="font-bold text-white text-lg">{test.name}</h5>
                                    <p className="text-white/40 text-xs font-black uppercase tracking-widest">{test.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[150px] -z-10" />
        </section>
    );
};

export default Testimonials;
