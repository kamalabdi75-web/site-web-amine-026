"use client";

import Link from "next/link";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";
import { useSettings } from "@/context/SettingsContext";
import { useCart } from "@/hooks/useCart";

export default function CheckoutHeader() {
    const { settings } = useSettings();
    const { itemCount } = useCart();
    const pos = settings?.logo_position || 'left';
    return (
        <header className="sticky top-0 z-50 w-full bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark px-10 py-3 shadow-sm relative">
            <div className="max-w-[1440px] mx-auto flex items-center justify-between whitespace-nowrap relative">
                <div className={`flex items-center gap-4 md:gap-8 ${pos === 'right' || pos === 'center' ? 'flex-1' : ''}`}>
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2 text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors mr-2">
                            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                        </Link>
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

                    <div className={`hidden md:flex flex-col min-w-64 max-w-96 ${pos === 'center' ? 'invisible xl:visible' : ''}`}>
                        <div className="flex w-full items-center rounded-lg bg-background-light dark:bg-background-dark border border-transparent focus-within:border-primary transition-colors">
                            <div className="text-text-secondary-light dark:text-text-secondary-dark flex items-center justify-center pl-3">
                                <span className="material-symbols-outlined text-[20px]">search</span>
                            </div>
                            <input className="w-full bg-transparent border-none text-text-primary-light dark:text-text-primary-dark placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark focus:ring-0 text-sm py-2 px-3" placeholder="Rechercher un produit..." />
                        </div>
                    </div>
                </div>
                <div className={`flex items-center gap-8 justify-end ${pos === 'left' ? '' : 'flex-1'}`}>
                    {pos === 'right' && <Logo />}
                    <nav className="hidden lg:flex items-center gap-6">
                        <Link className="text-text-primary-light dark:text-text-primary-dark text-sm font-medium hover:text-[#FF6600] transition-colors" href="/">Accueil</Link>
                        <Link className="text-text-primary-light dark:text-text-primary-dark text-sm font-medium hover:text-[#FF6600] transition-colors" href="/product">Électroménager</Link>
                        <Link className="text-text-primary-light dark:text-text-primary-dark text-sm font-medium hover:text-[#FF6600] transition-colors" href="/product">Bons plans</Link>
                        <Link className="text-text-primary-light dark:text-text-primary-dark text-sm font-medium hover:text-[#FF6600] transition-colors" href="/product">Assistance</Link>
                    </nav>
                    <div className="flex gap-3">
                        <Link href="/cart" className="flex items-center justify-center rounded-lg size-10 bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark hover:bg-[#FF6600]/10 hover:text-[#FF6600] transition-colors relative">
                            <span className="material-symbols-outlined">shopping_cart</span>
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 px-1 bg-[#FF6600] text-white text-[10px] font-bold rounded-full border-2 border-white dark:border-[#border-dark] flex items-center justify-center">
                                    {itemCount > 99 ? '99+' : itemCount}
                                </span>
                            )}
                        </Link>

                    </div>
                </div>
            </div>
        </header>
    );
}
