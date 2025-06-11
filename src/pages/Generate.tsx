
import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { MapPin, FileText, Loader2, CheckCircle2 } from 'lucide-react';

export default function Generate() {
  const [address, setAddress] = useState('');
  const [reportPreferences, setReportPreferences] = useState({
    propertyAnalysis: false,
    marketComparison: false,
    investmentAnalysis: false,
    rentalAnalysis: false
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handlePreferenceChange = (preference: keyof typeof reportPreferences) => {
    setReportPreferences(prev => ({
      ...prev,
      [preference]: !prev[preference]
    }));
  };

  const hasSelectedPreferences = Object.values(reportPreferences).some(value => value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      setIsComplete(true);
      setTimeout(() => {
        setIsComplete(false);
        // Reset form
        setAddress('');
        setReportPreferences({
          propertyAnalysis: false,
          marketComparison: false,
          investmentAnalysis: false,
          rentalAnalysis: false
        });
      }, 3000);
    }, 3000);
  };

  if (isComplete) {
    return (
      <DashboardLayout>
        <div className="p-8 flex items-center justify-center min-h-96">
          <Card className="max-w-md w-full text-center">
            <CardContent className="p-8">
              <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Report Generated!</h2>
              <p className="text-muted-foreground mb-6">
                Your property report has been successfully generated and is ready for review.
              </p>
              <div className="space-y-3">
                <Button className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  View Report
                </Button>
                <Button variant="outline" className="w-full">
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Generate Property Report</h1>
            <p className="text-muted-foreground">
              Create a comprehensive analysis for any property address.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Property Information
              </CardTitle>
              <CardDescription>
                Enter the property details to generate your report
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="address">Property Address *</Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Main Street, Los Angeles, CA 90210"
                    required
                    disabled={isGenerating}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the complete address including city and state
                  </p>
                </div>

                <div className="space-y-4">
                  <Label>Report Preferences *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="propertyAnalysis"
                        checked={reportPreferences.propertyAnalysis}
                        onCheckedChange={() => handlePreferenceChange('propertyAnalysis')}
                        disabled={isGenerating}
                      />
                      <Label htmlFor="propertyAnalysis" className="text-sm font-normal cursor-pointer">
                        Property Analysis
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="marketComparison"
                        checked={reportPreferences.marketComparison}
                        onCheckedChange={() => handlePreferenceChange('marketComparison')}
                        disabled={isGenerating}
                      />
                      <Label htmlFor="marketComparison" className="text-sm font-normal cursor-pointer">
                        Market Comparison
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="investmentAnalysis"
                        checked={reportPreferences.investmentAnalysis}
                        onCheckedChange={() => handlePreferenceChange('investmentAnalysis')}
                        disabled={isGenerating}
                      />
                      <Label htmlFor="investmentAnalysis" className="text-sm font-normal cursor-pointer">
                        Investment Analysis
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="rentalAnalysis"
                        checked={reportPreferences.rentalAnalysis}
                        onCheckedChange={() => handlePreferenceChange('rentalAnalysis')}
                        disabled={isGenerating}
                      />
                      <Label htmlFor="rentalAnalysis" className="text-sm font-normal cursor-pointer">
                        Rental Analysis
                      </Label>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Select one or more report types to include in your analysis
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium mb-3">What's included in your report:</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">✓</Badge>
                      <span className="text-sm">Property valuation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">✓</Badge>
                      <span className="text-sm">Market analysis</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">✓</Badge>
                      <span className="text-sm">Comparable sales</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">✓</Badge>
                      <span className="text-sm">Investment metrics</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">✓</Badge>
                      <span className="text-sm">Risk assessment</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">✓</Badge>
                      <span className="text-sm">Market trends</span>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isGenerating || !address || !hasSelectedPreferences}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Generating Report...
                    </>
                  ) : (
                    <>
                      <FileText className="h-5 w-5 mr-2" />
                      Generate Report
                    </>
                  )}
                </Button>

                {isGenerating && (
                  <div className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">
                      This usually takes 2-3 minutes...
                    </p>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
