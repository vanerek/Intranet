import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react';
import {
  useApi,
  type Announcement,
  type CompanyEvent,
  type QuickLink,
  type CanteenDay,
} from '../../lib/api';
import { Loading, ErrorBox, LinkIconFor } from '../../components/ui';
import type { Page } from '../../lib/nav';
import { greeting, zones, useNow } from './shared';

/**
 * Nástěnka ve stylu alpsalpine.com: plnoformátový modrý hero,
 * sekce s anglickými kickery, novinky jako řádkový seznam s daty.
 */
export default function DashboardCorporate({ navigate }: { navigate: (page: Page) => void }) {
  const announcements = useApi<Announcement[]>('/api/announcements?limit=6');
  const events = useApi<CompanyEvent[]>('/api/events?limit=4');
  const links = useApi<QuickLink[]>('/api/links');
  const canteen = useApi<CanteenDay[]>('/api/canteen');

  const withImage = announcements.data?.filter((a) => a.image).slice(0, 2) ?? [];
  const todayMenu = canteen.data?.find((d) => d.day === new Date().getDay());

  return (
    <div className="flex flex-col">
      {/* Hero – plnoformátový značkový pruh */}
      <section className="relative bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,transparent_55%,rgba(255,255,255,0.06)_55%,rgba(255,255,255,0.06)_70%,transparent_70%),linear-gradient(115deg,transparent_0%,transparent_75%,rgba(255,255,255,0.04)_75%)]"></div>
        <div className="relative max-w-[1280px] mx-auto px-4 md:px-8 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-white/60 mb-4">
              {new Date().toLocaleDateString('cs-CZ', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            <h1 className="text-4xl md:text-6xl font-light leading-tight tracking-tight max-w-3xl">
              {greeting()}, Jane.
              <br />
              <span className="font-bold">Vítejte na intranetu ALCZ.</span>
            </h1>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 mt-8 text-sm text-white/70">
              <span>Sebranice · 22 °C</span>
              <CorporateHeroClock />
              <span className="hidden md:block">Perfecting the Art of Electronics</span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto w-full px-4 md:px-8">
        {/* NEWS – řádkový seznam */}
        <Section kicker="News" title="Aktuality" delay={0.1}
          action={
            <SectionLink onClick={() => navigate('news')} label="Všechny aktuality" />
          }
        >
          {announcements.loading && <Loading lines={5} />}
          {announcements.error && <ErrorBox message={announcements.error} />}
          <div className="border-t border-slate-200 dark:border-slate-800">
            {announcements.data?.map((a) => (
              <button
                key={a.id}
                onClick={() => navigate('news')}
                className="w-full text-left flex flex-col md:flex-row md:items-center gap-1.5 md:gap-6 py-4 border-b border-slate-200 dark:border-slate-800 group"
              >
                <span className="text-[13px] text-slate-500 tabular-nums shrink-0 md:w-24">
                  {new Date(a.date).toLocaleDateString('cs-CZ')}
                </span>
                <span className="shrink-0 md:w-20">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-accent border border-accent/40 px-2 py-0.5">
                    {a.category}
                  </span>
                </span>
                <span className="flex-1 text-[15px] font-medium text-slate-900 dark:text-slate-100 group-hover:text-accent transition-colors">
                  {a.title}
                </span>
                <ArrowRight
                  size={16}
                  className="hidden md:block text-slate-300 dark:text-slate-600 group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0"
                />
              </button>
            ))}
          </div>
        </Section>

        {/* TOPICS – dvě velké fotokarty */}
        {withImage.length > 0 && (
          <Section kicker="Topics" title="Ze života závodu" delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {withImage.map((a) => (
                <button key={a.id} onClick={() => navigate('news')} className="text-left group">
                  <div className="overflow-hidden">
                    <div
                      className="h-56 w-full bg-cover bg-center bg-slate-200 dark:bg-slate-800 transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${a.image}')` }}
                    ></div>
                  </div>
                  <div className="pt-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-1.5">{a.category}</p>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-accent transition-colors leading-snug">
                        {a.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">{a.body}</p>
                    </div>
                    <ArrowUpRight size={18} className="text-slate-300 dark:text-slate-600 group-hover:text-accent transition-colors shrink-0 mt-1" />
                  </div>
                </button>
              ))}
            </div>
          </Section>
        )}

        {/* Spodní tři sloupce */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          <Section kicker="Events" title="Kalendář" delay={0.2} className="!mt-12" action={null}>
            {events.loading && <Loading />}
            <div className="border-t border-slate-200 dark:border-slate-800">
              {events.data?.map((e) => (
                <div key={e.id} className="py-3.5 border-b border-slate-200 dark:border-slate-800">
                  <p className="text-[12px] text-slate-500 tabular-nums">
                    {new Date(e.date).toLocaleDateString('cs-CZ')} · {e.time}
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{e.title}</p>
                  <p className="text-[12px] text-slate-500">{e.location}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section kicker="Canteen" title="Dnes v kantýně" delay={0.25} className="!mt-12"
            action={<SectionLink onClick={() => navigate('canteen')} label="Celý týden" small />}
          >
            {canteen.loading && <Loading />}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
              {todayMenu ? (
                <div className="flex flex-col gap-3">
                  <p className="text-[13px] italic text-slate-500">{todayMenu.soup}</p>
                  {todayMenu.mains.map((m, i) => (
                    <p key={i} className="text-sm text-slate-800 dark:text-slate-200 flex gap-3">
                      <span className="font-bold text-accent shrink-0">{i + 1}.</span>
                      {m}
                    </p>
                  ))}
                </div>
              ) : (
                !canteen.loading && <p className="text-sm text-slate-500">O víkendu kantýna nevaří.</p>
              )}
            </div>
          </Section>

          <Section kicker="Global" title="Lokality a kontakty" delay={0.3} className="!mt-12" action={null}>
            <div className="border-t border-slate-200 dark:border-slate-800 pt-4 flex flex-col gap-2.5">
              <CorporateClocks />
              <div className="pt-3 mt-1 border-t border-slate-200 dark:border-slate-800 text-[13px] text-slate-600 dark:text-slate-400 flex flex-col gap-1.5">
                <p>Ostraha areálu — <span className="font-bold text-slate-900 dark:text-white">linka 9911</span></p>
                <p>Zdravotní středisko — <span className="font-bold text-slate-900 dark:text-white">linka 4455</span></p>
                <p>IT helpdesk — <span className="font-bold text-slate-900 dark:text-white">linka 1400</span></p>
              </div>
            </div>
          </Section>
        </div>

        {/* SYSTEMS – mřížka s linkami */}
        <Section kicker="Systems" title="Firemní systémy a aplikace" delay={0.35}
          action={<SectionLink onClick={() => navigate('links')} label="Přehled systémů" />}
        >
          {links.loading && <Loading lines={2} />}
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-slate-200 dark:border-slate-800">
            {links.data?.map((l) => (
              <a
                key={l.id}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col gap-3 p-5 border-r border-b border-slate-200 dark:border-slate-800 hover:bg-accent hover:text-white transition-colors group"
              >
                <span className="flex items-center justify-between">
                  <span className="text-accent group-hover:text-white transition-colors">
                    <LinkIconFor name={l.icon} />
                  </span>
                  <ExternalLink size={13} className="text-slate-300 dark:text-slate-600 group-hover:text-white/70 transition-colors" />
                </span>
                <span className="text-sm font-bold">{l.label}</span>
              </a>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({
  kicker,
  title,
  children,
  action,
  delay = 0,
  className = '',
}: {
  kicker: string;
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`mt-16 ${className}`}
    >
      <div className="flex items-end justify-between gap-4 mb-5">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-accent mb-1.5">{kicker}</p>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </motion.section>
  );
}

function SectionLink({ onClick, label, small = false }: { onClick: () => void; label: string; small?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`${small ? 'text-[12px]' : 'text-[13px]'} font-bold text-accent flex items-center gap-1.5 hover:gap-3 transition-all shrink-0 pb-1`}
    >
      {label} <ArrowRight size={14} />
    </button>
  );
}

function CorporateHeroClock() {
  const now = useNow(10_000);
  return <span>Místní čas {now.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' })}</span>;
}

function CorporateClocks() {
  const now = useNow();
  return (
    <>
      {zones.map((z) => (
        <div key={z.tz} className="flex items-center justify-between text-sm">
          <span className="font-medium text-slate-700 dark:text-slate-300">{z.city}</span>
          <span className="font-bold text-slate-900 dark:text-white tabular-nums">
            {now.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit', timeZone: z.tz })}
          </span>
        </div>
      ))}
    </>
  );
}
