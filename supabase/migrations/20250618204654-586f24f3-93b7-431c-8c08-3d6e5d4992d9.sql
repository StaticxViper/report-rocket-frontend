
-- First, add new columns without constraints
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS trial_start_date TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS trial_end_date TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS is_trial_active BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'trial_pending';

-- Create functions first (these don't lock tables)
CREATE OR REPLACE FUNCTION public.start_trial_period(user_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.profiles 
  SET 
    trial_start_date = NOW(),
    trial_end_date = NOW() + INTERVAL '14 days',
    is_trial_active = true,
    subscription_status = 'trial_active',
    subscription_tier = 'expert',
    max_reports_per_month = 999
  WHERE id = user_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.is_trial_expired(user_id UUID)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  profile_record RECORD;
BEGIN
  SELECT trial_end_date, is_trial_active 
  INTO profile_record 
  FROM public.profiles 
  WHERE id = user_id;
  
  IF profile_record.trial_end_date IS NULL OR NOT profile_record.is_trial_active THEN
    RETURN false;
  END IF;
  
  RETURN NOW() > profile_record.trial_end_date;
END;
$$;
