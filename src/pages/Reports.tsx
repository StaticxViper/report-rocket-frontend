
import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ReportCard } from '@/components/reports/ReportCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter, Download, FileText, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useReports } from '@/hooks/useReports';
import { toast } from 'sonner';

export default function Reports() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { reports, isLoading, error, deleteReport } = useReports();

  if (error) {
    console.error('Reports error:', error);
  }

  const filteredReports = reports.filter(report => {
    const address = report.address || '';
    const matchesSearch = address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleBulkDownload = () => {
    const completedReports = filteredReports.filter(report => report.status === 'completed');
    console.log('Bulk downloading reports:', completedReports.map(r => r.id));
    toast.success(`Starting download of ${completedReports.length} completed reports...`);
  };

  const handleView = (reportId: string) => {
    console.log('View report', reportId);
    toast.info('Report viewer coming soon!');
  };

  const handleDownload = (reportId: string) => {
    console.log('Download report', reportId);
    toast.success('Report download started!');
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Property Reports</h1>
            <p className="text-muted-foreground">
              View and manage all your property reports
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleBulkDownload}>
              <Download className="h-4 w-4 mr-2" />
              Bulk Download
            </Button>
            <Link to="/generate">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Report
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </CardTitle>
            <CardDescription>
              Search and filter your reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by address..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Reports Grid */}
        {filteredReports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => (
              <ReportCard
                key={report.id}
                id={report.id}
                address={report.address || 'No address'}
                generatedDate={report.generated_date || report.created_at?.split('T')[0] || 'Unknown'}
                status={report.status}
                type={report.report_type || 'Property Analysis'}
                onView={() => handleView(report.id)}
                onDownload={() => handleDownload(report.id)}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No reports found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || statusFilter !== 'all' 
                  ? "No reports match your current filters. Try adjusting your search criteria."
                  : "You haven't generated any reports yet. Create your first report to get started."
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Link to="/generate">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Generate Your First Report
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
