import React, { useEffect, useState } from 'react';
import {
  Newspaper,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  ArrowUpRight,
  ShieldCheck,
  Stethoscope,
  Headphones,
  CloudSun,
  UtensilsCrossed,
  Eye,
  Pin,
  Megaphone,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  useApi,
  formatDateCz,
  type Announcement,
  type CompanyEvent,
  type QuickLink,
  type CanteenDay,
} from '../../lib/api';
import { Card, CardHeader, SectionLabel, Loading, ErrorBox, CategoryBadge, LinkIconFor } from '../../components/ui';
import type { Page } from '../../lib/nav';
import { greeting, czMonths } from './shared';

export default function DashboardAurora({ navigate }: { navigate: (page: Page) => void }) {
  const announcements = useApi<Announcement[]>('/api/announcements?limit=3');
  const events = useApi<CompanyEvent[]>('/api/events?limit=4');
  const links = useApi<QuickLink[]>('/api/links');
  const canteen = useApi<CanteenDay[]>('/api/canteen');

  const systems = links.data?.filter((l) => l.category === 'system') ?? [];
  const apps = links.data?.filter((l) => l.category === 'app') ?? [];
  const todayIdx = new Date().getDay(); // 1–5 = po–pá
  const todayMenu = canteen.data?.find((d) => d.day === todayIdx);
  const pinned = announcements.data?.filter((a) => a.pinned === 1) ?? [];

  return (
    <div className="flex flex-col gap-6">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-1 pt-4"
      >
        <div>
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] mb-2">
            {new Date().toLocaleDateString('cs-CZ', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            {greeting()}, <span className="text-gradient">Jane</span>.
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm md:text-base">
            Tady je přehled toho nejdůležitějšího v závodě ALCZ.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <HeroChip icon={<CloudSun size={16} className="text-accent" />} label="Sebranice" value="22 °C" />
          <LiveClockChip />
        </div>
      </motion.section>

      {/* Ticker připnutých zpráv */}
      {pinned.length > 0 && (
        <Card className="overflow-hidden" delay={0.05}>
          <div className="flex items-center">
            <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-accent to-accent-2 text-white shrink-0 rounded-l-2xl">
              <Megaphone size={15} />
              <span className="text-[11px] font-black uppercase tracking-wider hidden sm:block">Důležité</span>
            </div>
            <div className="overflow-hidden flex-1 py-3">
              <div className="flex gap-14 whitespace-nowrap animate-marquee w-max px-6">
                {[...pinned, ...pinned].map((a, i) => (
                  <button
                    key={`${a.id}-${i}`}
                    onClick={() => navigate('news')}
                    className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-accent transition-colors"
                  >
                    <Pin size={13} className="text-accent shrink-0" />
                    {a.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-12 gap-6">
        {/* Aktuality */}
        <Card className="col-span-12 lg:col-span-8 flex flex-col" delay={0.1}>
          <CardHeader
            icon={<Newspaper size={16} />}
            title="Aktuality"
            action={
              <button
                onClick={() => navigate('news')}
                className="text-xs font-bold text-accent hover:gap-2 flex items-center gap-1 transition-all"
              >
                Všechny aktuality <ArrowUpRight size={14} />
              </button>
            }
          />
          {announcements.loading && <Loading lines={5} />}
          {announcements.error && <ErrorBox message={announcements.error} />}
          {announcements.data && (
            <div className="p-6 flex flex-col gap-6 flex-1">
              {announcements.data[0] && <FeaturedAnnouncement item={announcements.data[0]} />}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {announcements.data.slice(1, 3).map((a) => (
                  <MiniNews key={a.id} item={a} onClick={() => navigate('news')} />
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Systémy a aplikace */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <Card className="p-5" delay={0.15}>
            <SectionLabel>Firemní systémy</SectionLabel>
            {links.loading && <Loading lines={3} />}
            <div className="grid grid-cols-2 gap-3">
              {systems.map((s, i) => (
                <SystemTile key={s.id} link={s} featured={i === 0} />
              ))}
            </div>
          </Card>

          <Card className="p-5" delay={0.2}>
            <SectionLabel>Aplikace</SectionLabel>
            <div className="flex flex-col gap-1">
              {apps.map((a) => (
                <a
                  key={a.id}
                  href={a.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-900/5 dark:hover:bg-white/5 transition-colors group"
                >
                  <span className="flex items-center gap-3">
                    <span className="size-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-accent group-hover:to-accent-2 group-hover:text-white transition-all">
                      <LinkIconFor name={a.icon} />
                    </span>
                    <span className="text-sm font-semibold">{a.label}</span>
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="text-slate-300 dark:text-slate-600 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </a>
              ))}
            </div>
          </Card>
        </div>

        {/* Kalendář */}
        <Card className="col-span-12 md:col-span-6 lg:col-span-4" delay={0.25}>
          <CardHeader icon={<Calendar size={16} />} title="Kalendář" />
          {events.loading && <Loading />}
          {events.error && <ErrorBox message={events.error} />}
          <div className="flex flex-col p-3">
            {events.data?.map((e) => (
              <EventRow key={e.id} event={e} />
            ))}
          </div>
        </Card>

        {/* Kantýna dnes */}
        <Card className="col-span-12 md:col-span-6 lg:col-span-4" delay={0.3}>
          <CardHeader
            icon={<UtensilsCrossed size={16} />}
            title="Dnes v kantýně"
            action={
              <button
                onClick={() => navigate('canteen')}
                className="text-xs font-bold text-accent hover:gap-2 flex items-center gap-1 transition-all"
              >
                Celý týden <ArrowUpRight size={14} />
              </button>
            }
          />
          {canteen.loading && <Loading />}
          <div className="p-5">
            {todayMenu ? (
              <div className="flex flex-col gap-3">
                <p className="text-xs text-slate-500 dark:text-slate-400 italic">{todayMenu.soup}</p>
                {todayMenu.mains.map((m, i) => (
                  <p key={i} className="text-sm font-medium text-slate-800 dark:text-slate-200 flex gap-3 items-baseline">
                    <span className="size-5 rounded-md bg-accent/10 text-accent text-[11px] font-black flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    {m}
                  </p>
                ))}
              </div>
            ) : (
              !canteen.loading && (
                <p className="text-sm text-slate-500 dark:text-slate-400">O víkendu kantýna nevaří. 🙂</p>
              )
            )}
          </div>
        </Card>

        {/* Kontakty + světový čas */}
        <Card className="col-span-12 lg:col-span-4 p-5" delay={0.35}>
          <SectionLabel>Kontakty a čas</SectionLabel>
          <div className="flex flex-col gap-3.5 mb-5">
            <ContactItem
              icon={<ShieldCheck className="text-accent" size={17} />}
              title="Ostraha areálu"
              subtitle="Linka 9911 (nouzová)"
              bgColor="bg-accent/10"
            />
            <ContactItem
              icon={<Stethoscope className="text-emerald-600" size={17} />}
              title="Zdravotní středisko"
              subtitle="Linka 4455 • Budova C"
              bgColor="bg-emerald-500/10"
            />
            <ContactItem
              icon={<Headphones className="text-amber-600" size={17} />}
              title="IT Helpdesk"
              subtitle="Linka 1400 • nonstop"
              bgColor="bg-amber-500/10"
            />
          </div>
          <div className="pt-4 border-t border-slate-200/60 dark:border-slate-700/50">
            <WorldClocks />
          </div>
        </Card>
      </div>
    </div>
  );
}

function HeroChip({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="glass rounded-2xl px-4 py-2.5 flex items-center gap-3">
      {icon}
      <div>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-none">{label}</p>
        <p className="text-sm font-black text-slate-900 dark:text-white mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function LiveClockChip() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 10_000);
    return () => clearInterval(t);
  }, []);
  return (
    <HeroChip
      icon={<Clock size={16} className="text-accent-2" />}
      label="Místní čas"
      value={now.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' })}
    />
  );
}

function FeaturedAnnouncement({ item }: { item: Announcement }) {
  return (
    <div className="group cursor-pointer relative rounded-2xl overflow-hidden min-h-64 flex-1 flex items-end">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 bg-gradient-to-br from-primary to-accent"
        style={item.image ? { backgroundImage: `url('${item.image}')` } : undefined}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent"></div>
      <div className="relative z-10 p-6 w-full">
        <div className="mb-2.5 flex items-center gap-2">
          <CategoryBadge category={item.category} />
        </div>
        <h3 className="font-display text-white font-bold text-2xl leading-snug mb-2 group-hover:underline decoration-accent-2 decoration-2 underline-offset-4">
          {item.title}
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed line-clamp-2 max-w-2xl">{item.body}</p>
        <div className="flex items-center gap-4 text-[11px] text-slate-400 font-medium mt-3">
          <span className="flex items-center gap-1.5">
            <Calendar size={13} /> {formatDateCz(item.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Eye size={13} /> {item.views} zobrazení
          </span>
        </div>
      </div>
    </div>
  );
}

function MiniNews({ item, onClick }: { item: Announcement; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col gap-2 group text-left p-4 rounded-xl border border-slate-200/60 dark:border-slate-700/50 hover:border-accent/40 hover:bg-accent/[0.03] transition-all"
    >
      <CategoryBadge category={item.category} />
      <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-accent transition-colors leading-snug">
        {item.title}
      </h4>
      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{item.body}</p>
    </button>
  );
}

function EventRow({ event }: { event: CompanyEvent }) {
  const d = new Date(event.date);
  return (
    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-900/5 dark:hover:bg-white/5 transition-colors cursor-pointer group">
      <div className="flex flex-col items-center justify-center min-w-[46px] h-[46px] rounded-xl bg-gradient-to-br from-accent/12 to-accent-2/12 border border-accent/15">
        <span className="text-[9px] font-black text-accent uppercase leading-none">{czMonths[d.getMonth()]}</span>
        <span className="text-base font-black text-slate-900 dark:text-white leading-tight">{d.getDate()}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{event.title}</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
          <Clock size={11} /> {event.time} • {event.location}
        </p>
      </div>
      <ChevronRight
        size={16}
        className="text-slate-300 dark:text-slate-600 group-hover:text-accent group-hover:translate-x-0.5 transition-all"
      />
    </div>
  );
}

function SystemTile({ link, featured = false }: { link: QuickLink; featured?: boolean }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noreferrer"
      className={`group flex flex-col gap-3 p-4 rounded-xl transition-all hover:-translate-y-0.5 ${
        featured
          ? 'col-span-2 bg-gradient-to-br from-primary via-primary to-accent text-white shadow-lg shadow-primary/25'
          : 'border border-slate-200/60 dark:border-slate-700/50 hover:border-accent/40 text-slate-900 dark:text-white'
      }`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`size-9 rounded-lg flex items-center justify-center ${
            featured ? 'bg-white/15' : 'bg-accent/10 text-accent'
          }`}
        >
          <LinkIconFor name={link.icon} />
        </span>
        <ArrowUpRight
          size={15}
          className={`transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
            featured ? 'text-white/60' : 'text-slate-300 dark:text-slate-600 group-hover:text-accent'
          }`}
        />
      </div>
      <div>
        <p className="font-display font-bold text-sm">{link.label}</p>
        {featured && link.description && <p className="text-[11px] text-white/60 mt-0.5">{link.description}</p>}
      </div>
    </a>
  );
}

function ContactItem({ icon, title, subtitle, bgColor }: { icon: React.ReactNode; title: string; subtitle: string; bgColor: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`size-9 rounded-xl ${bgColor} flex items-center justify-center`}>{icon}</div>
      <div>
        <p className="text-xs font-bold text-slate-900 dark:text-white">{title}</p>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">{subtitle}</p>
      </div>
    </div>
  );
}

const zones = [
  { city: 'Sebranice, CZ', tz: 'Europe/Prague', label: 'Místní čas' },
  { city: 'Tokio, JP', tz: 'Asia/Tokyo', label: 'Centrála' },
  { city: 'McAllen, US', tz: 'America/Chicago', label: 'Závod USA' },
];

function WorldClocks() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {zones.map((z) => {
        const time = now.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit', timeZone: z.tz });
        return (
          <div key={z.tz} className="flex items-center justify-between">
            <span className="flex items-center gap-2.5">
              <MapPin className="text-slate-400" size={14} />
              <span className="text-xs font-bold text-slate-900 dark:text-white">{z.city}</span>
            </span>
            <span className="flex items-baseline gap-2">
              <span className="text-sm font-black text-gradient">{time}</span>
              <span className="text-[9px] text-slate-400 font-medium w-16 text-right">{z.label}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}
