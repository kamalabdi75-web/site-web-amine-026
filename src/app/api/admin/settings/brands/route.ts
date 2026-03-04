import { NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    get(name: string) {
                        return cookieStore.get(name)?.value;
                    },
                },
            }
        );

        // Fetch settings
        const { data: settingsData, error: settingsError } = await supabase
            .from('store_settings')
            .select('*')
            .eq('id', 1)
            .single();

        if (settingsError) throw settingsError;

        // Fetch brands ordered by order_index
        const { data: brandsData, error: brandsError } = await supabase
            .from('brands')
            .select('*')
            .order('order_index', { ascending: true });

        if (brandsError) throw brandsError;

        return NextResponse.json({
            settings: settingsData,
            brands: brandsData
        });

    } catch (err) {
        console.error('Error fetching brand settings:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { action, payload } = await request.json();

        const cookieStore = await cookies();
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    get(name: string) {
                        return cookieStore.get(name)?.value;
                    },
                    set(name: string, value: string, options: CookieOptions) {
                        try { cookieStore.set({ name, value, ...options }) } catch (error) { }
                    },
                    remove(name: string, options: CookieOptions) {
                        try { cookieStore.set({ name, value: '', ...options }) } catch (error) { }
                    },
                },
            }
        );

        // Verify session (Admin only)
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (action === 'update_settings') {
            const { brand_marquee_height, brand_marquee_speed } = payload;

            const { error } = await supabase
                .from('store_settings')
                .update({ brand_marquee_height, brand_marquee_speed })
                .eq('id', 1);

            if (error) throw error;
            return NextResponse.json({ success: true });
        }

        else if (action === 'add_brand') {
            const { name, image_url, order_index } = payload;

            const { error } = await supabase
                .from('brands')
                .insert([{ name, image_url, order_index }]);

            if (error) throw error;
            return NextResponse.json({ success: true });
        }

        else if (action === 'delete_brand') {
            const { id } = payload;

            const { error } = await supabase
                .from('brands')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

    } catch (err) {
        console.error('Error updating brand settings:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
