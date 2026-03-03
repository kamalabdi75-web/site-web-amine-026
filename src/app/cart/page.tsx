"use client";

import Link from "next/link";
import HomeHeader from "@/components/HomeHeader";
import HomeFooter from "@/components/HomeFooter";
import CartItemRow from "@/components/CartItemRow";
import { useCart } from "@/hooks/useCart";

export default function CartPage() {
    const { cartItems, itemCount, isLoading, refreshCart } = useCart();

    const subtotal = cartItems.reduce((acc, item) => acc + (item.products?.price * item.quantity), 0);
    const isFreeShipping = subtotal > 50000; // Match the marquee threshold

    if (isLoading) {
        return (
            <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
                <HomeHeader />
                <main className="flex-grow flex items-center justify-center">
                    <span className="material-symbols-outlined animate-spin text-primary text-4xl">refresh</span>
                </main>
                <HomeFooter />
            </div>
        );
    }

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col text-text-main font-sans">
            <HomeHeader />

            <main className="flex-grow max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="flex items-center gap-3 mb-8">
                    <Link href="/" className="text-slate-500 hover:text-primary transition-colors flex items-center gap-1">
                        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                        Continuer mes achats
                    </Link>
                </div>

                <h1 className="text-3xl font-extrabold mb-8 flex items-center gap-3">
                    Mon Panier
                    <span className="text-sm font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
                        {itemCount} article{itemCount !== 1 ? 's' : ''}
                    </span>
                </h1>

                {cartItems.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        {/* Left Column: Items List */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
                                <div className="space-y-6">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="pb-6 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                                            <CartItemRow item={item} refreshCart={refreshCart} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-800 sticky top-24">
                                <h2 className="text-xl font-bold mb-6">Résumé de la commande</h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                                        <span>Sous-total</span>
                                        <span className="font-bold text-slate-900 dark:text-white">{subtotal.toLocaleString()} DA</span>
                                    </div>
                                    <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                                        <span>Livraison</span>
                                        <span className="font-bold text-green-500">{isFreeShipping ? 'Gratuite' : 'À calculer au checkout'}</span>
                                    </div>
                                </div>

                                <div className="h-px bg-slate-100 dark:bg-slate-800 mb-6"></div>

                                <div className="flex justify-between items-center mb-8">
                                    <span className="text-lg font-bold">Total</span>
                                    <span className="text-2xl font-black text-primary">{subtotal.toLocaleString()} DA</span>
                                </div>

                                <Link href="/checkout">
                                    <button className="w-full py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-all transform active:scale-[0.98] shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                                        Passer à la livraison
                                        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                                    </button>
                                </Link>

                                {isFreeShipping ? (
                                    <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-800/30 rounded-2xl flex items-start gap-3">
                                        <span className="material-symbols-outlined text-green-600">verified</span>
                                        <p className="text-xs text-green-800 dark:text-green-300">
                                            <span className="font-bold">Félicitations !</span> Vous bénéficiez de la livraison gratuite sur cette commande.
                                        </p>
                                    </div>
                                ) : (
                                    <p className="mt-6 text-xs text-center text-slate-500 italic">
                                        Ajoutez encore {(50000 - subtotal).toLocaleString()} DA pour profiter de la livraison gratuite !
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-slate-900 rounded-[40px] p-12 md:p-24 shadow-sm border border-slate-100 dark:border-slate-800 text-center flex flex-col items-center">
                        <div className="size-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-8 text-slate-200 dark:text-slate-700">
                            <span className="material-symbols-outlined text-[48px]">shopping_cart</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Votre panier est vide</h2>
                        <p className="text-slate-500 max-w-md mb-8">
                            Il semble que vous n'ayez pas encore ajouté de produits. Explorez nos catégories pour trouver votre bonheur !
                        </p>
                        <Link href="/product">
                            <button className="px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                                Découvrir nos produits
                            </button>
                        </Link>
                    </div>
                )}
            </main>

            <HomeFooter />
        </div>
    );
}
