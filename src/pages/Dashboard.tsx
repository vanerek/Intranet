import React, { useEffect, useState } from 'react';
import {
  Newspaper,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Stethoscope,
  Headphones,
  CloudSun,
  UtensilsCrossed,
  Eye,
} from 'lucide-react';
import {
  useApi,
  formatDateCz,
  type Announcement,
  type CompanyEvent,
  type QuickLink,
  type CanteenDay,
} from '../lib/api';
import { Card, CardHeader, SectionLabel, Loading, ErrorBox, CategoryBadge, LinkIconFor } from '../components/ui';
import type { Page } from '../App';

export default function Dashboard({ navigate }: { navigate: (page: Page) => void }) {
  const announcements = useApi<Announcement[]>('/api/announcements?limit=3');
  const events = useApi<CompanyEvent[]>('/api/events?limit=4');
  const links = useApi<QuickLink[]>('/api/links');
  const canteen = useApi<CanteenDay[]>('/api/canteen');

  const systems = links.data?.filter((l) => l.category === 'system') ?? [];
  const apps = links.data?.filter((l) => l.category === 'app') ?? [];
  const todayIdx = new Date().getDay(); // 1–5 = po–pá
  const todayMenu = canteen.data?.find((d) => d.day === todayIdx);

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Levý sloupec */}
      <aside className="col-span-12 lg:col-span-3 flex flex-col gap-6">
        <Card className="p-5">
          <SectionLabel>Dnes v kantýně</SectionLabel>
          {canteen.loading && <Loading />}
          {todayMenu ? (
            <div className="flex flex-col gap-2">
              <p className="text-xs text-slate-500 italic">{todayMenu.soup}</p>
              {todayMenu.mains.map((m, i) => (
                <p key={i} className="text-sm font-medium text-slate-800 dark:text-slate-200 flex gap-2">
                  <span className="text-accent font-black">{i + 1}.</span> {m}
                </p>
              ))}
              <button
                onClick={() => navigate('canteen')}
                className="text-xs font-bold text-accent hover:underline text-left mt-2 flex items-center gap-1"
              >
                <UtensilsCrossed size={14} /> Celý týdenní jídelníček
              </button>
            </div>
          ) : (
            !canteen.loading && <p className="text-sm text-slate-500">O víkendu kantýna nevaří. 🙂</p>
          )}
        </Card>

        <Card className="p-5" delay={0.1}>
          <SectionLabel>Důležité kontakty</SectionLabel>
          <div className="flex flex-col gap-4">
            <ContactItem
              icon={<ShieldCheck className="text-accent" size={18} />}
              title="Ostraha areálu"
              subtitle="Linka 9911 (nouzová)"
              bgColor="bg-accent/10"
            />
            <ContactItem
              icon={<Stethoscope className="text-green-600" size={18} />}
              title="Zdravotní středisko"
              subtitle="Linka 4455 • Budova C"
              bgColor="bg-green-500/10"
            />
            <ContactItem
              icon={<Headphones className="text-amber-600" size={18} />}
              title="IT Helpdesk"
              subtitle="Linka 1400 • nonstop"
              bgColor="bg-amber-500/10"
            />
          </div>
        </Card>

        <Card className="p-5" delay={0.15}>
          <SectionLabel>
            <span className="flex items-center gap-2">
              <Clock size={14} /> Světový čas
            </span>
          </SectionLabel>
          <WorldClocks />
        </Card>
      </aside>

      {/* Střed */}
      <div className="col-span-12 lg:col-span-6 flex flex-col gap-6">
        <Card>
          <CardHeader
            icon={<Newspaper className="text-accent" size={20} />}
            title="Aktuality"
            action={
              <button onClick={() => navigate('news')} className="text-xs font-bold text-accent hover:underline">
                Všechny aktuality
              </button>
            }
          />
          {announcements.loading && <Loading />}
          {announcements.error && <ErrorBox message={announcements.error} />}
          {announcements.data && (
            <div className="p-6 flex flex-col gap-6">
              {announcements.data[0] && <FeaturedAnnouncement item={announcements.data[0]} />}
              <div className="h-[1px] bg-slate-100 dark:bg-slate-800"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {announcements.data.slice(1, 3).map((a) => (
                  <NewsCard key={a.id} item={a} />
                ))}
              </div>
            </div>
          )}
        </Card>

        <Card>
          <CardHeader icon={<Calendar className="text-accent" size={20} />} title="Firemní kalendář" />
          {events.loading && <Loading />}
          {events.error && <ErrorBox message={events.error} />}
          <div className="flex flex-col">
            {events.data?.map((e) => (
              <CalendarItem key={e.id} event={e} />
            ))}
          </div>
        </Card>
      </div>

      {/* Pravý sloupec */}
      <aside className="col-span-12 lg:col-span-3 flex flex-col gap-6">
        <Card className="p-5">
          <SectionLabel>Firemní systémy</SectionLabel>
          {links.loading && <Loading />}
          <div className="grid grid-cols-1 gap-3">
            {systems.map((s, i) => (
              <SystemButton key={s.id} link={s} dark={i === 0} darkSecondary={i === 1} />
            ))}
          </div>
        </Card>

        <Card className="p-5" delay={0.1}>
          <SectionLabel>Aplikace</SectionLabel>
          <div className="flex flex-col gap-2">
            {apps.map((a) => (
              <a
                key={a.id}
                href={a.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              >
                <div className="text-accent">
                  <LinkIconFor name={a.icon} />
                </div>
                <span className="text-sm font-semibold">{a.label}</span>
              </a>
            ))}
          </div>
        </Card>

        <Card className="p-5 !bg-slate-200 dark:!bg-slate-800 !shadow-inner mt-auto !border-transparent" delay={0.2}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Náš závod</p>
              <h4 className="text-sm font-black text-slate-900 dark:text-white">ALCZ – Sebranice, CZ</h4>
            </div>
            <div className="text-right">
              <CloudSun className="text-accent inline-block mb-1" size={20} />
              <p className="text-sm font-bold text-slate-900 dark:text-white">22 °C</p>
            </div>
          </div>
        </Card>
      </aside>
    </div>
  );
}

