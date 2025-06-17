
-- Add missing columns to match the UI requirements (skip if they already exist)
DO $$ 
BEGIN
    -- Add address column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'reports' AND column_name = 'address') THEN
        ALTER TABLE public.reports ADD COLUMN address TEXT;
    END IF;
    
    -- Add status column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'reports' AND column_name = 'status') THEN
        ALTER TABLE public.reports ADD COLUMN status TEXT DEFAULT 'completed' CHECK (status IN ('completed', 'processing', 'failed'));
    END IF;
    
    -- Add report_type column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'reports' AND column_name = 'report_type') THEN
        ALTER TABLE public.reports ADD COLUMN report_type TEXT DEFAULT 'Property Analysis';
    END IF;
    
    -- Add generated_date column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'reports' AND column_name = 'generated_date') THEN
        ALTER TABLE public.reports ADD COLUMN generated_date DATE DEFAULT CURRENT_DATE;
    END IF;
END $$;

-- Enable RLS if not already enabled
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Create policies only if they don't exist
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
    
    -- Check and create "Users can delete their own reports" policy
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'reports' AND policyname = 'Users can delete their own reports') THEN
        EXECUTE 'CREATE POLICY "Users can delete their own reports" ON public.reports FOR DELETE USING (auth.uid() = user_id)';
    END IF;
END $$;
