-- Abdullah portfolio projects. Run this in the Supabase SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 120),
  category text not null check (char_length(category) between 1 and 80),
  description text not null check (char_length(description) between 1 and 2000),
  image_url text,
  project_url text,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists projects_published_created_idx
  on public.projects (is_published, created_at desc);
create index if not exists projects_owner_created_idx
  on public.projects (owner_id, created_at desc);

alter table public.projects enable row level security;

-- Public visitors can only read published work. The owner can read all their projects.
drop policy if exists "Published projects are public" on public.projects;
create policy "Published projects are public"
  on public.projects for select
  using (is_published = true);

drop policy if exists "Owners can read their projects" on public.projects;
create policy "Owners can read their projects"
  on public.projects for select to authenticated
  using (owner_id = (select auth.uid()));

drop policy if exists "Owners can add their projects" on public.projects;
create policy "Owners can add their projects"
  on public.projects for insert to authenticated
  with check (owner_id = (select auth.uid()));

drop policy if exists "Owners can update their projects" on public.projects;
create policy "Owners can update their projects"
  on public.projects for update to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()));

drop policy if exists "Owners can delete their projects" on public.projects;
create policy "Owners can delete their projects"
  on public.projects for delete to authenticated
  using (owner_id = (select auth.uid()));

grant select on public.projects to anon, authenticated;
grant insert, update, delete on public.projects to authenticated;
