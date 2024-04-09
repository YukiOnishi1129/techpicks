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