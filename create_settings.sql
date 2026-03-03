-- 1. Create the website_settings table
CREATE TABLE IF NOT EXISTS public.website_settings (
    id smallint PRIMARY KEY DEFAULT 1,
    logo_url text,
    logo_width integer DEFAULT 40,
    logo_height integer DEFAULT 40,
    logo_position text DEFAULT 'left',
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    -- Constraint to ensure only one row exists (id = 1)
    CONSTRAINT website_settings_single_row CHECK (id = 1)
);

-- 2. Insert default row if not exists
INSERT INTO public.website_settings (id, logo_position) 
VALUES (1, 'left')
ON CONFLICT (id) DO NOTHING;

-- 3. Enable RLS
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;

-- 4. Create Policies
-- Allow public read access to settings
CREATE POLICY "Public profiles are viewable by everyone." 
ON public.website_settings FOR SELECT 
USING ( true );

-- Allow authenticated users to update (assuming admin dashboard is protected, or all authenticated users are admins in this setup)
CREATE POLICY "Users can update settings." 
ON public.website_settings FOR UPDATE 
USING ( true )
WITH CHECK ( true );

-- 5. Create storage bucket for logos (if it doesn't exist)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('logos', 'logos', true)
ON CONFLICT (id) DO NOTHING;

-- 6. Storage Policies for 'logos' bucket
-- Allow public read
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'logos' );

-- Allow authenticated uploads
CREATE POLICY "Authenticated users can upload logos" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'logos' AND auth.role() = 'authenticated' );

-- Allow authenticated updates
CREATE POLICY "Authenticated users can update logos" 
ON storage.objects FOR UPDATE 
USING ( bucket_id = 'logos' AND auth.role() = 'authenticated' );

-- Allow authenticated deletes
CREATE POLICY "Authenticated users can delete logos" 
ON storage.objects FOR DELETE 
USING ( bucket_id = 'logos' AND auth.role() = 'authenticated' );
