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

    CONSTRAINT fk_trend_articles_article_id FOREIGN KEY (article_id) REFERENCES articles(id) ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TRIGGER trend_articles_update_tri BEFORE UPDATE ON trend_articles FOR EACH ROW EXECUTE PROCEDURE set_trend_articles_update_time();