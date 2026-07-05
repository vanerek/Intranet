import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Activity, Clock, Factory, Server, ChevronRight } from 'lucide-react';
import {
  useApi,
  formatDateCz,
  type Announcement,
  type CompanyEvent,
  type QuickLink,
  type CanteenDay,
} from '../../lib/api';
import { Loading, ErrorBox, CategoryBadge, LinkIconFor } from '../../components/ui';
import type { Page } from '../../lib/nav';
import { zones, useNow, currentShift, czMonths } from './shared';

/**
 * Nástěnka jako řídicí velín: KPI stavový pruh nahoře, pod ním hustá
 * mřížka datových panelů bez velkých obrázků.
 */
export default function DashboardNeo({ navigate }: { navigate: (page: Page) => void }) {
  const announcements = useApi<Announcement[]>('/api/announcements?limit=6');
  const events = useApi<CompanyEvent[]>('/api/events?limit=5');
  const links = useApi<QuickLink[]>('/api/links');
  const canteen = useApi<CanteenDay[]>('/api/canteen');

  const todayMenu = canteen.data?.find((d) => d.day === new Date().getDay());

  return (
    <div className="flex flex-col gap-5 font-sans">
      {/* KPI stavový pruh */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatTile icon={<Clock size={16} />} label="Místní čas" delay={0}>
          <LiveTime />
        </StatTile>
        <StatTile icon={<Factory size={16} />} label="Aktuální směna" delay={0.05}>
          <span className="font-display text-2xl font-bold">{currentShift()}</span>
        </StatTile>
        <StatTile icon={<Activity size={16} />} label="Události – 14 dní" delay={0.1}>
          <span className="font-display text-2xl font-bold">{events.data?.length ?? '–'}</span>
        </StatTile>
        <StatTile icon={<Server size={16} />} label="Systémy online" delay={0.15}>
          <span className="font-display text-2xl font-bold flex items-center gap-2">
            {links.data ? `${links.data.length}/${links.data.length}` : '–'}
            <span className="size-2 rounded-full bg-accent-2 animate-pulse"></span>
          </span>
        </StatTile>
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* Datový výpis aktualit */}
        <Panel title="Aktuality" className="col-span-12 lg:col-span-8" delay={0.2}
          action={
            <button onClick={() => navigate('news')} className="font-display text-[11px] font-bold uppercase tracking-wider text-accent flex items-center gap-1 hover:gap-2 transition-all">
              Vše <ArrowUpRight size={13} />
            </button>
          }
        >
          {announcements.loading && <Loading lines={6} />}
          {announcements.error && <ErrorBox message={announcements.error} />}
          <div className="flex flex-col divide-y divide-slate-900/8 dark:divide-white/8">
            {announcements.data?.map((a, i) => (
              <button
                key={a.id}
                onClick={() => navigate('news')}
                className="text-left px-5 py-3.5 hover:bg-accent/5 transition-colors group flex items-start gap-4"
              >
                <span className="font-display text-[10px] font-bold text-slate-400 dark:text-slate-500 pt-1 w-20 shrink-0">
                  {formatDateCz(a.date).replace(/ \d{4}$/, '')}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="flex items-center gap-2 flex-wrap">
                    <CategoryBadge category={a.category} />
                    <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-accent transition-colors">
                      {a.title}
                    </span>
                  </span>
                  {i === 0 && (
                    <span className="block text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                      {a.body}
                    </span>
                  )}
                </span>
                <ChevronRight size={15} className="text-slate-300 dark:text-slate-600 group-hover:text-accent shrink-0 mt-1 transition-colors" />
              </button>
            ))}
          </div>
        </Panel>

        {/* Stav systémů */}
        <Panel title="Systémy" className="col-span-12 md:col-span-6 lg:col-span-4" delay={0.25}>
          <div className="flex flex-col divide-y divide-slate-900/8 dark:divide-white/8">
            {links.loading && <Loading lines={4} />}
            {links.data?.map((l) => (
              <a
                key={l.id}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 px-5 py-3 hover:bg-accent/5 transition-colors group"
              >
                <span className="text-accent">
                  <LinkIconFor name={l.icon} />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="font-display text-[13px] font-bold text-slate-900 dark:text-white block truncate">
                    {l.label}
                  </span>
                </span>
                <span className="flex items-center gap-1.5 font-display text-[9px] font-bold uppercase tracking-wider text-accent-2">
                  <span className="size-1.5 rounded-full bg-accent-2 animate-pulse"></span>
                  online
                </span>
              </a>
            ))}
          </div>
        </Panel>

        {/* Timeline událostí */}
        <Panel title="Plán událostí" className="col-span-12 md:col-span-6 lg:col-span-4" delay={0.3}>
          {events.loading && <Loading />}
          <div className="px-5 py-4 flex flex-col">
            {events.data?.map((e, i) => {
              const d = new Date(e.date);
              const last = i === (events.data?.length ?? 0) - 1;
              return (
                <div key={e.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="size-2.5 rounded-full border-2 border-accent bg-background-light dark:bg-background-dark shrink-0 mt-1.5"></span>
                    {!last && <span className="w-px flex-1 bg-gradient-to-b from-accent/50 to-accent/10"></span>}
                  </div>
                  <div className={last ? 'pb-1' : 'pb-5'}>
                    <p className="font-display text-[10px] font-bold uppercase tracking-wider text-accent">
                      {d.getDate()}. {czMonths[d.getMonth()]} · {e.time}
                    </p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{e.title}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{e.location}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>

        {/* Kantýna */}
        <Panel title="Kantýna — dnes" className="col-span-12 md:col-span-6 lg:col-span-4" delay={0.35}
          action={
            <button onClick={() => navigate('canteen')} className="font-display text-[11px] font-bold uppercase tracking-wider text-accent flex items-center gap-1 hover:gap-2 transition-all">
              Týden <ArrowUpRight size={13} />
            </button>
          }
        >
          {canteen.loading && <Loading />}
          <div className="px-5 py-4">
            {todayMenu ? (
              <div className="flex flex-col gap-2.5">
                <p className="font-display text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Polévka: <span className="text-slate-900 dark:text-white">{todayMenu.soup}</span>
                </p>
                {todayMenu.mains.map((m, i) => (
                  <p key={i} className="text-sm text-slate-800 dark:text-slate-200 flex gap-3">
                    <span className="font-display text-[11px] font-bold text-accent pt-0.5 shrink-0">
                      MENU_{String(i + 1).padStart(2, '0')}
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
        </Panel>

        {/* Časová pásma + kontakty */}
        <Panel title="Lokality / kontakty" className="col-span-12 md:col-span-6 lg:col-span-4" delay={0.4}>
          <div className="px-5 py-4 flex flex-col gap-3">
            <NeoClocks />
            <div className="pt-3 mt-1 border-t border-slate-900/10 dark:border-white/10 grid grid-cols-3 gap-2 font-display text-center">
              <ContactCell label="Ostraha" value="9911" />
              <ContactCell label="Zdravotní" value="4455" />
              <ContactCell label="Helpdesk" value="1400" />
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function StatTile({
  icon,
  label,
  children,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-xl px-4 py-3.5"
    >
      <p className="font-display text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 flex items-center gap-2 mb-1.5">
        <span className="text-accent">{icon}</span>
        {label}
      </p>
      <div className="text-slate-900 dark:text-white">{children}</div>
    </motion.div>
  );
}

function LiveTime() {
  const now = useNow(10_000);
  return (
    <span className="font-display text-2xl font-bold tabular-nums">
      {now.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' })}
    </span>
  );
}

function Panel({
  title,
  children,
  className = '',
  delay = 0,
  action,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  action?: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`glass rounded-xl overflow-hidden ${className}`}
    >
      <div className="px-5 py-3 border-b border-slate-900/10 dark:border-white/10 flex items-center justify-between bg-slate-900/[0.03] dark:bg-white/[0.03]">
        <h2 className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-slate-700 dark:text-slate-300 flex items-center gap-2">
          <span className="text-accent">▮</span>
          {title}
        </h2>
        {action}
      </div>
      {children}
    </motion.section>
  );
}

function NeoClocks() {
  const now = useNow();
  return (
    <div className="flex flex-col gap-2.5">
      {zones.map((z) => (
        <div key={z.tz} className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900 dark:text-white">{z.city}</span>
          <span className="flex items-baseline gap-2">
            <span className="font-display text-sm font-bold text-accent tabular-nums">
              {now.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit', timeZone: z.tz })}
            </span>
            <span className="font-display text-[9px] uppercase text-slate-400 w-14 text-right">{z.label}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

function ContactCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-900/10 dark:border-white/10 px-2 py-2">
      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</p>
      <p className="text-sm font-bold text-accent tabular-nums">{value}</p>
    </div>
  );
}
