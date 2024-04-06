-- CREATE FUNCTION set_profiles_update_time()
--     RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

-- CreateTable
CREATE TABLE "profiles" (
    "id" uuid REFERENCES auth.users NOT NULL,
    "name" TEXT NULL,
    "email" TEXT NULL,
    "image" TEXT NULL,
    -- "provider" TEXT NULL,
    "is_super_admin" BOOLEAN NULL,
    -- "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- "updated_at" TIMESTAMP(3) NOT NULL,
    -- "deleted_at" TIMESTAMP(3),

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
-- CREATE UNIQUE INDEX "profiles_email_key" ON "profiles"("email");

-- CREATE TRIGGER profiles_update_tri BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE set_profiles_update_time();

alter table profiles enable row level security;

-- create policy "Public profiles are viewable by everyone."
--   on profiles for select
--   using ( true );

-- create policy "Users can insert their own profile."
--   on profiles for insert
--   with check ( auth.uid() = id );

-- create policy "Users can update own profile."
--   on profiles for update
--   using ( auth.uid() = id );


-- inserts a row into public.profiles
-- CREATE OR REPLACE FUNCTION public.create_profile_for_user()
--  RETURNS trigger
--  LANGUAGE plpgsql
--  SECURITY DEFINER
-- AS $$
-- BEGIN
--   INSERT INTO public.profiles (id, email, first_name, last_name, avatar_url)
--   SELECT
--     new.id,
--     new.email,
--     COALESCE(split_part(jsonb_extract_path_text(new.raw_user_meta_data, 'full_name'), ' ', 1), NULL),
--     COALESCE(split_part(jsonb_extract_path_text(new.raw_user_meta_data, 'full_name'), ' ', 2), NULL),
--     COALESCE(jsonb_extract_path_text(new.raw_user_meta_data, 'picture'), jsonb_extract_path_text(new.raw_user_meta_data, 'avatar_url'), NULL);
--   RETURN new;
-- END;
-- $$


create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, email, image, is_super_admin)
  values (
    new.id,
    new.raw_user_meta_data->>'name',
    new.email,
    new.raw_user_meta_data->>'avatar_url',
    '0'
    );
  return new;
end;
$$ language plpgsql security definer;


-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();