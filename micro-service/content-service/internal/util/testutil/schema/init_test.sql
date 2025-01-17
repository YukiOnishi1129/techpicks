CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

alter database postgres
set timezone to 'Asia/Tokyo';

-- inserts a row into public.platforms

CREATE FUNCTION set_platforms_update_time()
    RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TABLE platforms
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    site_url TEXT NOT NULL,
    platform_site_type INT NOT NULL,
    favicon_url TEXT NOT NULL,
    is_eng BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL,
    PRIMARY KEY (id)
);

CREATE TRIGGER platforms_update_tri BEFORE UPDATE ON platforms FOR EACH ROW EXECUTE PROCEDURE set_platforms_update_time();

-- inserts a row into public.categories

CREATE FUNCTION set_categories_update_time()
    RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TABLE categories
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type INT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL,
    PRIMARY KEY (id)
);

CREATE TRIGGER categories_update_tri BEFORE UPDATE ON categories FOR EACH ROW EXECUTE PROCEDURE set_categories_update_time();

-- inserts a row into public.feeds

CREATE FUNCTION set_feeds_update_time()
    RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TABLE feeds
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    thumbnail_url TEXT NOT NULL,
    platform_id uuid NOT NULL,
    category_id uuid NOT NULL,
    site_url TEXT NOT NULL,
    rss_url TEXT NOT NULL,
    api_query_param VARCHAR(255),
    trend_platform_type INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_feeds_platform_id FOREIGN KEY (platform_id) REFERENCES platforms(id) ON UPDATE RESTRICT ON DELETE CASCADE,
    CONSTRAINT fk_feeds_categories_id FOREIGN KEY (category_id) REFERENCES categories(id) ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TRIGGER feeds_update_tri BEFORE UPDATE ON feeds FOR EACH ROW EXECUTE PROCEDURE set_feeds_update_time();

-- inserts a row into public.articles

CREATE FUNCTION set_articles_update_time()
    RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TABLE articles
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    platform_id uuid NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    article_url TEXT NOT NULL,
    published_at TIMESTAMPTZ NULL,
    author_name VARCHAR(255),
    tags TEXT,
    thumbnail_url TEXT NOT NULL,
    is_eng BOOLEAN NOT NULL DEFAULT FALSE,
    is_private BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),

    CONSTRAINT fk_article_platform_id FOREIGN KEY (platform_id) REFERENCES platforms(id) ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TRIGGER articles_update_tri BEFORE UPDATE ON articles FOR EACH ROW EXECUTE PROCEDURE set_articles_update_time();

-- inserts a row into public.feed_article_relations

CREATE FUNCTION set_feed_article_relations_update_time()
    RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TABLE feed_article_relations
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    feed_id uuid NOT NULL,
    article_id uuid NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_feed_article_relations_feeds_id FOREIGN KEY (feed_id) REFERENCES feeds(id) ON UPDATE RESTRICT ON DELETE CASCADE,
    CONSTRAINT fk_feed_article_relations_articles_id FOREIGN KEY (article_id) REFERENCES articles(id) ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TRIGGER feed_article_relations_update_tri BEFORE UPDATE ON feed_article_relations FOR EACH ROW EXECUTE PROCEDURE set_feed_article_relations_update_time();


-- inserts a row into public.profiles

CREATE FUNCTION set_profiles_update_time()
    RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TABLE "profiles" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "email_verified_at" TIMESTAMPTZ(3) NULL,
    "image" TEXT NOT NULL,
    "provider" TEXT NULL,
    "is_super_admin" BOOLEAN NOT NULL DEFAULT FALSE,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(3) NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

CREATE TRIGGER profiles_update_tri BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE set_profiles_update_time();

-- CreateIndex
-- CREATE UNIQUE INDEX "profiles_email_key" ON "profiles"("email");

alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );




-- inserts a row into public.profiles
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, email, email_verified_at, image, provider)
  values (
    new.id,
    new.raw_user_meta_data->>'name',
    new.email,
    new.email_confirmed_at,
    new.raw_user_meta_data->>'avatar_url',
    new.raw_app_meta_data->>'provider'
    );
  return new;
end;
$$ language plpgsql security definer;


-- inserts a row into public.bookmarks

CREATE FUNCTION set_bookmarks_update_time()
    RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TABLE bookmarks
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL,
    platform_id uuid NULL,
    article_id uuid NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    article_url TEXT NOT NULL,
    published_at TIMESTAMPTZ NULL,
    thumbnail_url TEXT NOT NULL,
    platform_name TEXT NOT NULL,
    platform_url TEXT NOT NULL,
    platform_favicon_url TEXT NOT NULL,
    is_eng BOOLEAN NOT NULL DEFAULT FALSE,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),

    CONSTRAINT fk_bookmark_user_id FOREIGN KEY (user_id) REFERENCES profiles(id) ON UPDATE RESTRICT ON DELETE CASCADE,
    CONSTRAINT fk_bookmark_platform_id FOREIGN KEY (platform_id) REFERENCES platforms(id) ON UPDATE RESTRICT ON DELETE CASCADE,
    CONSTRAINT fk_bookmark_article_id FOREIGN KEY (article_id) REFERENCES articles(id) ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TRIGGER bookmarks_update_tri BEFORE UPDATE ON bookmarks FOR EACH ROW EXECUTE PROCEDURE set_bookmarks_update_time();

