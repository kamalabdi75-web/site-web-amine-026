"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { mobileMenuCategories, Category } from "@/data/categories";
import { supabase } from "@/lib/supabase";

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [categories, setCategories] = useState<Category[]>(mobileMenuCategories);

    // Fetch categories from Supabase
    useEffect(() => {
        async function fetchCategories() {
            try {
                const { data, error } = await supabase
                    .from("categories")
                    .select("*")
                    .order("created_at", { ascending: true });

                if (data && !error && data.length > 0) {
                    setCategories(data as Category[]);
                }
            } catch (err) {
                console.error("Failed to load categories:", err);
            }
        }
        fetchCategories();
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setMounted(true);
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const menuContent = (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] md:hidden transition-opacity"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Drawer */}
            <div
                className={`fixed top-0 left-0 bottom-0 w-[85%] max-w-[360px] bg-[#1a1525] dark:bg-slate-900 z-[100] transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl md:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                {/* Header with Title and Close Button */}
                <div className="flex items-center justify-between p-5 border-b border-white/10">
                    <h2 className="text-white text-xl font-bold tracking-tight">Nos univers</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="size-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        aria-label="Close mobile menu"
                    >
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>
                </div>

                {/* Promotional / Preorder banner (optional addition from screenshot) */}
                <div className="bg-primary/10 border-b border-primary/20 px-5 py-3 flex flex-col justify-center">
                    <p className="text-xs text-primary-light font-medium text-center leading-tight">
                        Précommandez dès maintenant et bénéficiez d&apos;offres exceptionnelles !
                    </p>
                </div>

                {/* Categories List */}
                <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-3">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={category.link || "/product"}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-4 group p-2 rounded-xl hover:bg-white/5 transition-colors"
                        >
                            <div className="size-14 bg-white shrink-0 rounded-lg flex items-center justify-center overflow-hidden shadow-sm">
                                {category.image ? (
                                    <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="material-symbols-outlined text-slate-400 text-3xl group-hover:text-primary transition-colors">
                                        {category.icon || "category"}
                                    </span>
                                )}
                            </div>
                            <span className="text-white font-medium flex-1 text-sm group-hover:text-primary transition-colors">
                                {category.name}
                            </span>
                            <span className="material-symbols-outlined text-white/40 group-hover:text-primary transition-colors">
                                chevron_right
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="md:hidden p-2 -ml-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors flex items-center justify-center shrink-0"
                aria-label="Open mobile menu"
            >
                <span className="material-symbols-outlined text-[28px]">menu</span>
            </button>
            {mounted && createPortal(menuContent, document.body)}
        </>
    );
}
