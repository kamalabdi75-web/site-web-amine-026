"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AddProductPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Form states
    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState<any[]>([]);
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState("");
    const [originalPrice, setOriginalPrice] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const [specifications, setSpecifications] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Fetch categories on mount
    useEffect(() => {
        async function fetchCategories() {
            try {
                const { data, error } = await supabase.from("categories").select("*").order("name");
                if (!error && data) {
                    setCategories(data);
                }
            } catch (err) {
                console.error("Failed to fetch categories:", err);
            }
        }
        fetchCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const productData = {
                name,
                category_id: categoryId || null,
                brand,
                price: parseFloat(price),
                original_price: originalPrice ? parseFloat(originalPrice) : null,
                stock: parseInt(stock, 10),
                description,
                image: imageUrl || null
            };

            const { error: supabaseError } = await supabase
                .from('products')
                .insert([productData]);

            if (supabaseError) {
                throw new Error(supabaseError.message);
            }

            setSuccess("Product successfully added!");
            setTimeout(() => {
                window.location.href = '/admin'; // Force full reload to ensure data is fresh
            }, 1000);
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-slate-900 font-display text-slate-900 dark:text-slate-100 antialiased overflow-hidden h-screen flex relative">
            {/* Mobile Menu Backdrop */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 z-20 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            <aside className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col h-full shrink-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="h-16 flex items-center px-6 border-b border-slate-100 dark:border-slate-700">
                    <Link href="/admin" className="flex items-center gap-2 text-primary">
                        <div className="size-8 flex items-center justify-center bg-[#FFF8E6] rounded-full text-primary font-black text-xl">
                            e
                        </div>
                        <h1 className="font-black text-lg tracking-tight text-slate-900 dark:text-white">Electro<span className="text-primary">Admin</span></h1>
                    </Link>
                </div>

                <div className="p-4 flex flex-col gap-6 overflow-y-auto flex-1">
                    <div>
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2 block">Dashboard</span>
                        <nav className="flex flex-col gap-1">
                            <Link className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-primary rounded-lg transition-colors group" href="#">
                                <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">dashboard</span>
                                <span className="text-sm font-medium">Overview</span>
                            </Link>
                            <Link className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-primary rounded-lg transition-colors group" href="#">
                                <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">analytics</span>
                                <span className="text-sm font-medium">Analytics</span>
                            </Link>
                        </nav>
                    </div>

                    <div>
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2 block">Catalog</span>
                        <nav className="flex flex-col gap-1">
                            <Link className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary rounded-lg transition-colors group font-medium" href="/admin/add-product">
                                <span className="material-symbols-outlined text-[20px]">add_box</span>
                                <span className="text-sm">Add Product</span>
                            </Link>
                            <Link className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-primary rounded-lg transition-colors group" href="/admin">
                                <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">inventory_2</span>
                                <span className="text-sm font-medium">Products</span>
                            </Link>
                            <Link className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-primary rounded-lg transition-colors group" href="#">
                                <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">category</span>
                                <span className="text-sm font-medium">Categories</span>
                            </Link>
                        </nav>
                    </div>

                    <div>
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2 block">Orders</span>
                        <nav className="flex flex-col gap-1">
                            <Link className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-primary rounded-lg transition-colors group" href="#">
                                <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">shopping_cart</span>
                                <span className="text-sm font-medium">All Orders</span>
                                <span className="ml-auto bg-primary/10 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded-full">12</span>
                            </Link>
                            <Link className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-primary rounded-lg transition-colors group" href="/admin/shipping">
                                <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">local_shipping</span>
                                <span className="text-sm font-medium">Shipments</span>
                            </Link>
                        </nav>
                    </div>

                    <div>
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2 block">Settings</span>
                        <nav className="flex flex-col gap-1">
                            <Link className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-primary rounded-lg transition-colors group" href="#">
                                <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">settings</span>
                                <span className="text-sm font-medium">General</span>
                            </Link>
                            <Link className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-primary rounded-lg transition-colors group" href="#">
                                <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">group</span>
                                <span className="text-sm font-medium">Users</span>
                            </Link>
                        </nav>
                    </div>
                </div>

                <div className="p-4 border-t border-slate-100 dark:border-slate-700 mt-auto">
                    <button className="flex items-center gap-3 px-3 py-2 w-full text-left text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors group">
                        <span className="material-symbols-outlined text-[20px]">logout</span>
                        <span className="text-sm font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50 dark:bg-slate-900/50">
                <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6 lg:px-8 shrink-0">
                    <div className="flex items-center gap-4">
                        <button className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors" onClick={() => setIsMobileMenuOpen(true)}>
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Add Product</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <span className="absolute top-0 right-0 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
                            <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                                <span className="material-symbols-outlined">notifications</span>
                            </button>
                        </div>
                        <div className="w-px h-8 bg-slate-200 dark:bg-slate-700 mx-1"></div>
                        <div className="flex items-center gap-3">
                            <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                                <img alt="Admin Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQfKpvkjDAvgMspnPXysho_eI53kK0kN0aepzGOVJtUsdV81ZQbn0J8_6qDQ38us-orytTCXDJmJj_5Vzp5B2WsT4KJ3845KE801nMsqTtaz0W3P21OAyDIBBU2W8FttoCVdpKG9Us-C4PWz_B2-wEKl5CmxM6d2k2ml-lwyGCz0MsLQbLq8JlbnN9ODKZVS2WQWvywGpiy2uYsEE4wIbAAX5vd3IDR242c6jnLwPmfVFi2qrENfF7oo0pa3VyGABNmtsbv69G3xo" />
                            </div>
                            <div className="hidden md:block">
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">Admin User</p>
                                <p className="text-xs text-slate-500">Super Admin</p>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6 lg:p-8">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create New Product</h1>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Fill in the details below to add a new product to the catalog.</p>
                            </div>
                            <div className="flex gap-3">
                                <Link href="/admin" className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancel</Link>
                            </div>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                                {success}
                            </div>
                        )}

                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                            <div className="p-6 lg:p-8">
                                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">Basic Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="productName">Product Name <span className="text-red-500">*</span></label>
                                                <input value={name} onChange={(e) => setName(e.target.value)} className="rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-primary focus:border-primary w-full shadow-sm py-2.5" id="productName" placeholder="e.g. Samsung 4K TV" required type="text" />
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="category">Category</label>
                                                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-primary focus:border-primary w-full shadow-sm py-2.5" id="category">
                                                    <option disabled value="">Select Category</option>
                                                    {categories.map(c => (
                                                        <option key={c.id} value={c.id}>{c.name}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="brand">Brand</label>
                                                <input value={brand} onChange={(e) => setBrand(e.target.value)} className="rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-primary focus:border-primary w-full shadow-sm py-2.5" id="brand" list="brands" placeholder="e.g. Samsung" type="text" />
                                                <datalist id="brands">
                                                    <option value="Samsung" />
                                                    <option value="LG" />
                                                    <option value="Sony" />
                                                    <option value="Dyson" />
                                                </datalist>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">Pricing &amp; Inventory</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="price">Price (DA) <span className="text-red-500">*</span></label>
                                                <div className="relative">
                                                    <input value={price} onChange={(e) => setPrice(e.target.value)} className="rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-primary focus:border-primary w-full pl-3 pr-12 shadow-sm py-2.5" id="price" min="0" placeholder="0.00" required step="0.01" type="number" />
                                                    <span className="absolute right-3 top-2.5 text-slate-400 text-xs font-medium">DZD</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="originalPrice">Original Price (DA)</label>
                                                <div className="relative">
                                                    <input value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} className="rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-primary focus:border-primary w-full pl-3 pr-12 shadow-sm py-2.5" id="originalPrice" min="0" placeholder="0.00" step="0.01" type="number" />
                                                    <span className="absolute right-3 top-2.5 text-slate-400 text-xs font-medium">DZD</span>
                                                </div>
                                                <p className="text-[10px] text-slate-400">Set this to show a before-discount price.</p>
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="stock">Stock Quantity <span className="text-red-500">*</span></label>
                                                <input value={stock} onChange={(e) => setStock(e.target.value)} className="rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-primary focus:border-primary w-full shadow-sm py-2.5" id="stock" min="0" placeholder="0" required type="number" />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">Details &amp; Media</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                                            <div className="flex flex-col gap-2 h-full">
                                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="description">Product Description</label>
                                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-primary focus:border-primary w-full shadow-sm resize-none h-full min-h-[160px]" id="description" placeholder="Detailed description of the product functionality and features..." rows={6}></textarea>
                                            </div>

                                            <div className="flex flex-col gap-2 h-full">
                                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="specifications">Specifications</label>
                                                <textarea value={specifications} onChange={(e) => setSpecifications(e.target.value)} className="rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-primary focus:border-primary w-full shadow-sm resize-none h-full min-h-[160px]" id="specifications" placeholder="Key specs (e.g. Dimensions: 50x50x100, Energy Rating: A+++)..." rows={6}></textarea>
                                            </div>

                                            <div className="flex flex-col gap-2 h-full">
                                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="imageUrl">Product Image URL</label>
                                                <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-primary focus:border-primary w-full shadow-sm py-2.5 mb-2" id="imageUrl" placeholder="https://example.com/image.jpg" type="url" />
                                                <div className="flex-1 flex items-center justify-center w-full min-h-[100px] border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 overflow-hidden">
                                                    {imageUrl ? (
                                                        <img src={imageUrl} alt="Preview" className="w-full h-full object-contain" />
                                                    ) : (
                                                        <span className="text-xs text-slate-400">Image Preview</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-end gap-4 pt-6 mt-2 border-t border-slate-100 dark:border-slate-700">
                                        <button className="px-6 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors" type="button" onClick={() => router.push('/admin')}>
                                            Cancel
                                        </button>
                                        <button disabled={isLoading} className="bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-8 rounded-lg shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 disabled:opacity-50 disabled:hover:scale-100" type="submit">
                                            {isLoading ? (
                                                <span className="material-symbols-outlined text-[20px] animate-spin">autorenew</span>
                                            ) : (
                                                <span className="material-symbols-outlined text-[20px]">save</span>
                                            )}
                                            {isLoading ? 'Saving...' : 'Save Product'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <footer className="mt-12 text-center text-xs text-slate-400 pb-4">
                        <p>© 2026 Electro Mart Admin Panel. All rights reserved.</p>
                    </footer>
                </div>
            </main>
        </div>
    );
}
