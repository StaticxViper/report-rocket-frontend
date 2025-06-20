
-- Create payment_info table to store user payment information
CREATE TABLE public.payment_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  cardholder_name TEXT NOT NULL,
  card_last_four TEXT NOT NULL,
  card_type TEXT NOT NULL,
  billing_address_line1 TEXT NOT NULL,
  billing_address_line2 TEXT,
  billing_city TEXT NOT NULL,
  billing_state TEXT NOT NULL,
  billing_zip TEXT NOT NULL,
  billing_country TEXT NOT NULL DEFAULT 'US',
  is_default BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for payment_info
ALTER TABLE public.payment_info ENABLE ROW LEVEL SECURITY;

-- Create policies for payment_info
CREATE POLICY "Users can view own payment info" ON public.payment_info
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own payment info" ON public.payment_info
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own payment info" ON public.payment_info
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own payment info" ON public.payment_info
  FOR DELETE USING (auth.uid() = user_id);

-- Update reports table to include detailed property investment fields
ALTER TABLE public.reports 
ADD COLUMN IF NOT EXISTS property_address TEXT,
ADD COLUMN IF NOT EXISTS purchase_price DECIMAL(12,2),
ADD COLUMN IF NOT EXISTS cap_rate DECIMAL(5,2),
ADD COLUMN IF NOT EXISTS monthly_rent DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS annual_property_taxes DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS annual_insurance DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS hoa_fees DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS maintenance_costs DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS vacancy_rate DECIMAL(5,2),
ADD COLUMN IF NOT EXISTS property_mgmt_fee DECIMAL(5,2),
ADD COLUMN IF NOT EXISTS loan_amount DECIMAL(12,2),
ADD COLUMN IF NOT EXISTS interest_rate DECIMAL(5,3),
ADD COLUMN IF NOT EXISTS loan_term_years INTEGER,
ADD COLUMN IF NOT EXISTS down_payment DECIMAL(12,2),
ADD COLUMN IF NOT EXISTS other_expenses DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS calculated_roi DECIMAL(8,2),
ADD COLUMN IF NOT EXISTS calculated_cash_flow DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS calculated_cap_rate DECIMAL(5,2);

-- Create RLS policies for reports if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'reports' AND policyname = 'Users can view own reports'
  ) THEN
    CREATE POLICY "Users can view own reports" ON public.reports
      FOR SELECT USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'reports' AND policyname = 'Users can insert own reports'
  ) THEN
    CREATE POLICY "Users can insert own reports" ON public.reports
      FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'reports' AND policyname = 'Users can update own reports'
  ) THEN
    CREATE POLICY "Users can update own reports" ON public.reports
      FOR UPDATE USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'reports' AND policyname = 'Users can delete own reports'
  ) THEN
    CREATE POLICY "Users can delete own reports" ON public.reports
      FOR DELETE USING (auth.uid() = user_id);
  END IF;
END $$;
