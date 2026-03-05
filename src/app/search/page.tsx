"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface Product {
    id: string;
    name: string;
    image: string | null;
    price: number;
    original_price: number | null;
    brand: string | null;
}

function SearchPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("q") || "";

    const [query, setQuery] = useState(initialQuery);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [displayed, setDisplayed] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-focus input on mount
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // Fetch all products once
    useEffect(() => {
        supabase
            .from("products")
            .select("id, name, image, price, original_price, brand")
            .order("created_at", { ascending: false })
            .limit(100)
            .then(({ data }) => {
                setAllProducts(data || []);
                setDisplayed(data || []);
                setLoading(false);
            });
    }, []);

    // Filter locally on query change
    useEffect(() => {
        const q = query.trim().toLowerCase();
        if (!q) {
            setDisplayed(allProducts);
        } else {
            setDisplayed(
                allProducts.filter(p =>
                    p.name.toLowerCase().includes(q) ||
                    (p.brand || "").toLowerCase().includes(q)
                )
            );
        }
    }, [query, allProducts]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/product?search=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col">
            {/* Search Header */}
            <div className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
                <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3">
                    {/* Back button */}
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="p-2 -ml-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors shrink-0"
                        aria-label="Retour"
                    >
                        <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                    </button>

                    {/* Search Input */}
                    <div className="flex-1 flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-full px-4 py-2.5">
                        <span className="material-symbols-outlined text-[#FF6600] text-xl shrink-0">search</span>
                        <input
                            ref={inputRef}
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Rechercher un produit..."
                            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white outline-none placeholder-slate-400"
                            autoComplete="off"
                            type="search"
                        />
                        {query && (
                            <button
                                type="button"
                                onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 shrink-0"
                            >
                                <span className="material-symbols-outlined text-[18px]">close</span>
                            </button>
                        )}
                    </div>
                </form>

                {/* Stats bar */}
                {!loading && (
                    <div className="px-4 pb-2 flex items-center justify-between">
                        <span className="text-xs text-slate-500">
                            {displayed.length} produit{displayed.length !== 1 ? "s" : ""}
                            {query ? ` pour "${query}"` : " disponibles"}
                        </span>
                        <Link
                            href={query ? `/product?search=${encodeURIComponent(query)}` : "/product"}
                            className="text-xs font-bold text-[#FF6600]"
                        >
                            Voir tout →
                        </Link>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4 text-slate-400">
                        <span className="material-symbols-outlined animate-spin text-5xl text-[#FF6600]">autorenew</span>
                        <p className="text-sm font-medium">Chargement des produits...</p>
                    </div>
                ) : displayed.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4 text-slate-400">
                        <span className="material-symbols-outlined text-5xl">search_off</span>
                        <div className="text-center">
                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Aucun résultat</p>
                            <p className="text-xs text-slate-500">Essayez un autre terme de recherche</p>
                        </div>
                        <button
                            onClick={() => setQuery("")}
                            className="mt-2 px-4 py-2 bg-[#FF6600] text-white text-sm font-semibold rounded-full"
                        >
                            Voir tous les produits
                        </button>
                    </div>
                ) : (
                    <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                        {displayed.map(product => (
                            <li key={product.id}>
                                <Link
                                    href={`/product/${product.id}`}
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 active:bg-orange-50 transition-colors"
                                >
                                    {/* Image */}
                                    <div className="size-16 shrink-0 bg-slate-100 dark:bg-slate-700 rounded-xl overflow-hidden flex items-center justify-center p-1">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={product.image || "https://placehold.co/80x80?text=?"}
                                            alt={product.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-2 leading-snug">
                                            {product.name}
                                        </p>
                                        {product.brand && (
                                            <p className="text-xs text-slate-400 mt-0.5">{product.brand}</p>
                                        )}
                                    </div>

                                    {/* Price */}
                                    <div className="text-right shrink-0 ml-2">
                                        <p className="text-sm font-bold text-[#FF6600]">
                                            {Number(product.price).toLocaleString()} DA
                                        </p>
                                        {product.original_price && Number(product.original_price) > Number(product.price) && (
                                            <p className="text-[11px] text-slate-400 line-through">
                                                {Number(product.original_price).toLocaleString()} DA
                                            </p>
                                        )}
                                    </div>

                                    <span className="material-symbols-outlined text-slate-300 text-[18px] shrink-0">chevron_right</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <span className="material-symbols-outlined animate-spin text-4xl text-[#FF6600]">autorenew</span>
            </div>
        }>
            <SearchPageContent />
        </Suspense>
    );
}
