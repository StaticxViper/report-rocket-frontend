
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, FileText } from 'lucide-react';

interface ReportResultsProps {
  generatedReport: any;
  onViewAllReports: () => void;
  onGenerateAnother: () => void;
}

export function ReportResults({ generatedReport, onViewAllReports, onGenerateAnother }: ReportResultsProps) {
  const content = generatedReport.content;
  const summary = content?.summary || {};
  
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-6">
        <CardContent className="p-8 text-center">
          <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Investment Analysis Complete!</h2>
          <p className="text-muted-foreground mb-6">
            Your property investment analysis has been generated and saved.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Property Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Address:</span>
                <span className="font-medium">{generatedReport.property_address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Purchase Price:</span>
                <span className="font-medium">${generatedReport.purchase_price?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monthly Rent:</span>
                <span className="font-medium">${generatedReport.monthly_rent?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Recommendation:</span>
                <span className={`font-medium ${
                  summary.recommendation === 'Strong Investment' ? 'text-green-600' :
                  summary.recommendation === 'Good Investment' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {summary.recommendation || 'No recommendation'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(summary.keyMetrics || {}).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-muted-foreground">{key}:</span>
                  <span className="font-medium">{String(value)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex space-x-4">
        <Button onClick={onViewAllReports} className="flex-1">
          <FileText className="h-4 w-4 mr-2" />
          View All Reports
        </Button>
        <Button 
          variant="outline" 
          onClick={onGenerateAnother}
          className="flex-1"
        >
          Generate Another Report
        </Button>
      </div>
    </div>
  );
}
