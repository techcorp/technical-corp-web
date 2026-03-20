"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Youtube, Instagram, Linkedin, Mail, Clock, Cpu, User, LogOut, LayoutDashboard, ShoppingBag, LogIn } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const { user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const socialIcons = [
        { icon: Youtube, href: siteConfig.socials.youtube },
        { icon: Instagram, href: siteConfig.socials.instagram },
        { icon: Linkedin, href: siteConfig.socials.linkedin },
    ];

    if (pathname?.startsWith("/secure-admin-dashboard")) {
        return null;
    }

    const isAdmin = user?.email === "technicalcorp700@gmail.com"; // Based on your login screenshot

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            {/* Top Bar - Hidden on Scroll for Professional Cleanliness */}
            <div className={cn(
                "bg-bg-dark/80 backdrop-blur-md border-b border-white/5 transition-all duration-500 overflow-hidden",
                scrolled ? "h-0 opacity-0" : "h-11 opacity-100"
            )}>
                <div className="container mx-auto h-full px-6 flex justify-between items-center">
                    <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-white/40">
                        <div className="flex items-center gap-2">
                            <Mail size={12} className="text-brand-primary" />
                            <span>{siteConfig.contact.email}</span>
                        </div>
                        <div className="hidden sm:flex items-center gap-2">
                            <Clock size={12} className="text-brand-primary" />
                            <span>{siteConfig.contact.responseTime} response</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {user && (
                            <div className="flex items-center gap-4 border-r border-white/5 pr-4 mr-2">
                                <Link href="/orders" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-brand-primary transition-colors">
                                    <ShoppingBag size={12} className="text-brand-primary" />
                                    <span>My Orders</span>
                                </Link>
                                {isAdmin && (
                                    <Link href="/secure-admin-dashboard/dashboard" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-brand-primary transition-colors">
                                        <LayoutDashboard size={12} className="text-brand-primary" />
                                        <span>Admin</span>
                                    </Link>
                                )}
                            </div>
                        )}
                        {socialIcons.map((social, i) => (
                            <a
                                key={i}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/30 hover:text-brand-primary transition-colors hover:scale-110"
                            >
                                <social.icon size={14} />
                            </a>
                        ))}
                        <a
                            href={siteConfig.socials.tiktok}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/30 hover:text-brand-primary transition-colors hover:scale-110"
                        >
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.14-.1-.27-.2-.41-.31v8.46c.02 1.34-.14 2.69-.53 3.98-.44 1.48-1.32 2.87-2.6 3.75-1.42.98-3.21 1.44-4.91 1.41-1.65-.02-3.32-.48-4.66-1.46-1.39-1.01-2.34-2.58-2.61-4.26-.23-1.44-.06-2.92.51-4.26.49-1.16 1.31-2.18 2.37-2.88 1.13-.74 2.49-1.13 3.84-1.12 1.29-.02 2.62.24 3.79.84.01 1.42.01 2.84 0 4.25-.66-.35-1.4-.49-2.15-.46-.68.03-1.36.21-1.95.55-.57.32-1.01.83-1.25 1.44-.24.64-.24 1.35.02 1.99.27.65.75 1.19 1.37 1.5.58.29 1.24.41 1.89.37.67-.03 1.33-.21 1.88-.61.59-.44.97-1.11 1.05-1.84.07-1.23.04-2.46.05-3.69V.02z" /></svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav
                className={cn(
                    "transition-all duration-500 border-b",
                    scrolled 
                        ? "py-3 bg-bg-dark/80 backdrop-blur-xl border-white/10 shadow-2xl shadow-black/40" 
                        : "py-5 bg-transparent border-transparent"
                )}
            >
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <Link href="/" className="flex items-center group">
                        <div className="relative h-14 w-64 transition-transform group-hover:scale-105 duration-300 mix-blend-screen filter invert brightness-[2]">
                            <img
                                src="/logo-new.png"
                                alt="Technical Corp Logo"
                                className="h-full w-full object-contain"
                            />
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {siteConfig.nav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-brand-primary",
                                    pathname === item.href ? "text-brand-primary" : "text-white/40"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}

                        <div className="h-4 w-[1px] bg-white/10 mx-2" />

                        {user ? (
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => logout()}
                                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-red-400 transition-colors"
                                >
                                    <LogOut size={14} />
                                    LOGOUT
                                </button>
                                <Link
                                    href="/orders"
                                    className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2"
                                >
                                    <User size={14} className="text-brand-primary" />
                                    Account
                                </Link>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="px-7 py-3 rounded-xl bg-brand-primary text-bg-dark font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all glow-shadow flex items-center gap-2"
                            >
                                <LogIn size={14} />
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-white p-2 rounded-lg bg-white/5 border border-white/10"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="absolute top-full left-0 right-0 glass border-b border-white/5 md:hidden overflow-hidden"
                        >
                            <div className="flex flex-col p-8 gap-6">
                                {siteConfig.nav.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "text-2xl font-black font-heading uppercase tracking-tight",
                                            pathname === item.href ? "text-brand-primary" : "text-white/70"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <div className="pt-6 border-t border-white/5 flex flex-col gap-6">
                                    {user ? (
                                        <>
                                            <Link
                                                href="/orders"
                                                onClick={() => setIsOpen(false)}
                                                className="w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-center uppercase tracking-widest"
                                            >
                                                My Orders
                                            </Link>
                                            <button
                                                onClick={() => { logout(); setIsOpen(false); }}
                                                className="w-full py-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 font-black text-center uppercase tracking-widest"
                                            >
                                                Logout
                                            </button>
                                        </>
                                    ) : (
                                        <Link
                                            href="/login"
                                            onClick={() => setIsOpen(false)}
                                            className="w-full py-5 rounded-2xl bg-brand-primary text-bg-dark font-black text-center uppercase tracking-widest glow-shadow"
                                        >
                                            Login
                                        </Link>
                                    )}

                                    <div className="flex justify-center gap-8 pt-4">
                                        {socialIcons.map((social, i) => (
                                            <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-brand-primary transition-colors">
                                                <social.icon size={20} />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
};

export default Navbar;
