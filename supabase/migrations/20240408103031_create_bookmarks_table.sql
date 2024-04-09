CREATE FUNCTION set_bookmarks_update_time()
    RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TABLE bookmarks
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL,
    platform_id uuid NULL,
    article_id uuid NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    article_url TEXT NOT NULL,
    published_at TIMESTAMPTZ NOT NULL,
    thumbnail_url TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),

    CONSTRAINT fk_bookmark_user_id FOREIGN KEY (user_id) REFERENCES profiles(id) ON UPDATE RESTRICT ON DELETE CASCADE,
    CONSTRAINT fk_bookmark_platform_id FOREIGN KEY (platform_id) REFERENCES platforms(id) ON UPDATE RESTRICT ON DELETE CASCADE,
    CONSTRAINT fk_bookmark_article_id FOREIGN KEY (article_id) REFERENCES articles(id) ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TRIGGER bookmarks_update_tri BEFORE UPDATE ON bookmarks FOR EACH ROW EXECUTE PROCEDURE set_bookmarks_update_time();