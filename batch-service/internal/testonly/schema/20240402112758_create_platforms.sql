CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

alter database postgres
set timezone to 'Asia/Tokyo';

CREATE FUNCTION set_platforms_update_time()
    RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TABLE platforms
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    site_url TEXT NOT NULL,
    platform_site_type INT NOT NULL,
    favicon_url TEXT NOT NULL,
    is_eng BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL,
    PRIMARY KEY (id)
);

CREATE TRIGGER platforms_update_tri BEFORE UPDATE ON platforms FOR EACH ROW EXECUTE PROCEDURE set_platforms_update_time();