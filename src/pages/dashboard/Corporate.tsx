import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Search, ExternalLink } from 'lucide-react';
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
 * Nástěnka podle alpsalpine.com: modré nadpisy se značkovým symbolem,
 * výrazné vyhledávací pole, řádkové seznamy se čtvercovými šipkami.
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
      {/* Uvítání + vyhledávání */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="pt-4 flex flex-col md:flex-row md:items-end justify-between gap-5"
      >
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-accent dark:text-blue-300 tracking-tight">
            {greeting()}, Jane.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-[15px]">
            {new Date().toLocaleDateString('cs-CZ', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            {' · '}Sebranice 22 °C · <LiveTimeInline />
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate('directory');
          }}
          className="flex items-center border-2 border-accent/50 rounded-xl bg-white dark:bg-slate-900 px-4 py-2.5 w-full md:w-80 focus-within:border-accent transition-colors"
        >
          <input
            placeholder="Hledat kolegy, zprávy…"
            className="flex-1 bg-transparent text-[15px] focus:outline-none placeholder:text-slate-400"
          />
          <button type="submit" aria-label="Hledat">
            <Search size={20} className="text-accent" />
          </button>
        </form>
      </motion.div>

      {/* Aktuality */}
      <Section title="Aktuality" delay={0.08} action={<SquareLink onClick={() => navigate('news')} label="Všechny aktuality" />}>
        {announcements.loading && <Loading lines={5} />}
        {announcements.error && <ErrorBox message={announcements.error} />}
        <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm">
          {announcements.data?.map((a) => (
            <button
              key={a.id}
              onClick={() => navigate('news')}
              className="w-full text-left flex items-center gap-4 md:gap-6 px-5 py-4 border-b border-accent/15 last:border-0 group hover:bg-accent/[0.04] transition-colors"
            >
              <span className="text-[13px] text-slate-500 tabular-nums shrink-0 w-20">
                {new Date(a.date).toLocaleDateString('cs-CZ')}
              </span>
              <span className="hidden sm:block shrink-0 w-20">
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-accent border border-accent/50 rounded px-2 py-0.5">
                  {a.category}
                </span>
              </span>
              <span className="flex-1 text-[15px] font-medium text-accent dark:text-blue-300 group-hover:underline underline-offset-4 decoration-accent/50">
                {a.title}
              </span>
              <SquareChevron />
            </button>
          ))}
        </div>
      </Section>

      {/* Ze života závodu */}
      {withImage.length > 0 && (
        <Section title="Ze života závodu" delay={0.12}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {withImage.map((a) => (
              <button key={a.id} onClick={() => navigate('news')} className="text-left group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-hidden">
                  <div
                    className="h-52 w-full bg-cover bg-center bg-gradient-to-br from-[#3a6fd8] to-primary transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${a.image}')` }}
                  ></div>
                </div>
                <div className="p-5 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-[17px] font-bold text-accent dark:text-blue-300 leading-snug group-hover:underline underline-offset-4 decoration-accent/50">
                      {a.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 line-clamp-2">{a.body}</p>
                  </div>
                  <SquareChevron />
                </div>
              </button>
            ))}
          </div>
        </Section>
      )}

      {/* Tři sloupce */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Section title="Kalendář" delay={0.16} className="!mt-12">
          {events.loading && <Loading />}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm px-5">
            {events.data?.map((e) => (
              <div key={e.id} className="py-3.5 border-b border-accent/15 last:border-0">
                <p className="text-[12px] text-slate-500 tabular-nums">
                  {new Date(e.date).toLocaleDateString('cs-CZ')} · {e.time}
                </p>
                <p className="text-sm font-bold text-accent dark:text-blue-300 mt-0.5">{e.title}</p>
                <p className="text-[12px] text-slate-500">{e.location}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Dnes v kantýně" delay={0.2} className="!mt-12" action={<SquareLink onClick={() => navigate('canteen')} label="Týden" small />}>
          {canteen.loading && <Loading />}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-5">
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

        <Section title="Lokality a kontakty" delay={0.24} className="!mt-12">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-5 flex flex-col gap-2.5">
            <CorporateClocks />
            <div className="pt-3 mt-1 border-t border-accent/15 text-[13px] text-slate-600 dark:text-slate-400 flex flex-col gap-1.5">
              <p>Ostraha areálu — <span className="font-bold text-accent dark:text-blue-300">linka 9911</span></p>
              <p>Zdravotní středisko — <span className="font-bold text-accent dark:text-blue-300">linka 4455</span></p>
              <p>IT helpdesk — <span className="font-bold text-accent dark:text-blue-300">linka 1400</span></p>
            </div>
          </div>
        </Section>
      </div>

      {/* Systémy */}
      <Section title="Firemní systémy a aplikace" delay={0.28} action={<SquareLink onClick={() => navigate('links')} label="Přehled systémů" />}>
        {links.loading && <Loading lines={2} />}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {links.data?.map((l) => (
            <a
              key={l.id}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm p-4 group hover:bg-accent transition-colors"
            >
              <span className="flex items-center gap-3 min-w-0">
                <span className="text-accent group-hover:text-white transition-colors shrink-0">
                  <LinkIconFor name={l.icon} />
                </span>
                <span className="text-sm font-bold text-accent dark:text-blue-300 group-hover:text-white transition-colors truncate">
                  {l.label}
                </span>
              </span>
              <ExternalLink size={13} className="text-accent/40 group-hover:text-white/70 transition-colors shrink-0" />
            </a>
          ))}
        </div>
      </Section>
    </div>
  );
}

/** Značkový symbol – dva překřížené úhlové tvary v modrých tónech. */
function BrandMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden className="shrink-0">
      <path d="M12 1 L15.5 12 L12 23 L8.5 12 Z" fill="#8fa8dd" transform="rotate(50 12 12)" />
      <path d="M12 1 L15.5 12 L12 23 L8.5 12 Z" fill="#14328f" transform="rotate(-25 12 12)" />
    </svg>
  );
}

function Section({
  title,
  children,
  action,
  delay = 0,
  className = '',
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`mt-14 ${className}`}
    >
      <div className="flex items-end justify-between gap-4 mb-4">
        <h2 className="flex items-center gap-2.5 text-2xl font-bold text-accent dark:text-blue-300 tracking-tight">
          <BrandMark />
          {title}
        </h2>
        {action}
      </div>
      {children}
    </motion.section>
  );
}

function SquareChevron() {
  return (
    <span className="size-9 border-2 border-accent/60 rounded-lg flex items-center justify-center text-accent shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
      <ChevronRight size={17} />
    </span>
  );
}

function SquareLink({ onClick, label, small = false }: { onClick: () => void; label: string; small?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`${small ? 'text-[12px]' : 'text-[13px]'} font-bold text-accent dark:text-blue-300 flex items-center gap-2 shrink-0 pb-1 group/link`}
    >
      {label}
      <span className="size-7 border-2 border-accent/60 rounded-md flex items-center justify-center group-hover/link:bg-accent group-hover/link:text-white transition-colors">
        <ChevronRight size={14} />
      </span>
    </button>
  );
}

function LiveTimeInline() {
  const now = useNow(10_000);
  return <span>místní čas {now.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' })}</span>;
}

function CorporateClocks() {
  const now = useNow();
  return (
    <>
      {zones.map((z) => (
        <div key={z.tz} className="flex items-center justify-between text-sm">
          <span className="font-medium text-slate-700 dark:text-slate-300">{z.city}</span>
          <span className="font-bold text-accent dark:text-blue-300 tabular-nums">
            {now.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit', timeZone: z.tz })}
          </span>
        </div>
      ))}
    </>
  );
}
