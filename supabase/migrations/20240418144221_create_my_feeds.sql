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