import Link from "next/link";

export default function AdminShippingPage() {
    return (
        <div className="bg-background-light font-display h-screen flex overflow-hidden text-text-primary-light">
            <aside className="w-64 bg-surface-light border-r border-border-light flex flex-col shrink-0 transition-all duration-300">
                <div className="h-16 flex items-center px-6 border-b border-border-light">
                    <Link className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity" href="/admin">
                        <div className="size-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                            e
                        </div>
                        <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] text-text-primary-light">ElectroAdmin</h2>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary-light hover:bg-background-light hover:text-primary transition-colors" href="#">
                        <span className="material-symbols-outlined">dashboard</span>
                        <span className="font-medium">Dashboard</span>
                    </Link>
                    <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary-light hover:bg-background-light hover:text-primary transition-colors" href="/admin/add-product">
                        <span className="material-symbols-outlined">inventory_2</span>
                        <span className="font-medium">Products</span>
                    </Link>
                    <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary-light hover:bg-background-light hover:text-primary transition-colors" href="/admin">
                        <span className="material-symbols-outlined">shopping_bag</span>
                        <span className="font-medium">Orders</span>
                    </Link>

                    <div className="pt-4 pb-2">
                        <p className="px-3 text-xs font-semibold text-text-secondary-light uppercase tracking-wider">Configuration</p>
                    </div>

                    <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary-light/10 text-primary font-medium" href="/admin/shipping">
                        <span className="material-symbols-outlined fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                        <span>Location Settings</span>
                    </Link>
                    <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary-light hover:bg-background-light hover:text-primary transition-colors" href="#">
                        <span className="material-symbols-outlined">settings</span>
                        <span className="font-medium">General Settings</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-border-light">
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-background-light cursor-pointer transition-colors">
                        <div className="size-9 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBrfwHOQ4PygxniZEqooBaxf6_PJKAGLBVOGuIyHrIgbd8qEou1G_RZdAvHE_0kYfDcYIXJUYAct8NzkffLcDQvbNsz3afw8ZXTSZhebzoolJGdWSRvYD9q-xjH0mMps5mbBHYn5siNKZ4mEeasUnHDrZO-MSTYgwbWwh0y1-bSozC7B2DT8Iw6XTC3i6hiyZjB9xAvd0noMPd7e2PIf25EX4en-wROnUcX2cjmOZGXbFaqR_1EjSxGblAm8E5oE6BNylmws6lNCiE')" }}></div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-text-primary-light truncate">Admin User</p>
                            <p className="text-xs text-text-secondary-light truncate">admin@electromart.dz</p>
                        </div>
                        <span className="material-symbols-outlined text-text-secondary-light text-[20px]">logout</span>
                    </div>
                </div>
            </aside>

            <main className="flex-1 flex flex-col min-w-0 bg-background-light">
                <header className="h-16 bg-surface-light border-b border-border-light flex items-center justify-between px-6 shrink-0 z-10">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-bold text-text-primary-light">Location &amp; Shipping Management</h1>
                        <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light/10 text-primary border border-primary-light/20">58 Wilayas Active</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-text-secondary-light hover:text-primary transition-colors relative">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-surface-light"></span>
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-auto p-6 md:p-8">
                    <div className="max-w-7xl mx-auto space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="relative w-full sm:w-80">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light">search</span>
                                <input className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border-light bg-surface-light text-text-primary-light focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-text-secondary-light/70 text-sm" placeholder="Search Wilaya by code or name..." type="text" />
                            </div>
                            <div className="flex gap-3 w-full sm:w-auto">
                                <button className="flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-2.5 bg-surface-light border border-border-light rounded-lg text-text-primary-light hover:bg-background-light font-medium text-sm transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">upload_file</span>
                                    Bulk Import Communes (CSV)
                                </button>
                                <button className="flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark font-medium text-sm shadow-sm transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">add</span>
                                    Add Wilaya
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-surface-light p-4 rounded-xl border border-border-light shadow-sm">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                        <span className="material-symbols-outlined text-[20px]">map</span>
                                    </div>
                                    <span className="text-sm font-medium text-text-secondary-light">Total Zones</span>
                                </div>
                                <p className="text-2xl font-bold text-text-primary-light">58</p>
                            </div>

                            <div className="bg-surface-light p-4 rounded-xl border border-border-light shadow-sm">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                                        <span className="material-symbols-outlined text-[20px]">apartment</span>
                                    </div>
                                    <span className="text-sm font-medium text-text-secondary-light">Communes</span>
                                </div>
                                <p className="text-2xl font-bold text-text-primary-light">1,541</p>
                            </div>

                            <div className="bg-surface-light p-4 rounded-xl border border-border-light shadow-sm">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                                        <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                                    </div>
                                    <span className="text-sm font-medium text-text-secondary-light">Avg. Shipping</span>
                                </div>
                                <p className="text-2xl font-bold text-text-primary-light">850 DA</p>
                            </div>

                            <div className="bg-surface-light p-4 rounded-xl border border-border-light shadow-sm">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                                        <span className="material-symbols-outlined text-[20px]">toggle_on</span>
                                    </div>
                                    <span className="text-sm font-medium text-text-secondary-light">Active Coverage</span>
                                </div>
                                <p className="text-2xl font-bold text-text-primary-light">98%</p>
                            </div>
                        </div>

                        <div className="bg-surface-light rounded-xl border border-border-light shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-background-light border-b border-border-light">
                                            <th className="px-6 py-4 text-xs font-semibold text-text-secondary-light uppercase tracking-wider w-24">Code</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-text-secondary-light uppercase tracking-wider">Wilaya Name</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-text-secondary-light uppercase tracking-wider">Shipping Price</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-text-secondary-light uppercase tracking-wider">Est. Delivery</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-text-secondary-light uppercase tracking-wider w-32">Status</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-text-secondary-light uppercase tracking-wider text-right w-48">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border-light">
                                        <tr className="hover:bg-background-light transition-colors group">
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center justify-center size-8 rounded bg-gray-100 text-sm font-bold text-text-primary-light">01</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-text-primary-light">Adrar</div>
                                                <div className="text-xs text-text-secondary-light">28 Communes</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-text-primary-light">1,200 DA</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-text-primary-light">5 - 7 Days</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input defaultChecked className="sr-only peer" type="checkbox" value="" />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                                </label>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 rounded-lg text-text-secondary-light hover:text-primary hover:bg-primary-light/10 transition-colors" title="View Communes">
                                                        <span className="material-symbols-outlined text-[20px]">list_alt</span>
                                                    </button>
                                                    <button className="p-2 rounded-lg text-text-secondary-light hover:text-primary hover:bg-primary-light/10 transition-colors" title="Edit Settings">
                                                        <span className="material-symbols-outlined text-[20px]">edit</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr className="hover:bg-background-light transition-colors group">
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center justify-center size-8 rounded bg-gray-100 text-sm font-bold text-text-primary-light">16</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-text-primary-light">Algiers (Alger)</div>
                                                <div className="text-xs text-text-secondary-light">57 Communes</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-text-primary-light">400 DA</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-text-primary-light">1 - 2 Days</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input defaultChecked className="sr-only peer" type="checkbox" value="" />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                                </label>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 rounded-lg text-text-secondary-light hover:text-primary hover:bg-primary-light/10 transition-colors" title="View Communes">
                                                        <span className="material-symbols-outlined text-[20px]">list_alt</span>
                                                    </button>
                                                    <button className="p-2 rounded-lg text-text-secondary-light hover:text-primary hover:bg-primary-light/10 transition-colors" title="Edit Settings">
                                                        <span className="material-symbols-outlined text-[20px]">edit</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr className="hover:bg-background-light transition-colors group">
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center justify-center size-8 rounded bg-gray-100 text-sm font-bold text-text-primary-light">25</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-text-primary-light">Constantine</div>
                                                <div className="text-xs text-text-secondary-light">12 Communes</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-text-primary-light">800 DA</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-text-primary-light">2 - 3 Days</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input defaultChecked className="sr-only peer" type="checkbox" value="" />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                                </label>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 rounded-lg text-text-secondary-light hover:text-primary hover:bg-primary-light/10 transition-colors" title="View Communes">
                                                        <span className="material-symbols-outlined text-[20px]">list_alt</span>
                                                    </button>
                                                    <button className="p-2 rounded-lg text-text-secondary-light hover:text-primary hover:bg-primary-light/10 transition-colors" title="Edit Settings">
                                                        <span className="material-symbols-outlined text-[20px]">edit</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr className="hover:bg-background-light transition-colors group">
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center justify-center size-8 rounded bg-gray-100 text-sm font-bold text-text-primary-light">31</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-text-primary-light">Oran</div>
                                                <div className="text-xs text-text-secondary-light">26 Communes</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-text-primary-light">800 DA</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-text-primary-light">2 - 3 Days</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input defaultChecked className="sr-only peer" type="checkbox" value="" />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                                </label>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 rounded-lg text-text-secondary-light hover:text-primary hover:bg-primary-light/10 transition-colors" title="View Communes">
                                                        <span className="material-symbols-outlined text-[20px]">list_alt</span>
                                                    </button>
                                                    <button className="p-2 rounded-lg text-text-secondary-light hover:text-primary hover:bg-primary-light/10 transition-colors" title="Edit Settings">
                                                        <span className="material-symbols-outlined text-[20px]">edit</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr className="hover:bg-background-light transition-colors group">
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center justify-center size-8 rounded bg-gray-100 text-sm font-bold text-text-primary-light">58</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-text-primary-light">El Meniaa</div>
                                                <div className="text-xs text-text-secondary-light">2 Communes</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-text-secondary-light">--</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-text-secondary-light">--</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input className="sr-only peer" type="checkbox" value="" />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                                </label>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 rounded-lg text-text-secondary-light hover:text-primary hover:bg-primary-light/10 transition-colors" title="View Communes">
                                                        <span className="material-symbols-outlined text-[20px]">list_alt</span>
                                                    </button>
                                                    <button className="p-2 rounded-lg text-text-secondary-light hover:text-primary hover:bg-primary-light/10 transition-colors" title="Edit Settings">
                                                        <span className="material-symbols-outlined text-[20px]">edit</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="px-6 py-4 border-t border-border-light flex items-center justify-between">
                                <span className="text-sm text-text-secondary-light">Showing <span className="font-medium text-text-primary-light">1-5</span> of <span className="font-medium text-text-primary-light">58</span></span>
                                <div className="flex items-center gap-2">
                                    <button className="size-8 flex items-center justify-center rounded-lg border border-border-light text-text-secondary-light hover:bg-background-light disabled:opacity-50">
                                        <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                                    </button>
                                    <button className="size-8 flex items-center justify-center rounded-lg bg-primary text-white font-medium text-sm">1</button>
                                    <button className="size-8 flex items-center justify-center rounded-lg border border-border-light text-text-secondary-light hover:bg-background-light hover:text-primary">2</button>
                                    <button className="size-8 flex items-center justify-center rounded-lg border border-border-light text-text-secondary-light hover:bg-background-light hover:text-primary">3</button>
                                    <span className="text-text-secondary-light px-1">...</span>
                                    <button className="size-8 flex items-center justify-center rounded-lg border border-border-light text-text-secondary-light hover:bg-background-light hover:text-primary">12</button>
                                    <button className="size-8 flex items-center justify-center rounded-lg border border-border-light text-text-secondary-light hover:bg-background-light">
                                        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
