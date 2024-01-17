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
      breaks: {
        Row: {
          actual_duration: number | null
          calculated_duration: number
          created_at: string
          id: number
          session_id: number
          user_id: string
        }
        Insert: {
          actual_duration?: number | null
          calculated_duration: number
          created_at?: string
          id?: number
          session_id: number
          user_id: string
        }
        Update: {
          actual_duration?: number | null
          calculated_duration?: number
          created_at?: string
          id?: number
          session_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "breaks_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "breaks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      intentions: {
        Row: {
          created_at: string
          description: string | null
          id: number
          last_edited: string
          name: string
          project_id: number
          user_id: string | null
          weekly_hours_goal: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          last_edited?: string
          name: string
          project_id: number
          user_id?: string | null
          weekly_hours_goal?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          last_edited?: string
          name?: string
          project_id?: number
          user_id?: string | null
          weekly_hours_goal?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "intentions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "intentions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      interruptions: {
        Row: {
          duration: number | null
          end: string | null
          id: number
          reason: string | null
          session_id: number
          start: string
          user_id: string
        }
        Insert: {
          duration?: number | null
          end?: string | null
          id?: number
          reason?: string | null
          session_id: number
          start?: string
          user_id: string
        }
        Update: {
          duration?: number | null
          end?: string | null
          id?: number
          reason?: string | null
          session_id?: number
          start?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "interruptions_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interruptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      process_tasks: {
        Row: {
          created_at: string
          id: number
          order: number
          process_id: number
          task_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          order?: number
          process_id: number
          task_id: number
        }
        Update: {
          created_at?: string
          id?: number
          order?: number
          process_id?: number
          task_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "process_tasks_process_id_fkey"
            columns: ["process_id"]
            isOneToOne: false
            referencedRelation: "processes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "process_tasks_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          }
        ]
      }
      processes: {
        Row: {
          created_at: string
          id: number
          last_edited: string
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          last_edited?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          last_edited?: string
          name?: string | null
        }
        Relationships: []
      }
      project_groups: {
        Row: {
          created_at: string
          id: number
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_groups_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      projects: {
        Row: {
          created_at: string
          description: string | null
          focus: string | null
          goal: string | null
          group_id: number | null
          id: number
          last_edited: string
          name: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          focus?: string | null
          goal?: string | null
          group_id?: number | null
          id?: number
          last_edited?: string
          name?: string
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          focus?: string | null
          goal?: string | null
          group_id?: number | null
          id?: number
          last_edited?: string
          name?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "project_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      sessions: {
        Row: {
          end: string | null
          focused_duration: number | null
          id: number
          intention_id: number | null
          interruption_duration: number | null
          last_edited: string
          project_id: number | null
          start: string
          task_id: number | null
          total_duration: number | null
          user_id: string
        }
        Insert: {
          end?: string | null
          focused_duration?: number | null
          id?: number
          intention_id?: number | null
          interruption_duration?: number | null
          last_edited?: string
          project_id?: number | null
          start?: string
          task_id?: number | null
          total_duration?: number | null
          user_id: string
        }
        Update: {
          end?: string | null
          focused_duration?: number | null
          id?: number
          intention_id?: number | null
          interruption_duration?: number | null
          last_edited?: string
          project_id?: number | null
          start?: string
          task_id?: number | null
          total_duration?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sessions_intention_id_fkey"
            columns: ["intention_id"]
            isOneToOne: false
            referencedRelation: "intentions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      settings: {
        Row: {
          break_message: string
          clock_format: boolean
          date_format: string
          intentions_card_hidden: boolean
          project_card_hidden: boolean
          ratio: number
          separator: number
          tasks_card_hidden: boolean
          tasks_sorting: string | null
          to_dos_card_hidden: boolean
          to_dos_sorting: string
          user_id: string
          warning: number
        }
        Insert: {
          break_message?: string
          clock_format?: boolean
          date_format?: string
          intentions_card_hidden?: boolean
          project_card_hidden?: boolean
          ratio?: number
          separator?: number
          tasks_card_hidden?: boolean
          tasks_sorting?: string | null
          to_dos_card_hidden?: boolean
          to_dos_sorting?: string
          user_id: string
          warning?: number
        }
        Update: {
          break_message?: string
          clock_format?: boolean
          date_format?: string
          intentions_card_hidden?: boolean
          project_card_hidden?: boolean
          ratio?: number
          separator?: number
          tasks_card_hidden?: boolean
          tasks_sorting?: string | null
          to_dos_card_hidden?: boolean
          to_dos_sorting?: string
          user_id?: string
          warning?: number
        }
        Relationships: [
          {
            foreignKeyName: "settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      tags: {
        Row: {
          created_at: string
          id: number
          name: string
          task_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          task_id: number
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          task_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "tags_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          }
        ]
      }
      task_statuses: {
        Row: {
          created_at: string
          id: number
          order: number
          project_id: number
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          order: number
          project_id: number
          status: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          order?: number
          project_id?: number
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_statuses_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_statuses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      tasks: {
        Row: {
          created_at: string
          description: string | null
          due_date: string | null
          id: number
          last_edited: string
          name: string
          order: number
          priority: number
          project_id: number
          status_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: number
          last_edited?: string
          name: string
          order?: number
          priority: number
          project_id: number
          status_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: number
          last_edited?: string
          name?: string
          order?: number
          priority?: number
          project_id?: number
          status_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "task_statuses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      to_dos: {
        Row: {
          created_at: string
          description: string | null
          done: boolean
          due_date: string | null
          id: number
          last_edited: string
          name: string
          priority: number
          project_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          done?: boolean
          due_date?: string | null
          id?: number
          last_edited?: string
          name: string
          priority: number
          project_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          done?: boolean
          due_date?: string | null
          id?: number
          last_edited?: string
          name?: string
          priority?: number
          project_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "to_dos_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "to_dos_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
