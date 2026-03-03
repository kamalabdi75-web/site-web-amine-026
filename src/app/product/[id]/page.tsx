import { notFound, redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ProductHeader from "@/components/ProductHeader";
import ProductFooter from "@/components/ProductFooter";
import ProductGallery from "./ProductGallery";
import AddToCartAction from "./AddToCartAction";
import Link from "next/link";
import EditProductButton from "./EditProductButton";
import RecentProducts from "./RecentProducts";

export const revalidate = 60; // optionally revalidate every 60 seconds

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Fetch product details
    const { data: product, error } = await supabase
        .from('products')
        .select(`
            *,
            categories (name),
            subcategories (name)
        `)
        .eq('id', id)
        .single();

    if (error || !product) {
        return notFound();
    }

    return (
        <div className="bg-background-light dark:bg-background-dark text-text-main font-sans min-h-screen flex flex-col">
            <ProductHeader />

            <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <Link href="/product" className="hover:text-primary transition-colors">Produits</Link>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        {product.categories?.name && (
                            <>
                                <Link href={`/product?category=${product.category_id}`} className="hover:text-primary transition-colors">{product.categories.name}</Link>
                                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            </>
                        )}
                        <span className="text-slate-900 dark:text-slate-200 font-medium line-clamp-1">{product.name}</span>
                    </div>

                    <EditProductButton productId={product.id} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24 bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-12 shadow-sm border border-slate-100 dark:border-slate-800">
                    {/* Left Column: Interactive Image Gallery */}
                    <div className="w-full">
                        <ProductGallery
                            images={product.images || []}
                            fallbackImage={product.image || "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=400&auto=format"}
                            productName={product.name}
                        />
                    </div>

                    {/* Right Column: Product Info & Actions */}
                    <div className="flex flex-col">
                        <div className="mb-2">
                            <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-lg mb-4">
                                {product.brand || "ElectroMart"}
                            </span>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4">
                                {product.name}
                            </h1>

                            {/* Ratings (Static for now, but ready for dynamic integration) */}
                            <div className="flex items-center gap-2 mb-6">
                                <div className="flex text-yellow-400">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span key={star} className={`material-symbols-outlined ${product.rating >= star ? 'fill-current' : 'text-slate-200 dark:text-slate-700'}`}>
                                            star
                                        </span>
                                    ))}
                                </div>
                                <span className="text-slate-500 font-medium">{product.rating || 0}/5</span>
                            </div>

                            <div className="flex flex-col gap-1 mb-8">
                                {product.original_price && (
                                    <span className="text-slate-400 text-lg line-through font-medium">
                                        {product.original_price.toLocaleString()} DA
                                    </span>
                                )}
                                <span className="text-primary text-4xl lg:text-5xl font-black">
                                    {product.price?.toLocaleString()} DA
                                </span>
                            </div>
                        </div>

                        <div className="w-full h-px bg-slate-100 dark:bg-slate-800 my-6"></div>

                        {/* Interactive Add to Cart Component */}
                        <div className="mb-8">
                            <AddToCartAction
                                productId={product.id}
                                stock={product.stock}
                                price={product.price}
                            />
                        </div>

                        <div className="w-full h-px bg-slate-100 dark:bg-slate-800 my-6"></div>

                        {/* Description block */}
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">À propos de ce produit</h3>
                            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed">
                                {product.description ? (
                                    <p className="whitespace-pre-line">{product.description}</p>
                                ) : (
                                    <p>Aucune description détaillée n'est disponible pour ce produit pour le moment.</p>
                                )}
                            </div>
                        </div>

                        {/* Specifications block */}
                        {product.specifications && (
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Spécifications techniques</h3>
                                <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    <p className="whitespace-pre-line text-sm">{product.specifications}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Products Section */}
                <RecentProducts currentProductId={product.id} />
            </main>

            <ProductFooter />
        </div>
    );
}
