import { NextRequest, NextResponse } from 'next/server';
import { CartService } from '@/services/CartService';

export class CartController {
    static async handleAddToCart(req: NextRequest, userId: string) {
        try {
            const body = await req.json();
            const { productId, quantity } = body;

            if (!productId) {
                return NextResponse.json({ error: 'Product ID missing' }, { status: 400 });
            }

            const data = await CartService.addToCart(userId, productId, quantity || 1);

            return NextResponse.json({ success: true, cart: data }, { status: 200 });
        } catch (error: any) {
            console.error('Error adding to cart:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }

    static async handleGetCart(req: NextRequest, userId: string) {
        try {
            const data = await CartService.getCart(userId);
            return NextResponse.json({ success: true, cart: data }, { status: 200 });
        } catch (error: any) {
            console.error('Error getting cart:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
}
