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
    rss_url TEXT,
    api_url TEXT,
    feed_fetch_type INT NOT NULL,
    trend_platform_type INT NOT NULL DEFAULT 0,
    is_trending BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_feeds_platform_id FOREIGN KEY (platform_id) REFERENCES platforms(id) ON UPDATE RESTRICT ON DELETE CASCADE,
    CONSTRAINT fk_feeds_categories_id FOREIGN KEY (category_id) REFERENCES categories(id) ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TRIGGER feeds_update_tri BEFORE UPDATE ON feeds FOR EACH ROW EXECUTE PROCEDURE set_feeds_update_time();