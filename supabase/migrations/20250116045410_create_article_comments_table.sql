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