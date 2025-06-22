import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dufhelmglvgvykyzeyns.supabase.co'; // from Supabase dashboard
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1ZmhlbG1nbHZndnlreXpleW5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxODk1NTIsImV4cCI6MjA2NTc2NTU1Mn0.pvmz44tH8ILtbEdABmrXoh8H0CkBsX-REwbUs-3gEJs'; // also from dashboard

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
