
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CreditCard, FileText, X } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: () => void;
}

export function PaymentModal({ isOpen, onClose, onPaymentComplete }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscription = async () => {
    setIsProcessing(true);
    try {
      // This would integrate with Stripe for subscription
      toast.info('Subscription flow coming soon!');
      // For now, just close the modal
      setTimeout(() => {
        onPaymentComplete();
        onClose();
      }, 1000);
    } catch (error) {
      toast.error('Failed to process subscription');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOneTimePayment = async () => {
    setIsProcessing(true);
    try {
      // This would integrate with Stripe for one-time payment
      toast.info('One-time payment flow coming soon!');
      // For now, just close the modal
      setTimeout(() => {
        onPaymentComplete();
        onClose();
      }, 1000);
    } catch (error) {
      toast.error('Failed to process payment');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Choose Your Payment Option
          </DialogTitle>
          <DialogDescription>
            Your free trial has ended. Choose how you'd like to continue generating reports.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Monthly Subscription */}
          <Card className="relative">
            <CardHeader>
              <CardTitle className="text-lg">Monthly Subscription</CardTitle>
              <CardDescription>
                Unlimited reports with premium features
              </CardDescription>
              <div className="flex items-baseline mt-2">
                <span className="text-2xl font-bold">$199</span>
                <span className="text-muted-foreground ml-1">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Unlimited reports
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
                onClick={handleSubscription}
                disabled={isProcessing}
                className="w-full"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Start Subscription
              </Button>
            </CardContent>
          </Card>

          {/* Pay-per-Report */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pay-per-Report</CardTitle>
              <CardDescription>
                Perfect for occasional analysis
              </CardDescription>
              <div className="flex items-baseline mt-2">
                <span className="text-2xl font-bold">$49</span>
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
                onClick={handleOneTimePayment}
                disabled={isProcessing}
                variant="outline"
                className="w-full"
              >
                <FileText className="h-4 w-4 mr-2" />
                Buy Single Report
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
