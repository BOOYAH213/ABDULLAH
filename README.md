# Abdullah Portfolio

Bilingual Arabic/English portfolio for Abdullah. Projects are stored in Supabase PostgreSQL; administrator access uses Supabase email/password authentication and Row Level Security (RLS).

## Connect your Supabase project

I prepared the integration, but a Supabase project must be created under your account; this repository cannot create an external account or database on your behalf.

1. Create a Supabase project at https://supabase.com/dashboard and choose a database password privately. Do not send that password to anyone.
2. In the Supabase SQL Editor, run [`supabase/schema.sql`](supabase/schema.sql).
3. In **Project Settings → API**, copy the Project URL and the publishable key (or legacy anon key) into `supabase-config.js`. This browser key is designed to be public; never use the `service_role` or secret key in this website.
4. In **Authentication → Providers / Sign In**, disable public sign-ups. Invite only your own email from **Authentication → Users**, then use the invitation flow to set your password. Do not commit credentials or share your password in chat.
5. In **Authentication → URL Configuration**, set the site URL and redirect URLs to your deployed website. For local testing, use the local server URL.
6. Serve the repository through a web server (for example, GitHub Pages); do not open it using `file://`, because the authentication redirect and browser requests need an HTTP origin.

The site displays only published projects to visitors. A signed-in owner can add and delete their own records; the database enforces this with RLS. Public sign-up should remain disabled. The publishable/anon key is not a password; RLS is the security boundary.

## Run locally

After configuring Supabase, run a local static web server in the repository directory, such as `python -m http.server 8000`, and open `http://localhost:8000`.

## Files

- `index.html`, `styles.css`, `script.js` — portfolio and dashboard UI.
- `supabase-config.js` — your Supabase Project URL and publishable/anon key.
- `supabase/schema.sql` — projects table, indexes, grants, and RLS policies.

Do not put real passwords, database passwords, service-role keys, or other server secrets in frontend files or GitHub.
