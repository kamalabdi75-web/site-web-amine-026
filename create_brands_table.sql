-- Table for managing brand logos
CREATE TABLE public.brands (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    image_url text NOT NULL,
    order_index integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table for managing global settings (like marquee dimensions)
CREATE TABLE public.store_settings (
    id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1), -- Only allow one row
    brand_marquee_height integer DEFAULT 80 NOT NULL,
    brand_marquee_speed integer DEFAULT 30 NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert default settings row if it doesn't exist
INSERT INTO public.store_settings (id, brand_marquee_height, brand_marquee_speed)
VALUES (1, 80, 30)
ON CONFLICT (id) DO NOTHING;

-- Turn on RLS for brands
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;

-- Allow public read access to brands
CREATE POLICY "Allow public read access to brands" ON public.brands FOR SELECT USING (true);
CREATE POLICY "Allow admin all access to brands" ON public.brands FOR ALL USING (true) WITH CHECK (true);

-- Turn on RLS for store_settings
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to settings
CREATE POLICY "Allow public read access to settings" ON public.store_settings FOR SELECT USING (true);
CREATE POLICY "Allow admin all access to settings" ON public.store_settings FOR ALL USING (true) WITH CHECK (true);
