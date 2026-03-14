"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Loader2, LogIn, Github } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/";

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) throw authError;

            router.push(redirectTo);
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Invalid email or password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 bg-bg-dark flex items-center justify-center p-6 relative">
            <div className="hero-mesh opacity-30" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-brand-primary/20">
                        <LogIn size={32} className="text-brand-primary" />
                    </div>
                    <h1 className="text-4xl font-black font-heading text-white mb-2 uppercase italic tracking-tighter">Welcome Back</h1>
                    <p className="text-white/40 font-medium">Log in to manage your orders</p>
                </div>

                <div className="glass p-10 rounded-[40px] border border-white/5 shadow-2xl">
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-bold">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 rounded-2xl bg-brand-primary text-bg-dark font-black flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all glow-shadow disabled:opacity-50 disabled:scale-100"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={24} />
                            ) : (
                                <>
                                    LOG IN
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/5 text-center">
                        <p className="text-white/40 text-sm mb-4">Don't have an account?</p>
                        <Link
                            href={`/register${searchParams.get('redirect') ? `?redirect=${searchParams.get('redirect')}` : ''}`}
                            className="text-brand-primary font-black uppercase tracking-widest text-xs hover:underline decoration-2 underline-offset-4"
                        >
                            Create Account
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
