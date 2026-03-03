import { createSupabaseServerClient } from '@/lib/supabase-server';

export class CartService {
    static async addToCart(userId: string, productId: string, quantity: number = 1) {
        const supabase = await createSupabaseServerClient();

        // 1. Check if the item is already in the cart
        const { data: existingItem, error: fetchError } = await supabase
            .from('cart')
            .select('id, quantity')
            .eq('user_id', userId)
            .eq('product_id', productId)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
            // PGRST116 means zero rows returned (which is fine if it's new)
            throw fetchError;
        }

        if (existingItem) {
            // 2. Update existing quantity
            const { data, error } = await supabase
                .from('cart')
                .update({ quantity: existingItem.quantity + quantity })
                .eq('id', existingItem.id)
                .select();
            if (error) throw error;
            return data;
        } else {
            // 3. Insert new item
            const { data, error } = await supabase
                .from('cart')
                .insert([{ user_id: userId, product_id: productId, quantity }])
                .select();
            if (error) throw error;
            return data;
        }
    }

    static async getCart(userId: string) {
        const supabase = await createSupabaseServerClient();
        const { data, error } = await supabase
            .from('cart')
            .select(`
                id,
                quantity,
                product_id,
                products (
                    name,
                    price,
                    images
                )
            `)
            .eq('user_id', userId);

        if (error) throw error;
        return data;
    }
}
