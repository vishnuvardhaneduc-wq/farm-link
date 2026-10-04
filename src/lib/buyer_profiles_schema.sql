-- ==============================================================================
-- FARMLINK / KRISHISETU - BUYER DATABASE SCHEMA & ROW LEVEL SECURITY (RLS)
-- ==============================================================================

-- 1. Create buyer_profiles table linked to auth.users
CREATE TABLE IF NOT EXISTS public.buyer_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    buyer_id VARCHAR(50),
    org_name VARCHAR(255) NOT NULL,
    business_type VARCHAR(100) NOT NULL,
    contact_person VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    state VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index on user_id for high performance single lookups
CREATE INDEX IF NOT EXISTS idx_buyer_profiles_user_id ON public.buyer_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_buyer_profiles_email ON public.buyer_profiles(email);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.buyer_profiles ENABLE ROW LEVEL SECURITY;

-- 3. Row Level Security Policies (Strictly scoped to auth.uid() = user_id)

-- Buyer can INSERT only their own profile
CREATE POLICY "Buyer can INSERT only their own profile"
    ON public.buyer_profiles
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Buyer can SELECT only their own profile
CREATE POLICY "Buyer can SELECT only their own profile"
    ON public.buyer_profiles
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- Buyer can UPDATE only their own profile
CREATE POLICY "Buyer can UPDATE only their own profile"
    ON public.buyer_profiles
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Buyer can DELETE only their own profile
CREATE POLICY "Buyer can DELETE only their own profile"
    ON public.buyer_profiles
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);
