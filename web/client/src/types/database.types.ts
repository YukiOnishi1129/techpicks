export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      articles: {
        Row: {
          article_url: string
          author_name: string | null
          created_at: string
          description: string
          id: string
          is_eng: boolean
          is_private: boolean
          platform_id: string | null
          published_at: string | null
          tags: string | null
          thumbnail_url: string
          title: string
          updated_at: string
        }
        Insert: {
          article_url: string
          author_name?: string | null
          created_at?: string
          description: string
          id?: string
          is_eng?: boolean
          is_private?: boolean
          platform_id?: string | null
          published_at?: string | null
          tags?: string | null
          thumbnail_url: string
          title: string
          updated_at?: string
        }
        Update: {
          article_url?: string
          author_name?: string | null
          created_at?: string
          description?: string
          id?: string
          is_eng?: boolean
          is_private?: boolean
          platform_id?: string | null
          published_at?: string | null
          tags?: string | null
          thumbnail_url?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_article_platform_id"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "platforms"
            referencedColumns: ["id"]
          },
        ]
      }
      bookmarks: {
        Row: {
          article_id: string
          article_url: string
          created_at: string
          description: string
          id: string
          is_eng: boolean
          is_read: boolean
          platform_favicon_url: string
          platform_id: string | null
          platform_name: string
          platform_url: string
          published_at: string | null
          thumbnail_url: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          article_id: string
          article_url: string
          created_at?: string
          description: string
          id?: string
          is_eng?: boolean
          is_read?: boolean
          platform_favicon_url: string
          platform_id?: string | null
          platform_name: string
          platform_url: string
          published_at?: string | null
          thumbnail_url: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          article_id?: string
          article_url?: string
          created_at?: string
          description?: string
          id?: string
          is_eng?: boolean
          is_read?: boolean
          platform_favicon_url?: string
          platform_id?: string | null
          platform_name?: string
          platform_url?: string
          published_at?: string | null
          thumbnail_url?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_bookmark_article_id"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_bookmark_platform_id"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "platforms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_bookmark_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: string
          name: string
          type: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          name: string
          type: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          name?: string
          type?: number
          updated_at?: string
        }
        Relationships: []
      }
      favorite_article_folders: {
        Row: {
          created_at: string
          description: string | null
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_favorite_article_folders_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      favorite_articles: {
        Row: {
          article_id: string
          article_url: string
          author_name: string | null
          created_at: string
          description: string
          favorite_article_folder_id: string
          id: string
          is_eng: boolean
          is_private: boolean
          is_read: boolean
          platform_favicon_url: string
          platform_id: string | null
          platform_name: string
          platform_url: string
          published_at: string | null
          tags: string | null
          thumbnail_url: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          article_id: string
          article_url: string
          author_name?: string | null
          created_at?: string
          description: string
          favorite_article_folder_id: string
          id?: string
          is_eng?: boolean
          is_private?: boolean
          is_read?: boolean
          platform_favicon_url: string
          platform_id?: string | null
          platform_name: string
          platform_url: string
          published_at?: string | null
          tags?: string | null
          thumbnail_url: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          article_id?: string
          article_url?: string
          author_name?: string | null
          created_at?: string
          description?: string
          favorite_article_folder_id?: string
          id?: string
          is_eng?: boolean
          is_private?: boolean
          is_read?: boolean
          platform_favicon_url?: string
          platform_id?: string | null
          platform_name?: string
          platform_url?: string
          published_at?: string | null
          tags?: string | null
          thumbnail_url?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_favorite_articles_article_id"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_favorite_articles_favorite_article_folder_id"
            columns: ["favorite_article_folder_id"]
            isOneToOne: false
            referencedRelation: "favorite_article_folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_favorite_articles_platform_id"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "platforms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_favorite_articles_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      feed_article_relations: {
        Row: {
          article_id: string
          created_at: string
          feed_id: string
          id: string
          updated_at: string
        }
        Insert: {
          article_id: string
          created_at?: string
          feed_id: string
          id?: string
          updated_at?: string
        }
        Update: {
          article_id?: string
          created_at?: string
          feed_id?: string
          id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_feed_article_relations_articles_id"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_feed_article_relations_feeds_id"
            columns: ["feed_id"]
            isOneToOne: false
            referencedRelation: "feeds"
            referencedColumns: ["id"]
          },
        ]
      }
      feeds: {
        Row: {
          api_query_param: string | null
          category_id: string
          created_at: string
          deleted_at: string | null
          description: string
          id: string
          name: string
          platform_id: string
          rss_url: string
          site_url: string
          thumbnail_url: string
          trend_platform_type: number
          updated_at: string
        }
        Insert: {
          api_query_param?: string | null
          category_id: string
          created_at?: string
          deleted_at?: string | null
          description: string
          id?: string
          name: string
          platform_id: string
          rss_url: string
          site_url: string
          thumbnail_url: string
          trend_platform_type?: number
          updated_at?: string
        }
        Update: {
          api_query_param?: string | null
          category_id?: string
          created_at?: string
          deleted_at?: string | null
          description?: string
          id?: string
          name?: string
          platform_id?: string
          rss_url?: string
          site_url?: string
          thumbnail_url?: string
          trend_platform_type?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_feeds_categories_id"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_feeds_platform_id"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "platforms"
            referencedColumns: ["id"]
          },
        ]
      }
      my_feed_folders: {
        Row: {
          created_at: string
          description: string | null
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_my_feed_folders_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      my_feeds: {
        Row: {
          created_at: string
          feed_id: string
          id: string
          my_feed_folder_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          feed_id: string
          id?: string
          my_feed_folder_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          feed_id?: string
          id?: string
          my_feed_folder_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_my_feeds_feed_id"
            columns: ["feed_id"]
            isOneToOne: false
            referencedRelation: "feeds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_my_feeds_my_feed_folder_id"
            columns: ["my_feed_folder_id"]
            isOneToOne: false
            referencedRelation: "my_feed_folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_my_feeds_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      platforms: {
        Row: {
          created_at: string
          deleted_at: string | null
          favicon_url: string
          id: string
          is_eng: boolean
          name: string
          platform_site_type: number
          site_url: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          favicon_url: string
          id?: string
          is_eng?: boolean
          name: string
          platform_site_type: number
          site_url: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          favicon_url?: string
          id?: string
          is_eng?: boolean
          name?: string
          platform_site_type?: number
          site_url?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          deleted_at: string | null
          email: string
          email_verified_at: string | null
          id: string
          image: string
          is_super_admin: boolean
          name: string
          provider: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          email: string
          email_verified_at?: string | null
          id: string
          image: string
          is_super_admin?: boolean
          name: string
          provider?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          email?: string
          email_verified_at?: string | null
          id?: string
          image?: string
          is_super_admin?: boolean
          name?: string
          provider?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      trend_articles: {
        Row: {
          article_id: string
          created_at: string
          id: string
          like_count: number
          platform_id: string
          updated_at: string
        }
        Insert: {
          article_id: string
          created_at?: string
          id?: string
          like_count?: number
          platform_id: string
          updated_at?: string
        }
        Update: {
          article_id?: string
          created_at?: string
          id?: string
          like_count?: number
          platform_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_trend_articles_article_id"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_trend_articles_platform_id"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "platforms"
            referencedColumns: ["id"]
          },
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
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