-- inserts a row into public.my_feed_folders

CREATE FUNCTION set_my_feed_folders_update_time()
    RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TABLE my_feed_folders
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),

    CONSTRAINT fk_my_feed_folders_user_id FOREIGN KEY (user_id) REFERENCES profiles(id) ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TRIGGER my_feed_folders_update_tri BEFORE UPDATE ON my_feed_folders FOR EACH ROW EXECUTE PROCEDURE set_my_feed_folders_update_time();

-- inserts a row into public.my_feeds

CREATE FUNCTION set_my_feeds_update_time()
    RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TABLE my_feeds
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL,
    my_feed_folder_id uuid NOT NULL,
    feed_id uuid NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),

    CONSTRAINT fk_my_feeds_user_id FOREIGN KEY (user_id) REFERENCES profiles(id) ON UPDATE RESTRICT ON DELETE CASCADE,
    CONSTRAINT fk_my_feeds_my_feed_folder_id FOREIGN KEY (my_feed_folder_id) REFERENCES my_feed_folders(id) ON UPDATE RESTRICT ON DELETE CASCADE,
    CONSTRAINT fk_my_feeds_feed_id FOREIGN KEY (feed_id) REFERENCES feeds(id) ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TRIGGER my_feeds_update_tri BEFORE UPDATE ON my_feeds FOR EACH ROW EXECUTE PROCEDURE set_my_feeds_update_time();

-- inserts a row into public.trend_articles

CREATE FUNCTION set_trend_articles_update_time()
    RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TABLE trend_articles
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    article_id uuid NOT NULL,
    platform_id uuid NOT NULL,
    like_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id, article_id, platform_id),

    CONSTRAINT fk_trend_articles_article_id FOREIGN KEY (article_id) REFERENCES articles(id) ON UPDATE RESTRICT ON DELETE CASCADE,
    CONSTRAINT fk_trend_articles_platform_id FOREIGN KEY (platform_id) REFERENCES platforms(id) ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TRIGGER trend_articles_update_tri BEFORE UPDATE ON trend_articles FOR EACH ROW EXECUTE PROCEDURE set_trend_articles_update_time();

-- inserts a row into public.favorite_article_folders

CREATE FUNCTION set_favorite_article_folders_update_time()
    RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TABLE favorite_article_folders
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),

    CONSTRAINT fk_favorite_article_folders_user_id FOREIGN KEY (user_id) REFERENCES profiles(id) ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TRIGGER favorite_article_folders_update_tri BEFORE UPDATE ON favorite_article_folders FOR EACH ROW EXECUTE PROCEDURE set_favorite_article_folders_update_time();

-- inserts a row into public.favorite_articles
CREATE FUNCTION set_favorite_articles_update_time()
    RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TABLE favorite_articles
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL,
    favorite_article_folder_id uuid NOT NULL,
    platform_id uuid  NULL,
    article_id uuid NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    article_url TEXT NOT NULL,
    published_at TIMESTAMPTZ NULL,
    author_name VARCHAR(255),
    tags TEXT,
    thumbnail_url TEXT NOT NULL,
    platform_name TEXT NOT NULL,
    platform_url TEXT NOT NULL,
    platform_favicon_url TEXT NOT NULL,
    is_eng BOOLEAN NOT NULL DEFAULT FALSE,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    is_private BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),

    CONSTRAINT fk_favorite_articles_user_id FOREIGN KEY (user_id) REFERENCES profiles(id) ON UPDATE RESTRICT ON DELETE CASCADE,
    CONSTRAINT fk_favorite_articles_favorite_article_folder_id FOREIGN KEY (favorite_article_folder_id) REFERENCES favorite_article_folders(id) ON UPDATE RESTRICT ON DELETE CASCADE,
    CONSTRAINT fk_favorite_articles_platform_id FOREIGN KEY (platform_id) REFERENCES platforms(id) ON UPDATE RESTRICT ON DELETE CASCADE,
    CONSTRAINT fk_favorite_articles_article_id FOREIGN KEY (article_id) REFERENCES articles(id) ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TRIGGER favorite_articles_update_tri BEFORE UPDATE ON favorite_articles FOR EACH ROW EXECUTE PROCEDURE set_favorite_articles_update_time();

CREATE FUNCTION set_article_comments_update_time()
    RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TABLE article_comments
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL,
    article_id uuid NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),

    CONSTRAINT fk_article_comments_user_id FOREIGN KEY (user_id) REFERENCES profiles(id) ON UPDATE RESTRICT ON DELETE CASCADE,
    CONSTRAINT fk_articles_comments_article_id FOREIGN KEY (article_id) REFERENCES articles(id) ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TRIGGER article_comments_update_tri BEFORE UPDATE ON article_comments FOR EACH ROW EXECUTE PROCEDURE set_article_comments_update_time();

ALTER TABLE article_comments DROP CONSTRAINT fk_articles_comments_article_id;

ALTER TABLE article_comments
ADD CONSTRAINT fk_article_comments_article_id FOREIGN KEY (article_id) REFERENCES articles(id) ON UPDATE RESTRICT ON DELETE CASCADE;