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
      content_tags: {
        Row: {
          content_id: string
          relevance: number | null
          source: string
          tag_id: string
        }
        Insert: {
          content_id: string
          relevance?: number | null
          source?: string
          tag_id: string
        }
        Update: {
          content_id?: string
          relevance?: number | null
          source?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_tags_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "works"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      media_items: {
        Row: {
          created_at: string | null
          external_id: string
          id: string
          media_type: string
          overview: string | null
          popularity: number | null
          poster_url: string | null
          release_date: string | null
          source: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          external_id: string
          id?: string
          media_type: string
          overview?: string | null
          popularity?: number | null
          poster_url?: string | null
          release_date?: string | null
          source: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          external_id?: string
          id?: string
          media_type?: string
          overview?: string | null
          popularity?: number | null
          poster_url?: string | null
          release_date?: string | null
          source?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          id: string
          updated_at: string | null
          username: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          id: string
          updated_at?: string | null
          username: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      tags: {
        Row: {
          category: string
          confidence: number | null
          created_at: string | null
          description: string | null
          id: string
          is_nsfw: boolean | null
          language: string | null
          name: string
          slug: string
          type: string
          updated_at: string | null
        }
        Insert: {
          category: string
          confidence?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_nsfw?: boolean | null
          language?: string | null
          name: string
          slug: string
          type?: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          confidence?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_nsfw?: boolean | null
          language?: string | null
          name?: string
          slug?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      uploads: {
        Row: {
          created_at: string | null
          id: string
          linked_work_id: string | null
          type: string
          url: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          linked_work_id?: string | null
          type: string
          url: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          linked_work_id?: string | null
          type?: string
          url?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "uploads_linked_work_id_fkey"
            columns: ["linked_work_id"]
            isOneToOne: false
            referencedRelation: "works"
            referencedColumns: ["id"]
          },
        ]
      }
      user_interactions: {
        Row: {
          content_id: string
          created_at: string | null
          id: string
          interaction: string
          score: number | null
          user_id: string
        }
        Insert: {
          content_id: string
          created_at?: string | null
          id?: string
          interaction: string
          score?: number | null
          user_id: string
        }
        Update: {
          content_id?: string
          created_at?: string | null
          id?: string
          interaction?: string
          score?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_interactions_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "works"
            referencedColumns: ["id"]
          },
        ]
      }
      user_tag_preferences: {
        Row: {
          affinity: number | null
          favorited: boolean | null
          hidden: boolean | null
          tag_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          affinity?: number | null
          favorited?: boolean | null
          hidden?: boolean | null
          tag_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          affinity?: number | null
          favorited?: boolean | null
          hidden?: boolean | null
          tag_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_tag_preferences_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      works: {
        Row: {
          author_id: string | null
          average_rating: number | null
          body: string | null
          comment_count: number | null
          created_at: string | null
          description: string | null
          duration: number | null
          fandom_slug: string | null
          genre: string | null
          id: string
          language: string | null
          like_count: number | null
          media_url: string | null
          personalization_score: number | null
          rating_count: number | null
          status: string | null
          tags: string | null
          title: string | null
          type: string | null
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          author_id?: string | null
          average_rating?: number | null
          body?: string | null
          comment_count?: number | null
          created_at?: string | null
          description?: string | null
          duration?: number | null
          fandom_slug?: string | null
          genre?: string | null
          id?: string
          language?: string | null
          like_count?: number | null
          media_url?: string | null
          personalization_score?: number | null
          rating_count?: number | null
          status?: string | null
          tags?: string | null
          title?: string | null
          type?: string | null
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          author_id?: string | null
          average_rating?: number | null
          body?: string | null
          comment_count?: number | null
          created_at?: string | null
          description?: string | null
          duration?: number | null
          fandom_slug?: string | null
          genre?: string | null
          id?: string
          language?: string | null
          like_count?: number | null
          media_url?: string | null
          personalization_score?: number | null
          rating_count?: number | null
          status?: string | null
          tags?: string | null
          title?: string | null
          type?: string | null
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: []
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
