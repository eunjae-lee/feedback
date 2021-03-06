create table forms (
  id uuid not null primary key default uuid_generate_v4(),

  slug text,
  title text,
  description text,
  exposure text default 'choose', -- 'public' | 'private' | 'choose'

  unique(slug)
);

alter table forms add column allow_tweet boolean default true;

create table feedbacks (
  id uuid not null primary key default uuid_generate_v4(),
  form_id uuid references forms not null,
  
  type text,  -- 'direct' | 'tweet'

  feedback text,
  name text,
  url text,
  is_public boolean default false,
  created_at TIMESTAMP WITH TIME ZONE default current_timestamp
);