function FeaturedAnnouncement({ item }: { item: Announcement }) {
  return (
    <div className="group cursor-pointer">
      {item.image && (
        <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
          <div className="absolute bottom-4 left-4 z-20">
            <div className="mb-2">
              <CategoryBadge category={item.category} />
            </div>
            <h3 className="text-white font-bold text-xl">{item.title}</h3>
          </div>
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url('${item.image}')` }}
          ></div>
        </div>
      )}
      {!item.image && (
        <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-2 group-hover:text-accent transition-colors">
          {item.title}
        </h3>
      )}
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-2">{item.body}</p>
      <div className="flex items-center gap-4 text-[11px] text-slate-400 font-medium">
        <span className="flex items-center gap-1">
          <Calendar size={14} /> {formatDateCz(item.date)}
        </span>
        <span className="flex items-center gap-1">
          <Eye size={14} /> {item.views} zobrazení
        </span>
      </div>
    </div>
  );
}

function NewsCard({ item }: { item: Announcement }) {
  return (
    <div className="flex flex-col gap-3 group cursor-pointer">
      {item.image && (
        <div
          className="h-32 w-full rounded-lg bg-cover bg-center border border-slate-100 dark:border-slate-800 group-hover:opacity-90 transition-opacity"
          style={{ backgroundImage: `url('${item.image}')` }}
        ></div>
      )}
      <div>
        <div className="mb-1">
          <CategoryBadge category={item.category} />
        </div>
        <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-accent transition-colors">
          {item.title}
        </h4>
        <p className="text-xs text-slate-500 line-clamp-2 mt-1">{item.body}</p>
      </div>
    </div>
  );
}

const czMonths = ['led', 'úno', 'bře', 'dub', 'kvě', 'čvn', 'čvc', 'srp', 'zář', 'říj', 'lis', 'pro'];

function CalendarItem({ event }: { event: CompanyEvent }) {
  const d = new Date(event.date);
  return (
    <div className="flex items-center gap-4 p-4 border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
      <div className="flex flex-col items-center justify-center min-w-[50px] h-[50px] bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <span className="text-[10px] font-bold text-slate-500 uppercase">{czMonths[d.getMonth()]}</span>
        <span className="text-lg font-black text-slate-900 dark:text-white leading-none">{d.getDate()}</span>
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{event.title}</h4>
        <p className="text-xs text-slate-500 flex items-center gap-1">
          <Clock size={12} /> {event.time} • {event.location}
        </p>
      </div>
      <ChevronRight className="text-slate-300 group-hover:text-accent transition-colors" size={20} />
    </div>
  );
}

function SystemButton({ link, dark = false, darkSecondary = false }: { link: QuickLink; dark?: boolean; darkSecondary?: boolean }) {
  let colorClass =
    'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700';
  if (dark) colorClass = 'bg-slate-900 text-white border-transparent hover:bg-accent';
  else if (darkSecondary) colorClass = 'bg-slate-800 text-white border-transparent hover:bg-accent';

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noreferrer"
      className={`flex items-center justify-between w-full p-4 rounded-lg transition-all group border ${colorClass}`}
    >
      <div className="flex items-center gap-3">
        <LinkIconFor name={link.icon} />
        <span className={dark || darkSecondary ? 'font-black tracking-tight' : 'font-bold'}>{link.label}</span>
      </div>
      <ExternalLink className="group-hover:translate-x-1 transition-transform" size={14} />
    </a>
  );
}

function ContactItem({ icon, title, subtitle, bgColor }: { icon: React.ReactNode; title: string; subtitle: string; bgColor: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`size-8 rounded-full ${bgColor} flex items-center justify-center`}>{icon}</div>
      <div>
        <p className="text-xs font-bold text-slate-900 dark:text-white">{title}</p>
        <p className="text-[10px] text-slate-500">{subtitle}</p>
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
    <div className="flex flex-col gap-4">
      {zones.map((z, i) => {
        const time = now.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit', timeZone: z.tz });
        const date = now.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'short', timeZone: z.tz });
        const last = i === zones.length - 1;
        return (
          <div
            key={z.tz}
            className={`flex items-center justify-between ${!last ? 'border-b border-slate-100 dark:border-slate-800 pb-3' : ''}`}
          >
            <div className="flex items-center gap-3">
              <MapPin className="text-slate-400" size={16} />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">{z.city}</p>
                <p className="text-[10px] text-slate-500">{date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-black text-accent">{time}</p>
              <p className="text-[9px] text-slate-400 font-medium">{z.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
