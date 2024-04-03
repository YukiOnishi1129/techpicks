alter database postgres
set timezone to 'Asia/Tokyo';

CREATE FUNCTION set_platforms_update_time()
    RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TABLE platforms
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    site_url VARCHAR(255) NOT NULL,
    platform_type INT NOT NULL,
    favicon_url VARCHAR(255) NOT NULL,
    is_eng BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (id)
);

CREATE TRIGGER platforms_update_tri BEFORE UPDATE ON platforms FOR EACH ROW EXECUTE PROCEDURE set_platforms_update_time();