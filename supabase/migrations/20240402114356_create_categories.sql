CREATE FUNCTION set_categories_update_time()
    RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TABLE categories
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (id)
);

CREATE TRIGGER categories_update_tri BEFORE UPDATE ON categories FOR EACH ROW EXECUTE PROCEDURE set_categories_update_time();