-- DESTRUCTIVE: Uncomment these if you want to wipe existing tables first
-- DROP TABLE IF EXISTS public.blogs CASCADE;
-- DROP TABLE IF EXISTS public.categories CASCADE;
-- DROP TABLE IF EXISTS public.contacts CASCADE;
-- DROP TABLE IF EXISTS public.admins CASCADE;

-- 1. Create Categories table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create Blogs table (migrated from posts)
CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt TEXT,
    image_url TEXT,
    author TEXT DEFAULT 'Admin',
    category_id UUID REFERENCES public.categories(id),
    tags TEXT[],
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Create Contacts table (migrated from contact_messages)
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread', -- unread, read
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Create Admins table (extended metadata for Auth users)
CREATE TABLE IF NOT EXISTS public.admins (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    role TEXT DEFAULT 'admin', -- admin, editor
    created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS POLICIES --

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Categories: Public read-only
-- DROP POLICY IF EXISTS "Allow public read-only for categories" ON public.categories;
CREATE POLICY "Allow public read-only for categories" ON public.categories FOR SELECT TO public USING (true);
CREATE POLICY "Allow admin all for categories" ON public.categories FOR ALL TO authenticated USING (auth.uid() IN (SELECT id FROM public.admins));

-- Blogs: Public read-only for published ones
CREATE POLICY "Allow public read-only for published blogs" ON public.blogs FOR SELECT TO public USING (published = true);
CREATE POLICY "Allow admin all for blogs" ON public.blogs FOR ALL TO authenticated USING (auth.uid() IN (SELECT id FROM public.admins));

-- Contacts: Public can insert
-- DROP POLICY IF EXISTS "Allow public insert for contacts" ON public.contacts;
CREATE POLICY "Allow public insert for contacts" ON public.contacts FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow admin select/delete for contacts" ON public.contacts FOR ALL TO authenticated USING (auth.uid() IN (SELECT id FROM public.admins));

-- Admins: Only admins can see admins
CREATE POLICY "Allow admins to see admins" ON public.admins FOR SELECT TO authenticated USING (auth.uid() IN (SELECT id FROM public.admins));

-- Trigger for updated_at in blogs
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON public.blogs FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
