import Link from "next/link";

export default function CheckoutFooter() {
    return (
        <footer className="mt-12 border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark py-8 px-10">
            <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2 text-text-secondary-light dark:text-text-secondary-dark">
                    <span className="material-symbols-outlined text-[18px]">copyright</span>
                    <span className="text-sm">2026 Electromart. Tous droits réservés.</span>
                </div>
                <div className="flex gap-6">
                    <Link className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary text-sm" href="#">Politique de retour</Link>
                    <Link className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary text-sm" href="#">Service client</Link>
                </div>
            </div>
        </footer>
    );
}
