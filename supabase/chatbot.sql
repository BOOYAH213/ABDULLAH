-- Anonymous FAQ chat storage. Run this once in Supabase SQL Editor.
-- Visitor messages are visible only to signed-in users; keep public sign-ups disabled
-- and invite only the site administrator (see README.md).
create table if not exists public.chat_inquiries (
  id bigint generated always as identity primary key,
  visitor_id text not null check (char_length(visitor_id) between 1 and 100),
  question text not null check (char_length(question) between 1 and 1000),
  answer text not null check (char_length(answer) between 1 and 2000),
  created_at timestamptz not null default now()
);

create index if not exists chat_inquiries_created_at_idx
  on public.chat_inquiries (created_at desc);

alter table public.chat_inquiries enable row level security;

drop policy if exists "Visitors can submit bot inquiries" on public.chat_inquiries;
create policy "Visitors can submit bot inquiries"
  on public.chat_inquiries for insert to anon, authenticated
  with check (
    char_length(visitor_id) between 1 and 100
    and char_length(question) between 1 and 1000
    and char_length(answer) between 1 and 2000
  );

drop policy if exists "Signed-in admins can read bot inquiries" on public.chat_inquiries;
create policy "Signed-in admins can read bot inquiries"
  on public.chat_inquiries for select to authenticated
  using (true);

grant insert on public.chat_inquiries to anon, authenticated;
grant select on public.chat_inquiries to authenticated;
