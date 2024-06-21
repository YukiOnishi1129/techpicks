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