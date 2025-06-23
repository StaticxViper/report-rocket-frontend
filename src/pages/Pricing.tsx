
import { PricingCard } from '@/components/pricing/PricingCard';
import { Button } from '@/components/ui/button';
import { Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function Pricing() {
  const { user } = useAuth();

  const plans = [
    {
      title: "Pay-Per-Report",
      description: "Ideal for one-time or occasional use",
      price: "$5",
      period: "per report",
      features: [
        "No monthly fee",
        "Professional property analysis",
        "Market comparison data", 
        "Investment metrics",
        "PDF export",
        "Email support"
      ],
      buttonText: "Get Started",
      popular: false,
      planType: "pay_per_report"
    },
    {
      title: "Pro Subscription",
      description: "Best for growing investors who run frequent numbers",
      price: "$25",
      period: "month",
      features: [
        "Up to 150 reports per month",
        "Advanced market analysis",
        "Custom branding",
        "Priority support",
        "API access", 
        "Team collaboration (up to 3 users)",
        "Advanced export options",
        "Historical data trends"
      ],
      buttonText: "Start Free Trial",
      popular: true,
      planType: "pro"
    },
    {
      title: "Expert Subscription", 
      description: "For professionals and high-volume investors",
      price: "$50",
      period: "month",
      features: [
        "Unlimited reports",
        "White-label solution",
        "Dedicated account manager", 
        "Custom integrations",
        "Advanced analytics dashboard",
        "Unlimited team members",
        "24/7 phone support",
        "Custom training sessions",
        "Data export automation"
      ],
      buttonText: "Start Free Trial",
      popular: false,
      planType: "expert"
    }
  ];

  const handlePlanSelect = (planType: string) => {
    console.log(`Selected plan: ${planType}`);
    
    if (user) {
      // User is logged in, redirect to dashboard with plan selection
      window.location.href = `/dashboard?plan=${planType}`;
    } else {
      // User not logged in, redirect to auth with plan selection
      window.location.href = `/auth?plan=${planType}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">PropertyPro</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-primary">About</Link>
            <Link to="/pricing" className="text-primary font-medium">Pricing</Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary">Contact</Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <Link to="/dashboard">
                <Button>Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost">Log In</Button>
                </Link>
                <Link to="/auth">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Start with your free 14-day trial! Generate reports immediately after signing up. 
            Choose a plan when you're ready for unlimited access.
          </p>
          <div className="bg-green-100 border border-green-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-green-800 font-medium">
              🎉 New users get 14 days free - no credit card required at signup!
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <PricingCard
              key={plan.title}
              {...plan}
              onSelect={() => handlePlanSelect(plan.planType)}
            />
          ))}
        </div>

        {/* Free Trial Information */}
        <div className="mt-16 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="font-semibold mb-2">1. Sign Up Free</h3>
              <p className="text-muted-foreground text-sm">
                Create your account with just email and password - no credit card needed
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="font-semibold mb-2">2. Start 14-Day Trial</h3>
              <p className="text-muted-foreground text-sm">
                Begin your free trial of the plan you selected and generate reports immediately
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-4">💳</div>
              <h3 className="font-semibold mb-2">3. Choose Payment</h3>
              <p className="text-muted-foreground text-sm">
                When trial ends, continue with subscription or pay-per-report
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div>
              <h3 className="font-semibold mb-2">Do I need a credit card to sign up?</h3>
              <p className="text-muted-foreground">
                No! You can sign up and use the 14-day free trial without any payment information.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">When do I need to pay?</h3>
              <p className="text-muted-foreground">
                Only when your free trial ends and you want to generate more reports. 
                Choose subscription or pay-per-report then.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
              <p className="text-muted-foreground">
                Yes! Subscriptions can be cancelled anytime. Pay-per-report has no commitment.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What happens after my trial?</h3>
              <p className="text-muted-foreground">
                You'll need to choose a payment method to continue generating reports. 
                All payments are managed in your dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
