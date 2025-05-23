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
      monitoring_locations: {
        Row: {
          capacity: number | null
          created_at: string
          district: string
          elevation: number | null
          id: string
          latitude: number | null
          location_type: string
          longitude: number | null
          name: string
          province: string
          updated_at: string
        }
        Insert: {
          capacity?: number | null
          created_at?: string
          district: string
          elevation?: number | null
          id?: string
          latitude?: number | null
          location_type: string
          longitude?: number | null
          name: string
          province: string
          updated_at?: string
        }
        Update: {
          capacity?: number | null
          created_at?: string
          district?: string
          elevation?: number | null
          id?: string
          latitude?: number | null
          location_type?: string
          longitude?: number | null
          name?: string
          province?: string
          updated_at?: string
        }
        Relationships: []
      }
      rainfall_measurements: {
        Row: {
          created_at: string
          duration_hours: number
          id: string
          location_id: string
          measurement_type: string
          notes: string | null
          rainfall_amount: number
          recorded_at: string
          recorded_by: string
        }
        Insert: {
          created_at?: string
          duration_hours?: number
          id?: string
          location_id: string
          measurement_type: string
          notes?: string | null
          rainfall_amount: number
          recorded_at?: string
          recorded_by: string
        }
        Update: {
          created_at?: string
          duration_hours?: number
          id?: string
          location_id?: string
          measurement_type?: string
          notes?: string | null
          rainfall_amount?: number
          recorded_at?: string
          recorded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "rainfall_measurements_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "monitoring_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          created_at: string
          department: string | null
          id: string
          name: string
          phone: string | null
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          id?: string
          name: string
          phone?: string | null
          role: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          department?: string | null
          id?: string
          name?: string
          phone?: string | null
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      water_level_measurements: {
        Row: {
          created_at: string
          id: string
          location_id: string
          measurement_type: string
          notes: string | null
          recorded_at: string
          recorded_by: string
          water_level: number
        }
        Insert: {
          created_at?: string
          id?: string
          location_id: string
          measurement_type: string
          notes?: string | null
          recorded_at?: string
          recorded_by: string
          water_level: number
        }
        Update: {
          created_at?: string
          id?: string
          location_id?: string
          measurement_type?: string
          notes?: string | null
          recorded_at?: string
          recorded_by?: string
          water_level?: number
        }
        Relationships: [
          {
            foreignKeyName: "water_level_measurements_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "monitoring_locations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_hourly_rainfall_report: {
        Args: { start_date: string; end_date: string; location_filter?: string }
        Returns: {
          hour_period: string
          location_id: string
          location_name: string
          total_rainfall: number
          avg_rainfall: number
          max_rainfall: number
          measurement_count: number
        }[]
      }
      get_hourly_water_level_report: {
        Args: { start_date: string; end_date: string; location_filter?: string }
        Returns: {
          hour_period: string
          location_id: string
          location_name: string
          avg_water_level: number
          min_water_level: number
          max_water_level: number
          measurement_count: number
        }[]
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
