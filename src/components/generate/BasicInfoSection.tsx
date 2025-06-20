
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { PropertyFormData } from '@/types/property';

interface BasicInfoSectionProps {
  form: UseFormReturn<PropertyFormData>;
  isGenerating: boolean;
}

export function BasicInfoSection({ form, isGenerating }: BasicInfoSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Home className="h-5 w-5 mr-2" />
          Basic Information
        </CardTitle>
        <CardDescription>
          Enter the fundamental property details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="propertyAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Address *</FormLabel>
              <FormControl>
                <Input placeholder="123 Main Street, City, State 12345" {...field} disabled={isGenerating} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="purchasePrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Purchase Price *</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="250000" 
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    disabled={isGenerating}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="capRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expected Cap Rate (%)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.1"
                    placeholder="6.5" 
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    disabled={isGenerating}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
