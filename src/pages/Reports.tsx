
import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ReportCard } from '@/components/reports/ReportCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter, Download, FileText, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Reports() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const reports = [
    {
      id: '1',
      address: '123 Main St, Los Angeles, CA 90210',
      generatedDate: '2024-01-15',
      status: 'completed' as const,
      type: 'Property Analysis'
    },
    {
      id: '2',
      address: '456 Oak Ave, San Francisco, CA 94102',
      generatedDate: '2024-01-14',
      status: 'processing' as const,
      type: 'Market Comparison'
    },
    {
      id: '3',
      address: '789 Pine St, San Diego, CA 92101',
      generatedDate: '2024-01-13',
      status: 'completed' as const,
      type: 'Investment Analysis'
    },
    {
      id: '4',
      address: '321 Elm Dr, Sacramento, CA 95814',
      generatedDate: '2024-01-12',
      status: 'completed' as const,
      type: 'Rental Analysis'
    },
    {
      id: '5',
      address: '654 Maple Ave, Fresno, CA 93721',
      generatedDate: '2024-01-11',
      status: 'failed' as const,
      type: 'Property Analysis'
    },
    {
      id: '6',
      address: '987 Cedar St, Oakland, CA 94601',
      generatedDate: '2024-01-10',
      status: 'completed' as const,
      type: 'Market Comparison'
    }
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleBulkDownload = () => {
    const completedReports = filteredReports.filter(report => report.status === 'completed');
    console.log('Bulk downloading reports:', completedReports.map(r => r.id));
    alert(`Downloading ${completedReports.length} completed reports...`);
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Reports</h1>
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
                {...report}
                onView={() => console.log('View report', report.id)}
                onDownload={() => console.log('Download report', report.id)}
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

        {/* Summary Stats */}
        {filteredReports.length > 0 && (
          <Card className="mt-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{reports.length}</div>
                  <div className="text-sm text-muted-foreground">Total Reports</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {reports.filter(r => r.status === 'completed').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {reports.filter(r => r.status === 'processing').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Processing</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">
                    {reports.filter(r => r.status === 'failed').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Failed</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
