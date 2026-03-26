# Supabase Setup Guide for Sapwebs

This guide will help you set up Supabase as the backend for your Sapwebs corporate website.

## Prerequisites

1. Supabase account at https://app.supabase.com
2. Your Supabase project URL and API keys (already in `.env.local`)
3. Admin access to your Supabase project

## Step 1: Set Up Database Tables

Go to your Supabase project dashboard and navigate to SQL Editor. Run the following SQL scripts:

### 1.1 Create Posts Table

```sql
-- Create posts table for blog content
create table public.posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  featured_image text,
  category text,
  tags text[] default array[]::text[],
  author_id uuid not null,
  status text default 'draft'::text not null check (status in ('draft', 'published')),
  seo_meta_title text,
  seo_meta_description text,
  seo_keywords text[] default array[]::text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  published_at timestamp with time zone
);

-- Create indexes
create index posts_slug_idx on public.posts(slug);
create index posts_status_idx on public.posts(status);
create index posts_author_id_idx on public.posts(author_id);
create index posts_published_at_idx on public.posts(published_at);

-- Enable RLS
alter table public.posts enable row level security;
```

### 1.2 Create Contact Messages Table

```sql
-- Create contact messages table
create table public.contact_messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text,
  service text,
  message text not null,
  status text default 'new'::text not null check (status in ('new', 'read', 'resolved')),
  ip_address text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes
create index contact_messages_email_idx on public.contact_messages(email);
create index contact_messages_status_idx on public.contact_messages(status);
create index contact_messages_created_at_idx on public.contact_messages(created_at);

-- Enable RLS
alter table public.contact_messages enable row level security;
```

### 1.3 Create Admin Users Table (Extension of Auth Users)

```sql
-- Create admin users table (linked to auth.users)
create table public.admin_users (
  id uuid primary key references auth.users on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  role text default 'editor'::text not null check (role in ('admin', 'editor')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  last_login_at timestamp with time zone
);

-- Enable RLS
alter table public.admin_users enable row level security;
```

## Step 2: Set Up Row Level Security (RLS) Policies

### 2.1 Posts Table Policies

```sql
-- Allow anyone to read published posts
create policy "published_posts_anyone" on public.posts
  for select using (status = 'published');

-- Allow authenticated users to read their own draft posts
create policy "draft_posts_owner" on public.posts
  for select using (
    auth.uid() = author_id and status = 'draft'
  );

-- Allow authenticated users to insert their own posts
create policy "insert_own_posts" on public.posts
  for insert with check (auth.uid() = author_id);

-- Allow authenticated users to update their own posts
create policy "update_own_posts" on public.posts
  for update using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

-- Allow authenticated users to delete their own posts
create policy "delete_own_posts" on public.posts
  for delete using (auth.uid() = author_id);
```

### 2.2 Contact Messages Table Policies

```sql
-- Allow anonymous users to insert contact messages
create policy "insert_contact_messages" on public.contact_messages
  for insert with check (true);

-- Allow authenticated admins to read all contact messages
create policy "admins_read_messages" on public.contact_messages
  for select using (
    auth.role() = 'authenticated' and
    exists (
      select 1 from public.admin_users 
      where id = auth.uid() and role = 'admin'
    )
  );

-- Allow authenticated admins to update contact messages
create policy "admins_update_messages" on public.contact_messages
  for update using (
    auth.role() = 'authenticated' and
    exists (
      select 1 from public.admin_users 
      where id = auth.uid() and role = 'admin'
    )
  ) with check (
    auth.role() = 'authenticated' and
    exists (
      select 1 from public.admin_users 
      where id = auth.uid() and role = 'admin'
    )
  );

-- Allow authenticated admins to delete contact messages
create policy "admins_delete_messages" on public.contact_messages
  for delete using (
    auth.role() = 'authenticated' and
    exists (
      select 1 from public.admin_users 
      where id = auth.uid() and role = 'admin'
    )
  );
```

### 2.3 Admin Users Table Policies

```sql
-- Allow authenticated users to read their own profile
create policy "users_read_own_profile" on public.admin_users
  for select using (auth.uid() = id);

-- Allow authenticated admins to read all profiles
create policy "admins_read_all_profiles" on public.admin_users
  for select using (
    auth.role() = 'authenticated' and
    exists (
      select 1 from public.admin_users 
      where id = auth.uid() and role = 'admin'
    )
  );
```

## Step 3: Create Supabase Auth Users

1. Go to your Supabase project → Authentication → Users
2. Click "Add user"
3. Create an admin user with:
   - Email: your-admin-email@example.com
   - Password: (use a strong password)
4. Note the User ID (UUID)

## Step 4: Add Admin User to admin_users Table

In Supabase SQL Editor, run:

```sql
insert into public.admin_users (id, email, full_name, role)
values (
  'YOUR_USER_ID_HERE', 
  'your-admin-email@example.com',
  'Your Name',
  'admin'
);
```

Replace `YOUR_USER_ID_HERE` with the UUID from Step 3.

## Step 5: Environment Variables

Verify these are in your `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key  # (optional, for server-side operations)
```

- Get these from Supabase project settings → API
- Keep `SUPABASE_SERVICE_ROLE_KEY` secret (never expose in client code)

## Step 6: Test the Setup

1. Start your dev server: `npm run dev`
2. Navigate to `http://localhost:3000/admin/login`
3. Login with the admin email and password from Step 3
4. You should see the admin dashboard
5. Try creating a blog post
6. Test the contact form on the homepage

## Security Best Practices

✅ **Implemented:**
- Row Level Security (RLS) policies
- Service role key for server-side operations
- Rate limiting on contact form
- Input validation on all endpoints
- Environment variables for secrets

⚠️ **Additional Considerations:**
- Never expose `SUPABASE_SERVICE_ROLE_KEY` in client code
- Always validate and sanitize user inputs server-side
- Keep Supabase auth tokens secure (automatic with Supabase client)
- Consider adding email verification for new admin users
- Implement CSRF protection for forms if needed

## Useful SQL Queries

Check posts count:
```sql
select count(*) from public.posts where status = 'published';
```

Check recent contact messages:
```sql
select name, email, created_at from public.contact_messages order by created_at desc limit 10;
```

Get admin users:
```sql
select id, email, role, created_at from public.admin_users;
```

Delete old contact messages (older than 90 days):
```sql
delete from public.contact_messages where created_at < now() - interval '90 days';
```

## Next Steps

1. Set up blog post creation in admin dashboard
2. Implement blog page with published posts
3. Create dynamic blog detail pages by slug
4. Add email notifications for new contact messages
5. Set up automated backups
6. Consider CDN for featured images

## Support

- Supabase Docs: https://supabase.com/docs
- API Reference: https://supabase.com/docs/reference/javascript/introduction
- Auth: https://supabase.com/docs/guides/auth
