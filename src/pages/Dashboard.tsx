
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ReportCard } from '@/components/reports/ReportCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Building2, Clock, Plus, ArrowRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const recentReports = [
    {
      id: '1',
      address: '123 Main St, Los Angeles, CA',
      generatedDate: '2024-01-15',
      status: 'completed' as const,
      type: 'Property Analysis'
    },
    {
      id: '2',
      address: '456 Oak Ave, San Francisco, CA',
      generatedDate: '2024-01-14',
      status: 'processing' as const,
      type: 'Market Comparison'
    },
    {
      id: '3',
      address: '789 Pine St, San Diego, CA',
      generatedDate: '2024-01-13',
      status: 'completed' as const,
      type: 'Investment Analysis'
    }
  ];

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, John!</h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with your property reports today.
            </p>
          </div>
          <Link to="/generate">
            <Button size="lg" className="shadow-md">
              <Plus className="h-5 w-5 mr-2" />
              Generate Report
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatsCard
            title="Total Reports"
            value="24"
            description="This month"
            icon={FileText}
            trend={{ value: "12%", positive: true }}
          />
          <StatsCard
            title="Properties Analyzed"
            value="18"
            description="Unique addresses"
            icon={Building2}
          />
          <StatsCard
            title="Avg. Generation Time"
            value="2.3 min"
            description="Per report"
            icon={Clock}
            trend={{ value: "0.5 min", positive: false }}
          />
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Get started with your most common tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/generate">
                <Card className="hover:bg-accent transition-colors cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-semibold mb-1">Generate New Report</h3>
                    <p className="text-sm text-muted-foreground">
                      Create a comprehensive property analysis
                    </p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/reports">
                <Card className="hover:bg-accent transition-colors cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Building2 className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-semibold mb-1">View All Reports</h3>
                    <p className="text-sm text-muted-foreground">
                      Browse your report history
                    </p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/settings">
                <Card className="hover:bg-accent transition-colors cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <User className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-semibold mb-1">Account Settings</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage your preferences
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Your latest property analyses</CardDescription>
            </div>
            <Link to="/reports">
              <Button variant="ghost" size="sm">
                View all
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentReports.map((report) => (
                <ReportCard
                  key={report.id}
                  {...report}
                  onView={() => console.log('View report', report.id)}
                  onDownload={() => console.log('Download report', report.id)}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
