"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
    LayoutDashboard,
    Package,
    Tag,
    Plus,
    BarChart3,
    LogOut,
    ShoppingBag,
    CheckCircle2,
    XCircle,
    Clock,
    Eye,
    ExternalLink,
    Loader2,
    Check,
    Mail
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface Order {
    id: string;
    status: 'pending' | 'awaiting_approval' | 'approved' | 'rejected';
    created_at: string;
    payment_method: string;
    screenshot_url?: string;
    user_id: string;
    product_id: string;
    product: any;
}

const AdminOrders = () => {
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'all'>('pending');

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push("/error-404");
                return;
            }
            fetchOrders();
        };
        checkAuth();
    }, [router]);

    const [error, setError] = useState<string | null>(null);
    const [currentUser, setCurrentUser] = useState<any>(null);

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);

        // Debug Session
        const { data: { session } } = await supabase.auth.getSession();
        setCurrentUser(session?.user || null);

        const { data, error: fetchError } = await supabase
            .from('orders')
            .select('*, product:products(*)')
            .order('created_at', { ascending: false });

        console.log('--- ADMIN DEBUG ---');
        console.log('Logged in as:', session?.user?.email);
        console.log('Rows found:', data?.length);
        if (fetchError) console.error('DB Error:', fetchError);

        if (fetchError) {
            setError(fetchError.message);
        } else if (data) {
            setOrders(data);
        }
        setLoading(false);
    };

    const updateOrderStatus = async (orderId: string, status: string) => {
        setActionLoading(orderId);
        const { error } = await supabase
            .from('orders')
            .update({ status })
            .eq('id', orderId);

        if (!error) {
            setOrders(orders.map(o => o.id === orderId ? { ...o, status } as Order : o));
        } else {
            alert("Failed to update status");
        }
        setActionLoading(null);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-bg-dark flex">
            {/* Sidebar (Duplicate from Dashboard for consistency) */}
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
                    <Link href="/secure-admin-dashboard/orders" className="flex items-center gap-4 p-4 rounded-2xl bg-brand-primary text-bg-dark font-bold">
                        <ShoppingBag size={20} />
                        Orders
                    </Link>
                    <Link href="/secure-admin-dashboard/messages" className="flex items-center gap-4 p-4 rounded-2xl text-white/60 hover:text-white hover:bg-white/5 transition-all font-bold">
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
                        <h1 className="text-4xl font-black text-white mb-2 uppercase italic tracking-tighter">Order Requests</h1>
                        <p className="text-white/40">Review and approve digital product purchases.</p>
                        <div className="mt-4 flex gap-4">
                            <span className="text-[10px] font-bold px-3 py-1 bg-white/5 rounded text-white/30 uppercase tracking-widest border border-white/5">
                                User: {currentUser?.email || 'Not Logged In'}
                            </span>
                            <span className="text-[10px] font-bold px-3 py-1 bg-white/5 rounded text-white/30 uppercase tracking-widest border border-white/5">
                                Total: {orders.length} Records
                            </span>
                        </div>
                    </div>
                </div>

                <div className="glass rounded-[32px] border border-white/5 overflow-hidden">
                    {error && (
                        <div className="p-8 bg-red-500/10 border-b border-red-500/20 text-red-400 text-sm font-bold text-center">
                            ⚠️ Error loading orders: {error}
                        </div>
                    )}
                    <div className="p-8 border-b border-white/5 flex justify-between items-center">
                        <div className="flex gap-8">
                            {[
                                { id: 'pending', label: 'Pending Approval' },
                                { id: 'approved', label: 'Approved' },
                                { id: 'all', label: 'All Orders' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`text-sm font-black uppercase tracking-widest pb-2 transition-all border-b-2 ${activeTab === tab.id
                                        ? 'border-brand-primary text-white'
                                        : 'border-transparent text-white/20 hover:text-white/40'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                        <button onClick={fetchOrders} className="text-brand-primary text-xs font-black uppercase tracking-widest hover:underline">Refresh</button>
                    </div>

                    <div className="w-full">
                        <table className="w-full text-left">
                            <thead className="bg-white/[0.02] text-[10px] font-black uppercase tracking-widest text-white/30">
                                <tr>
                                    <th className="px-8 py-4">Order Details</th>
                                    <th className="px-8 py-4">Customer</th>
                                    <th className="px-8 py-4">Status</th>
                                    <th className="px-8 py-4">Proof</th>
                                    <th className="px-8 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-white/80">
                                {loading ? (
                                    <tr><td colSpan={5} className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-brand-primary" /></td></tr>
                                ) : (
                                    orders
                                        .filter(order => {
                                            if (activeTab === 'pending') return order.status === 'awaiting_approval' || order.status === 'pending';
                                            if (activeTab === 'approved') return order.status === 'approved';
                                            return true;
                                        })
                                        .map(order => (
                                            <tr key={order.id} className="hover:bg-white/[0.01] transition-colors group">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/10">
                                                            <Image src={order.product?.thumb_url || "/placeholder.png"} alt="Thumb" fill className="object-cover" />
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-white">{order.product?.title}</div>
                                                            <div className="text-[10px] text-white/30">#{order.id.slice(0, 8)} • {new Date(order.created_at).toLocaleDateString()}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-sm">
                                                    <div className="text-white/60 font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">
                                                        {order.user_id.slice(0, 8)}...
                                                    </div>
                                                    <div className="text-[10px] text-white/20 uppercase font-black">{order.payment_method}</div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${order.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                                                        order.status === 'rejected' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                                                            order.status === 'awaiting_approval' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                                                                'bg-white/5 text-white/30 border border-white/10'
                                                        }`}>
                                                        {order.status.replace('_', ' ')}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    {order.screenshot_url ? (
                                                        <a href={order.screenshot_url} target="_blank" className="flex items-center gap-2 text-brand-primary hover:underline text-xs font-bold">
                                                            <Eye size={14} /> View
                                                        </a>
                                                    ) : (
                                                        <span className="text-white/10 text-xs italic">No proof</span>
                                                    )}
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        {order.status !== 'approved' && (
                                                            <button
                                                                disabled={actionLoading === order.id}
                                                                onClick={() => updateOrderStatus(order.id, 'approved')}
                                                                className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-bg-dark transition-all disabled:opacity-50"
                                                                title="Approve"
                                                            >
                                                                <Check size={18} />
                                                            </button>
                                                        )}
                                                        {order.status !== 'rejected' && (
                                                            <button
                                                                disabled={actionLoading === order.id}
                                                                onClick={() => updateOrderStatus(order.id, 'rejected')}
                                                                className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                                                                title="Reject"
                                                            >
                                                                <XCircle size={18} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;
