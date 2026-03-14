"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Send,
    Mail,
    MapPin,
    MessageCircle,
    Clock,
    CheckCircle,
    Zap,
    ArrowRight
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { supabase } from "@/lib/supabase";

const ContactPage = () => {
    const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('sending');

        try {
            const { error } = await supabase
                .from('contact_messages')
                .insert([formData]);

            if (error) throw error;
            setFormStatus('success');
        } catch (error: any) {
            console.error("Error sending message:", error);
            alert("Failed to send message: " + error.message);
            setFormStatus('idle');
        }
    };

    return (
        <div className="pt-40 pb-32">
            <div className="container">
                <div className="max-w-4xl mb-16">
                    <h1 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-primary mb-6">Connect With Us</h1>
                    <h2 className="text-5xl md:text-7xl font-black font-heading text-white mb-8">
                        Let&apos;s Build Something <br />
                        <span className="text-gradient">Extraordinary</span>
                    </h2>
                    <p className="text-xl text-white/50 leading-relaxed max-w-2xl">
                        Have a project in mind? We&apos;re here to help you bring it to life. Reach out to our team of experts today.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass p-10 md:p-12 rounded-[40px] border border-white/5"
                        >
                            {formStatus === 'success' ? (
                                <div className="text-center py-20">
                                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20">
                                        <CheckCircle size={40} className="text-green-500" />
                                    </div>
                                    <h3 className="text-3xl font-black text-white mb-4">Message Sent!</h3>
                                    <p className="text-white/60 text-lg">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                                    <button
                                        onClick={() => {
                                            setFormStatus('idle');
                                            setFormData({ name: "", email: "", subject: "", message: "" });
                                        }}
                                        className="mt-8 text-brand-primary font-bold uppercase tracking-widest text-sm hover:underline"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Your Name</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="John Doe"
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Email Address</label>
                                            <input
                                                required
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="john@example.com"
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Subject</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            placeholder="Project Inquiry"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20 transition-all"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Message</label>
                                        <textarea
                                            required
                                            rows={6}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            placeholder="Tell us about your project or inquiry..."
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20 transition-all resize-none"
                                        ></textarea>
                                    </div>

                                    <button
                                        disabled={formStatus === 'sending'}
                                        className="w-full py-5 rounded-2xl bg-brand-primary text-bg-dark font-black flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all glow-shadow text-lg disabled:opacity-70"
                                    >
                                        {formStatus === 'sending' ? (
                                            <span className="flex items-center gap-2">
                                                <div className="w-5 h-5 border-4 border-bg-dark/30 border-t-bg-dark rounded-full animate-spin" />
                                                SENDING...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                SEND MESSAGE
                                                <Send size={20} />
                                            </span>
                                        )}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>

                    <div className="lg:col-span-5 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass p-10 rounded-[40px] border border-white/5"
                        >
                            <h4 className="text-2xl font-black font-heading text-white mb-10">Contact Details</h4>
                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center shrink-0">
                                        <Mail size={24} className="text-brand-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-1">Email Us</p>
                                        <p className="text-xl text-white font-bold">{siteConfig.contact.email}</p>
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center shrink-0">
                                        <MessageCircle size={24} className="text-brand-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-1">WhatsApp</p>
                                        <a
                                            href={siteConfig.contact.whatsapp}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xl text-white font-bold hover:text-brand-primary transition-colors"
                                        >
                                            {siteConfig.contact.whatsappDisplay}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center shrink-0">
                                        <MapPin size={24} className="text-brand-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-1">Our Location</p>
                                        <p className="text-xl text-white font-bold">{siteConfig.contact.location}</p>
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center shrink-0">
                                        <Clock size={24} className="text-brand-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-1">Response Time</p>
                                        <p className="text-xl text-white font-bold">{siteConfig.contact.responseTime}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="glass p-10 rounded-[40px] border border-white/5 bg-gradient-to-br from-brand-primary/10 to-transparent">
                            <Zap className="text-brand-primary mb-6" size={40} />
                            <h4 className="text-2xl font-black font-heading text-white mb-4">Urgent Matters?</h4>
                            <p className="text-white/60 leading-relaxed mb-8">
                                Need immediate technical assistance? Our WhatsApp emergency line is monitored 24/7.
                            </p>
                            <a
                                href={siteConfig.contact.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-brand-primary font-bold uppercase tracking-widest text-sm hover:gap-4 transition-all"
                            >
                                CHAT NOW
                                <ArrowRight size={18} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
