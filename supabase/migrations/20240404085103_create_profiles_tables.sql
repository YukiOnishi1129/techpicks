CREATE FUNCTION set_profiles_update_time()
    RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TABLE "profiles" (
    "id" uuid REFERENCES auth.users NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "email_verified_at" TIMESTAMPTZ(3) NULL,
    "image" TEXT NOT NULL,
    "provider" TEXT NULL,
    "is_super_admin" BOOLEAN NOT NULL DEFAULT FALSE,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(3) NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

CREATE TRIGGER profiles_update_tri BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE set_profiles_update_time();

-- CreateIndex
-- CREATE UNIQUE INDEX "profiles_email_key" ON "profiles"("email");

alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );




-- inserts a row into public.profiles
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, email, email_verified_at, image, provider)
  values (
    new.id,
    new.raw_user_meta_data->>'name',
    new.email,
    new.email_confirmed_at,
    new.raw_user_meta_data->>'avatar_url',
    new.raw_app_meta_data->>'provider'
    );
  return new;
end;
$$ language plpgsql security definer;


-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();