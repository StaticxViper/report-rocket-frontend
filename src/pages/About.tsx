
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, Award, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const stats = [
    { number: "10,000+", label: "Reports Generated" },
    { number: "500+", label: "Real Estate Professionals" },
    { number: "98.5%", label: "Accuracy Rate" },
    { number: "24/7", label: "Support Available" }
  ];

  const values = [
    {
      icon: Users,
      title: "Customer First",
      description: "We prioritize our customers' success and provide exceptional support to help them achieve their goals."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from our product quality to our customer service."
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "We continuously innovate to provide cutting-edge solutions for the real estate industry."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">PropertyPro</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-primary">Home</Link>
              <Link to="/about" className="text-primary font-medium">About</Link>
              <Link to="/pricing" className="text-gray-700 hover:text-primary">Pricing</Link>
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
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 text-gray-900">
            About <span className="text-primary">PropertyPro</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            We're revolutionizing how real estate professionals create property reports. 
            Our mission is to make comprehensive property analysis accessible, accurate, and efficient.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Story</h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p className="text-xl leading-relaxed mb-6">
                PropertyPro was founded by a team of real estate professionals and technology experts 
                who experienced firsthand the challenges of creating comprehensive property reports. 
                We spent countless hours manually gathering data, analyzing market trends, and 
                formatting reports that often took days to complete.
              </p>
              <p className="text-xl leading-relaxed mb-6">
                We knew there had to be a better way. That's why we built PropertyPro – to automate 
                the tedious parts of property analysis while maintaining the accuracy and 
                professionalism that real estate professionals demand.
              </p>
              <p className="text-xl leading-relaxed">
                Today, PropertyPro serves thousands of real estate agents, investors, and property 
                managers worldwide, helping them save time and make better-informed decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape how we serve our customers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Workflow?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join the PropertyPro community and start creating professional reports today.
          </p>
          <Link to="/auth">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
