
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { cleanupAuthState } from '@/utils/authCleanup';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  userProfile: any | null;
  signUp: (email: string, password: string, firstName: string, lastName: string, selectedPlan?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isTrialActive: () => Promise<boolean>;
  isTrialExpired: () => Promise<boolean>;
  hasActiveSubscription: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Defer data fetching to prevent deadlocks
          setTimeout(async () => {
            try {
              const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .maybeSingle();
              setUserProfile(profile);

              // If this is a new user (no profile or trial not started), start trial
              if (profile && !profile.trial_start_date) {
                console.log('Starting free trial for new user');
                
                // Check if there's a selected plan in URL
                const urlParams = new URLSearchParams(window.location.search);
                const selectedPlan = urlParams.get('plan');
                
                let trialTier = 'pro'; // default to pro
                if (selectedPlan === 'expert') {
                  trialTier = 'expert';
                } else if (selectedPlan === 'pay_per_report') {
                  trialTier = 'pro'; // Even pay-per-report users get pro trial
                }
                
                await startFreeTrial(trialTier);
              }
            } catch (error) {
              console.error('Error fetching user profile:', error);
            }
          }, 0);
        } else {
          setUserProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const startFreeTrial = async (trialTier: string = 'pro') => {
    if (!user) return;

    try {
      const { error } = await supabase.rpc('start_trial_period', {
        user_id: user.id,
        trial_tier: trialTier
      });

      if (!error) {
        // Refresh user profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();
        setUserProfile(profile);
      }
    } catch (error) {
      console.error('Error starting trial:', error);
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string, selectedPlan?: string) => {
    try {
      cleanupAuthState();
      
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        console.log('Sign out during signup failed, continuing...');
      }

      const redirectUrl = selectedPlan 
        ? `${window.location.origin}/dashboard?plan=${selectedPlan}`
        : `${window.location.origin}/dashboard`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: firstName,
            last_name: lastName,
            selected_plan: selectedPlan
          }
        }
      });

      if (!error && data.user && !data.user.email_confirmed_at) {
        return { error: null };
      } else if (!error && data.user && data.user.email_confirmed_at) {
        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 100);
      }

      return { error };
    } catch (error) {
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      cleanupAuthState();
      
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        console.log('Sign out during signin failed, continuing...');
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!error && data.user) {
        // Check if there's a plan parameter to redirect to
        const urlParams = new URLSearchParams(window.location.search);
        const selectedPlan = urlParams.get('plan');
        const redirectUrl = selectedPlan 
          ? `/dashboard?plan=${selectedPlan}`
          : '/dashboard';
          
        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 100);
      }

      return { error };
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    try {
      cleanupAuthState();
      
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        console.log('Global sign out failed, continuing...');
      }
      
      setUserProfile(null);
      setUser(null);
      setSession(null);
      
      window.location.href = '/';
    } catch (error) {
      console.error('Sign out error:', error);
      window.location.href = '/';
    }
  };

  const isTrialActive = async () => {
    if (!user || !userProfile) return false;

    try {
      const { data, error } = await supabase.rpc('is_trial_expired', {
        user_id: user.id
      });

      if (error) return false;
      return userProfile.is_trial_active && !data;
    } catch (error) {
      return false;
    }
  };

  const isTrialExpired = async () => {
    if (!user) return true;

    try {
      const { data, error } = await supabase.rpc('is_trial_expired', {
        user_id: user.id
      });

      if (error) return true;
      return data;
    } catch (error) {
      return true;
    }
  };

  const hasActiveSubscription = async () => {
    if (!userProfile) return false;
    
    // Check if user has a paid subscription (not trial)
    return userProfile.subscription_status === 'active' && 
           userProfile.subscription_tier !== 'free';
  };

  const value = {
    user,
    session,
    loading,
    userProfile,
    signUp,
    signIn,
    signOut,
    isTrialActive,
    isTrialExpired,
    hasActiveSubscription,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
