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

    useEffect(() => {
        setTimeout(() => inputRef.current?.focus(), 150);
    }, []);

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

    const discount = (p: Product) =>
        p.original_price && Number(p.original_price) > Number(p.price)
            ? Math.round((1 - Number(p.price) / Number(p.original_price)) * 100)
            : null;

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">

            {/* ── TOP BAR ── */}
            <div className="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow-md">
                {/* Search input row */}
                <form onSubmit={handleSubmit} className="flex items-center gap-3 px-3 py-3">
                    {/* Back */}
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
                    >
                        <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                    </button>

                    {/* Input wrapper */}
                    <div className="flex-1 flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 h-12 border-2 border-transparent focus-within:border-[#FF6600] transition-colors">
                        <span className="material-symbols-outlined text-[#FF6600] text-xl shrink-0">search</span>
                        <input
                            ref={inputRef}
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Rechercher un produit..."
                            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white outline-none placeholder-slate-400 font-medium"
                            autoComplete="off"
                            type="search"
                        />
                        {query && (
                            <button
                                type="button"
                                onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                                className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-slate-300 dark:bg-slate-600 text-slate-600 dark:text-slate-300"
                            >
                                <span className="material-symbols-outlined text-[14px]">close</span>
                            </button>
                        )}
                    </div>
                </form>

                {/* Stats strip */}
                {!loading && (
                    <div className="px-4 pb-2.5 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <span className="inline-flex items-center justify-center size-5 bg-[#FF6600] rounded-full text-white shrink-0">
                                <span className="material-symbols-outlined text-[12px]">
                                    {query ? "filter_list" : "inventory_2"}
                                </span>
                            </span>
                            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                                {displayed.length} produit{displayed.length !== 1 ? "s" : ""}
                                {query ? <> pour <span className="text-[#FF6600]">"{query}"</span></> : " disponibles"}
                            </span>
                        </div>
                        <Link
                            href={query ? `/product?search=${encodeURIComponent(query)}` : "/product"}
                            className="flex items-center gap-1 text-xs font-bold text-[#FF6600] hover:underline"
                        >
                            Voir tout
                            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </Link>
                    </div>
                )}
            </div>

            {/* ── CONTENT ── */}
            <div className="flex-1 overflow-y-auto px-3 py-4">
                {loading ? (
                    /* Skeleton */
                    <div className="grid grid-cols-2 gap-3">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden animate-pulse">
                                <div className="bg-slate-200 dark:bg-slate-700 h-36 w-full" />
                                <div className="p-3 space-y-2">
                                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full w-4/5" />
                                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full w-2/5" />
                                    <div className="h-4 bg-orange-200 dark:bg-orange-900/40 rounded-full w-1/2 mt-1" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : displayed.length === 0 ? (
                    /* Empty state */
                    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                        <div className="size-20 bg-orange-50 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-4xl text-[#FF6600]">search_off</span>
                        </div>
                        <div>
                            <p className="text-base font-bold text-slate-800 dark:text-white mb-1">Aucun résultat</p>
                            <p className="text-sm text-slate-500">Essayez un autre terme</p>
                        </div>
                        <button
                            onClick={() => setQuery("")}
                            className="mt-1 px-6 py-2.5 bg-[#FF6600] text-white text-sm font-bold rounded-full shadow-lg shadow-orange-200 dark:shadow-orange-900/40 hover:bg-orange-600 transition-colors"
                        >
                            Voir tous les produits
                        </button>
                    </div>
                ) : (
                    /* Products grid */
                    <div className="grid grid-cols-2 gap-3">
                        {displayed.map(product => {
                            const disc = discount(product);
                            return (
                                <Link
                                    key={product.id}
                                    href={`/product/${product.id}`}
                                    className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md active:scale-[0.98] transition-all flex flex-col"
                                >
                                    {/* Image */}
                                    <div className="relative bg-slate-50 dark:bg-slate-700 h-36 flex items-center justify-center p-3 overflow-hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={product.image || "https://placehold.co/200x200?text=?"}
                                            alt={product.name}
                                            className="max-h-full max-w-full object-contain transition-transform group-hover:scale-105"
                                        />
                                        {/* Discount badge */}
                                        {disc && (
                                            <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
                                                -{disc}%
                                            </span>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="p-3 flex flex-col flex-1 gap-1">
                                        <p className="text-[12px] font-semibold text-slate-800 dark:text-white line-clamp-2 leading-snug flex-1">
                                            {product.name}
                                        </p>
                                        {product.brand && (
                                            <p className="text-[10px] text-slate-400 font-medium">{product.brand}</p>
                                        )}
                                        <div className="mt-auto pt-1">
                                            <p className="text-sm font-black text-[#FF6600]">
                                                {Number(product.price).toLocaleString()} <span className="text-[10px] font-bold">DA</span>
                                            </p>
                                            {disc && product.original_price && (
                                                <p className="text-[10px] text-slate-400 line-through">
                                                    {Number(product.original_price).toLocaleString()} DA
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
                <div className="flex flex-col items-center gap-3">
                    <span className="material-symbols-outlined animate-spin text-5xl text-[#FF6600]">autorenew</span>
                    <p className="text-sm text-slate-500 font-medium">Chargement...</p>
                </div>
            </div>
        }>
            <SearchPageContent />
        </Suspense>
    );
}
