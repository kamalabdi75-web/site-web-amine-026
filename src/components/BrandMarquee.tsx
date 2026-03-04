import { supabase } from "@/lib/supabase";

export default async function BrandMarquee() {
    // Fetch brands
    const { data: brands } = await supabase
        .from('brands')
        .select('*')
        .order('order_index', { ascending: true });

    // Fetch settings
    const { data: settings } = await supabase
        .from('store_settings')
        .select('brand_marquee_height, brand_marquee_speed')
        .eq('id', 1)
        .single();

    if (!brands || brands.length === 0) {
        return null;
    }

    const height = settings?.brand_marquee_height || 80;
    const speed = settings?.brand_marquee_speed || 30;

    // We duplicate the array to create a seamless infinite scroll effect
    const marqueeBrands = [...brands, ...brands, ...brands];

    return (
        <div className="w-full overflow-hidden bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-6 relative flex items-center group">

            {/* Left/Right Fade Gradient overlays for a polished look */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>

            <div
                className="flex items-center gap-16 md:gap-24 animate-marquee group-hover:[animation-play-state:paused] transition-all"
                style={{
                    '--marquee-duration': `${speed}s`,
                    'whiteSpace': 'nowrap',
                    'willChange': 'transform'
                } as React.CSSProperties}
            >
                {marqueeBrands.map((brand, index) => (
                    <div
                        key={`${brand.id}-${index}`}
                        className="flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                        style={{ height: `${height}px` }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={brand.image_url}
                            alt={brand.name}
                            style={{ maxHeight: '100%', maxWidth: '200px', objectFit: 'contain' }}
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-100% / 3)); }
                }
                .animate-marquee {
                    animation: marquee var(--marquee-duration) linear infinite;
                    width: max-content;
                }
            `}} />
        </div>
    );
}
