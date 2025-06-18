
import { PricingCard } from '@/components/pricing/PricingCard';
import { Button } from '@/components/ui/button';
import { Building2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const plans = [
    {
      title: "Free",
      description: "Perfect for getting started",
      price: "$0",
      period: "month",
      features: [
        "3 reports per month",
        "Basic property analysis",
        "Email support",
        "PDF downloads"
      ],
      buttonText: "Get Started Free"
    },
    {
      title: "Pro",
      description: "For growing real estate professionals",
      price: "$29",
      period: "month",
      features: [
        "50 reports per month",
        "Advanced market analysis",
        "Priority support",
        "Custom branding",
        "API access",
        "Export to multiple formats"
      ],
      buttonText: "Start Pro Trial",
      popular: true
    },
    {
      title: "Agency",
      description: "For teams and large organizations",
      price: "$99",
      period: "month",
      features: [
        "Unlimited reports",
        "Team collaboration",
        "White-label solution",
        "Dedicated support",
        "Custom integrations",
        "Advanced analytics",
        "Bulk operations"
      ],
      buttonText: "Contact Sales"
    }
  ];

  const handlePlanSelect = (planTitle: string) => {
    console.log(`Selected plan: ${planTitle}`);
    // Here you would integrate with Stripe
    if (planTitle === "Free") {
      window.location.href = '/auth';
    } else {
      // Redirect to Stripe checkout
      alert(`Redirecting to ${planTitle} plan checkout...`);
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
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start with our free plan and upgrade as your business grows. 
            All plans include a 7-day free trial.
          </p>
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

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div>
              <h3 className="font-semibold mb-2">Can I change plans later?</h3>
              <p className="text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. 
                Changes take effect immediately.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What's included in reports?</h3>
              <p className="text-muted-foreground">
                All reports include property valuation, market analysis, 
                comparable sales, and investment metrics.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is there a free trial?</h3>
              <p className="text-muted-foreground">
                Yes! All paid plans include a 7-day free trial. 
                No credit card required.
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
