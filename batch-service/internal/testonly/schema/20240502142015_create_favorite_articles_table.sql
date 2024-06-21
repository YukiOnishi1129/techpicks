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