import Link from "next/link";

export default function HomeFooter() {
    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-10">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-10 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-primary">
                            <div className="size-8 flex items-center justify-center bg-[#FFF8E6] rounded-full text-primary font-black text-xl">
                                e
                            </div>
                            <h3 className="font-black text-xl">ElectroMart</h3>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Your trusted partner for high-quality home appliances in Algeria. Experience comfort and innovation at home.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-4">Customer Service</h4>
                        <ul className="flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link className="hover:text-primary transition-colors" href="#">Help Center</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">Returns & Refunds</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">Delivery Info</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">Track Order</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-4">Categories</h4>
                        <ul className="flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link className="hover:text-primary transition-colors" href="#">Machine a café</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">cuisine et cuisson </Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">maison cnbretion     </Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">beaute-sante </Link></li><li><Link className="hover:text-primary transition-colors" href="#">informatique - tabblette </Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-4">Contact Us</h4>
                        <ul className="flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">location_on</span>
                                Algiers, Algeria
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">call</span>
                                +213 770 06 16 12
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">mail</span>
                                support@electromart.dz
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-400">© 2026 Electro Mart. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link className="text-slate-400 hover:text-primary text-xs font-medium" href="#">Facebook</Link>
                        <Link className="text-slate-400 hover:text-primary text-xs font-medium" href="#">Instagram</Link>
                        <Link className="text-slate-400 hover:text-primary text-xs font-medium" href="#">Twitter</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
