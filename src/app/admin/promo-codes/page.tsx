"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";

interface PromoCode {
    id: string;
    code: string;
    description: string | null;
    discount_type: 'percentage' | 'fixed';
    discount_value: number;
    min_order_amount: number;
    max_uses: number | null;
    uses_count: number;
    is_active: boolean;
    expires_at: string | null;
    created_at: string;
}

const emptyForm = {
    code: "",
    description: "",
    discount_type: "percentage" as "percentage" | "fixed",
    discount_value: 10,
    min_order_amount: 0,
    max_uses: "",
    is_active: true,
    expires_at: "",
};

export default function AdminPromoCodesPage() {
    const [codes, setCodes] = useState<PromoCode[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingCode, setEditingCode] = useState<PromoCode | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const fetchCodes = async () => {
        setIsLoading(true);
        const res = await fetch('/api/admin/promo-codes');
        if (res.ok) {
            const data = await res.json();
            setCodes(data.codes || []);
        }
        setIsLoading(false);
    };

    useEffect(() => { fetchCodes(); }, []);

    const openCreate = () => {
        setEditingCode(null);
        setForm(emptyForm);
        setError("");
        setShowModal(true);
    };

    const openEdit = (c: PromoCode) => {
        setEditingCode(c);
        setForm({
            code: c.code,
            description: c.description || "",
            discount_type: c.discount_type,
            discount_value: c.discount_value,
            min_order_amount: c.min_order_amount,
            max_uses: c.max_uses ? String(c.max_uses) : "",
            is_active: c.is_active,
            expires_at: c.expires_at ? c.expires_at.slice(0, 10) : "",
        });
        setError("");
        setShowModal(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError("");
        try {
            const body = {
                ...form,
                code: form.code.toUpperCase(),
                max_uses: form.max_uses ? Number(form.max_uses) : null,
                expires_at: form.expires_at || null,
                ...(editingCode ? { id: editingCode.id } : {}),
            };
            const res = await fetch('/api/admin/promo-codes', {
                method: editingCode ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const data = await res.json();
            if (!res.ok) { setError(data.error || "Erreur"); return; }
            setShowModal(false);
            fetchCodes();
        } catch { setError("Erreur réseau"); }
        finally { setSaving(false); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Supprimer ce code promo ?")) return;
        await fetch(`/api/admin/promo-codes?id=${id}`, { method: 'DELETE' });
        fetchCodes();
    };

    const toggleActive = async (c: PromoCode) => {
        await fetch('/api/admin/promo-codes', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...c, is_active: !c.is_active }),
        });
        fetchCodes();
    };

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden font-sans">
            <AdminSidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <main className="flex-1 overflow-y-auto w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button className="xl:hidden p-2 -ml-2 text-slate-500" onClick={() => setIsMobileMenuOpen(true)}>
                                <span className="material-symbols-outlined">menu</span>
                            </button>
                            <div>
                                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">Codes Promo</h1>
                                <p className="text-slate-500 dark:text-slate-400">Gérez les codes de réduction pour vos clients.</p>
                            </div>
                        </div>
                        <button
                            onClick={openCreate}
                            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-primary/30 transition-all"
                        >
                            <span className="material-symbols-outlined">add</span>
                            Nouveau code
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                        {[
                            { label: "Total", value: codes.length, icon: "confirmation_number", color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20" },
                            { label: "Actifs", value: codes.filter(c => c.is_active).length, icon: "check_circle", color: "bg-green-50 text-green-600 dark:bg-green-900/20" },
                            { label: "Inactifs", value: codes.filter(c => !c.is_active).length, icon: "cancel", color: "bg-slate-100 text-slate-500 dark:bg-slate-800" },
                            { label: "Utilisations", value: codes.reduce((a, c) => a + c.uses_count, 0), icon: "analytics", color: "bg-orange-50 text-primary dark:bg-orange-900/20" },
                        ].map(s => (
                            <div key={s.label} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 flex items-center gap-3">
                                <div className={`size-10 rounded-xl flex items-center justify-center ${s.color}`}>
                                    <span className="material-symbols-outlined text-[20px]">{s.icon}</span>
                                </div>
                                <div>
                                    <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{s.value}</p>
                                    <p className="text-xs text-slate-500">{s.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Table */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                        {isLoading ? (
                            <div className="flex items-center justify-center py-20 text-slate-400">
                                <span className="material-symbols-outlined animate-spin text-4xl">autorenew</span>
                            </div>
                        ) : codes.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
                                <span className="material-symbols-outlined text-5xl">confirmation_number</span>
                                <p className="font-medium">Aucun code promo. Créez-en un !</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                                            <th className="text-left px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Code</th>
                                            <th className="text-left px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Réduction</th>
                                            <th className="text-left px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">Utilisations</th>
                                            <th className="text-left px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Expiration</th>
                                            <th className="text-center px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Statut</th>
                                            <th className="text-right px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                        {codes.map(c => (
                                            <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                                <td className="px-5 py-4">
                                                    <div>
                                                        <span className="font-black text-slate-900 dark:text-white tracking-widest text-base">{c.code}</span>
                                                        {c.description && <p className="text-xs text-slate-400 mt-0.5">{c.description}</p>}
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4 hidden sm:table-cell">
                                                    <span className="inline-flex items-center gap-1 bg-orange-50 dark:bg-orange-900/20 text-primary font-black px-3 py-1 rounded-full text-sm">
                                                        {c.discount_type === 'percentage' ? `-${c.discount_value}%` : `-${Number(c.discount_value).toLocaleString()} DA`}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 hidden md:table-cell">
                                                    <span className="text-slate-600 dark:text-slate-400">
                                                        {c.uses_count}{c.max_uses ? ` / ${c.max_uses}` : ' / ∞'}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 hidden lg:table-cell text-slate-500 text-xs">
                                                    {c.expires_at ? new Date(c.expires_at).toLocaleDateString('fr-FR') : '—'}
                                                </td>
                                                <td className="px-5 py-4 text-center">
                                                    <button
                                                        onClick={() => toggleActive(c)}
                                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${c.is_active ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                                                    >
                                                        <span className={`inline-block size-4 transform rounded-full bg-white shadow transition-transform ${c.is_active ? 'translate-x-6' : 'translate-x-1'}`} />
                                                    </button>
                                                </td>
                                                <td className="px-5 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button onClick={() => openEdit(c)} className="p-1.5 rounded-lg text-slate-500 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 transition-colors">
                                                            <span className="material-symbols-outlined text-[18px]">edit</span>
                                                        </button>
                                                        <button onClick={() => handleDelete(c.id)} className="p-1.5 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 transition-colors">
                                                            <span className="material-symbols-outlined text-[18px]">delete</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
                    <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg z-10 overflow-hidden">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                {editingCode ? "Modifier le code" : "Nouveau code promo"}
                            </h2>
                            <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-6 flex flex-col gap-5 overflow-y-auto max-h-[75vh]">
                            {error && (
                                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-400 rounded-xl px-4 py-3 text-sm font-medium">
                                    {error}
                                </div>
                            )}

                            {/* Code */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Code promo *</label>
                                <input
                                    required value={form.code}
                                    onChange={e => setForm(f => ({ ...f, code: e.target.value.toUpperCase() }))}
                                    placeholder="EX: PROMO20"
                                    className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl font-mono font-black uppercase tracking-widest focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Description (optionnel)</label>
                                <input
                                    value={form.description}
                                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                    placeholder="Ex: Promo été 2026"
                                    className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                                />
                            </div>

                            {/* Discount type + value */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Type de réduction *</label>
                                    <select
                                        value={form.discount_type}
                                        onChange={e => setForm(f => ({ ...f, discount_type: e.target.value as "percentage" | "fixed" }))}
                                        className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-primary outline-none"
                                    >
                                        <option value="percentage">Pourcentage (%)</option>
                                        <option value="fixed">Montant fixe (DA)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                        Valeur {form.discount_type === 'percentage' ? '(%)' : '(DA)'} *
                                    </label>
                                    <input
                                        required type="number" min="1"
                                        max={form.discount_type === 'percentage' ? 100 : undefined}
                                        value={form.discount_value}
                                        onChange={e => setForm(f => ({ ...f, discount_value: Number(e.target.value) }))}
                                        className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-primary outline-none"
                                    />
                                </div>
                            </div>

                            {/* Min order + max uses */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Montant min. (DA)</label>
                                    <input
                                        type="number" min="0" value={form.min_order_amount}
                                        onChange={e => setForm(f => ({ ...f, min_order_amount: Number(e.target.value) }))}
                                        className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-primary outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Nb. max utilisations</label>
                                    <input
                                        type="number" min="1" value={form.max_uses}
                                        onChange={e => setForm(f => ({ ...f, max_uses: e.target.value }))}
                                        placeholder="Illimité"
                                        className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-primary outline-none"
                                    />
                                </div>
                            </div>

                            {/* Expiry + Status */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Date d'expiration</label>
                                    <input
                                        type="date" value={form.expires_at}
                                        onChange={e => setForm(f => ({ ...f, expires_at: e.target.value }))}
                                        className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-primary outline-none"
                                    />
                                </div>
                                <div className="flex flex-col justify-end">
                                    <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                        <div
                                            onClick={() => setForm(f => ({ ...f, is_active: !f.is_active }))}
                                            className={`relative w-11 h-6 rounded-full transition-colors ${form.is_active ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                                        >
                                            <span className={`absolute top-1 size-4 rounded-full bg-white shadow transition-transform ${form.is_active ? 'translate-x-6' : 'translate-x-1'}`} />
                                        </div>
                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                            {form.is_active ? 'Actif' : 'Inactif'}
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* Save */}
                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
                            >
                                {saving ? <span className="material-symbols-outlined animate-spin">autorenew</span> : <span className="material-symbols-outlined">save</span>}
                                {saving ? "Enregistrement..." : editingCode ? "Sauvegarder" : "Créer le code"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
