"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface Product {
    id: string;
    name: string;
    image: string;
    price: number;
    original_price: number | null;
    brand: string | null;
}

interface SearchBarProps {
    autoFocus?: boolean;
    showAllOnOpen?: boolean; // load all products immediately when opened
    onSearch?: () => void;
}

export default function SearchBar({ autoFocus = false, showAllOnOpen = false, onSearch }: SearchBarProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(showAllOnOpen);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-focus
    useEffect(() => {
        if (autoFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [autoFocus]);

    // Load all products on open (mobile mode)
    useEffect(() => {
        if (!showAllOnOpen) return;
        const fetchAll = async () => {
            setIsSearching(true);
            try {
                const { data } = await supabase
                    .from("products")
                    .select("id, name, image, price, original_price, brand")
                    .order("created_at", { ascending: false })
                    .limit(50);
                setAllProducts(data || []);
                setSearchResults(data || []);
            } catch (e) {
                console.error("Fetch all products error:", e);
            } finally {
                setIsSearching(false);
            }
        };
        fetchAll();
    }, [showAllOnOpen]);

    // Close results when clicking outside (desktop mode only)
    useEffect(() => {
        if (showAllOnOpen) return;
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showAllOnOpen]);

    // Debounced search - filter allProducts on mobile, query on desktop
    useEffect(() => {
        const q = searchQuery.trim();

        if (showAllOnOpen) {
            // Mobile: filter already-loaded products
            if (!q) {
                setSearchResults(allProducts);
                setShowResults(true);
            } else {
                const filtered = allProducts.filter(p =>
                    p.name.toLowerCase().includes(q.toLowerCase()) ||
                    (p.brand || "").toLowerCase().includes(q.toLowerCase())
                );
                setSearchResults(filtered);
                setShowResults(true);
            }
            return;
        }

        // Desktop: query server
        if (!q || q.length < 2) {
            setSearchResults([]);
            setShowResults(false);
            return;
        }

        let isMounted = true;
        const timeout = setTimeout(async () => {
            setIsSearching(true);
            try {
                const { data } = await supabase
                    .from("products")
                    .select("id, name, image, price, original_price, brand")
                    .ilike("name", `%${q}%`)
                    .limit(6);
                if (isMounted) {
                    setSearchResults(data || []);
                    setShowResults(true);
                }
            } catch (e) {
                console.error("Search error:", e);
            } finally {
                if (isMounted) setIsSearching(false);
            }
        }, 300);

        return () => {
            isMounted = false;
            clearTimeout(timeout);
        };
    }, [searchQuery, allProducts, showAllOnOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const q = searchQuery.trim();
        const url = q ? `/product?search=${encodeURIComponent(q)}` : "/product";
        window.location.href = url;
        setShowResults(false);
        onSearch?.();
    };

    const handleResultClick = () => {
        setShowResults(false);
        onSearch?.();
    };

    return (
        <div ref={wrapperRef} className="relative w-full">
            {/* Input */}
            <form onSubmit={handleSubmit} className="relative flex items-center w-full h-11 rounded-full focus-within:ring-2 focus-within:ring-primary/50 overflow-hidden bg-slate-100 dark:bg-slate-800 border border-transparent hover:border-primary/30 transition-colors z-20">
                <button type="submit" className="grid place-items-center h-full w-12 text-primary hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shrink-0">
                    <span className="material-symbols-outlined text-[20px]">search</span>
                </button>
                <input
                    ref={inputRef}
                    name="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => { if (!showAllOnOpen && searchQuery.trim().length >= 2) setShowResults(true); }}
                    autoComplete="off"
                    className="h-full w-full outline-none text-sm text-slate-700 dark:text-slate-200 pr-2 bg-transparent placeholder-slate-500"
                    placeholder={showAllOnOpen ? "Rechercher un produit..." : "Rechercher un produit, une marque..."}
                    type="search"
                />
                {searchQuery && (
                    <button
                        type="button"
                        onClick={() => {
                            setSearchQuery("");
                            if (showAllOnOpen) setSearchResults(allProducts);
                            inputRef.current?.focus();
                        }}
                        className="mr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors shrink-0"
                    >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                )}
            </form>

            {/* Results Dropdown */}
            {showResults && (
                <div className={`${showAllOnOpen ? 'relative mt-3' : 'absolute top-full left-0 right-0 mt-2 shadow-xl rounded-xl border border-slate-100 dark:border-slate-700 z-50'} bg-white dark:bg-slate-800 overflow-hidden flex flex-col max-h-[60vh]`}>
                    {isSearching ? (
                        <div className="p-8 flex flex-col items-center justify-center text-slate-400 gap-3">
                            <span className="material-symbols-outlined animate-spin text-3xl">autorenew</span>
                            <p className="text-sm">Chargement des produits...</p>
                        </div>
                    ) : searchResults.length > 0 ? (
                        <>
                            {/* Header */}
                            {showAllOnOpen && (
                                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                        {searchQuery ? `${searchResults.length} résultat(s) pour "${searchQuery}"` : `${searchResults.length} produits`}
                                    </span>
                                    <Link
                                        href={searchQuery ? `/product?search=${encodeURIComponent(searchQuery)}` : "/product"}
                                        onClick={handleResultClick}
                                        className="text-xs font-bold text-primary hover:underline"
                                    >
                                        Voir tout →
                                    </Link>
                                </div>
                            )}

                            <div className="overflow-y-auto">
                                {searchResults.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/product/${product.id}`}
                                        onClick={handleResultClick}
                                        className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 active:bg-slate-100 transition-colors border-b border-slate-100 dark:border-slate-700/50 last:border-0"
                                    >
                                        <div className="size-12 shrink-0 bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center p-1">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={product.image || "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=100&auto=format"}
                                                alt={product.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{product.name}</p>
                                            {product.brand && <p className="text-xs text-slate-400 truncate">{product.brand}</p>}
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="text-sm font-bold text-primary">{Number(product.price).toLocaleString()} DA</p>
                                            {product.original_price && Number(product.original_price) > Number(product.price) && (
                                                <p className="text-[10px] text-slate-400 line-through">{Number(product.original_price).toLocaleString()} DA</p>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Footer link */}
                            {!showAllOnOpen && (
                                <div className="p-2 border-t border-slate-100 dark:border-slate-700/50">
                                    <Link
                                        href={`/product?search=${encodeURIComponent(searchQuery.trim())}`}
                                        onClick={handleResultClick}
                                        className="block p-2 text-center text-sm font-semibold text-primary hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                                    >
                                        Voir tous les résultats pour &quot;{searchQuery}&quot;
                                    </Link>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="p-8 text-center text-sm text-slate-500 flex flex-col items-center gap-2">
                            <span className="material-symbols-outlined text-3xl text-slate-300">search_off</span>
                            {searchQuery
                                ? `Aucun produit trouvé pour "${searchQuery}"`
                                : "Aucun produit disponible"}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
