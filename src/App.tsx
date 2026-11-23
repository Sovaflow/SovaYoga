import { useState } from "react";
import { clients, copy, dates } from "./data";
import type { Language, TrainerScreen } from "./types";

type Text = Record<string, string | string[]>;

const text = (value: string | string[]) => String(value);
const list = (value: string | string[]) => value as string[];

function LanguageSwitch({ language, setLanguage }: { language: Language; setLanguage: (value: Language) => void }) {
  return (
    <div className="language-switch" aria-label="Language">
      {(["ru", "en"] as const).map((item) => (
        <button key={item} className={language === item ? "active" : ""} onClick={() => setLanguage(item)}>
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function Logo({ subtitle }: { subtitle: string }) {
  return (
    <div className="logo">
      <span className="logo-mark">S</span>
      <div>Sova Yoga<small>{subtitle}</small></div>
    </div>
  );
}

export default function App() {
  const [language, setLanguage] = useState<Language>("en");
  const [clientMode, setClientMode] = useState(false);
  const [screen, setScreen] = useState<TrainerScreen>("overview");
  const t = copy[language];

  return (
    <main>
      <div className="demo-bar">
        <span>{text(t.demo)}</span>
        <LanguageSwitch language={language} setLanguage={setLanguage} />
      </div>
      {clientMode ? (
        <ClientExperience t={t} onBack={() => setClientMode(false)} />
      ) : (
        <TrainerWorkspace t={t} language={language} screen={screen} setScreen={setScreen} onClient={() => setClientMode(true)} />
      )}
    </main>
  );
}

function TrainerWorkspace({ t, language, screen, setScreen, onClient }: { t: Text; language: Language; screen: TrainerScreen; setScreen: (value: TrainerScreen) => void; onClient: () => void }) {
  const nav: Array<{ id: TrainerScreen; icon: string; label: string }> = [
    { id: "overview", icon: "⌂", label: text(t.overview) },
    { id: "schedule", icon: "□", label: text(t.schedule) },
    { id: "clients", icon: "♙", label: text(t.clients) },
    { id: "analytics", icon: "↗", label: text(t.analytics) },
  ];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Logo subtitle={text(t.trainer)} />
        <nav>
          {nav.map((item) => (
            <button key={item.id} className={screen === item.id ? "selected" : ""} onClick={() => setScreen(item.id)}>
              <span aria-hidden="true">{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>
        <div className="profile">
          <span className="avatar">AS</span>
          <div><strong>Anna Svensson</strong><small>Yoga instructor</small></div>
        </div>
      </aside>
      <section className="workspace">
        <header>
          <span className="mobile-brand">Sova Yoga</span>
          <button className="secondary-button" onClick={onClient}>◉ {text(t.clientView)}</button>
        </header>
        {screen === "overview" && <Overview t={t} language={language} setScreen={setScreen} />}
        {screen === "schedule" && <Schedule t={t} language={language} />}
        {screen === "clients" && <Clients t={t} language={language} />}
        {screen === "analytics" && <Analytics t={t} />}
      </section>
    </div>
  );
}

function PageTitle({ eyebrow, title, subtitle, action }: { eyebrow: string; title: string; subtitle: string; action?: string }) {
  return (
    <div className="page-title">
      <div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{subtitle}</p></div>
      {action && <button className="primary-button">＋ {action}</button>}
    </div>
  );
}

function Overview({ t, language, setScreen }: { t: Text; language: Language; setScreen: (value: TrainerScreen) => void }) {
  return (
    <div className="content">
      <PageTitle eyebrow="MONDAY · 24 AUGUST" title={text(t.greeting)} subtitle={text(t.greetingSub)} action={text(t.addAvailability)} />
      <div className="method-banner">
        <div className="method-art" aria-hidden="true"><span>○</span><i /><b /></div>
        <div><span>SOVA METHOD</span><p>{language === "en" ? "Every session begins with attention to the individual." : "Каждое занятие начинается с внимания к человеку."}</p></div>
      </div>
      <div className="stats">
        <Stat icon="◷" value="3" label={text(t.today)} tone="lilac" />
        <Stat icon="!" value="1" label={text(t.preparation)} tone="peach" />
        <Stat icon="✓" value="2/3" label={text(t.received)} tone="mint" />
      </div>
      <div className="overview-grid">
        <section className="panel sessions-panel">
          <div className="panel-heading"><div><h2>{text(t.upcoming)}</h2><span>Monday, 24 August</span></div><button onClick={() => setScreen("schedule")}>{text(t.schedule)} →</button></div>
          <div className="table-heading"><span>{language === "en" ? "Client" : "Клиент"}</span><span>{language === "en" ? "Focus" : "Фокус"}</span><span>{language === "en" ? "Status" : "Статус"}</span></div>
          {clients.map((client) => <SessionRow key={client.name} client={client} language={language} />)}
        </section>
        <aside className="insight-card">
          <span className="spark">✦</span><p className="eyebrow">{text(t.weeklyInsight)}</p><h2>{text(t.insightTitle)}</h2><p>{text(t.insight)}</p>
          <div className="mini-chart" aria-label="Seven session pace trend">{[70, 52, 42, 60, 35, 48, 30].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div>
          <small>{text(t.pacePreference)} · 7 {text(t.sessions)}</small>
        </aside>
      </div>
    </div>
  );
}

function Stat({ icon, value, label, tone }: { icon: string; value: string; label: string; tone: string }) {
  return <article><span className={`stat-icon ${tone}`}>{icon}</span><div><b>{value}</b><small>{label}</small></div></article>;
}

function SessionRow({ client, language }: { client: (typeof clients)[number]; language: Language }) {
  return (
    <div className="session-row">
      <div className="person"><span className="mini-avatar">{client.initials}</span><div><strong>{client.name}</strong><small>{client.time} · {client.zone}</small></div></div>
      <p>{client.focus[language]}</p><span className={`pill ${client.tone}`}>● {client.status[language]}</span>
    </div>
  );
}

function ClientExperience({ t, onBack }: { t: Text; onBack: () => void }) {
  const [day, setDay] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [pace, setPace] = useState<string | null>(null);
  const [areas, setAreas] = useState<string[]>([]);
  const [done, setDone] = useState(() => localStorage.getItem("sova-demo-booking") === "confirmed");
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const ready = day !== null && time !== null && pace !== null && areas.length > 0;
  const toggle = (area: string) => setAreas((current) => current.includes(area) ? current.filter((item) => item !== area) : [...current, area]);
  const confirm = () => { if (ready) { localStorage.setItem("sova-demo-booking", "confirmed"); setDone(true); } };

  return (
    <div className="client-shell">
      <header><Logo subtitle={text(t.book)} /><button className="secondary-button" onClick={onBack}>← {text(t.backToDemo)}</button></header>
      <div className="client-page">
        <section className="booking-card">
          <div className="booking-banner">
            <div className="banner-figure" aria-hidden="true"><span /><i /><b /></div>
            <div><small>PERSONAL YOGA · 60 MIN</small><h1>{text(t.book)}</h1><p>{text(t.bookSub)}</p></div>
          </div>
          <div className="booking-form">
            <div className="timezone">◎ <span>{text(t.timezone)}: <b>{zone}</b></span></div>
            <Field label={text(t.chooseDate)}>
              <div className="date-grid">{dates.map((date, index) => <button key={date.day} className={day === index ? "chosen" : ""} onClick={() => { setDay(index); setDone(false); }}><small>{date.weekDay}</small><b>{date.day}</b><span>{date.month}</span></button>)}</div>
            </Field>
            <Field label={text(t.chooseTime)}>
              <div className="time-grid">{["09:00", "10:00", "18:00", "19:30"].map((value) => <button key={value} className={time === value ? "chosen" : ""} onClick={() => { setTime(value); setDone(false); }}><b>{value}</b><small>{zone}</small></button>)}</div>
            </Field>
            <Field label={`${text(t.chooseFocus)} *`} hint={text(t.selectMany)}>
              <div className="chips">{list(t.focusOptions).map((area) => <button key={area} className={areas.includes(area) ? "chosen" : ""} onClick={() => { toggle(area); setDone(false); }}>{areas.includes(area) ? "✓ " : ""}{area}</button>)}</div>
            </Field>
            <Field label={`${text(t.choosePace)} *`}>
              <div className="pace-grid">{[text(t.calm), text(t.balanced), text(t.dynamic)].map((value) => <button key={value} className={pace === value ? "chosen" : ""} onClick={() => { setPace(value); setDone(false); }}>{pace === value ? "✓ " : ""}{value}</button>)}</div>
            </Field>
            <div className="privacy-note"><span>i</span><p>{text(t.privacy)}</p></div>
            {done && <div className="success">✓ {text(t.confirmed)}{day !== null && time ? `: ${dates[day].day} ${dates[day].month}, ${time}` : ""}</div>}
            <button className="submit-button" disabled={!ready} onClick={confirm}>{text(t.confirm)} →</button>
            {!ready && <p className="required-note">{text(t.required)}</p>}
          </div>
        </section>
      </div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return <fieldset><legend>{label}</legend>{hint && <p className="field-hint">{hint}</p>}{children}</fieldset>;
}

function Schedule({ t, language }: { t: Text; language: Language }) {
  return (
    <div className="content">
      <PageTitle eyebrow="SOVA YOGA" title={text(t.schedule)} subtitle={text(t.scheduleSub)} action={text(t.addAvailability)} />
      <section className="panel calendar">
        <div className="calendar-days">{dates.slice(0, 5).map((date) => <div key={date.day}><small>{date.weekDay}</small><b>{date.day}</b></div>)}</div>
        <div className="calendar-body">
          {["09:00", "12:00", "15:00", "18:00"].map((hour) => <span className="hour" key={hour}>{hour}</span>)}
          {clients.map((client, index) => <div key={client.name} className={`event event-${index + 1}`}><b>{client.name}</b><small>{client.time} · {client.focus[language]}</small></div>)}
        </div>
      </section>
    </div>
  );
}

function Clients({ t, language }: { t: Text; language: Language }) {
  return (
    <div className="content">
      <PageTitle eyebrow="SOVA YOGA" title={text(t.clients)} subtitle={text(t.clientsSub)} />
      <div className="client-grid">{clients.map((client) => <article className="client-card" key={client.name}><span className="large-avatar">{client.initials}</span><h2>{client.name}</h2><p>{client.zone}</p><div><small>{text(t.sessions)}</small><b>{client.visits}</b></div><span>{client.focus[language]}</span><button>{language === "en" ? "Open profile" : "Открыть профиль"} →</button></article>)}</div>
    </div>
  );
}

function Analytics({ t }: { t: Text }) {
  return (
    <div className="content">
      <PageTitle eyebrow="SOVA YOGA" title={text(t.analytics)} subtitle={text(t.analyticsSub)} />
      <div className="analytics-stats"><Metric label={text(t.attendance)} value="92%" change="↑ 4.2%" /><Metric label={text(t.returnRate)} value="78%" change="↑ 6.1%" /><Metric label={text(t.popularFocus)} value="Hips" change="34%" /></div>
      <div className="analytics-grid">
        <section className="panel bar-panel"><h2>{text(t.pacePreference)}</h2>{[["Calm", 72], ["Balanced", 54], ["Dynamic", 28]].map(([label, value]) => <div className="bar-row" key={String(label)}><span>{label}</span><i><b style={{ width: `${value}%` }} /></i><strong>{value}%</strong></div>)}</section>
        <section className="panel donut-panel"><h2>{text(t.popularFocus)}</h2><div className="donut"><span>42<small>{text(t.sessions)}</small></span></div><p>Hips 34% · Back 27% · Core 21%</p></section>
      </div>
    </div>
  );
}

function Metric({ label, value, change }: { label: string; value: string; change: string }) {
  return <article><small>{label}</small><b>{value}</b><i>{change}</i></article>;
}
