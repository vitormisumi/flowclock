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
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "intentions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      interruptions: {
        Row: {
          end: string | null
          id: number
          reason: string | null
          session_id: number
          start: string
          user_id: string
        }
        Insert: {
          end?: string | null
          id?: number
          reason?: string | null
          session_id: number
          start?: string
          user_id: string
        }
        Update: {
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
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interruptions_user_id_fkey"
            columns: ["user_id"]
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
            referencedRelation: "processes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "process_tasks_task_id_fkey"
            columns: ["task_id"]
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
            referencedRelation: "project_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      sessions: {
        Row: {
          end: string | null
          id: number
          intention_id: number | null
          interruption_duration: number | null
          last_edited: string
          start: string
          task_id: number | null
          user_id: string
        }
        Insert: {
          end?: string | null
          id?: number
          intention_id?: number | null
          interruption_duration?: number | null
          last_edited?: string
          start?: string
          task_id?: number | null
          user_id: string
        }
        Update: {
          end?: string | null
          id?: number
          intention_id?: number | null
          interruption_duration?: number | null
          last_edited?: string
          start?: string
          task_id?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sessions_intention_id_fkey"
            columns: ["intention_id"]
            referencedRelation: "intentions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_task_id_fkey"
            columns: ["task_id"]
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_user_id_fkey"
            columns: ["user_id"]
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
          ratio: number
          separator: number
          user_id: string
          warning: number
        }
        Insert: {
          break_message?: string
          clock_format?: boolean
          date_format?: string
          ratio?: number
          separator?: number
          user_id: string
          warning?: number
        }
        Update: {
          break_message?: string
          clock_format?: boolean
          date_format?: string
          ratio?: number
          separator?: number
          user_id?: string
          warning?: number
        }
        Relationships: [
          {
            foreignKeyName: "settings_user_id_fkey"
            columns: ["user_id"]
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
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_statuses_user_id_fkey"
            columns: ["user_id"]
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
          priority: number | null
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
          priority?: number | null
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
          priority?: number | null
          project_id?: number
          status_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_status_id_fkey"
            columns: ["status_id"]
            referencedRelation: "task_statuses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_user_id_fkey"
            columns: ["user_id"]
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
          priority: number | null
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
          priority?: number | null
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
          priority?: number | null
          project_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "to_dos_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "to_dos_user_id_fkey"
            columns: ["user_id"]
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
