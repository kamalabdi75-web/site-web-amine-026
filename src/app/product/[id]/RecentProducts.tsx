"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    images?: string[];
}

interface RecentProductsProps {
    currentProductId: string;
}

export default function RecentProducts({ currentProductId }: RecentProductsProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRecentProducts = async () => {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('id, name, price, image, images')
                    .neq('id', currentProductId)
                    .order('created_at', { ascending: false })
                    .limit(4);

                if (error) throw error;
                setProducts(data || []);
            } catch (err) {
                console.error("Error fetching recent products:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecentProducts();
    }, [currentProductId]);

    if (isLoading) {
        return (
            <div className="mt-16 bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-8">
                    <div className="h-6 w-48 bg-slate-100 dark:bg-slate-800 rounded animate-pulse"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex flex-col gap-3">
                            <div className="aspect-square bg-slate-50 dark:bg-slate-800/50 rounded-2xl animate-pulse"></div>
                            <div className="h-4 w-3/4 bg-slate-100 dark:bg-slate-800 rounded animate-pulse"></div>
                            <div className="h-4 w-1/2 bg-slate-100 dark:bg-slate-800 rounded animate-pulse"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (products.length === 0) return null;

    return (
        <div className="mt-12 md:mt-16 bg-white dark:bg-slate-900 rounded-[24px] md:rounded-[32px] p-6 md:p-12 shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px] md:text-[24px]">new_releases</span>
                    Produits récents
                </h2>
                <Link href="/product" className="text-xs md:text-sm font-bold text-primary hover:underline underline-offset-4 flex items-center gap-1 group/link">
                    <span>Voir tout</span>
                    <span className="material-symbols-outlined text-[16px] md:text-[18px] transition-transform group-hover/link:translate-x-1">arrow_forward</span>
                </Link>
            </div>

            {/* Responsive Layout: Grid on Desktop, Horizontal Scroll on Mobile */}
            <div className="flex md:grid md:grid-cols-4 gap-4 md:gap-6 overflow-x-auto pb-4 md:pb-0 scrollbar-hide -mx-1 px-1 snap-x select-none">
                {products.map((product) => (
                    <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        className="min-w-[160px] xs:min-w-[180px] md:min-w-0 flex-shrink-0 group snap-start"
                    >
                        <div className="flex flex-col gap-3 md:gap-4">
                            <div className="aspect-square rounded-xl md:rounded-2xl bg-slate-50 dark:bg-slate-800/50 overflow-hidden border border-slate-100 dark:border-slate-800 transition-all group-hover:shadow-lg group-hover:scale-[1.02] group-hover:border-primary/20 relative">
                                <img
                                    src={product.image || (product.images && product.images[0]) || "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=400&auto=format"}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"></div>
                            </div>
                            <div className="flex flex-col gap-1 px-0.5">
                                <h3 className="font-bold text-slate-900 dark:text-white text-xs md:text-sm line-clamp-1 group-hover:text-primary transition-colors">
                                    {product.name}
                                </h3>
                                <p className="text-primary font-black text-sm md:text-base">
                                    {product.price.toLocaleString()} DA
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
