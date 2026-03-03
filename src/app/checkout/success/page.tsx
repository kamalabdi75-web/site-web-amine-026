import Link from "next/link";
import CheckoutHeader from "@/components/CheckoutHeader";
import CheckoutFooter from "@/components/CheckoutFooter";

export default function CheckoutSuccessPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex flex-col">
            <CheckoutHeader />
            <main className="flex-grow container mx-auto px-4 py-12 lg:px-10 max-w-[1440px] flex items-center justify-center">
                <div className="w-full max-w-3xl bg-surface-light dark:bg-surface-dark rounded-2xl shadow-lg border border-border-light dark:border-border-dark overflow-hidden">
                    <div className="p-8 md:p-12 text-center">
                        <div className="mx-auto flex items-center justify-center size-24 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
                            <span className="material-symbols-outlined text-6xl text-green-600 dark:text-green-400">check_circle</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
                            Commande confirmée !
                        </h1>
                        <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark mb-8 max-w-lg mx-auto">
                            Merci pour votre achat. Nous avons reçu votre commande et elle est maintenant en cours de traitement.
                        </p>

                        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8 max-w-xl mx-auto">
                            <div className="flex flex-col gap-2">
                                <span className="text-sm uppercase tracking-wider font-semibold text-text-secondary-light dark:text-text-secondary-dark">Numéro de commande</span>
                                <span className="text-3xl font-bold text-primary tracking-wide">#EM-882394</span>
                            </div>
                            <div className="mt-4 pt-4 border-t border-primary/10">
                                <p className="text-text-primary-light dark:text-text-primary-dark font-medium flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-xl">support_agent</span>
                                    Notre équipe vous contactera sous peu pour confirmer les détails de votre commande.
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto mb-10">
                            <div className="bg-background-light dark:bg-background-dark rounded-xl p-5">
                                <h3 className="font-bold text-text-primary-light dark:text-text-primary-dark mb-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-sm">local_shipping</span>
                                    Détails de livraison
                                </h3>
                                <div className="space-y-1 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                    <p className="font-medium text-text-primary-light dark:text-text-primary-dark">Ahmed Benali</p>
                                    <p>12 Rue Didouche Mourad</p>
                                    <p>Alger Centre, Algiers (16000)</p>
                                    <p className="mt-2">Livraison standard (1-2 Jours)</p>
                                </div>
                            </div>

                            <div className="bg-background-light dark:bg-background-dark rounded-xl p-5">
                                <h3 className="font-bold text-text-primary-light dark:text-text-primary-dark mb-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-sm">receipt_long</span>
                                    Résumé du paiement
                                </h3>
                                <div className="space-y-1 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                    <div className="flex justify-between">
                                        <span>Sous-total</span>
                                        <span>165,500 DA</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Livraison</span>
                                        <span>800 DA</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-text-primary-light dark:text-text-primary-dark pt-2 mt-2 border-t border-border-light dark:border-border-dark">
                                        <span>Total</span>
                                        <span className="text-primary">166,300 DA</span>
                                    </div>
                                    <p className="mt-2 text-xs">Mode de paiement : Paiement à la livraison</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button className="w-full sm:w-auto px-8 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-xl shadow-lg shadow-green-500/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
                                </svg>
                                Assistance WhatsApp
                            </button>

                            <Link className="w-full sm:w-auto px-8 py-3 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-primary text-text-primary-light dark:text-text-primary-dark font-medium rounded-xl transition-colors flex items-center justify-center gap-2" href="/">
                                Retourner à l'accueil
                            </Link>
                        </div>

                        <div className="mt-8 pt-6 border-t border-border-light dark:border-border-dark flex justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">verified_user</span>
                                <span className="text-xs font-medium">Transaction sécurisée</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">assignment_return</span>
                                <span className="text-xs font-medium">Retours faciles</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <CheckoutFooter />
        </div>
    );
}
