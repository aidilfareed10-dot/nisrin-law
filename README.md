# Nisrin Law — website, client portal and staff portal

Static site (HTML/CSS/vanilla JS, no build step) backed by **Supabase** for logins and shared data.

| Page | What it is |
|---|---|
| `index.html` | Public website: firm, practice areas, international clients, team, FAQ, consultation form |
| `login.html` / `register.html` | Client and staff sign-in, client sign-up |
| `client.html` | Client portal: case progress, timeline, documents, messages, appointments, invoices, preferences |
| `admin.html` | Staff portal: dashboard, case-progress board, enquiries, clients, matters, appointments, messages, documents, invoices, settings |

## Connecting Supabase (one-time)

1. **Create a project** at supabase.com (any region; Singapore `ap-southeast-1` is closest to Kuala Lumpur).
2. **Run the setup script**: Supabase → SQL Editor → New query → paste the whole of `supabase/setup.sql` → Run.
   It creates the database table, the security rules, the ready-made logins and sample data. Safe to run again.
3. **Allow instant sign-up** (recommended for the demo): Authentication → Sign In / Providers → Email → turn **off** "Confirm email".
   If you leave it on, new clients must click a confirmation email before they can sign in.
4. **Add the keys**: Project Settings → API → copy the *Project URL* and the *publishable / anon* key into `assets/js/config.js`, then commit and push.
   These two values are designed to be public; access is enforced by the row-level security in `setup.sql`.

Until step 4 is done the site runs in **local demo mode** (data stays in each visitor's browser), which is why enquiries sent from one device never reached staff on another.

### Ready-made logins (created by `setup.sql`)

| Role | Email | Password |
|---|---|---|
| Staff | `staff@nisrinlaw.com` | `NisrinStaff#2026` |
| Client | `client@nisrinlaw.com` | `NisrinClient#2026` |

The sign-in page also has one-click **Sample staff** / **Sample client** buttons. Add more staff from the SQL Editor:

```sql
select public.nl_create_account('name@nisrinlaw.com', 'StrongPassword#1', 'Full Name', 'admin', '{"title":"Senior Partner"}');
```

> **Before real client data is used:** remove the sample buttons from `login.html` and change or delete the demo staff
> account — anyone who knows those details can sign in as staff and read every enquiry.

## How the data works

- One table, `public.records (coll, id, client_id, data jsonb)`, holds enquiries, clients, matters, messages, documents, invoices and appointments.
- Row-level security: staff see everything; a client sees only rows with their own `client_id` (never enquiries or internal case notes); the public can only *insert* enquiries.
- New sign-ups always become clients. If staff created a client record first, signing up with the same email links the new login to it.
- Pages update live (Supabase Realtime, with a 30-second fallback poll), so staff see new enquiries without refreshing.
- `tools/make-setup-sql.js` regenerates `supabase/setup.sql` from the sample data in `assets/js/seed.js`.

## Running locally

```bash
python -m http.server 5520
```

## Content to confirm with the firm

- Practice-area descriptions, FAQ answers and values copy (written from the practice areas in the firm profile)
- Chinese and Arabic interface translations — have a native speaker review
- Bank / SWIFT details for international transfers
