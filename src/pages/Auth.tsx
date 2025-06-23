
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Eye, EyeOff, Check, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'signup' ? false : true;
  const selectedPlan = searchParams.get('plan');
  const [isLogin, setIsLogin] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (user) {
      const dashboardUrl = selectedPlan ? `/dashboard?plan=${selectedPlan}` : '/dashboard';
      navigate(dashboardUrl);
    }
  }, [user, navigate, selectedPlan]);

  const getPlanDisplayName = (planType: string) => {
    switch (planType) {
      case 'pay_per_report':
        return 'Pay-Per-Report';
      case 'pro':
        return 'Pro Subscription';
      case 'expert':
        return 'Expert Subscription';
      default:
        return 'Selected Plan';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          toast({
            title: "Sign in failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "You have been signed in successfully.",
          });
        }
      } else {
        const { error } = await signUp(formData.email, formData.password, formData.firstName, formData.lastName);
        if (error) {
          toast({
            title: "Sign up failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Account created!",
            description: selectedPlan 
              ? `Your 14-day trial of ${getPlanDisplayName(selectedPlan)} will begin once you verify your email.`
              : "Please check your email to verify your account if required.",
          });
        }
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    // Clear form when switching modes
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        {/* Back to Home Button */}
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="p-0 h-auto">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader className="space-y-1 text-center">
            <div className="flex items-center justify-center mb-4">
              <Building2 className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">
              {isLogin ? 'Welcome back' : 'Create account'}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? 'Sign in to your PropertyPro account' 
                : 'Start generating professional property reports'
              }
            </CardDescription>
            {selectedPlan && !isLogin && (
              <div className="bg-blue-100 border border-blue-200 rounded-lg p-3 mt-4">
                <p className="text-blue-800 text-sm font-medium">
                  Selected: {getPlanDisplayName(selectedPlan)}
                </p>
                <p className="text-blue-600 text-xs">
                  14-day free trial included
                </p>
              </div>
            )}
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="John"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder={isLogin ? "Enter your password" : "Create a strong password"}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              {!isLogin && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Check className="h-3 w-3 text-green-600" />
                    <span>Free 14-day trial included</span>
                  </div>
                </div>
              )}
              {isLogin && (
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    className="text-sm text-primary hover:underline"
                    onClick={() => {/* TODO: Add forgot password functionality */}}
                  >
                    Forgot password?
                  </button>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading 
                  ? (isLogin ? "Signing in..." : "Creating account...") 
                  : (isLogin ? "Sign in" : "Create account")
                }
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-primary hover:underline"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
