import { NextRequest, NextResponse } from 'next/server';
import { CartController } from '@/controllers/CartController';
import { createSupabaseServerClient } from '@/lib/supabase-server';

// POST /api/cart
// Adds an item to the cart
export async function POST(req: NextRequest) {
    const supabase = await createSupabaseServerClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return await CartController.handleAddToCart(req, user.id);
}

// GET /api/cart
// Gets user's cart items
export async function GET(req: NextRequest) {
    const supabase = await createSupabaseServerClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return await CartController.handleGetCart(req, user.id);
}
