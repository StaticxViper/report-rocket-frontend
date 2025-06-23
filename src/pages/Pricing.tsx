
import { PricingCard } from '@/components/pricing/PricingCard';
import { Button } from '@/components/ui/button';
import { Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function Pricing() {
  const { user } = useAuth();

  const plans = [
    {
      title: "Pay-per-Report",
      description: "Perfect for occasional property analysis",
      price: "$49",
      period: "per report",
      features: [
        "Professional property analysis",
        "Market comparison data", 
        "Investment metrics",
        "PDF export",
        "Email support",
        "No monthly commitment"
      ],
      buttonText: "Buy Single Report",
      popular: false,
      link: "https://buy.stripe.com/9B6cMY9LycXfeWV8a5asg02"
    },
    {
      title: "Pro",
      description: "For active real estate professionals",
      price: "$199",
      period: "month",
      features: [
        "50 reports per month",
        "Advanced market analysis",
        "Custom branding",
        "Priority support",
        "API access", 
        "Team collaboration (up to 3 users)",
        "Advanced export options",
        "Historical data trends"
      ],
      buttonText: "Start Subscription",
      popular: true,
      link: "https://buy.stripe.com/4gM00ccXK6yR3eddupasg01"
    },
    {
      title: "Expert", 
      description: "For teams and large organizations",
      price: "$499",
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
      buttonText: "Start Subscription",
      popular: false,
      link: "https://buy.stripe.com/example"
    }
  ];

  const handlePlanSelect = (planTitle: string) => {
    console.log(`Selected plan: ${planTitle}`);
    const planParam = planTitle.toLowerCase().replace(/[^a-z0-9]/g, '_');
    
    if (user) {
      window.location.href = `/payment-info?plan=${planParam}`;
    } else {
      window.location.href = `/auth?plan=${planParam}`;
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
              onSelect={() => handlePlanSelect(plan.title)}
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
              <h3 className="font-semibold mb-2">2. Generate Reports</h3>
              <p className="text-muted-foreground text-sm">
                Start analyzing properties immediately with your 14-day free trial
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-4">💳</div>
              <h3 className="font-semibold mb-2">3. Choose Payment</h3>
              <p className="text-muted-foreground text-sm">
                When ready, choose between monthly subscription or pay-per-report
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
              <h3 className="font-semibold mb-2">How accurate are the reports?</h3>
              <p className="text-muted-foreground">
                Our reports use the latest market data and have a 98.5% 
                accuracy rate based on third-party verification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
