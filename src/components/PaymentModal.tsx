
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CreditCard, FileText, X, Star, Crown } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: () => void;
}

export function PaymentModal({ isOpen, onClose, onPaymentComplete }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStripeCheckout = async (priceId: string, mode: 'subscription' | 'payment') => {
    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId, mode }
      });

      if (error) throw error;

      if (data.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
        onClose();
        // Note: The subscription status will be updated via webhook or manual check
        toast.success('Redirecting to Stripe checkout...');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Failed to process payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayPerReport = () => {
    handleStripeCheckout('price_1Rcwvt2L5Z6f72bP3LS1XG9G', 'payment');
  };

  const handleProSubscription = () => {
    handleStripeCheckout('price_1RcwwT2L5Z6f72bP4z4ydsue', 'subscription');
  };

  const handleExpertSubscription = () => {
    handleStripeCheckout('price_1RdIOT2L5Z6f72bPaL73wl2v', 'subscription');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Choose Your Payment Option
          </DialogTitle>
          <DialogDescription>
            Your free trial has ended. Choose how you'd like to continue generating reports.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Pay-per-Report */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Pay-per-Report
              </CardTitle>
              <CardDescription>
                Perfect for occasional analysis
              </CardDescription>
              <div className="flex items-baseline mt-2">
                <span className="text-2xl font-bold">$5</span>
                <span className="text-muted-foreground ml-1">/report</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  One comprehensive report
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Full market analysis
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  PDF export included
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  No monthly commitment
                </li>
              </ul>
              <Button 
                onClick={handlePayPerReport}
                disabled={isProcessing}
                variant="outline"
                className="w-full"
              >
                <FileText className="h-4 w-4 mr-2" />
                Buy Single Report
              </Button>
            </CardContent>
          </Card>

          {/* Pro Subscription */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="h-5 w-5" />
                Pro Subscription
              </CardTitle>
              <CardDescription>
                Great for active investors
              </CardDescription>
              <div className="flex items-baseline mt-2">
                <span className="text-2xl font-bold">$25</span>
                <span className="text-muted-foreground ml-1">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Up to 150 reports/month
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Advanced analytics
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Priority support
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Export to PDF
                </li>
              </ul>
              <Button 
                onClick={handleProSubscription}
                disabled={isProcessing}
                className="w-full"
              >
                <Star className="h-4 w-4 mr-2" />
                Start Pro Plan
              </Button>
            </CardContent>
          </Card>

          {/* Expert Subscription */}
          <Card className="relative border-2 border-primary">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                MOST POPULAR
              </span>
            </div>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Crown className="h-5 w-5" />
                Expert Subscription
              </CardTitle>
              <CardDescription>
                For professional investors
              </CardDescription>
              <div className="flex items-baseline mt-2">
                <span className="text-2xl font-bold">$50</span>
                <span className="text-muted-foreground ml-1">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  Unlimited reports
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  Advanced analytics
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  Priority support
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  Export to PDF
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  Premium features
                </li>
              </ul>
              <Button 
                onClick={handleExpertSubscription}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Crown className="h-4 w-4 mr-2" />
                Start Expert Plan
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center mt-6">
          <Button variant="ghost" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
