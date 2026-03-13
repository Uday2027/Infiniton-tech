# Infiniton Tech

**Innovating the Infinite. Automating the Future.**

A full-stack company website and admin dashboard built with Next.js 14, featuring AI-powered consultation forms, finance tracking, project management, and analytics.

**Live:** [infiniton-tech.vercel.app](https://infiniton-tech.vercel.app)

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5.6 (strict) |
| Styling | Tailwind CSS 3.4 (dark theme) |
| Animation | Framer Motion, GSAP, Lenis |
| Database | PostgreSQL (Supabase) |
| ORM | Prisma + Supabase JS Client |
| Auth | JWT + bcryptjs |
| AI | Google Gemini |
| Email | EmailJS |
| Charts | Chart.js + react-chartjs-2 |
| Icons | Lucide React |
| Deployment | Vercel |

---

## Features

### Public Site
- Animated homepage with parallax stats, horizontal scroll services, stacking cards, and project showcase
- Smooth scrolling via Lenis
- AI-powered consultation form (Google Gemini generates project suggestions)
- Contact form with EmailJS integration
- Fully responsive with dark-mode-first design
- GSAP + Framer Motion page transitions and scroll animations

### Admin Panel (`/admin`)
- JWT-based authentication with middleware protection
- **Dashboard** — Stats overview (consultations, contacts, projects, monthly revenue)
- **Consultations** — View, filter, update status, detail modal
- **Contacts** — View, filter, update status, detail modal
- **Projects** — Create manually or convert from consultations, track status (pending/in_progress/completed/cancelled), budget in BDT & USD
- **Finance** — Track income and expenses in BDT & USD, summary cards, transaction CRUD
- **Analytics** — Revenue trend (line chart), income vs expenses (bar chart), project status breakdown (doughnut chart), printable reports

---

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx                     # Root layout (fonts, theme)
│   │   ├── globals.css                    # Global styles + print CSS
│   │   ├── (main)/                        # Public site route group
│   │   │   ├── layout.tsx                 # Navbar, Footer, Preloader, SmoothScroll
│   │   │   ├── template.tsx               # Framer Motion page transitions
│   │   │   ├── page.tsx                   # Homepage
│   │   │   ├── about/page.tsx
│   │   │   ├── services/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   └── consultation/page.tsx
│   │   ├── (admin)/                       # Admin route group
│   │   │   └── admin/
│   │   │       ├── login/page.tsx         # Login (no sidebar)
│   │   │       └── (dashboard)/           # Auth-protected pages
│   │   │           ├── layout.tsx         # Sidebar + auth guard
│   │   │           ├── page.tsx           # Dashboard
│   │   │           ├── consultations/
│   │   │           ├── contacts/
│   │   │           ├── projects/
│   │   │           ├── finance/
│   │   │           └── analytics/
│   │   └── api/
│   │       ├── consultation/route.ts
│   │       ├── contact/route.ts
│   │       ├── ai-suggestion/route.ts
│   │       └── admin/                     # 15 admin API routes
│   ├── components/
│   │   ├── *.tsx                           # 25 public components
│   │   └── admin/*.tsx                     # 15 admin components
│   ├── lib/
│   │   ├── auth.ts                        # JWT + bcrypt auth utilities
│   │   ├── db.ts                          # Supabase data access layer
│   │   ├── prisma.ts                      # Prisma client singleton
│   │   └── constants.ts                   # Site configuration
│   └── middleware.ts                      # Admin route protection
├── prisma/schema.prisma
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project
- A [Google AI Studio](https://aistudio.google.com) API key
- An [EmailJS](https://www.emailjs.com) account

### 1. Clone the repository

```bash
git clone https://github.com/Uday2027/Infiniton-tech.git
cd Infiniton-tech/frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.local.example .env.local
```

Fill in the values:

| Variable | Where to Get |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API (service_role, secret) |
| `DATABASE_URL` | Supabase → Settings → Database → Connection string (Transaction) |
| `DIRECT_URL` | Supabase → Settings → Database → Connection string (Session) |
| `GOOGLE_AI_API_KEY` | [Google AI Studio](https://aistudio.google.com/apikey) |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS Dashboard |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS Dashboard |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS Dashboard |
| `JWT_SECRET` | Any random secret string |

### 4. Create database tables

Run the following SQL in **Supabase → SQL Editor**:

```sql
-- Consultation Requests
CREATE TABLE consultation_requests (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  project_type TEXT NOT NULL,
  project_name TEXT,
  project_description TEXT NOT NULL,
  target_audience TEXT,
  key_features TEXT NOT NULL,
  existing_solution TEXT,
  budget TEXT NOT NULL,
  timeline TEXT NOT NULL,
  team_size TEXT,
  additional_notes TEXT,
  ai_suggestion TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Contact Messages
CREATE TABLE contact_messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'unread',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Admin Users
CREATE TABLE admin_users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Projects
CREATE TABLE projects (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_email TEXT,
  description TEXT,
  project_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  budget_bdt NUMERIC(14,2) DEFAULT 0,
  budget_usd NUMERIC(14,2) DEFAULT 0,
  start_date DATE,
  end_date DATE,
  consultation_id BIGINT REFERENCES consultation_requests(id) ON DELETE SET NULL,
  source TEXT NOT NULL DEFAULT 'manual'
    CHECK (source IN ('consultation', 'manual')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Transactions
CREATE TABLE transactions (
  id BIGSERIAL PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  category TEXT NOT NULL,
  description TEXT,
  amount_bdt NUMERIC(14,2) NOT NULL DEFAULT 0,
  amount_usd NUMERIC(14,2) NOT NULL DEFAULT 0,
  project_id BIGINT REFERENCES projects(id) ON DELETE SET NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  payment_method TEXT,
  reference TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### 5. Create the admin user

```bash
node -e "require('bcryptjs').hash('your-password', 12).then(h => console.log(h))"
```

Then in **Supabase SQL Editor**:

```sql
INSERT INTO admin_users (username, password_hash)
VALUES ('admin', 'PASTE_HASH_HERE');
```

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site and [http://localhost:3000/admin](http://localhost:3000/admin) for the admin panel.

---

## API Routes

### Public

| Method | Route | Description |
|---|---|---|
| POST | `/api/consultation` | Submit consultation request |
| POST | `/api/contact` | Submit contact message |
| POST | `/api/ai-suggestion` | Get AI project suggestions |

### Admin (all auth-protected)

| Method | Route | Description |
|---|---|---|
| POST | `/api/admin/login` | Authenticate admin |
| POST | `/api/admin/logout` | Clear session |
| GET | `/api/admin/consultations/[id]` | Get consultation details |
| PATCH | `/api/admin/consultations/[id]/status` | Update consultation status |
| GET | `/api/admin/contacts/[id]` | Get contact details |
| PATCH | `/api/admin/contacts/[id]/status` | Update contact status |
| GET/POST | `/api/admin/projects` | List/create projects |
| GET/PATCH/DELETE | `/api/admin/projects/[id]` | Manage single project |
| PATCH | `/api/admin/projects/[id]/status` | Update project status |
| POST | `/api/admin/projects/convert` | Convert consultation to project |
| GET/POST | `/api/admin/transactions` | List/create transactions |
| GET/PATCH/DELETE | `/api/admin/transactions/[id]` | Manage single transaction |
| GET | `/api/admin/finance/summary` | Finance summary (BDT & USD) |
| GET | `/api/admin/finance/monthly` | Monthly finance breakdown |
| GET | `/api/admin/analytics` | Combined analytics data |

---

## Scripts

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

---

## Deployment

The project is configured for **Vercel** deployment:

1. Push to GitHub
2. Connect the repository in [Vercel](https://vercel.com)
3. Set the **Root Directory** to `frontend`
4. Add all environment variables from `.env.local.example`
5. Deploy

---

## License

Private project. All rights reserved.
