
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface PaymentInfo {
  id: string;
  user_id: string;
  cardholder_name: string;
  card_last_four: string;
  card_type: string;
  billing_address_line1: string;
  billing_address_line2: string | null;
  billing_city: string;
  billing_state: string;
  billing_zip: string;
  billing_country: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export function usePaymentInfo() {
  const { user } = useAuth();
  
  const { data: paymentInfo, isLoading, error } = useQuery({
    queryKey: ['payment-info', user?.id],
    queryFn: async () => {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }
      
      const { data, error } = await supabase
        .from('payment_info')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching payment info:', error);
        throw error;
      }
      
      return data as PaymentInfo[];
    },
    enabled: !!user?.id,
  });

  const queryClient = useQueryClient();

  const updatePaymentInfo = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<PaymentInfo> }) => {
      const { error } = await supabase
        .from('payment_info')
        .update(updates)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-info'] });
    },
  });

  const deletePaymentInfo = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('payment_info')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-info'] });
    },
  });

  return {
    paymentInfo: paymentInfo || [],
    isLoading,
    error,
    updatePaymentInfo: updatePaymentInfo.mutate,
    deletePaymentInfo: deletePaymentInfo.mutate,
    isUpdating: updatePaymentInfo.isPending,
    isDeleting: deletePaymentInfo.isPending,
  };
}
