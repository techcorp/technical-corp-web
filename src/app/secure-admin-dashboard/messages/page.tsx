"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    Mail,
    LogOut,
    CheckCircle2,
    Clock,
    User,
    ChevronRight,
    Search,
    Loader2,
    Trash2
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface ContactMessage {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: 'unread' | 'read' | 'archived';
    created_at: string;
}

const AdminMessages = () => {
    const router = useRouter();
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push("/error-404");
                return;
            }
            fetchMessages();
        };
        checkAuth();
    }, [router]);

    const fetchMessages = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('contact_messages')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setMessages(data);
        }
        setLoading(false);
    };

    const markAsRead = async (message: ContactMessage) => {
        if (message.status === 'unread') {
            const { error } = await supabase
                .from('contact_messages')
                .update({ status: 'read' })
                .eq('id', message.id);

            if (!error) {
                setMessages(messages.map(m => m.id === message.id ? { ...m, status: 'read' } : m));
            }
        }
        setSelectedMessage(message);
    };

    const deleteMessage = async (id: string) => {
        if (confirm("Are you sure you want to delete this message?")) {
            const { error } = await supabase
                .from('contact_messages')
                .delete()
                .eq('id', id);

            if (!error) {
                setMessages(messages.filter(m => m.id !== id));
                if (selectedMessage?.id === id) setSelectedMessage(null);
            }
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };

    const filteredMessages = messages.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-bg-dark flex">
            {/* Sidebar */}
            <div className="w-80 glass border-r border-white/5 flex flex-col p-8 fixed h-full">
                <div className="flex items-center gap-3 mb-12 group">
                    <div className="relative w-10 h-10 overflow-hidden rounded-lg glow-shadow bg-bg-dark border border-brand-primary/20">
                        <Image src="/logo.png" alt="Logo" fill className="object-cover" />
                    </div>
                    <span className="font-black text-xl text-white uppercase italic tracking-tighter">Admin Panel</span>
                </div>

                <nav className="flex-grow space-y-4">
                    <Link href="/secure-admin-dashboard/dashboard" className="flex items-center gap-4 p-4 rounded-2xl text-white/60 hover:text-white hover:bg-white/5 transition-all font-bold">
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>
                    <Link href="/secure-admin-dashboard/products" className="flex items-center gap-4 p-4 rounded-2xl text-white/60 hover:text-white hover:bg-white/5 transition-all font-bold">
                        <Package size={20} />
                        Products
                    </Link>
                    <Link href="/secure-admin-dashboard/orders" className="flex items-center gap-4 p-4 rounded-2xl text-white/60 hover:text-white hover:bg-white/5 transition-all font-bold">
                        <ShoppingBag size={20} />
                        Orders
                    </Link>
                    <Link href="/secure-admin-dashboard/messages" className="flex items-center gap-4 p-4 rounded-2xl bg-brand-primary text-bg-dark font-bold">
                        <Mail size={20} />
                        Messages
                    </Link>
                </nav>

                <button onClick={handleLogout} className="flex items-center gap-4 p-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all font-bold mt-auto">
                    <LogOut size={20} />
                    Logout
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-grow ml-80 p-12">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2 uppercase italic tracking-tighter">Inbox</h1>
                        <p className="text-white/40">Manage your guest inquiries and messages.</p>
                    </div>
                    <div className="relative w-72">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                        <input
                            type="text"
                            placeholder="Search messages..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm text-white focus:outline-none focus:border-brand-primary/50 transition-all"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Message List */}
                    <div className="lg:col-span-5">
                        <div className="glass rounded-[32px] border border-white/5 overflow-hidden">
                            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                                <h2 className="font-bold text-lg text-white">Recent Messages</h2>
                                <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest bg-brand-primary/10 px-3 py-1 rounded-full">
                                    {messages.filter(m => m.status === 'unread').length} New
                                </span>
                            </div>
                            <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
                                {loading ? (
                                    <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-brand-primary" /></div>
                                ) : filteredMessages.length === 0 ? (
                                    <div className="p-20 text-center text-white/20 italic">No messages found</div>
                                ) : (
                                    filteredMessages.map((message) => (
                                        <button
                                            key={message.id}
                                            onClick={() => markAsRead(message)}
                                            className={`w-full text-left p-6 border-b border-white/5 transition-all hover:bg-white/[0.02] flex gap-4 ${selectedMessage?.id === message.id ? 'bg-white/[0.05] border-l-4 border-l-brand-primary' : ''}`}
                                        >
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${message.status === 'unread' ? 'bg-brand-primary text-bg-dark' : 'bg-white/5 text-white/30'}`}>
                                                <User size={20} />
                                            </div>
                                            <div className="min-w-0 flex-grow">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3 className={`font-bold truncate ${message.status === 'unread' ? 'text-white' : 'text-white/60'}`}>{message.name}</h3>
                                                    <span className="text-[10px] text-white/20 font-medium whitespace-nowrap">{new Date(message.created_at).toLocaleDateString()}</span>
                                                </div>
                                                <p className={`text-xs truncate ${message.status === 'unread' ? 'text-brand-primary font-bold' : 'text-white/40'}`}>{message.subject}</p>
                                            </div>
                                            <ChevronRight size={16} className="text-white/10 shrink-0 mt-1" />
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Message Detail */}
                    <div className="lg:col-span-7">
                        {selectedMessage ? (
                            <div className="glass rounded-[32px] border border-white/5 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="p-10 border-b border-white/5 flex justify-between items-start">
                                    <div className="flex gap-6">
                                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-primary">
                                            <User size={32} />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black text-white">{selectedMessage.name}</h2>
                                            <p className="text-brand-primary font-bold text-sm mb-1">{selectedMessage.email}</p>
                                            <div className="flex items-center gap-2 text-[10px] text-white/30 uppercase font-black tracking-widest">
                                                <Clock size={12} /> Received on {new Date(selectedMessage.created_at).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => deleteMessage(selectedMessage.id)}
                                        className="p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                                <div className="p-10 space-y-8">
                                    <div>
                                        <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-4">Subject</h4>
                                        <div className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl text-lg font-bold text-white uppercase italic">
                                            {selectedMessage.subject}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-4">Inquiry Message</h4>
                                        <div className="p-8 bg-white/[0.03] border border-white/5 rounded-3xl text-white/70 leading-relaxed text-lg whitespace-pre-wrap">
                                            {selectedMessage.message}
                                        </div>
                                    </div>
                                    <div className="pt-8">
                                        <a
                                            href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                                            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-brand-primary text-bg-dark font-black uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-primary/20"
                                        >
                                            <Mail size={20} />
                                            Reply via Email
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full min-h-[500px] rounded-[32px] border-2 border-dashed border-white/5 flex flex-col items-center justify-center p-20 text-center opacity-40">
                                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                                    <Mail size={40} className="text-white/20" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">No Message Selected</h3>
                                <p className="text-sm text-white/40">Select an inquiry from the inbox on the left to read its full content.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminMessages;
