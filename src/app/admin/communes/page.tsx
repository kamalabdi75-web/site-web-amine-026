import Link from "next/link";

export default function AdminCommunesPage() {
    return (
        <div className="bg-background-light font-display min-h-screen flex flex-col text-text-primary-light">
            <header className="sticky top-0 z-50 w-full bg-surface-light border-b border-border-light px-6 py-3 shadow-sm">
                <div className="max-w-[1440px] mx-auto flex items-center justify-between whitespace-nowrap">
                    <div className="flex items-center gap-8">
                        <Link className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity" href="/admin">
                            <div className="size-9 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl">
                                e
                            </div>
                            <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] text-text-primary-light">
                                ElectroMart <span className="text-text-secondary-light font-normal ml-1">Admin</span>
                            </h2>
                        </Link>
                        <nav className="hidden md:flex items-center gap-1 bg-background-light p-1 rounded-lg border border-border-light">
                            <Link className="px-3 py-1.5 text-sm font-medium text-text-secondary-light hover:text-primary rounded-md transition-colors" href="#">Dashboard</Link>
                            <Link className="px-3 py-1.5 text-sm font-medium text-text-secondary-light hover:text-primary rounded-md transition-colors" href="/admin">Orders</Link>
                            <Link className="px-3 py-1.5 text-sm font-medium text-text-secondary-light hover:text-primary rounded-md transition-colors" href="/admin/add-product">Products</Link>
                            <Link className="px-3 py-1.5 text-sm font-medium bg-white shadow-sm text-primary rounded-md" href="/admin/communes">Locations</Link>
                            <Link className="px-3 py-1.5 text-sm font-medium text-text-secondary-light hover:text-primary rounded-md transition-colors" href="#">Users</Link>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden lg:flex items-center gap-2 text-sm text-text-secondary-light">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            System Operational
                        </div>
                        <div className="h-8 w-px bg-border-light hidden lg:block"></div>
                        <div className="flex items-center gap-3">
                            <button className="relative p-2 text-text-secondary-light hover:text-primary hover:bg-primary-light/10 rounded-full transition-colors">
                                <span className="material-symbols-outlined text-[20px]">notifications</span>
                                <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-surface-light"></span>
                            </button>
                            <div className="flex items-center gap-3 pl-2 cursor-pointer hover:bg-background-light py-1 px-2 rounded-full transition-colors border border-transparent hover:border-border-light">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-medium text-text-primary-light">Admin User</p>
                                    <p className="text-xs text-text-secondary-light">Super Admin</p>
                                </div>
                                <div className="bg-primary-light/20 rounded-full size-8 flex items-center justify-center text-primary font-bold text-sm">
                                    AD
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 py-8 lg:px-6 max-w-[1440px]">
                <nav aria-label="Breadcrumb" className="flex mb-8 text-sm text-text-secondary-light">
                    <ol className="flex items-center space-x-2">
                        <li><Link className="hover:text-primary transition-colors" href="#">Dashboard</Link></li>
                        <li><span className="material-symbols-outlined text-[16px]">chevron_right</span></li>
                        <li><Link className="hover:text-primary transition-colors" href="/admin/communes">Location Management</Link></li>
                        <li><span className="material-symbols-outlined text-[16px]">chevron_right</span></li>
                        <li aria-current="page" className="text-text-primary-light font-medium">Wilaya 16 - Algiers</li>
                    </ol>
                </nav>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <aside className="w-full lg:w-72 shrink-0 space-y-6">
                        <div className="bg-surface-light rounded-xl border border-border-light shadow-sm overflow-hidden">
                            <div className="p-5 border-b border-border-light bg-background-light/50">
                                <h3 className="font-semibold text-text-primary-light flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">map</span>
                                    Current Context
                                </h3>
                            </div>
                            <div className="p-5 space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-text-secondary-light uppercase tracking-wider mb-2">Selected Wilaya</label>
                                    <div className="relative">
                                        <select defaultValue="16" className="w-full rounded-lg bg-background-light border-border-light focus:border-primary focus:ring-primary text-text-primary-light text-sm py-2.5">
                                            <option value="16">16 - Algiers</option>
                                            <option value="31">31 - Oran</option>
                                            <option value="25">25 - Constantine</option>
                                            <option value="15">15 - Tizi Ouzou</option>
                                            <option value="09">09 - Blida</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="pt-2 border-t border-border-light">
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-sm text-text-secondary-light">Total Communes</span>
                                        <span className="text-sm font-bold text-text-primary-light">57</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-sm text-text-secondary-light">Active</span>
                                        <span className="text-sm font-bold text-green-500">52</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-sm text-text-secondary-light">Inactive</span>
                                        <span className="text-sm font-bold text-text-secondary-light">5</span>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <button className="w-full py-2.5 px-4 bg-background-light border border-border-light text-text-primary-light font-medium rounded-lg hover:bg-primary-light/10 hover:text-primary hover:border-primary/30 transition-all flex items-center justify-center gap-2 text-sm">
                                        <span className="material-symbols-outlined text-[18px]">download</span>
                                        Export ZIP List
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary/5 rounded-xl p-5 border border-primary-light/20">
                            <h4 className="font-semibold text-primary mb-2 text-sm">Did you know?</h4>
                            <p className="text-xs text-text-secondary-light leading-relaxed">
                                Setting a commune to &quot;Inactive&quot; will prevent customers from selecting it during checkout. Use this for areas currently unreachable by delivery partners.
                            </p>
                        </div>
                    </aside>

                    <div className="flex-1 w-full min-w-0">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-text-primary-light">Commune Management</h1>
                                <p className="text-text-secondary-light text-sm mt-1">Manage delivery zones and ZIP codes for Algiers.</p>
                            </div>
                            <button className="bg-primary hover:bg-primary-dark text-white text-sm font-medium py-2.5 px-5 rounded-lg shadow-lg shadow-primary-light/30 transition-all flex items-center gap-2">
                                <span className="material-symbols-outlined text-[20px]">add</span>
                                Add New Commune
                            </button>
                        </div>

                        <div className="bg-surface-light rounded-xl border border-border-light shadow-sm p-4 mb-6">
                            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                                <div className="relative w-full md:w-96">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-symbols-outlined text-text-secondary-light text-[20px]">search</span>
                                    </div>
                                    <input className="block w-full pl-10 pr-3 py-2.5 border border-border-light rounded-lg leading-5 bg-background-light placeholder:text-text-secondary-light focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm text-text-primary-light transition-colors" placeholder="Search by name or ZIP code..." type="text" />
                                </div>
                                <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                                    <label className="flex items-center gap-2 text-sm text-text-secondary-light whitespace-nowrap cursor-pointer hover:text-primary transition-colors">
                                        <input defaultChecked className="rounded border-border-light text-primary focus:ring-primary bg-background-light" type="checkbox" />
                                        Show Active
                                    </label>
                                    <label className="flex items-center gap-2 text-sm text-text-secondary-light whitespace-nowrap cursor-pointer hover:text-primary transition-colors">
                                        <input defaultChecked className="rounded border-border-light text-primary focus:ring-primary bg-background-light" type="checkbox" />
                                        Show Inactive
                                    </label>
                                    <div className="h-6 w-px bg-border-light mx-1"></div>
                                    <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-text-secondary-light bg-background-light hover:bg-primary/5 hover:text-primary rounded-lg transition-colors border border-border-light">
                                        <span className="material-symbols-outlined text-[18px]">filter_list</span>
                                        More Filters
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-surface-light rounded-xl border border-border-light shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-border-light">
                                    <thead className="bg-background-light">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary-light uppercase tracking-wider w-20" scope="col">ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary-light uppercase tracking-wider" scope="col">Commune Name (EN/AR)</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary-light uppercase tracking-wider w-32" scope="col">ZIP Code</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary-light uppercase tracking-wider w-40" scope="col">Status</th>
                                            <th className="px-6 py-3 text-right text-xs font-semibold text-text-secondary-light uppercase tracking-wider w-32" scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border-light">
                                        <tr className="hover:bg-background-light/50 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary-light">#1601</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-text-primary-light">Alger Centre</span>
                                                    <span className="text-xs text-text-secondary-light font-arabic">الجزائر الوسطى</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-background-light text-text-primary-light border border-border-light font-mono">
                                                    16001
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input defaultChecked className="sr-only peer" type="checkbox" value="" />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                                    <span className="ml-3 text-sm font-medium text-text-secondary-light group-hover:text-text-primary-light transition-colors">Active</span>
                                                </label>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button className="text-primary hover:text-primary-dark font-medium inline-flex items-center gap-1 transition-colors bg-primary/0 hover:bg-primary-light/20 px-2 py-1 rounded">
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>

                                        <tr className="hover:bg-background-light/50 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary-light">#1602</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-text-primary-light">Sidi M&apos;Hamed</span>
                                                    <span className="text-xs text-text-secondary-light font-arabic">سيدي امحمد</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-background-light text-text-primary-light border border-border-light font-mono">
                                                    16002
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input defaultChecked className="sr-only peer" type="checkbox" value="" />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                                    <span className="ml-3 text-sm font-medium text-text-secondary-light group-hover:text-text-primary-light transition-colors">Active</span>
                                                </label>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button className="text-primary hover:text-primary-dark font-medium inline-flex items-center gap-1 transition-colors bg-primary/0 hover:bg-primary-light/20 px-2 py-1 rounded">
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>

                                        <tr className="hover:bg-background-light/50 transition-colors group bg-red-50/30">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary-light">#1603</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-text-primary-light">El Madania</span>
                                                    <span className="text-xs text-text-secondary-light font-arabic">المدنية</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-background-light text-text-primary-light border border-border-light font-mono">
                                                    16003
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input className="sr-only peer" type="checkbox" value="" />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                                    <span className="ml-3 text-sm font-medium text-text-secondary-light group-hover:text-text-primary-light transition-colors">Inactive</span>
                                                </label>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button className="text-primary hover:text-primary-dark font-medium inline-flex items-center gap-1 transition-colors bg-primary/0 hover:bg-primary-light/20 px-2 py-1 rounded">
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>

                                        <tr className="hover:bg-background-light/50 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary-light">#1604</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-text-primary-light">Belouizdad</span>
                                                    <span className="text-xs text-text-secondary-light font-arabic">بلوزداد</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-background-light text-text-primary-light border border-border-light font-mono">
                                                    16004
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input defaultChecked className="sr-only peer" type="checkbox" value="" />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                                    <span className="ml-3 text-sm font-medium text-text-secondary-light group-hover:text-text-primary-light transition-colors">Active</span>
                                                </label>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button className="text-primary hover:text-primary-dark font-medium inline-flex items-center gap-1 transition-colors bg-primary/0 hover:bg-primary-light/20 px-2 py-1 rounded">
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>

                                        <tr className="hover:bg-background-light/50 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary-light">#1605</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-text-primary-light">Bab El Oued</span>
                                                    <span className="text-xs text-text-secondary-light font-arabic">باب الواد</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-background-light text-text-primary-light border border-border-light font-mono">
                                                    16005
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input defaultChecked className="sr-only peer" type="checkbox" value="" />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                                    <span className="ml-3 text-sm font-medium text-text-secondary-light group-hover:text-text-primary-light transition-colors">Active</span>
                                                </label>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button className="text-primary hover:text-primary-dark font-medium inline-flex items-center gap-1 transition-colors bg-primary/0 hover:bg-primary-light/20 px-2 py-1 rounded">
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>

                                        <tr className="hover:bg-background-light/50 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary-light">#1606</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-text-primary-light">Casbah</span>
                                                    <span className="text-xs text-text-secondary-light font-arabic">القصبة</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-background-light text-text-primary-light border border-border-light font-mono">
                                                    16006
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input defaultChecked className="sr-only peer" type="checkbox" value="" />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                                    <span className="ml-3 text-sm font-medium text-text-secondary-light group-hover:text-text-primary-light transition-colors">Active</span>
                                                </label>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button className="text-primary hover:text-primary-dark font-medium inline-flex items-center gap-1 transition-colors bg-primary/0 hover:bg-primary-light/20 px-2 py-1 rounded">
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="bg-background-light px-4 py-3 flex items-center justify-between border-t border-border-light sm:px-6">
                                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-text-secondary-light">
                                            Showing <span className="font-medium text-text-primary-light">1</span> to <span className="font-medium text-text-primary-light">6</span> of <span className="font-medium text-text-primary-light">57</span> results
                                        </p>
                                    </div>
                                    <div>
                                        <nav aria-label="Pagination" className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                            <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-border-light bg-surface-light text-sm font-medium text-text-secondary-light hover:bg-background-light">
                                                <span className="sr-only">Previous</span>
                                                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                                            </button>
                                            <button aria-current="page" className="z-10 bg-primary/10 border-primary text-primary relative inline-flex items-center px-4 py-2 border text-sm font-medium">1</button>
                                            <button className="bg-surface-light border-border-light text-text-secondary-light hover:bg-background-light relative inline-flex items-center px-4 py-2 border text-sm font-medium">2</button>
                                            <button className="bg-surface-light border-border-light text-text-secondary-light hover:bg-background-light hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium">3</button>
                                            <span className="relative inline-flex items-center px-4 py-2 border border-border-light bg-surface-light text-sm font-medium text-text-secondary-light">...</span>
                                            <button className="bg-surface-light border-border-light text-text-secondary-light hover:bg-background-light hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium">8</button>
                                            <button className="bg-surface-light border-border-light text-text-secondary-light hover:bg-background-light relative inline-flex items-center px-4 py-2 border text-sm font-medium">9</button>
                                            <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-border-light bg-surface-light text-sm font-medium text-text-secondary-light hover:bg-background-light">
                                                <span className="sr-only">Next</span>
                                                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                                            </button>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="mt-auto border-t border-border-light bg-surface-light py-6 px-6">
                <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 text-text-secondary-light text-xs">
                        <span>© 2024 Electro Mart Admin Panel. v2.3.1</span>
                    </div>
                    <div className="flex gap-6 text-xs">
                        <Link className="text-text-secondary-light hover:text-primary" href="#">Documentation</Link>
                        <Link className="text-text-secondary-light hover:text-primary" href="#">Support</Link>
                        <Link className="text-text-secondary-light hover:text-primary" href="#">Server Status</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
