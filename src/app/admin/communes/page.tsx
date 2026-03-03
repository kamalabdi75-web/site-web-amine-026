"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import { supabase } from "@/lib/supabase";

type Commune = {
    id: string;
    wilaya_name: string;
    commune_name: string;
    shipping_cost: number;
    is_active: boolean;
};

function AdminCommunesContent() {
    const searchParams = useSearchParams();
    const initialWilaya = searchParams.get('wilaya') || "";

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [wilayas, setWilayas] = useState<string[]>([]);
    const [selectedWilaya, setSelectedWilaya] = useState<string>(initialWilaya);
    const [communes, setCommunes] = useState<Commune[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Filters & Search
    const [searchQuery, setSearchQuery] = useState("");
    const [showActive, setShowActive] = useState(true);
    const [showInactive, setShowInactive] = useState(true);

    // Editing State
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editShippingCost, setEditShippingCost] = useState<number>(0);

    // Add New Commune State
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newCommune, setNewCommune] = useState({
        wilaya_name: initialWilaya,
        commune_name: "",
        shipping_cost: 0,
        is_active: true
    });
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        fetchWilayas();
    }, []);

    useEffect(() => {
        if (selectedWilaya) {
            fetchCommunes(selectedWilaya);
            setNewCommune(prev => ({ ...prev, wilaya_name: selectedWilaya }));
        } else if (wilayas.length > 0) {
            setSelectedWilaya(wilayas[0]);
        }
    }, [selectedWilaya, wilayas]);

    const fetchWilayas = async () => {
        const { data, error } = await supabase.from('communes').select('wilaya_name');
        if (error) {
            console.error("Error fetching wilayas:", error);
            return;
        }

        if (data) {
            const uniqueWilayas = Array.from(new Set(data.map(d => d.wilaya_name))).sort();
            setWilayas(uniqueWilayas);
            if (!initialWilaya && uniqueWilayas.length > 0) {
                setSelectedWilaya(uniqueWilayas[0]);
            }
        }
    };

    const fetchCommunes = async (wilaya: string) => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('communes')
            .select('*')
            .eq('wilaya_name', wilaya)
            .order('commune_name');

        if (error) {
            console.error("Error fetching communes:", error);
        } else if (data) {
            setCommunes(data as Commune[]);
        }
        setIsLoading(false);
    };

    const toggleCommuneStatus = async (id: string, currentStatus: boolean) => {
        const newStatus = !currentStatus;

        // Optimistic update
        setCommunes(prev => prev.map(c => c.id === id ? { ...c, is_active: newStatus } : c));

        const { error } = await supabase
            .from('communes')
            .update({ is_active: newStatus })
            .eq('id', id);

        if (error) {
            console.error("Error updating commune status:", error);
            // Revert on error
            setCommunes(prev => prev.map(c => c.id === id ? { ...c, is_active: currentStatus } : c));
        }
    };

    const startEditing = (commune: Commune) => {
        setEditingId(commune.id);
        setEditShippingCost(commune.shipping_cost);
    };

    const saveShippingCost = async (id: string) => {
        const oldCost = communes.find(c => c.id === id)?.shipping_cost;

        // Optimistic update
        setCommunes(prev => prev.map(c => c.id === id ? { ...c, shipping_cost: editShippingCost } : c));
        setEditingId(null);

        const { error } = await supabase
            .from('communes')
            .update({ shipping_cost: editShippingCost })
            .eq('id', id);

        if (error) {
            console.error("Error updating shipping cost:", error);
            // Revert on error
            setCommunes(prev => prev.map(c => c.id === id ? { ...c, shipping_cost: oldCost || 0 } : c));
        }
    };

    const handleAddCommune = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsAdding(true);
        const { data, error } = await supabase
            .from('communes')
            .insert([{
                wilaya_name: newCommune.wilaya_name,
                commune_name: newCommune.commune_name,
                shipping_cost: newCommune.shipping_cost,
                is_active: newCommune.is_active
            }])
            .select();

        if (error) {
            console.error("Error adding commune:", error);
            alert("Failed to add commune. Please try again.");
        } else if (data && data.length > 0) {
            // Update the lists if viewing the same wilaya
            if (newCommune.wilaya_name === selectedWilaya) {
                setCommunes(prev => [...prev, data[0] as Commune].sort((a, b) => a.commune_name.localeCompare(b.commune_name)));
            }
            if (!wilayas.includes(newCommune.wilaya_name)) {
                setWilayas(prev => [...prev, newCommune.wilaya_name].sort());
            }
            setIsAddModalOpen(false);
            setNewCommune({
                wilaya_name: selectedWilaya || "",
                commune_name: "",
                shipping_cost: 0,
                is_active: true
            });
        }
        setIsAdding(false);
    };

    const activeCount = communes.filter(c => c.is_active).length;
    const inactiveCount = communes.length - activeCount;

    const filteredCommunes = communes.filter(c => {
        const matchesSearch = c.commune_name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesActive = (showActive && c.is_active) || (showInactive && !c.is_active);
        return matchesSearch && matchesActive;
    });

    return (
        <div className="bg-background-light font-display h-screen flex overflow-hidden text-text-primary-light">
            <AdminSidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

            <main className="flex-1 flex flex-col min-w-0 bg-background-light overflow-y-auto">
                <header className="h-16 bg-surface-light border-b border-border-light flex items-center justify-between px-6 shrink-0 z-10 sticky top-0">
                    <div className="flex items-center gap-4">
                        <button className="xl:hidden p-2 -ml-2 text-text-secondary-light hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(true)}>
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        <h1 className="text-xl font-bold text-text-primary-light hidden sm:block">Commune specific Management</h1>
                        <h1 className="text-lg font-bold text-text-primary-light sm:hidden">Communes</h1>
                    </div>
                </header>

                <div className="p-6 md:p-8 max-w-[1440px] mx-auto w-full">
                    <nav aria-label="Breadcrumb" className="flex mb-8 text-sm text-text-secondary-light">
                        <ol className="flex items-center space-x-2">
                            <li><Link className="hover:text-primary transition-colors" href="/admin/shipping">Location Management</Link></li>
                            <li><span className="material-symbols-outlined text-[16px]">chevron_right</span></li>
                            <li aria-current="page" className="text-text-primary-light font-medium">{selectedWilaya || 'Loading...'}</li>
                        </ol>
                    </nav>

                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        <aside className="w-full lg:w-72 shrink-0 space-y-6">
                            <div className="bg-surface-light rounded-xl border border-border-light shadow-sm overflow-hidden">
                                <div className="p-5 border-b border-border-light bg-background-light/50">
                                    <h3 className="font-semibold text-text-primary-light flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">map</span>
                                        Current Context
                                    </h3>
                                </div>
                                <div className="p-5 space-y-4">
                                    <div>
                                        <label className="block text-xs font-medium text-text-secondary-light uppercase tracking-wider mb-2">Selected Wilaya</label>
                                        <div className="relative">
                                            <select
                                                value={selectedWilaya}
                                                onChange={(e) => setSelectedWilaya(e.target.value)}
                                                className="w-full rounded-lg bg-background-light border-border-light focus:border-primary focus:ring-primary text-text-primary-light text-sm py-2.5 truncate"
                                            >
                                                {wilayas.map(w => (
                                                    <option key={w} value={w}>{w}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="pt-2 border-t border-border-light">
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-sm text-text-secondary-light">Total Communes</span>
                                            <span className="text-sm font-bold text-text-primary-light">{communes.length}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-sm text-text-secondary-light">Active</span>
                                            <span className="text-sm font-bold text-green-500">{activeCount}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-sm text-text-secondary-light">Inactive</span>
                                            <span className="text-sm font-bold text-text-secondary-light">{inactiveCount}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-primary/5 rounded-xl p-5 border border-primary-light/20">
                                <h4 className="font-semibold text-primary mb-2 text-sm">Did you know?</h4>
                                <p className="text-xs text-text-secondary-light leading-relaxed">
                                    Setting a commune to &quot;Inactive&quot; will prevent customers from selecting it during checkout. Use this for areas currently unreachable by delivery partners.
                                </p>
                            </div>
                        </aside>

                        <div className="flex-1 w-full min-w-0">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                <div>
                                    <h1 className="text-2xl font-bold text-text-primary-light">Commune Management</h1>
                                    <p className="text-text-secondary-light text-sm mt-1">Manage delivery zones and prices for {selectedWilaya}.</p>
                                </div>
                                <button
                                    onClick={() => setIsAddModalOpen(true)}
                                    className="bg-primary hover:bg-primary-dark text-white text-sm font-medium py-2.5 px-5 rounded-lg shadow-lg shadow-primary-light/30 transition-all flex items-center gap-2 disabled:opacity-50"
                                >
                                    <span className="material-symbols-outlined text-[20px]">add</span>
                                    Add New Commune
                                </button>
                            </div>

                            <div className="bg-surface-light rounded-xl border border-border-light shadow-sm p-4 mb-6">
                                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                                    <div className="relative w-full md:w-96">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="material-symbols-outlined text-text-secondary-light text-[20px]">search</span>
                                        </div>
                                        <input
                                            className="block w-full pl-10 pr-3 py-2.5 border border-border-light rounded-lg leading-5 bg-background-light placeholder:text-text-secondary-light focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm text-text-primary-light transition-colors"
                                            placeholder="Search by commune name..."
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                                        <label className="flex items-center gap-2 text-sm text-text-secondary-light whitespace-nowrap cursor-pointer hover:text-primary transition-colors">
                                            <input
                                                checked={showActive}
                                                onChange={(e) => setShowActive(e.target.checked)}
                                                className="rounded border-border-light text-primary focus:ring-primary bg-background-light"
                                                type="checkbox"
                                            />
                                            Show Active
                                        </label>
                                        <label className="flex items-center gap-2 text-sm text-text-secondary-light whitespace-nowrap cursor-pointer hover:text-primary transition-colors">
                                            <input
                                                checked={showInactive}
                                                onChange={(e) => setShowInactive(e.target.checked)}
                                                className="rounded border-border-light text-primary focus:ring-primary bg-background-light"
                                                type="checkbox"
                                            />
                                            Show Inactive
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-surface-light rounded-xl border border-border-light shadow-sm overflow-hidden mb-8">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-border-light">
                                        <thead className="bg-background-light">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary-light uppercase tracking-wider w-16" scope="col">ID</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary-light uppercase tracking-wider" scope="col">Commune Name</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary-light uppercase tracking-wider w-40" scope="col">Shipping Cost</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary-light uppercase tracking-wider w-40" scope="col">Status</th>
                                                <th className="px-6 py-3 text-right text-xs font-semibold text-text-secondary-light uppercase tracking-wider w-32" scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border-light">
                                            {isLoading ? (
                                                <tr>
                                                    <td colSpan={5} className="px-6 py-8 text-center text-text-secondary-light">Loading communes...</td>
                                                </tr>
                                            ) : filteredCommunes.length === 0 ? (
                                                <tr>
                                                    <td colSpan={5} className="px-6 py-8 text-center text-text-secondary-light">No communes match your filters.</td>
                                                </tr>
                                            ) : (
                                                filteredCommunes.map((c, index) => (
                                                    <tr key={c.id} className={`hover:bg-background-light/50 transition-colors group ${!c.is_active ? 'bg-red-50/10' : ''}`}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary-light">#{index + 1}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex flex-col">
                                                                <span className="text-sm font-medium text-text-primary-light">{c.commune_name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {editingId === c.id ? (
                                                                <div className="flex items-center gap-2">
                                                                    <input
                                                                        type="number"
                                                                        value={editShippingCost}
                                                                        onChange={(e) => setEditShippingCost(Number(e.target.value))}
                                                                        className="w-24 px-2 py-1 text-sm border border-primary rounded focus:outline-none focus:ring-1 focus:ring-primary bg-background-light"
                                                                        autoFocus
                                                                    />
                                                                    <span className="text-xs text-text-secondary-light">DA</span>
                                                                </div>
                                                            ) : (
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-sm font-medium bg-background-light text-text-primary-light border border-border-light font-mono">
                                                                    {c.shipping_cost.toLocaleString()} DA
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <label className="relative inline-flex items-center cursor-pointer">
                                                                <input
                                                                    checked={c.is_active}
                                                                    onChange={() => toggleCommuneStatus(c.id, c.is_active)}
                                                                    className="sr-only peer"
                                                                    type="checkbox"
                                                                />
                                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                                                <span className={`ml-3 text-sm font-medium transition-colors ${c.is_active ? 'text-text-primary-light' : 'text-text-secondary-light'}`}>
                                                                    {c.is_active ? 'Active' : 'Inactive'}
                                                                </span>
                                                            </label>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                                            {editingId === c.id ? (
                                                                <div className="flex justify-end gap-2">
                                                                    <button
                                                                        onClick={() => saveShippingCost(c.id)}
                                                                        className="text-white bg-primary hover:bg-primary-dark text-xs px-2 py-1 rounded transition-colors"
                                                                    >
                                                                        Save
                                                                    </button>
                                                                    <button
                                                                        onClick={() => setEditingId(null)}
                                                                        className="text-text-secondary-light hover:text-text-primary-light text-xs px-2 py-1 rounded border border-border-light bg-background-light transition-colors"
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <button
                                                                    onClick={() => startEditing(c)}
                                                                    className="text-primary hover:text-primary-dark font-medium inline-flex items-center gap-1 transition-colors bg-primary/0 hover:bg-primary-light/20 px-2 py-1 rounded"
                                                                >
                                                                    <span className="material-symbols-outlined text-[16px]">edit</span>
                                                                    Edit Cost
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="bg-background-light px-4 py-3 flex items-center justify-between border-t border-border-light sm:px-6">
                                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-sm text-text-secondary-light">
                                                Showing <span className="font-medium text-text-primary-light">{Math.min(1, filteredCommunes.length)}</span> to <span className="font-medium text-text-primary-light">{filteredCommunes.length}</span> of <span className="font-medium text-text-primary-light">{filteredCommunes.length}</span> results
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {isAddModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <div className="bg-background-light rounded-xl shadow-xl w-full max-w-md border border-border-light overflow-hidden flex flex-col">
                            <div className="p-6 border-b border-border-light flex items-center justify-between bg-surface-light">
                                <h3 className="text-xl font-bold text-text-primary-light">Add New Commune</h3>
                                <button onClick={() => setIsAddModalOpen(false)} className="text-text-secondary-light hover:text-text-primary-light transition-colors p-1">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                            <form onSubmit={handleAddCommune} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-text-secondary-light mb-1">Wilaya Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={newCommune.wilaya_name}
                                        onChange={(e) => setNewCommune({ ...newCommune, wilaya_name: e.target.value })}
                                        className="w-full px-3 py-2 border border-border-light rounded-lg focus:ring-1 focus:ring-primary focus:border-primary bg-background-light text-text-primary-light"
                                        placeholder="e.g. Alger"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-secondary-light mb-1">Commune Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={newCommune.commune_name}
                                        onChange={(e) => setNewCommune({ ...newCommune, commune_name: e.target.value })}
                                        className="w-full px-3 py-2 border border-border-light rounded-lg focus:ring-1 focus:ring-primary focus:border-primary bg-background-light text-text-primary-light"
                                        placeholder="e.g. Alger Centre"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-secondary-light mb-1">Shipping Cost (DA)</label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        value={newCommune.shipping_cost}
                                        onChange={(e) => setNewCommune({ ...newCommune, shipping_cost: Number(e.target.value) })}
                                        className="w-full px-3 py-2 border border-border-light rounded-lg focus:ring-1 focus:ring-primary focus:border-primary bg-background-light text-text-primary-light"
                                    />
                                </div>
                                <div className="flex items-center gap-2 pt-2">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            checked={newCommune.is_active}
                                            onChange={(e) => setNewCommune({ ...newCommune, is_active: e.target.checked })}
                                            className="sr-only peer"
                                            type="checkbox"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                        <span className="ml-3 text-sm font-medium text-text-primary-light">
                                            Active (Available for delivery)
                                        </span>
                                    </label>
                                </div>
                                <div className="pt-6 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="flex-1 px-4 py-2 border border-border-light text-text-primary-light rounded-lg hover:bg-surface-light transition-colors font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isAdding}
                                        className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium disabled:opacity-50 flex justify-center items-center"
                                    >
                                        {isAdding ? <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span> : null}
                                        {isAdding ? "Adding..." : "Add Commune"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default function AdminCommunesPage() {
    return (
        <Suspense fallback={<div className="h-screen flex items-center justify-center bg-background-light text-text-primary-light">Loading Communes...</div>}>
            <AdminCommunesContent />
        </Suspense>
    );
}
