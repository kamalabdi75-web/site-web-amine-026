import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useCart() {
    const [itemCount, setItemCount] = useState(0);
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCartCount = async () => {
        try {
            setIsLoading(true);
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                // Handle guest cart from localStorage
                if (typeof window === 'undefined') {
                    setCartItems([]);
                    setItemCount(0);
                    setIsLoading(false);
                    return;
                }
                const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');

                // For guest cart, we need to fetch product details if we want to show them
                if (guestCart.length > 0) {
                    const productIds = guestCart.map((item: any) => item.product_id);
                    const { data: products, error: productsError } = await supabase
                        .from('products')
                        .select('id, name, price, images, image')
                        .in('id', productIds);

                    if (!productsError && products) {
                        const itemsWithProducts = guestCart.map((item: any) => ({
                            ...item,
                            products: products.find(p => p.id === item.product_id)
                        })).filter((item: any) => item.products); // Remove items whose products weren't found

                        setCartItems(itemsWithProducts);
                        const total = itemsWithProducts.reduce((acc: number, item: any) => acc + item.quantity, 0);
                        setItemCount(total);
                    } else {
                        setCartItems([]);
                        setItemCount(0);
                    }
                } else {
                    setCartItems([]);
                    setItemCount(0);
                }
                return;
            }

            const { data, error } = await supabase
                .from('cart')
                .select(`
                    id,
                    quantity,
                    product_id,
                    products (
                        id,
                        name,
                        price,
                        images,
                        image
                    )
                `)
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;

            const total = data.reduce((acc, item) => acc + item.quantity, 0);

            setCartItems(data);
            setItemCount(total);
        } catch (error) {
            console.error('Error fetching cart count:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Initial fetch
        fetchCartCount();

        // Listen for custom add-to-cart events
        const handleCartUpdated = () => fetchCartCount();
        window.addEventListener('cartUpdated', handleCartUpdated);

        // Also listen for storage events if other tabs change the cart
        window.addEventListener('storage', (e) => {
            if (e.key === 'guestCart') handleCartUpdated();
        });

        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdated);
            window.removeEventListener('storage', handleCartUpdated);
        };
    }, []);

    return { itemCount, cartItems, isLoading, refreshCart: fetchCartCount };
}
