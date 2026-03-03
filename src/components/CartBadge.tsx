"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";

export default function CartBadge() {
    const { itemCount } = useCart();

    return (
        <Link href="/cart" className="p-2 text-text-main dark:text-gray-200 hover:bg-[#f4f3f0] dark:hover:bg-[#3e362a] rounded-full transition-colors relative flex items-center justify-center">
            <span className="material-symbols-outlined">shopping_cart</span>
            {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 px-1 bg-red-500 text-white text-[10px] font-bold rounded-full border-2 border-white dark:border-[#2d261a] flex items-center justify-center">
                    {itemCount > 99 ? '99+' : itemCount}
                </span>
            )}
        </Link>
    );
}
