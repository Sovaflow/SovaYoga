# Sova Yoga

> A bilingual client-care and session-planning prototype for personalised one-to-one yoga.

[![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=white)](https://vite.dev/)

**Live demo:** [sovaflow.se](https://sovaflow.se)<br>
**Created by:** [Anna Svensson](https://github.com/Sovaflow)

## The product idea

Independent instructors often prepare individual sessions using messages, notes and separate calendars. Important preferences are easy to miss, while collecting unnecessary health information creates avoidable privacy risk.

Sova Yoga explores a calmer workflow:

- the client books a date and time;
- practice preferences are a required part of the same booking flow;
- the trainer sees upcoming sessions, preparation status and aggregated insights;
- all demo data is synthetic;
- the form asks about service preferences, not diagnoses, injuries or pain.

The project combines my backgrounds in yoga instruction, customer data and CRM. It demonstrates how a real service problem can be translated into a focused digital product and a clear data model.

## What you can explore

### Client experience

- Separate client view without trainer navigation
- Date and time selection with automatic time-zone detection
- Mandatory multi-select practice focus
- Required pace selection
- RU/EN language switch
- Validation, confirmation and local demo persistence

### Trainer workspace

- Overview with preparation statuses and upcoming sessions
- Weekly schedule
- Client cards with activity and recent preferences
- Simple analytics for attendance, return rate, focus and pace
- Clearly labelled demo mode with synthetic data

## Product decisions

| Decision | Why it matters |
|---|---|
| Booking and preferences are one flow | A session cannot be booked without the information needed to prepare it |
| Client and trainer views are visually separated | Clients never see the trainer's operational navigation |
| Focus and pace use structured choices | Reduces accidental collection of health information in free text |
| Time zone is detected automatically | Supports online clients in different countries |
| Analytics use synthetic data | Makes the portfolio demo safe to explore |
| English and Russian are supported | Reflects the target client base and international use case |

## Tech stack

- React 19
- TypeScript
- Vite
- CSS custom properties and responsive layouts
- Browser `Intl` API for time-zone detection
- `localStorage` for device-local demo confirmation
- ESLint

No UI framework is used; the interface and responsive design are implemented from scratch.

## Project structure

```text
SovaYoga/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.tsx          # Application flow and screen components
│   ├── data.ts          # Synthetic demo data and translations
│   ├── main.tsx         # React entry point
│   ├── styles.css       # Design system and responsive styling
│   └── types.ts         # Shared TypeScript types
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Run locally

```bash
git clone https://github.com/Sovaflow/SovaYoga.git
cd SovaYoga
npm install
npm run dev
```

Production check:

```bash
npm run lint
npm run build
```

## Demo scope and roadmap

This repository is a **front-end product prototype**, not a production system. It deliberately does not pretend that authentication or server-side persistence already exists.

The next production milestone would add:

1. Supabase authentication in an EU region
2. Role-based access for `client` and `trainer`
3. Server-side booking and availability storage
4. Row Level Security and consent records
5. Email confirmation and cancellation flows
6. Data export and deletion controls
7. Automated tests and accessibility audit

The proposed production routes are `/book`, `/login`, `/trainer` and `/demo`. The public `/demo` route would keep synthetic portfolio data, while authenticated routes would use real role checks.

## Privacy-by-design note

The prototype avoids open questions about pain, diagnoses and injuries. It asks clients to choose a preferred practice focus and pace. Names, email addresses and bookings would still be personal data in a production version and would require a lawful basis, retention rules and appropriate security controls.

## What this project demonstrates

- Translating customer needs into a coherent user journey
- Product thinking and scope prioritisation
- Privacy-aware form design
- Bilingual UX
- Responsive front-end development
- Structuring operational data for future CRM and analytics use

---

Designed and developed as a portfolio project by **Anna Svensson** — Customer Data Developer, analyst and yoga instructor based in Stockholm.
