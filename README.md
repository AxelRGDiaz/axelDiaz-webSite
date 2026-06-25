# DIAZ OS — Portfolio

A personal portfolio built as a developer OS experience — not a traditional portfolio.

## Stack

- **Next.js 15** (App Router, SSG)
- **TypeScript** (strict mode)
- **Tailwind CSS v4**
- **Framer Motion** (animations)
- **Shadcn/UI** (base components)
- **MDX** (content management)
- **Resend** (contact form emails)

## Getting Started

```bash
npm install
npm run dev
```

## How to Customize

### Add a new project

Create `content/projects/my-project.mdx`:

```mdx
---
title: "My Project"
description: "Short description"
stack: ["React", "Node.js"]
category: "Full Stack"
status: "live"
featured: true
year: 2024
role: "Lead Developer"
problem: "What problem did this solve?"
solution: "How did you solve it?"
challenges:
  - "Challenge 1"
metrics:
  - { label: "Users", value: "10k+" }
links:
  github: "https://github.com/..."
  demo: "https://demo.example.com"
---
```

### Add work experience

Create `content/experience/company-year.mdx`:

```mdx
---
company: "Company Name"
role: "Your Role"
version: "v4.0"
startDate: "2024-01-01"
current: true
type: "full-time"
location: "City, Country"
remote: true
description: "Role description"
achievements:
  - "Achievement 1"
stack: ["React", "Node.js"]
---
```

### Update your CV

Replace `public/cv.pdf` with your PDF. No code changes needed.

## Environment Variables

```env
RESEND_API_KEY=re_xxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Deploy to Vercel

Connect this repo to Vercel and set the environment variables in the dashboard.

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘K` / `Ctrl+K` | Open Command Palette |
| `↑↓` | Navigate |
| `Enter` | Select |
| `Esc` | Close |
