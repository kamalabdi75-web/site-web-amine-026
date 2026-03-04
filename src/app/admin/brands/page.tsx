"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AdminMediaUpload from "@/components/AdminMediaUpload";

interface Brand {
    id: string;
    name: string;
    image_url: string;
    order_index: number;
}

interface Settings {
    brand_marquee_height: number;
    brand_marquee_speed: number;
}

export default function AdminBrandsPage() {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [settings, setSettings] = useState<Settings>({ brand_marquee_height: 80, brand_marquee_speed: 30 });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // For the "Add new brand" form
    const [newBrandMedia, setNewBrandMedia] = useState<any[]>([]);
    const [newBrandName, setNewBrandName] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await fetch('/api/admin/settings/brands');
            if (res.ok) {
                const data = await res.json();
                if (data.settings) setSettings(data.settings);
                if (data.brands) setBrands(data.brands);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveSettings = async () => {
        setIsSaving(true);
        try {
            const res = await fetch('/api/admin/settings/brands', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'update_settings',
                    payload: settings
                })
            });
            if (res.ok) {
                alert("Paramètres enregistrés avec succès !");
            } else {
                throw new Error("Failed to save settings");
            }
        } catch (error) {
            console.error(error);
            alert("Erreur lors de l'enregistrement des paramètres.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleAddBrand = async () => {
        if (!newBrandName || newBrandMedia.length === 0) {
            alert("Veuillez entrer un nom et uploader un logo.");
            return;
        }

        setIsSaving(true);
        try {
            const res = await fetch('/api/admin/settings/brands', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'add_brand',
                    payload: {
                        name: newBrandName,
                        image_url: newBrandMedia[0].url,
                        order_index: brands.length
                    }
                })
            });

            if (res.ok) {
                setNewBrandName("");
                setNewBrandMedia([]);
                fetchData(); // Refresh list
            } else {
                throw new Error("Failed to add brand");
            }
        } catch (error) {
            console.error(error);
            alert("Erreur lors de l'ajout de la marque.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteBrand = async (id: string) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cette marque ?")) return;

        try {
            const res = await fetch('/api/admin/settings/brands', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'delete_brand',
                    payload: { id }
                })
            });

            if (res.ok) {
                fetchData();
            } else {
                throw new Error("Failed to delete brand");
            }
        } catch (error) {
            console.error(error);
            alert("Erreur lors de la suppression.");
        }
    };


    if (isLoading) return <div className="p-8 flex justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Gestion des Marques (Marquee)</h1>
                    <p className="text-slate-500 mt-1">Gérez le bandeau défilant des marques sur la page d'accueil.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Settings & Add New */}
                <div className="lg:col-span-1 space-y-8">

                    {/* Settings Panel */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Paramètres du Bandeau</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                    Hauteur du bandeau (px)
                                </label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                    value={settings.brand_marquee_height}
                                    onChange={(e) => setSettings({ ...settings, brand_marquee_height: Number(e.target.value) })}
                                />
                                <p className="text-xs text-slate-500 mt-1">Exemple: 80 pour un petit bandeau, 120 pour un grand.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                    Vitesse de défilement (secondes)
                                </label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                    value={settings.brand_marquee_speed}
                                    onChange={(e) => setSettings({ ...settings, brand_marquee_speed: Number(e.target.value) })}
                                />
                                <p className="text-xs text-slate-500 mt-1">Plus le nombre est grand, plus le défilement est lent (ex: 30).</p>
                            </div>
                            <button
                                onClick={handleSaveSettings}
                                disabled={isSaving}
                                className="w-full bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                {isSaving ? <span className="animate-spin h-5 w-5 border-2 border-white/20 border-t-white rounded-full"></span> : <span className="material-symbols-outlined text-[20px]">save</span>}
                                Enregistrer les paramètres
                            </button>
                        </div>
                    </div>

                    {/* Add Brand Panel */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Ajouter une Marque</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                    Nom de la marque
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Ex: Samsung, LG..."
                                    value={newBrandName}
                                    onChange={(e) => setNewBrandName(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Logo (Image transparente recommandée)
                                </label>
                                {/* Reusing the MediaUpload component */}
                                <AdminMediaUpload
                                    media={newBrandMedia}
                                    onChange={(media: any[]) => {
                                        // Keep only the last uploaded image (max 1 logo)
                                        setNewBrandMedia(media.slice(-1));
                                    }}
                                />
                            </div>

                            <button
                                onClick={handleAddBrand}
                                disabled={isSaving || !newBrandName || newBrandMedia.length === 0}
                                className="w-full bg-primary hover:bg-primary-dark disabled:bg-primary/50 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                {isSaving ? <span className="animate-spin h-5 w-5 border-2 border-white/20 border-t-white rounded-full"></span> : <span className="material-symbols-outlined text-[20px]">add_circle</span>}
                                Ajouter la marque
                            </button>
                        </div>
                    </div>

                </div>

                {/* Right Column: Brands List */}
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Marques actuelles ({brands.length})</h2>
                        </div>

                        {brands.length === 0 ? (
                            <div className="p-12 text-center text-slate-500">
                                <span className="material-symbols-outlined text-4xl mb-2 opacity-50">imagesmode</span>
                                <p>Aucune marque ajoutée pour le moment.</p>
                                <p className="text-sm mt-1">Utilisez le formulaire à gauche pour ajouter vos premiers logos.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-200 dark:divide-slate-700">
                                {brands.map((brand) => (
                                    <div key={brand.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-24 h-16 bg-white border border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-center overflow-hidden p-2 relative">
                                                {/* Use img instead of Next Image for external user uploads without hostname config */}
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={brand.image_url}
                                                    alt={brand.name}
                                                    className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 dark:text-white">{brand.name}</h3>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteBrand(brand.id)}
                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                                            title="Supprimer"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
