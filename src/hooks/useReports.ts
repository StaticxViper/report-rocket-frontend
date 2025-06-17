
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Report {
  id: string;
  address: string | null;
  status: 'completed' | 'processing' | 'failed';
  report_type: string | null;
  generated_date: string | null;
  title: string | null;
  content: any;
  created_at: string | null;
  user_id: string | null;
}

export function useReports() {
  const { user } = useAuth();
  
  const { data: reports = [], isLoading, error } = useQuery({
    queryKey: ['reports', user?.id],
    queryFn: async () => {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }
      
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching reports:', error);
        throw error;
      }
      
      return data as Report[];
    },
    enabled: !!user?.id,
  });

  const queryClient = useQueryClient();

  const deleteReport = useMutation({
    mutationFn: async (reportId: string) => {
      const { error } = await supabase
        .from('reports')
        .delete()
        .eq('id', reportId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    },
  });

  return {
    reports,
    isLoading,
    error,
    deleteReport: deleteReport.mutate,
    isDeleting: deleteReport.isPending,
  };
}
