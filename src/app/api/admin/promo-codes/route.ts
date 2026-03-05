import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

async function getSupabase() {
    const cookieStore = await cookies();
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) { return cookieStore.get(name)?.value; },
                set(name: string, value: string, options: any) {
                    try { cookieStore.set({ name, value, ...options }); } catch { }
                },
                remove(name: string, options: any) {
                    try { cookieStore.set({ name, value: '', ...options }); } catch { }
                },
            },
        }
    );
}

// GET — list all promo codes
export async function GET() {
    try {
        const supabase = await getSupabase();
        const { data, error } = await supabase
            .from('promo_codes')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return NextResponse.json({ codes: data || [] });
    } catch (err: any) {
        return NextResponse.json({ error: 'Failed to fetch promo codes' }, { status: 500 });
    }
}

// POST — create new promo code
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { code, description, discount_type, discount_value, min_order_amount, max_uses, is_active, expires_at } = body;

        if (!code || !discount_type || !discount_value) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const supabase = await getSupabase();
        const { data, error } = await supabase
            .from('promo_codes')
            .insert([{ code: code.toUpperCase(), description, discount_type, discount_value, min_order_amount: min_order_amount || 0, max_uses: max_uses || null, is_active: is_active ?? true, expires_at: expires_at || null }])
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json({ code: data });
    } catch (err: any) {
        if (err?.code === '23505') {
            return NextResponse.json({ error: 'Ce code existe déjà' }, { status: 409 });
        }
        return NextResponse.json({ error: 'Failed to create promo code' }, { status: 500 });
    }
}

// PUT — update existing promo code
export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, code, description, discount_type, discount_value, min_order_amount, max_uses, is_active, expires_at } = body;
        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        const supabase = await getSupabase();
        const { data, error } = await supabase
            .from('promo_codes')
            .update({ code: code.toUpperCase(), description, discount_type, discount_value, min_order_amount: min_order_amount || 0, max_uses: max_uses || null, is_active, expires_at: expires_at || null })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json({ code: data });
    } catch (err: any) {
        return NextResponse.json({ error: 'Failed to update promo code' }, { status: 500 });
    }
}

// DELETE — remove promo code
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        const supabase = await getSupabase();
        const { error } = await supabase.from('promo_codes').delete().eq('id', id);
        if (error) throw error;
        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: 'Failed to delete promo code' }, { status: 500 });
    }
}
