import Link from "next/link";
import MobileMenu from "./MobileMenu";

export default function HomeHeader() {
    return (
        <>
            <div className="w-full bg-primary text-white text-xs font-bold py-2 text-center tracking-wide overflow-hidden whitespace-nowrap">
                <div className="inline-block animate-marquee px-4">
                    🚀 Free Delivery in Algiers for orders over 50,000 DA! | 📞 Call us: +213 555 123 456 | 🏷️ Special offers on LG & Samsung products this week!
                </div>
            </div>
            <header className="sticky top-0 z-50 bg-white/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-solid border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="max-w-[1440px] mx-auto w-full px-4 lg:px-10 py-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <MobileMenu />
                            <Link href="/" className="flex items-center gap-2 shrink-0">
                                <div className="size-10 flex items-center justify-center bg-[#FFF8E6] rounded-full text-primary font-black text-2xl">
                                    e
                                </div>
                                <h2 className="text-2xl font-black leading-tight tracking-tight text-primary">ElectroMart</h2>
                            </Link>
                        </div>
                        <div className="flex-1 max-w-xl mx-4 hidden md:block">
                            <label className="relative flex items-center w-full h-11 rounded-full focus-within:ring-2 focus-within:ring-primary/50 overflow-hidden bg-slate-100 dark:bg-slate-800 border border-transparent hover:border-primary/30 transition-colors">
                                <div className="grid place-items-center h-full w-12 text-primary">
                                    <span className="material-symbols-outlined text-[20px]">search</span>
                                </div>
                                <input className="peer h-full w-full outline-none text-sm text-slate-700 dark:text-slate-200 pr-4 bg-transparent placeholder-slate-500" id="search" placeholder="Search refrigerators, TVs, washing machines..." type="text" />
                            </label>
                        </div>
                        <div className="flex items-center gap-4 shrink-0">
                            <button className="md:hidden p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                                <span className="material-symbols-outlined">search</span>
                            </button>
                            <Link href="/admin" className="hidden lg:flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined">person</span>
                                <span>Sign In</span>
                            </Link>
                            <Link href="/checkout" className="relative p-2 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined">shopping_cart</span>
                                <span className="absolute top-0 right-0 size-4 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm">2</span>
                            </Link>
                        </div>
                    </div>
                    <nav className="hidden md:flex items-center justify-center gap-8 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                        <Link className="text-slate-900 dark:text-slate-100 text-sm font-semibold hover:text-primary transition-colors" href="/">Home</Link>
                        <Link className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" href="/product">Large Appliances</Link>
                        <Link className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" href="/product">Small Appliances</Link>
                        <Link className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" href="/product">TV & Audio</Link>
                        <Link className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" href="/product">Computing</Link>
                        <Link className="bg-primary/10 px-3 py-1 rounded-full text-primary text-sm font-bold hover:bg-primary/20 transition-colors" href="/product">Special Offers</Link>
                    </nav>
                </div>
            </header>
        </>
    );
}
