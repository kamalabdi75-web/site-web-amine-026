"use client";

import Link from "next/link";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import { useSettings } from "@/context/SettingsContext";
import { useCart } from "@/hooks/useCart";

export default function ProductHeader() {
    const { settings } = useSettings();
    const { itemCount } = useCart();
    const pos = settings?.logo_position || 'left';
    return (
        <header className="bg-surface-light dark:bg-surface-dark border-b border-[#f4f3f0] dark:border-[#3e362a] sticky top-0 z-50 relative">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20 gap-4 relative">
                    <div className={`flex items-center gap-3 min-w-fit ${pos === 'right' || pos === 'center' ? 'flex-1' : ''}`}>
                        <MobileMenu />
                        {pos === 'left' && <Logo />}
                    </div>

                    {pos === 'center' && (
                        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 hidden sm:flex z-10">
                            <Logo />
                        </div>
                    )}
                    {pos === 'center' && (
                        <div className="sm:hidden flex items-center justify-center">
                            <Logo />
                        </div>
                    )}

                    <div className={`flex-1 max-w-2xl hidden md:flex ${pos === 'center' ? 'invisible xl:visible' : ''}`}>
                        <SearchBar />
                    </div>

                    <div className={`flex items-center gap-6 justify-end ${pos === 'left' ? '' : 'flex-1'}`}>
                        {pos === 'right' && <Logo />}
                        <nav className="hidden lg:flex gap-6">
                            <Link className="text-sm font-medium text-text-main dark:text-gray-200 hover:text-[#FF6600] transition-colors" href="/product">Électroménager</Link>
                            <Link className="text-sm font-medium text-text-main dark:text-gray-200 hover:text-[#FF6600] transition-colors" href="/product">Bons plans</Link>
                            <Link className="text-sm font-medium text-text-main dark:text-gray-200 hover:text-[#FF6600] transition-colors" href="/product">Assistance</Link>
                        </nav>
                        <div className="flex items-center gap-3">
                            <Link href="/cart" className="p-2 text-text-main dark:text-white hover:bg-[#f4f3f0] dark:hover:bg-[#3e362a] rounded-full transition-colors relative block">
                                <span className="material-symbols-outlined">shopping_cart</span>
                                {itemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 px-1 bg-[#FF6600] text-white text-[10px] font-bold rounded-full border-2 border-white dark:border-[#2d261a] flex items-center justify-center">
                                        {itemCount > 99 ? '99+' : itemCount}
                                    </span>
                                )}
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
