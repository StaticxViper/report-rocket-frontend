import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Dashboard from './Dashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, CreditCard } from 'lucide-react';

export default function Index() {
  const { user, userProfile, loading, startTrial, isTrialExpired } = useAuth();
  const navigate = useNavigate();
  const [trialExpired, setTrialExpired] = useState(false);
  const [checkingTrial, setCheckingTrial] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const checkTrialStatus = async () => {
      if (user && userProfile) {
        const expired = await isTrialExpired();
        setTrialExpired(expired);
        setCheckingTrial(false);
      }
    };

    if (userProfile) {
      checkTrialStatus();
    }
  }, [user, userProfile, isTrialExpired]);

  const handleStartTrial = async () => {
    navigate('/payment-info');
  };

  if (loading || checkingTrial) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Show trial setup if user hasn't started trial yet
  if (userProfile?.subscription_status === 'trial_pending') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Clock className="h-6 w-6 text-primary" />
              Start Your Free Trial
            </CardTitle>
            <CardDescription>
              Welcome! Add your payment information to activate your 14-day free trial and get full access to all features.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Your trial includes access to all Expert features for 14 days.
              </p>
              <Button onClick={handleStartTrial} className="w-full" size="lg">
                <CreditCard className="h-4 w-4 mr-2" />
                Add Payment & Start Trial
              </Button>
            </div>
            <div className="text-xs text-center text-muted-foreground">
              You won't be charged until your trial period ends. Cancel anytime.
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show expired trial message
  if (trialExpired && userProfile?.subscription_status === 'trial_active') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-orange-600">Trial Expired</CardTitle>
            <CardDescription>
              Your 14-day free trial has ended. Please choose a subscription plan to continue using PropertyPro.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={() => navigate('/pricing')} 
              className="w-full" 
              size="lg"
            >
              Choose Subscription Plan
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/billing')} 
              className="w-full"
            >
              Manage Billing
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show dashboard if trial is active or user has active subscription
  return <Dashboard />;
}
