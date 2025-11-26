export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      patients: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          phone: string
          status: 'active' | 'inactive'
          last_visit: string | null
          total_visits: number
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          phone: string
          status?: 'active' | 'inactive'
          last_visit?: string | null
          total_visits?: number
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          phone?: string
          status?: 'active' | 'inactive'
          last_visit?: string | null
          total_visits?: number
        }
      }
      appointments: {
        Row: {
          id: string
          created_at: string
          date: string
          time: string
          start_datetime: string | null  // TEXT: formato ISO8601 com TZ (2025-11-25T09:00:00-03:00)
          end_datetime: string | null    // TEXT: formato ISO8601 com TZ (2025-11-25T10:00:00-03:00)
          patient_id: string
          patient_name: string
          type: string
          status: 'confirmed' | 'pending' | 'completed' | 'cancelled'
          notes: string | null
          observations: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          date: string
          time: string
          start_datetime?: string | null  // TEXT: formato ISO8601 com TZ (2025-11-25T09:00:00-03:00)
          end_datetime?: string | null    // TEXT: formato ISO8601 com TZ (2025-11-25T10:00:00-03:00)
          patient_id: string
          patient_name: string
          type: string
          status?: 'confirmed' | 'pending' | 'completed' | 'cancelled'
          notes?: string | null
          observations?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          date?: string
          time?: string
          start_datetime?: string | null  // TEXT: formato ISO8601 com TZ (2025-11-25T09:00:00-03:00)
          end_datetime?: string | null    // TEXT: formato ISO8601 com TZ (2025-11-25T10:00:00-03:00)
          patient_id?: string
          patient_name?: string
          type?: string
          status?: 'confirmed' | 'pending' | 'completed' | 'cancelled'
          notes?: string | null
          observations?: string | null
        }
      }
      settings: {
        Row: {
          id: string
          created_at: string
          clinic_name: string
          doctor_name: string
          subscription_plan: string
          subscription_renews_at: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          clinic_name: string
          doctor_name: string
          subscription_plan?: string
          subscription_renews_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          clinic_name?: string
          doctor_name?: string
          subscription_plan?: string
          subscription_renews_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

