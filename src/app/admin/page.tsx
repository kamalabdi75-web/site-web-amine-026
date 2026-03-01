"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('id', { ascending: false });

            if (error) {
                throw error;
            }

            setProducts(data || []);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch products');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this product?")) {
            return;
        }

        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id);

            if (error) {
                throw error;
            }

            // Remove from local state
            setProducts(products.filter(p => p.id !== id));
        } catch (err: any) {
            alert(err.message || 'Failed to delete product');
        }
    };

    return (
        <div className="bg-background-light text-text-main font-display antialiased min-h-screen flex flex-col overflow-hidden">
            <div className="flex h-screen w-full overflow-hidden relative">

                {/* Mobile Menu Backdrop */}
                {isMobileMenuOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <div className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 bg-surface-light border-r border-stone-200 w-72 flex-col h-full flex ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex items-center gap-3 px-6 py-6 border-b border-stone-100">
                        <div className="bg-primary text-white flex items-center justify-center rounded-full size-10 shrink-0 font-black text-xl leading-none">
                            e
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-text-main text-lg font-bold leading-tight tracking-tight">Electro Mart</h1>
                            <p className="text-text-muted text-xs font-normal">Admin Panel</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 p-4 flex-1 overflow-y-auto">
                        <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-muted hover:bg-stone-50 hover:text-primary transition-colors group" href="#">
                            <span className="material-symbols-outlined text-[24px] group-hover:text-primary transition-colors">pie_chart</span>
                            <span className="text-sm font-medium">Dashboard</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-muted hover:bg-stone-50 hover:text-primary transition-colors group" href="#">
                            <span className="material-symbols-outlined text-[24px] group-hover:text-primary transition-colors">shopping_cart</span>
                            <span className="text-sm font-medium">Orders</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary group" href="/admin">
                            <span className="material-symbols-outlined text-[24px] fill-1">inventory_2</span>
                            <span className="text-sm font-medium">Products</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-muted hover:bg-stone-50 hover:text-primary transition-colors group" href="/admin/add-product">
                            <span className="material-symbols-outlined text-[24px] group-hover:text-primary transition-colors">add_box</span>
                            <span className="text-sm font-medium">Add Product</span>
                        </Link>
                        <div className="mt-auto pt-4 border-t border-stone-100">
                            <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-muted hover:bg-stone-50 hover:text-primary transition-colors group" href="#">
                                <span className="material-symbols-outlined text-[24px] group-hover:text-primary transition-colors">settings</span>
                                <span className="text-sm font-medium">Settings</span>
                            </Link>
                        </div>
                    </div>
                    <div className="p-4 border-t border-stone-100">
                        <div className="flex items-center gap-3 px-3 py-2">
                            <div className="size-8 rounded-full bg-stone-200 overflow-hidden bg-cover bg-center" data-alt="Admin User Profile Picture" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAvrDQ5jn3m_dWtWWX5r3UHxSq5UpahWkZ35mGpTVGaqxQPdC5y61KTdjI7AIJH0IMCbDIFeukoTmjB61ZCeJeYbmt6dHHgXWweWSSIVDXEDMVqA2O7OQblQM1phCVNjXZ8jwXIU9SCHUkJq6cJPoMB2lEY_hbMM8lEmQFuBoHsIChpKRLXEr3qdai25jvTXFjjjQj875uCGzJOHMao3vqE1DvFUGRoqdz5AhVBOAj_dKuo9pEZuHm_D4LezgGUExHguCOuN93m6hs')" }}></div>
                            <div className="flex flex-col">
                                <p className="text-sm font-medium text-text-main">Admin User</p>
                                <p className="text-xs text-text-muted">admin@electromart.dz</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col h-full overflow-hidden bg-background-light relative">
                    <div className="lg:hidden flex items-center justify-between p-4 bg-surface-light border-b border-stone-200">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary text-white flex items-center justify-center rounded-full size-8 shrink-0 font-black text-lg leading-none">
                                e
                            </div>
                            <span className="font-bold text-text-main">Electro Mart</span>
                        </div>
                        <button className="text-text-main" onClick={() => setIsMobileMenuOpen(true)}>
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>

                    <main className="flex-1 overflow-y-auto p-4 md:p-8">
                        <div className="max-w-7xl mx-auto flex flex-col gap-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex flex-col gap-1">
                                    <h2 className="text-text-main text-3xl font-black tracking-tight">Products</h2>
                                    <p className="text-text-muted text-base">Manage all products in the catalog.</p>
                                </div>
                                <div className="flex gap-3">
                                    <Link href="/admin/add-product" className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-admin-primary text-white hover:bg-admin-primary-dark text-sm font-bold transition-colors shadow-sm">
                                        <span className="material-symbols-outlined text-[20px]">add</span>
                                        <span>Add Product</span>
                                    </Link>
                                </div>
                            </div>

                            {error && (
                                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-surface-light p-4 rounded-xl border border-stone-200 shadow-sm flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-text-muted mb-1">
                                        <span className="material-symbols-outlined text-[20px]">inventory_2</span>
                                        <span className="text-xs font-semibold uppercase tracking-wider">Total Products</span>
                                    </div>
                                    <p className="text-2xl font-bold text-text-main">{isLoading ? '...' : products.length}</p>
                                </div>
                            </div>

                            <div className="bg-surface-light rounded-xl border border-stone-200 shadow-sm overflow-hidden flex flex-col">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-stone-50 border-b border-stone-200 text-xs uppercase tracking-wider text-text-muted font-semibold">
                                                <th className="px-6 py-4">ID</th>
                                                <th className="px-6 py-4">Product</th>
                                                <th className="px-6 py-4 hidden sm:table-cell">Brand</th>
                                                <th className="px-6 py-4">Price</th>
                                                <th className="px-6 py-4 text-center">Stock</th>
                                                <th className="px-6 py-4 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-stone-100">
                                            {isLoading ? (
                                                <tr>
                                                    <td colSpan={6} className="px-6 py-8 text-center text-text-muted">
                                                        <span className="material-symbols-outlined animate-spin text-[32px]">autorenew</span>
                                                        <p className="mt-2 text-sm">Loading products...</p>
                                                    </td>
                                                </tr>
                                            ) : products.length === 0 ? (
                                                <tr>
                                                    <td colSpan={6} className="px-6 py-8 text-center text-text-muted">
                                                        <p className="text-sm">No products found.</p>
                                                    </td>
                                                </tr>
                                            ) : (
                                                products.map((product) => (
                                                    <tr key={product.id} className="hover:bg-stone-50 transition-colors group">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                                                            #{product.id}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="size-10 rounded-lg bg-stone-100 overflow-hidden flex items-center justify-center shrink-0">
                                                                    {product.image ? (
                                                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                                    ) : (
                                                                        <span className="material-symbols-outlined text-stone-400">image</span>
                                                                    )}
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <span className="text-sm font-medium text-text-main line-clamp-1">{product.name}</span>
                                                                    <span className="text-xs text-text-muted line-clamp-1 max-w-[200px]">{product.description}</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 hidden sm:table-cell whitespace-nowrap text-sm text-text-muted">
                                                            {product.brand || '-'}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex flex-col">
                                                                <span className="text-sm font-bold text-text-main">{product.price.toLocaleString()} DA</span>
                                                                {product.original_price && (
                                                                    <span className="text-xs text-text-muted line-through">{product.original_price.toLocaleString()} DA</span>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-center whitespace-nowrap">
                                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                                {product.stock} in stock
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-right whitespace-nowrap">
                                                            <div className="flex items-center justify-end gap-2">
                                                                <Link href={`/admin/edit-product/${product.id}`} className="text-text-muted hover:text-admin-primary transition-colors p-1.5 rounded hover:bg-stone-100">
                                                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                                                </Link>
                                                                <button onClick={() => handleDelete(product.id)} className="text-text-muted hover:text-red-500 transition-colors p-1.5 rounded hover:bg-stone-100">
                                                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                                                </button>
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
                    </main>
                </div>
            </div>
        </div>
    );
}
