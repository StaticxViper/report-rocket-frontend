
import { PricingCard } from '@/components/pricing/PricingCard';
import { Button } from '@/components/ui/button';
import { Building2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Pricing() {
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
      buttonText: "Start 14-Day Free Trial",
      popular: false
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
      buttonText: "Start 14-Day Free Trial",
      popular: true
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
      buttonText: "Start 14-Day Free Trial",
      popular: false
    }
  ];

  const handlePlanSelect = (planTitle: string) => {
    console.log(`Selected plan: ${planTitle}`);
    // Redirect to auth page with plan selection
    const planParam = planTitle.toLowerCase().replace('-', '_');
    window.location.href = `/auth?plan=${planParam}&trial=true`;
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
            <Link to="/auth">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link to="/auth">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Start with our 14-day free trial on any plan. No commitment required. 
            Payment information needed to activate your trial.
          </p>
          <div className="bg-blue-100 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-blue-800 font-medium">
              🎉 All plans include a 14-day free trial with full access to features
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

        {/* Trial Information */}
        <div className="mt-16 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">How the Free Trial Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-4">📝</div>
              <h3 className="font-semibold mb-2">1. Sign Up</h3>
              <p className="text-muted-foreground text-sm">
                Create your account and provide payment information to start your trial
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="font-semibold mb-2">2. Explore Features</h3>
              <p className="text-muted-foreground text-sm">
                Access all premium features for 14 days with no restrictions
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-4">✅</div>
              <h3 className="font-semibold mb-2">3. Decide</h3>
              <p className="text-muted-foreground text-sm">
                Continue with your plan or cancel before the trial ends
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div>
              <h3 className="font-semibold mb-2">Why do you need payment information for the trial?</h3>
              <p className="text-muted-foreground">
                Payment information ensures a seamless transition after your trial. 
                You won't be charged until the 14-day trial period ends.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I cancel during the trial?</h3>
              <p className="text-muted-foreground">
                Yes! You can cancel anytime during your 14-day trial 
                with no charges or commitment.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What happens after the trial?</h3>
              <p className="text-muted-foreground">
                After 14 days, you'll be charged for your selected plan. 
                You can change or cancel your subscription at any time.
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
