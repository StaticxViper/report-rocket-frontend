
-- Check and create policies only if they don't exist for profiles table
DO $$ 
BEGIN
    -- Check and create "Users can view their own profile" policy
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can view their own profile') THEN
        EXECUTE 'CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id)';
    END IF;
    
    -- Check and create "Users can update their own profile" policy
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can update their own profile') THEN
        EXECUTE 'CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id)';
    END IF;
    
    -- Check and create "Users can insert their own profile" policy
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can insert their own profile') THEN
        EXECUTE 'CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id)';
    END IF;
END $$;

-- Check and create policies only if they don't exist for reports table
DO $$ 
BEGIN
    -- Check and create "Users can view their own reports" policy
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'reports' AND policyname = 'Users can view their own reports') THEN
        EXECUTE 'CREATE POLICY "Users can view their own reports" ON public.reports FOR SELECT USING (auth.uid() = user_id)';
    END IF;
    
    -- Check and create "Users can insert their own reports" policy
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'reports' AND policyname = 'Users can insert their own reports') THEN
        EXECUTE 'CREATE POLICY "Users can insert their own reports" ON public.reports FOR INSERT WITH CHECK (auth.uid() = user_id)';
    END IF;
    
    -- Check and create "Users can update their own reports" policy
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'reports' AND policyname = 'Users can update their own reports') THEN
        EXECUTE 'CREATE POLICY "Users can update their own reports" ON public.reports FOR UPDATE USING (auth.uid() = user_id)';
    END IF;
    
    -- Check and create "Users can delete their own reports" policy
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'reports' AND policyname = 'Users can delete their own reports') THEN
        EXECUTE 'CREATE POLICY "Users can delete their own reports" ON public.reports FOR DELETE USING (auth.uid() = user_id)';
    END IF;
END $$;

-- Check and create policies only if they don't exist for payment_info table
DO $$ 
BEGIN
    -- Check and create "Users can view their own payment info" policy
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'payment_info' AND policyname = 'Users can view their own payment info') THEN
        EXECUTE 'CREATE POLICY "Users can view their own payment info" ON public.payment_info FOR SELECT USING (auth.uid() = user_id)';
    END IF;
    
    -- Check and create "Users can insert their own payment info" policy
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'payment_info' AND policyname = 'Users can insert their own payment info') THEN
        EXECUTE 'CREATE POLICY "Users can insert their own payment info" ON public.payment_info FOR INSERT WITH CHECK (auth.uid() = user_id)';
    END IF;
    
    -- Check and create "Users can update their own payment info" policy
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'payment_info' AND policyname = 'Users can update their own payment info') THEN
        EXECUTE 'CREATE POLICY "Users can update their own payment info" ON public.payment_info FOR UPDATE USING (auth.uid() = user_id)';
    END IF;
    
    -- Check and create "Users can delete their own payment info" policy
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'payment_info' AND policyname = 'Users can delete their own payment info') THEN
        EXECUTE 'CREATE POLICY "Users can delete their own payment info" ON public.payment_info FOR DELETE USING (auth.uid() = user_id)';
    END IF;
END $$;
