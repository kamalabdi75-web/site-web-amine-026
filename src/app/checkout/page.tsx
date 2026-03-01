import Link from "next/link";
import CheckoutHeader from "@/components/CheckoutHeader";
import CheckoutFooter from "@/components/CheckoutFooter";

export default function CheckoutPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex flex-col text-text-primary-light dark:text-text-primary-dark">
            <CheckoutHeader />
            <main className="flex-grow container mx-auto px-4 py-8 lg:px-10 max-w-[1440px]">
                <div className="max-w-4xl mx-auto mb-10">
                    <div className="flex items-center justify-between w-full relative">
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-border-light dark:bg-border-dark -z-10 -translate-y-1/2 rounded-full"></div>
                        <div className="absolute top-1/2 left-0 w-1/2 h-1 bg-primary -z-10 -translate-y-1/2 rounded-full"></div>

                        <div className="flex flex-col items-center gap-2">
                            <div className="size-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm ring-4 ring-background-light dark:ring-background-dark">
                                <span className="material-symbols-outlined text-[18px]">check</span>
                            </div>
                            <span className="text-xs font-semibold text-primary">Cart</span>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <div className="size-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm ring-4 ring-background-light dark:ring-background-dark">2</div>
                            <span className="text-xs font-semibold text-primary">Delivery</span>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <div className="size-8 rounded-full bg-surface-light dark:bg-surface-dark border-2 border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark flex items-center justify-center font-bold text-sm ring-4 ring-background-light dark:ring-background-dark">3</div>
                            <span className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark">Review</span>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <div className="size-8 rounded-full bg-surface-light dark:bg-surface-dark border-2 border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark flex items-center justify-center font-bold text-sm ring-4 ring-background-light dark:ring-background-dark">4</div>
                            <span className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark">Confirm</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className="flex-1 w-full space-y-6">
                        <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-primary">
                                <span className="material-symbols-outlined">local_shipping</span>
                                Delivery Information
                            </h2>
                            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 md:col-span-2">
                                    <label className="block text-sm font-medium">Full Name</label>
                                    <input className="w-full rounded-lg bg-background-light dark:bg-background-dark border-transparent focus:border-primary focus:ring-primary placeholder:text-text-secondary-light/60" placeholder="e.g. Ahmed Benali" required type="text" />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium">Phone Number <span className="text-primary">*</span></label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark material-symbols-outlined text-[18px]">phone</span>
                                        <input className="w-full pl-10 rounded-lg bg-background-light dark:bg-background-dark border-transparent focus:border-primary focus:ring-primary placeholder:text-text-secondary-light/60" pattern="0[5-7][0-9]{8}" placeholder="05 XX XX XX XX" required title="Please enter a valid Algerian phone number starting with 05, 06 or 07" type="tel" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium">Secondary Phone <span className="text-xs font-normal text-text-secondary-light dark:text-text-secondary-dark">(Optional)</span></label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark material-symbols-outlined text-[18px]">phone_iphone</span>
                                        <input className="w-full pl-10 rounded-lg bg-background-light dark:bg-background-dark border-transparent focus:border-primary focus:ring-primary placeholder:text-text-secondary-light/60" placeholder="06 XX XX XX XX" type="tel" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium">Wilaya (State)</label>
                                    <div className="relative">
                                        <select defaultValue="16" className="w-full appearance-none rounded-lg bg-background-light dark:bg-background-dark border-transparent focus:border-primary focus:ring-primary cursor-pointer pr-10">
                                            <option disabled value="">Select Wilaya...</option>
                                            <option value="1">01 - Adrar</option>
                                            <option value="2">02 - Chlef</option>
                                            <option value="16">16 - Algiers</option>
                                            <option value="31">31 - Oran</option>
                                            <option value="25">25 - Constantine</option>
                                            <option value="58">58 - Beni Abbes</option>
                                        </select>
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark">expand_more</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium">Commune (Municipality)</label>
                                    <div className="relative">
                                        <input className="w-full rounded-lg bg-background-light dark:bg-background-dark border-transparent focus:border-primary focus:ring-primary placeholder:text-text-secondary-light/60" list="communes" placeholder="Search commune..." type="text" />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark material-symbols-outlined pointer-events-none">search</span>
                                        <datalist id="communes">
                                            <option value="Alger Centre" />
                                            <option value="Sidi M'Hamed" />
                                            <option value="Bab El Oued" />
                                            <option value="Hydra" />
                                            <option value="Bir Mourad Rais" />
                                        </datalist>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium">ZIP Code</label>
                                    <input className="w-full rounded-lg bg-background-light dark:bg-background-dark border-transparent focus:border-primary focus:ring-primary placeholder:text-text-secondary-light/60" placeholder="e.g. 16000" type="text" />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="block text-sm font-medium">Full Address</label>
                                    <textarea className="w-full rounded-lg bg-background-light dark:bg-background-dark border-transparent focus:border-primary focus:ring-primary placeholder:text-text-secondary-light/60 resize-none h-24" placeholder="Street name, building number, floor, apartment number..."></textarea>
                                </div>
                            </form>
                        </div>

                        <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">local_shipping</span>
                                Shipping Method
                            </h2>
                            <div className="space-y-3">
                                <label className="flex items-center p-4 border border-primary bg-primary/5 rounded-xl cursor-pointer transition-all hover:bg-primary/10 relative group">
                                    <div className="flex items-center h-5">
                                        <input defaultChecked className="w-5 h-5 text-primary focus:ring-primary border-gray-300" name="shipping_method" type="radio" />
                                    </div>
                                    <div className="ml-4 flex flex-1 justify-between items-center">
                                        <div>
                                            <span className="block font-bold text-text-primary-light dark:text-text-primary-dark">Standard Delivery (Algiers)</span>
                                            <span className="block text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">Delivery within 24-48 hours</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-lg font-bold text-primary">800 DA</span>
                                        </div>
                                    </div>
                                </label>

                                <label className="flex items-center p-4 border border-border-light dark:border-border-dark rounded-xl cursor-pointer transition-all hover:border-primary/30 opacity-60">
                                    <div className="flex items-center h-5">
                                        <input className="w-5 h-5 text-primary focus:ring-primary border-gray-300" name="shipping_method" type="radio" />
                                    </div>
                                    <div className="ml-4 flex flex-1 justify-between items-center">
                                        <div>
                                            <span className="block font-bold text-text-primary-light dark:text-text-primary-dark">Yalidine Express (Other Wilayas)</span>
                                            <span className="block text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">Delivery within 2-5 Days</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-lg font-bold text-text-primary-light dark:text-text-primary-dark">1,200 DA</span>
                                        </div>
                                    </div>
                                </label>

                                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 rounded-lg flex items-start gap-3">
                                    <span className="material-symbols-outlined text-green-600 text-[20px] mt-0.5">verified</span>
                                    <div className="text-sm text-green-800 dark:text-green-300">
                                        <span className="font-bold">Free Shipping Available!</span>
                                        <p className="text-xs mt-0.5 opacity-90">Orders over 200,000 DA qualify for free delivery nationwide.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">payments</span>
                                Payment Method
                            </h2>
                            <div className="p-5 border-2 border-primary bg-surface-light dark:bg-surface-dark rounded-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg uppercase tracking-wider">Only Option</div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-background-light dark:bg-background-dark rounded-full shrink-0">
                                        <span className="material-symbols-outlined text-primary text-2xl">handshake</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">Cash on Delivery</h3>
                                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-3">Pay securely with cash when you receive your order at your doorstep.</p>
                                        <div className="flex gap-2">
                                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-background-light dark:bg-background-dark rounded text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark">
                                                <span className="material-symbols-outlined text-[14px] text-green-600">check_circle</span> No upfront payment
                                            </span>
                                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-background-light dark:bg-background-dark rounded text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark">
                                                <span className="material-symbols-outlined text-[14px] text-green-600">verified_user</span> Inspect before paying
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-[400px] shrink-0 space-y-6">
                        <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark sticky top-24">
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                <div className="flex gap-3 items-center">
                                    <div className="size-14 bg-background-light dark:bg-background-dark rounded-md overflow-hidden shrink-0">
                                        <img alt="Samsung Washing Machine" className="object-cover w-full h-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsA6-P_Sv_mULirDxQz0BMciHxDU76Feq-qlnGUNAEkeouOl3zSVm5O6UA6CG1-IpR1SnBGAc9zhp3klKZt16jIcWmRiGH7KhYRlFaaO4KYxHFfCNeDl4QzNPwQKuWL0sJ03ilDoIOXr6RxKZ1LPRixg7YISLoseFMGVgaQGEIoizbJm9JQK_2Zj2rrelGgWh7kum7mksxsOSfDSNCZxsrRYgFXfqRTm6ad1eYPEyf1GGscx-oxvoU4I6d7iGrKP11ie-13NET-yU" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">Samsung Washing Machine 7kg</p>
                                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Qty: 1</p>
                                    </div>
                                    <span className="text-sm font-bold">65,000 DA</span>
                                </div>

                                <div className="flex gap-3 items-center">
                                    <div className="size-14 bg-background-light dark:bg-background-dark rounded-md overflow-hidden shrink-0">
                                        <img alt="Condor Refrigerator" className="object-cover w-full h-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBydfAYnOa9JNdo00jJTgAbr8WiBQmHyC8sv7rrZEnEbD0o90RE0hLX7FSp5GdRbW5JjqCvXLIHF3Vu_7SRXhpYVLgXMbz6hQ4juRtGg1tDY4Zluqv5lABsKDSHedDWqn-HCWX4mk0GNzmfcSdr_a4Veq0p9WhSvgVYT5kg95Dip9dRRKHKIFd7nvidSQPbVwx2ERlBx7bupNPSsp0ExPacYMyLVSMhBVAQ57F0AHQGcc_ph5bsJKuEPeOcLy3LekkV0L7Yb-756xY" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">Condor Refrigerator 400L</p>
                                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Qty: 1</p>
                                    </div>
                                    <span className="text-sm font-bold">82,000 DA</span>
                                </div>

                                <div className="flex gap-3 items-center">
                                    <div className="size-14 bg-background-light dark:bg-background-dark rounded-md overflow-hidden shrink-0">
                                        <img alt="Brandt Microwave Oven" className="object-cover w-full h-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1gyMgJS6lSd9CuGsLQDYbNrAEiYqxP0eP2huOdpFJTJt7jhzaiCwBZooPmaSYOJ-sYl93vKoUrzXtbss-4qwN7kU3K7lERGORFcolIGZFr_ACQUg7E0yUik1dI4EB8NFBiISjHyc4pQR9qAPWN9DCZwzcwdWDkpTW6Drk-A6YWqlfNY64yBoWhy6ohluP7Om0z4emNFM-27-vPPwAGtbixVzBGc9teOF9ekADGe6O40mRvkDuJDU5Fh0VayXhBUO4GxPPhvEOWeA" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">Brandt Microwave Oven</p>
                                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Qty: 1</p>
                                    </div>
                                    <span className="text-sm font-bold">18,500 DA</span>
                                </div>
                            </div>

                            <div className="border-t border-border-light dark:border-border-dark my-4"></div>

                            <div className="space-y-3">
                                <div className="flex justify-between text-text-secondary-light dark:text-text-secondary-dark">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-text-primary-light dark:text-text-primary-dark">165,500 DA</span>
                                </div>
                                <div className="flex justify-between text-text-secondary-light dark:text-text-secondary-dark">
                                    <span>Shipping (Algiers)</span>
                                    <span className="font-medium text-primary">800 DA</span>
                                </div>
                            </div>

                            <div className="border-t border-border-light dark:border-border-dark mt-4 pt-4 flex justify-between items-center">
                                <span className="text-lg font-bold">Total</span>
                                <span className="text-2xl font-bold text-primary">166,300 DA</span>
                            </div>

                            <div className="mt-6">
                                <Link href="/checkout/success">
                                    <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-primary/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2">
                                        <span>Confirm Order</span>
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                    </button>
                                </Link>
                            </div>

                            <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-border-light dark:border-border-dark">
                                <div className="flex flex-col items-center text-center gap-1">
                                    <span className="material-symbols-outlined text-primary text-[24px]">verified</span>
                                    <span className="text-[10px] font-semibold leading-tight text-text-secondary-light dark:text-text-secondary-dark">Official Warranty</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-1">
                                    <span className="material-symbols-outlined text-primary text-[24px]">assignment_return</span>
                                    <span className="text-[10px] font-semibold leading-tight text-text-secondary-light dark:text-text-secondary-dark">7-Day Return</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-1">
                                    <span className="material-symbols-outlined text-primary text-[24px]">headset_mic</span>
                                    <span className="text-[10px] font-semibold leading-tight text-text-secondary-light dark:text-text-secondary-dark">24/7 Support</span>
                                </div>
                            </div>

                            <p className="text-xs text-center text-text-secondary-light dark:text-text-secondary-dark mt-4">
                                By placing your order, you agree to Electro Mart&apos;s <Link className="underline hover:text-primary" href="#">Terms of Service</Link> and <Link className="underline hover:text-primary" href="#">Privacy Policy</Link>.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <CheckoutFooter />
        </div>
    );
}
