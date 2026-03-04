CREATE TABLE public.brands (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text,
    image_url text NOT NULL,
    width integer DEFAULT 120,
    height integer DEFAULT 60,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Turn on RLS
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to select brands
CREATE POLICY "Allow public read access to brands" ON public.brands FOR SELECT USING (true);

-- Allow anonymous users to insert brands
CREATE POLICY "Allow public insert to brands" ON public.brands FOR INSERT WITH CHECK (true);

-- Allow anonymous users to delete brands
CREATE POLICY "Allow public delete to brands" ON public.brands FOR DELETE USING (true);
