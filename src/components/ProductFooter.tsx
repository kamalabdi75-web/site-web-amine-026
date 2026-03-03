"use client";

import Link from "next/link";
import Logo from "./Logo";

export default function ProductFooter() {
    return (
        <footer className="bg-surface-light dark:bg-surface-dark border-t border-[#f4f3f0] dark:border-[#3e362a] mt-12 py-12">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <Logo />
                        <p className="text-text-muted text-sm mb-4">Votre partenaire de confiance pour l'électroménager en Algérie. Les meilleurs produits aux meilleurs prix.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-text-main dark:text-white mb-4">Boutique</h3>
                        <ul className="space-y-2 text-sm text-text-muted">
                            <li><Link className="hover:text-primary" href="#">Électroménager de cuisine</Link></li>
                            <li><Link className="hover:text-primary" href="#">TV & Audio</Link></li>
                            <li><Link className="hover:text-primary" href="#">Maison intelligente</Link></li>
                            <li><Link className="hover:text-primary" href="#">Bons plans</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-text-main dark:text-white mb-4">Assistance</h3>
                        <ul className="space-y-2 text-sm text-text-muted">
                            <li><Link className="hover:text-primary" href="#">Suivre ma commande</Link></li>
                            <li><Link className="hover:text-primary" href="#">Politique de retour</Link></li>
                            <li><Link className="hover:text-primary" href="#">Centre d'aide</Link></li>
                            <li><Link className="hover:text-primary" href="#">Nous contacter</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-text-main dark:text-white mb-4">Contact</h3>
                        <ul className="space-y-2 text-sm text-text-muted">
                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">call</span> <a href="tel:+213770061612" className="hover:underline hover:text-primary transition-colors">+213 770 06 16 12</a></li>
                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">mail</span> support@electromart.dz</li>
                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">location_on</span> Alger, Algérie</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-[#f4f3f0] dark:border-[#3e362a] pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-text-muted">
                    <p>© 2026 Electromart. Tous droits réservés.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <span className="cursor-pointer hover:text-text-main">Politique de confidentialité</span>
                        <span className="cursor-pointer hover:text-text-main">Conditions de service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
