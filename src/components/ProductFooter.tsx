import Link from "next/link";

export default function ProductFooter() {
    return (
        <footer className="bg-surface-light dark:bg-surface-dark border-t border-[#f4f3f0] dark:border-[#3e362a] mt-12 py-12">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 brand-logo-circle bg-[#FFF8E1] text-[#FF6B00] rounded-full flex items-center justify-center font-black text-lg pb-0.5 select-none">
                                e
                            </div>
                            <h2 className="text-text-main dark:text-white text-lg font-bold">Electro Mart</h2>
                        </div>
                        <p className="text-text-muted text-sm mb-4">Your trusted partner for home electronics in Algeria. Quality products, best prices.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-text-main dark:text-white mb-4">Shop</h3>
                        <ul className="space-y-2 text-sm text-text-muted">
                            <li><Link className="hover:text-primary" href="#">Kitchen Appliances</Link></li>
                            <li><Link className="hover:text-primary" href="#">TV & Audio</Link></li>
                            <li><Link className="hover:text-primary" href="#">Smart Home</Link></li>
                            <li><Link className="hover:text-primary" href="#">Deals</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-text-main dark:text-white mb-4">Support</h3>
                        <ul className="space-y-2 text-sm text-text-muted">
                            <li><Link className="hover:text-primary" href="#">Track Order</Link></li>
                            <li><Link className="hover:text-primary" href="#">Returns Policy</Link></li>
                            <li><Link className="hover:text-primary" href="#">Help Center</Link></li>
                            <li><Link className="hover:text-primary" href="#">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-text-main dark:text-white mb-4">Contact</h3>
                        <ul className="space-y-2 text-sm text-text-muted">
                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">call</span> +213 21 00 00 00</li>
                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">mail</span> support@electromart.dz</li>
                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">location_on</span> Algiers, Algeria</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-[#f4f3f0] dark:border-[#3e362a] pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-text-muted">
                    <p>© 2023 Electro Mart Algeria. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <span className="cursor-pointer hover:text-text-main">Privacy Policy</span>
                        <span className="cursor-pointer hover:text-text-main">Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
