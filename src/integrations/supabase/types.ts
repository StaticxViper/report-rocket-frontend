export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      payment_info: {
        Row: {
          billing_address_line1: string
          billing_address_line2: string | null
          billing_city: string
          billing_country: string
          billing_state: string
          billing_zip: string
          card_last_four: string
          card_type: string
          cardholder_name: string
          created_at: string | null
          id: string
          is_default: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          billing_address_line1: string
          billing_address_line2?: string | null
          billing_city: string
          billing_country?: string
          billing_state: string
          billing_zip: string
          card_last_four: string
          card_type: string
          cardholder_name: string
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          billing_address_line1?: string
          billing_address_line2?: string | null
          billing_city?: string
          billing_country?: string
          billing_state?: string
          billing_zip?: string
          card_last_four?: string
          card_type?: string
          cardholder_name?: string
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          first_name: string | null
          id: string
          is_trial_active: boolean | null
          last_name: string | null
          max_reports_per_month: number | null
          reports_generated: number | null
          subscription_status: string | null
          subscription_tier: string | null
          trial_end_date: string | null
          trial_start_date: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          first_name?: string | null
          id: string
          is_trial_active?: boolean | null
          last_name?: string | null
          max_reports_per_month?: number | null
          reports_generated?: number | null
          subscription_status?: string | null
          subscription_tier?: string | null
          trial_end_date?: string | null
          trial_start_date?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          first_name?: string | null
          id?: string
          is_trial_active?: boolean | null
          last_name?: string | null
          max_reports_per_month?: number | null
          reports_generated?: number | null
          subscription_status?: string | null
          subscription_tier?: string | null
          trial_end_date?: string | null
          trial_start_date?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reports: {
        Row: {
          address: string | null
          annual_insurance: number | null
          annual_property_taxes: number | null
          calculated_cap_rate: number | null
          calculated_cash_flow: number | null
          calculated_roi: number | null
          cap_rate: number | null
          content: Json | null
          created_at: string | null
          down_payment: number | null
          favorite_flag: boolean
          generated_date: string | null
          hoa_fees: number | null
          id: string
          interest_rate: number | null
          loan_amount: number | null
          loan_term_years: number | null
          maintenance_costs: number | null
          monthly_rent: number | null
          other_expenses: number | null
          property_address: string | null
          property_mgmt_fee: number | null
          purchase_price: number | null
          report_type: string | null
          status: string | null
          title: string | null
          user_id: string | null
          vacancy_rate: number | null
        }
        Insert: {
          address?: string | null
          annual_insurance?: number | null
          annual_property_taxes?: number | null
          calculated_cap_rate?: number | null
          calculated_cash_flow?: number | null
          calculated_roi?: number | null
          cap_rate?: number | null
          content?: Json | null
          created_at?: string | null
          down_payment?: number | null
          favorite_flag?: boolean
          generated_date?: string | null
          hoa_fees?: number | null
          id?: string
          interest_rate?: number | null
          loan_amount?: number | null
          loan_term_years?: number | null
          maintenance_costs?: number | null
          monthly_rent?: number | null
          other_expenses?: number | null
          property_address?: string | null
          property_mgmt_fee?: number | null
          purchase_price?: number | null
          report_type?: string | null
          status?: string | null
          title?: string | null
          user_id?: string | null
          vacancy_rate?: number | null
        }
        Update: {
          address?: string | null
          annual_insurance?: number | null
          annual_property_taxes?: number | null
          calculated_cap_rate?: number | null
          calculated_cash_flow?: number | null
          calculated_roi?: number | null
          cap_rate?: number | null
          content?: Json | null
          created_at?: string | null
          down_payment?: number | null
          favorite_flag?: boolean
          generated_date?: string | null
          hoa_fees?: number | null
          id?: string
          interest_rate?: number | null
          loan_amount?: number | null
          loan_term_years?: number | null
          maintenance_costs?: number | null
          monthly_rent?: number | null
          other_expenses?: number | null
          property_address?: string | null
          property_mgmt_fee?: number | null
          purchase_price?: number | null
          report_type?: string | null
          status?: string | null
          title?: string | null
          user_id?: string | null
          vacancy_rate?: number | null
        }
        Relationships: []
      }
      subscription_tiers: {
        Row: {
          description: string | null
          name: string
          price_per_month: number | null
          report_limit: number | null
        }
        Insert: {
          description?: string | null
          name: string
          price_per_month?: number | null
          report_limit?: number | null
        }
        Update: {
          description?: string | null
          name?: string
          price_per_month?: number | null
          report_limit?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_trial_expired: {
        Args: { user_id: string }
        Returns: boolean
      }
      start_trial_period: {
        Args: { user_id: string } | { user_id: string; trial_tier?: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
