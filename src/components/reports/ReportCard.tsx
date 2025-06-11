
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Eye, MapPin, Calendar } from 'lucide-react';

interface ReportCardProps {
  id: string;
  address: string;
  generatedDate: string;
  status: 'completed' | 'processing' | 'failed';
  type: string;
  onView: () => void;
  onDownload: () => void;
}

export function ReportCard({
  address,
  generatedDate,
  status,
  type,
  onView,
  onDownload
}: ReportCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'processing':
        return 'bg-yellow-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{address}</CardTitle>
          <Badge className={getStatusColor(status)}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{type}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{generatedDate}</span>
        </div>
      </CardContent>
      <CardFooter className="flex space-x-2">
        <Button variant="outline" size="sm" onClick={onView} className="flex-1">
          <Eye className="h-4 w-4 mr-2" />
          View
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onDownload}
          disabled={status !== 'completed'}
          className="flex-1"
        >
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
}
