CREATE FUNCTION set_articles_update_time()
    RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TABLE articles
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    platform_id uuid NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    article_url TEXT NOT NULL,
    published_at TIMESTAMPTZ NOT NULL,
    authorName VARCHAR(255),
    tags TEXT,
    thumbnail_url TEXT NOT NULL,
    is_private BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),

    CONSTRAINT fk_article_platform_id FOREIGN KEY (platform_id) REFERENCES platforms(id) ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TRIGGER articles_update_tri BEFORE UPDATE ON articles FOR EACH ROW EXECUTE PROCEDURE set_articles_update_time();