"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, ShieldCheck, ArrowRight, Home, Loader2 } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const AdminLogin = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

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

            router.push("/secure-admin-dashboard/dashboard");
        } catch (err: any) {
            setError(err.message || "Invalid credentials. Access denied.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-dark p-6 relative">
            <div className="hero-mesh opacity-50" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-brand-primary transition-colors mb-8 text-xs font-bold uppercase tracking-widest">
                        <Home size={14} />
                        Return Home
                    </Link>
                    <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-brand-primary/20">
                        <Lock size={32} className="text-brand-primary" />
                    </div>
                    <h1 className="text-3xl font-black font-heading text-white mb-2">Secure Access</h1>
                    <p className="text-white/40 font-medium">Authorized Personnel Only</p>
                </div>

                <div className="glass p-10 rounded-[32px] border border-white/5 relative overflow-hidden">
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-bold flex items-center gap-3">
                            <ShieldCheck size={18} />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">Admin Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@technicalcorp.com"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all font-medium"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">Secret Key</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all font-medium"
                            />
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
                                    ENTER DASHBOARD
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
