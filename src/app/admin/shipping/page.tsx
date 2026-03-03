"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { supabase } from "@/lib/supabase";

type Commune = {
    id: string;
    wilaya_name: string;
    commune_name: string;
    shipping_cost: number;
    is_active: boolean;
};

type WilayaStats = {
    wilaya_name: string;
    total_communes: number;
    active_communes: number;
    avg_shipping: number;
    min_shipping: number;
    max_shipping: number;
};

const DZ_WILAYAS = [
    "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra", "Béchar", "Blida", "Bouira",
    "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", "Tizi Ouzou", "Alger", "Djelfa", "Jijel", "Sétif", "Saïda",
    "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma", "Constantine", "Médéa", "Mostaganem", "M'Sila", "Mascara", "Ouargla",
    "Oran", "El Bayadh", "Illizi", "Bordj Bou Arreridj", "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt", "El Oued", "Khenchela",
    "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent", "Ghardaïa", "Relizane", "Timimoun", "Bordj Badji Mokhtar",
    "Ouled Djellal", "Béni Abbès", "In Salah", "In Guezzam", "Touggourt", "Djanet", "El M'Ghair", "El Meniaa"
];

export default function AdminShippingPage() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [stats, setStats] = useState<WilayaStats[]>([]);
    const [totalCommunes, setTotalCommunes] = useState(0);
    const [activeCommunesCount, setActiveCommunesCount] = useState(0);
    const [globalAvgShipping, setGlobalAvgShipping] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // Add Wilaya Modal State
    const [showAddWilayaModal, setShowAddWilayaModal] = useState(false);
    const [newWilayaName, setNewWilayaName] = useState(DZ_WILAYAS[0]);
    const [newWilayaCommune, setNewWilayaCommune] = useState("");
    const [newWilayaShippingCost, setNewWilayaShippingCost] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchCommunes();
    }, []);

    const fetchCommunes = async () => {
        setIsLoading(true);
        const { data, error } = await supabase.from('communes').select('*');
        if (error) {
            console.error("Error fetching communes:", error);
            setIsLoading(false);
            return;
        }

        if (data) {
            const communes = data as Commune[];
            setTotalCommunes(communes.length);

            let totalActive = 0;
            let totalShipping = 0;
            let shippingCount = 0;

            const wilayaMap = new Map<string, WilayaStats>();

            communes.forEach(c => {
                if (c.is_active) totalActive++;
                if (c.shipping_cost > 0) {
                    totalShipping += c.shipping_cost;
                    shippingCount++;
                }

                if (!wilayaMap.has(c.wilaya_name)) {
                    wilayaMap.set(c.wilaya_name, {
                        wilaya_name: c.wilaya_name,
                        total_communes: 0,
                        active_communes: 0,
                        avg_shipping: 0,
                        min_shipping: Infinity,
                        max_shipping: 0
                    });
                }

                const w = wilayaMap.get(c.wilaya_name)!;
                w.total_communes++;
                if (c.is_active) w.active_communes++;

                if (c.shipping_cost > 0) {
                    w.avg_shipping += c.shipping_cost;
                    if (c.shipping_cost < w.min_shipping) w.min_shipping = c.shipping_cost;
                    if (c.shipping_cost > w.max_shipping) w.max_shipping = c.shipping_cost;
                } else if (c.shipping_cost === 0 && w.min_shipping === Infinity) {
                    w.min_shipping = 0;
                }
            });

            const statsArray = Array.from(wilayaMap.values()).map(w => {
                // Calculate true average
                const activeOrPriced = Math.max(1, w.active_communes); // rough heuristic, ideally average over priced
                return {
                    ...w,
                    avg_shipping: w.avg_shipping > 0 ? Math.round(w.avg_shipping / w.active_communes) : 0,
                    min_shipping: w.min_shipping === Infinity ? 0 : w.min_shipping
                }
            }).sort((a, b) => a.wilaya_name.localeCompare(b.wilaya_name));

            setStats(statsArray);
            setActiveCommunesCount(totalActive);
            setGlobalAvgShipping(shippingCount > 0 ? Math.round(totalShipping / shippingCount) : 0);
        }
        setIsLoading(false);
    };

    const filteredStats = stats.filter(w => w.wilaya_name.toLowerCase().includes(searchQuery.toLowerCase()));

    // Attempt to extract a code from the name if there's a prefix, else assign an increment
    const getPrefixCode = (name: string, index: number) => {
        return (index + 1).toString().padStart(2, '0');
    };

    const handleAddWilaya = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newWilayaName || !newWilayaCommune || !newWilayaShippingCost) {
            alert("Veuillez remplir tous les champs obligatoires.");
            return;
        }

        setIsSaving(true);
        try {
            // Check if Wilaya already exists to prevent pure duplicates if desired, 
            // but since communes are the unique rows, we just insert the new commune for it.
            const cost = parseFloat(newWilayaShippingCost);

            const { error } = await supabase.from('communes').insert([{
                wilaya_name: newWilayaName.trim(),
                commune_name: newWilayaCommune.trim(),
                shipping_cost: cost,
                is_active: true
            }]);

            if (error) {
                console.error("Error adding Wilaya/Commune:", error);
                alert("Échec de l'ajout de la wilaya. " + error.message);
            } else {
                setShowAddWilayaModal(false);
                setNewWilayaName(DZ_WILAYAS[0]);
                setNewWilayaCommune("");
                setNewWilayaShippingCost("");
                fetchCommunes(); // Refresh the list
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            alert("Une erreur inattendue s'est produite.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="bg-background-light font-display h-screen flex overflow-hidden text-text-primary-light">
            <AdminSidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

            <main className="flex-1 flex flex-col min-w-0 bg-background-light">
                <header className="h-16 bg-surface-light border-b border-border-light flex items-center justify-between px-6 shrink-0 z-10">
                    <div className="flex items-center gap-4">
                        <button className="xl:hidden p-2 -ml-2 text-text-secondary-light hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(true)}>
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        <h1 className="text-xl font-bold text-text-primary-light hidden sm:block">Gestion des emplacements et livraisons</h1>
                        <h1 className="text-lg font-bold text-text-primary-light sm:hidden">Livraisons</h1>
                        <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light/10 text-primary border border-primary-light/20">{stats.length} Wilayas actives</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-text-secondary-light hover:text-primary transition-colors relative">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-surface-light"></span>
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-auto p-6 md:p-8">
                    <div className="max-w-7xl mx-auto space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="relative w-full sm:w-80">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light">search</span>
                                <input
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border-light bg-surface-light text-text-primary-light focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-text-secondary-light/70 text-sm"
                                    placeholder="Rechercher une wilaya..."
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-2 sm:flex gap-3 w-full sm:w-auto">
                                <button className="w-full sm:w-auto flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-3 sm:py-2.5 bg-surface-light border border-border-light rounded-lg text-text-primary-light hover:bg-background-light font-medium text-xs sm:text-sm text-center transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">upload_file</span>
                                    <span>Import massif<br className="sm:hidden" />(CSV)</span>
                                </button>
                                <button onClick={() => setShowAddWilayaModal(true)} className="w-full sm:w-auto flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-3 sm:py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark font-medium text-xs sm:text-sm text-center shadow-sm transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">add</span>
                                    <span>Ajouter une wilaya</span>
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-surface-light p-4 rounded-xl border border-border-light shadow-sm">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                        <span className="material-symbols-outlined text-[20px]">map</span>
                                    </div>
                                    <span className="text-sm font-medium text-text-secondary-light">Total des zones</span>
                                </div>
                                <p className="text-2xl font-bold text-text-primary-light">{stats.length}</p>
                            </div>

                            <div className="bg-surface-light p-4 rounded-xl border border-border-light shadow-sm">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                                        <span className="material-symbols-outlined text-[20px]">apartment</span>
                                    </div>
                                    <span className="text-sm font-medium text-text-secondary-light">Communes</span>
                                </div>
                                <p className="text-2xl font-bold text-text-primary-light">{totalCommunes.toLocaleString()}</p>
                            </div>

                            <div className="bg-surface-light p-4 rounded-xl border border-border-light shadow-sm">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                                        <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                                    </div>
                                    <span className="text-sm font-medium text-text-secondary-light">Frais moyens</span>
                                </div>
                                <p className="text-2xl font-bold text-text-primary-light">{globalAvgShipping.toLocaleString()} DA</p>
                            </div>

                            <div className="bg-surface-light p-4 rounded-xl border border-border-light shadow-sm">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                                        <span className="material-symbols-outlined text-[20px]">toggle_on</span>
                                    </div>
                                    <span className="text-sm font-medium text-text-secondary-light">Couverture active</span>
                                </div>
                                <p className="text-2xl font-bold text-text-primary-light">
                                    {totalCommunes > 0 ? Math.round((activeCommunesCount / totalCommunes) * 100) : 0}%
                                </p>
                            </div>
                        </div>

                        <div className="bg-surface-light rounded-xl border border-border-light shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-background-light border-b border-border-light">
                                            <th className="px-6 py-4 text-xs font-semibold text-text-secondary-light uppercase tracking-wider w-24">Code</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-text-secondary-light uppercase tracking-wider">Nom de la wilaya</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-text-secondary-light uppercase tracking-wider">Frais de livraison</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-text-secondary-light uppercase tracking-wider">Couverture</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-text-secondary-light uppercase tracking-wider w-32">Statut</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-text-secondary-light uppercase tracking-wider text-right w-48">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border-light">
                                        {isLoading ? (
                                            <tr>
                                                <td colSpan={6} className="px-6 py-8 text-center text-text-secondary-light">Chargement des zones de livraison...</td>
                                            </tr>
                                        ) : filteredStats.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="px-6 py-8 text-center text-text-secondary-light">Aucun emplacement trouvé.</td>
                                            </tr>
                                        ) : (
                                            filteredStats.map((stat, index) => (
                                                <tr key={stat.wilaya_name} className="hover:bg-background-light transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center justify-center size-8 rounded bg-gray-100 text-sm font-bold text-text-primary-light">
                                                            {getPrefixCode(stat.wilaya_name, index)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="font-medium text-text-primary-light">{stat.wilaya_name}</div>
                                                        <div className="text-xs text-text-secondary-light">
                                                            {stat.active_communes} / {stat.total_communes} communes actives
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="font-medium text-text-primary-light">
                                                            {stat.min_shipping === stat.max_shipping
                                                                ? `${stat.min_shipping.toLocaleString()} DA`
                                                                : `${stat.min_shipping.toLocaleString()} - ${stat.max_shipping.toLocaleString()} DA`
                                                            }
                                                        </div>
                                                        <div className="text-xs text-text-secondary-light">Moyenne: {stat.avg_shipping.toLocaleString()} DA</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="w-full bg-border-light rounded-full h-2.5 max-w-[100px]">
                                                            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${Math.round((stat.active_communes / Math.max(1, stat.total_communes)) * 100)}%` }}></div>
                                                        </div>
                                                        <div className="text-xs text-text-secondary-light mt-1">
                                                            {Math.round((stat.active_communes / Math.max(1, stat.total_communes)) * 100)}%
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input checked={stat.active_communes > 0} readOnly className="sr-only peer" type="checkbox" />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                                        </label>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <Link href={`/admin/communes?wilaya=${encodeURIComponent(stat.wilaya_name)}`} className="p-2 rounded-lg text-text-secondary-light hover:text-primary hover:bg-primary-light/10 transition-colors" title="Voir les communes">
                                                                <span className="material-symbols-outlined text-[20px]">list_alt</span>
                                                            </Link>
                                                            <Link href={`/admin/communes?wilaya=${encodeURIComponent(stat.wilaya_name)}`} className="p-2 rounded-lg text-text-secondary-light hover:text-primary hover:bg-primary-light/10 transition-colors" title="Modifier les paramètres">
                                                                <span className="material-symbols-outlined text-[20px]">edit</span>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="px-6 py-4 border-t border-border-light flex items-center justify-between">
                                <span className="text-sm text-text-secondary-light">
                                    Affichage de <span className="font-medium text-text-primary-light">{Math.min(1, filteredStats.length)}-{filteredStats.length}</span> sur <span className="font-medium text-text-primary-light">{filteredStats.length}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Add Wilaya Modal */}
            {showAddWilayaModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-surface-light rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-5 border-b border-border-light flex items-center justify-between">
                            <h3 className="font-bold text-lg text-text-primary-light">Ajouter une nouvelle wilaya</h3>
                            <button onClick={() => setShowAddWilayaModal(false)} className="text-text-secondary-light hover:text-text-primary-light transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleAddWilaya} className="p-5">
                            <p className="text-sm text-text-secondary-light mb-4">
                                Cela créera une nouvelle wilaya en ajoutant sa première commune. Vous pourrez ajouter d'autres communes plus tard.
                            </p>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-text-primary-light mb-1">Nom de la wilaya <span className="text-red-500">*</span></label>
                                    <select
                                        required
                                        value={newWilayaName}
                                        onChange={(e) => setNewWilayaName(e.target.value)}
                                        className="w-full rounded-lg border-border-light bg-background-light text-text-primary-light text-sm focus:ring-primary focus:border-primary p-2.5"
                                    >
                                        {DZ_WILAYAS.map((wilaya) => (
                                            <option key={wilaya} value={wilaya}>{wilaya}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-text-primary-light mb-1">Nom de la première commune <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        required
                                        value={newWilayaCommune}
                                        onChange={(e) => setNewWilayaCommune(e.target.value)}
                                        className="w-full rounded-lg border-border-light bg-background-light text-text-primary-light text-sm focus:ring-primary focus:border-primary p-2.5"
                                        placeholder="ex. Alger Centre"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-text-primary-light mb-1">Frais de livraison (DA) <span className="text-red-500">*</span></label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        required
                                        value={newWilayaShippingCost}
                                        onChange={(e) => setNewWilayaShippingCost(e.target.value)}
                                        className="w-full rounded-lg border-border-light bg-background-light text-text-primary-light text-sm focus:ring-primary focus:border-primary p-2.5"
                                        placeholder="ex. 500"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 mt-8">
                                <button type="button" onClick={() => setShowAddWilayaModal(false)} className="px-4 py-2 border border-border-light rounded-lg text-text-primary-light text-sm font-semibold hover:bg-background-light transition-colors">
                                    Annuler
                                </button>
                                <button type="submit" disabled={isSaving} className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg shadow-sm transition-all flex items-center gap-2 disabled:opacity-50">
                                    {isSaving ? 'Création...' : 'Créer la wilaya'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
