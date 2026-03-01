import Link from "next/link";
import MobileMenu from "./MobileMenu";

export default function ProductHeader() {
    return (
        <header className="bg-surface-light dark:bg-surface-dark border-b border-[#f4f3f0] dark:border-[#3e362a] sticky top-0 z-50">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20 gap-8">
                    <div className="flex items-center gap-3 min-w-fit">
                        <MobileMenu />
                        <div className="w-10 h-10 brand-logo-circle bg-[#FFF8E1] text-[#FF6B00] rounded-full flex items-center justify-center font-black text-2xl pb-1 select-none">
                            e
                        </div>
                        <h2 className="text-primary dark:text-primary text-2xl font-bold tracking-tight">ElectroMart</h2>
                    </div>
                    <div className="flex-1 max-w-2xl hidden md:flex">
                        <div className="relative w-full group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                                <span className="material-symbols-outlined">search</span>
                            </div>
                            <input className="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg bg-[#f4f3f0] dark:bg-[#3e362a] dark:text-white text-text-main placeholder-text-muted focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-[#2d261a] transition-colors" placeholder="Search appliances, brands, categories..." type="text" />
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <nav className="hidden lg:flex gap-6">
                            <Link className="text-sm font-medium text-text-main dark:text-gray-200 hover:text-primary transition-colors" href="/product">Appliances</Link>
                            <Link className="text-sm font-medium text-text-main dark:text-gray-200 hover:text-primary transition-colors" href="/product">Deals</Link>
                            <Link className="text-sm font-medium text-text-main dark:text-gray-200 hover:text-primary transition-colors" href="/product">Support</Link>
                        </nav>
                        <div className="flex items-center gap-3">
                            <Link href="/checkout" className="p-2 text-text-main dark:text-white hover:bg-[#f4f3f0] dark:hover:bg-[#3e362a] rounded-full transition-colors relative block">
                                <span className="material-symbols-outlined">shopping_cart</span>
                                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white dark:border-[#2d261a]"></span>
                            </Link>
                            <Link href="/admin" className="p-2 text-text-main dark:text-white hover:bg-[#f4f3f0] dark:hover:bg-[#3e362a] rounded-full transition-colors hidden sm:block">
                                <span className="material-symbols-outlined">person</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
