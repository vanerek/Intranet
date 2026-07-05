import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Soup } from 'lucide-react';
import {
  useApi,
  formatDateCz,
  type Announcement,
  type CompanyEvent,
  type QuickLink,
  type CanteenDay,
} from '../../lib/api';
import { Loading, ErrorBox } from '../../components/ui';
import type { Page } from '../../lib/nav';
import { zones, useNow } from './shared';

/**
 * Nástěnka ve stylu titulní strany novin: velký serifový titulek,
 * text ve sloupcích, rubriky oddělené linkami místo karet.
 */
export default function DashboardEditorial({ navigate }: { navigate: (page: Page) => void }) {
  const announcements = useApi<Announcement[]>('/api/announcements?limit=5');
  const events = useApi<CompanyEvent[]>('/api/events?limit=5');
  const links = useApi<QuickLink[]>('/api/links');
  const canteen = useApi<CanteenDay[]>('/api/canteen');

  const lead = announcements.data?.[0];
  const rest = announcements.data?.slice(1) ?? [];
  const todayMenu = canteen.data?.find((d) => d.day === new Date().getDay());

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-stone-900 dark:text-stone-100"
    >
      {announcements.loading && <Loading lines={6} />}
      {announcements.error && <ErrorBox message={announcements.error} />}

      {/* Hlavní zpráva + rubrika Další zprávy */}
      <div className="grid grid-cols-12 gap-8">
        {lead && (
          <article
            className="col-span-12 lg:col-span-8 cursor-pointer group"
            onClick={() => navigate('news')}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-accent mb-3">
              {lead.category} · Zpráva dne
            </p>
            <h2 className="font-display text-4xl md:text-[3.4rem] leading-[1.05] font-bold mb-5 group-hover:text-accent transition-colors">
              {lead.title}
            </h2>
            {lead.image && (
              <figure className="mb-5">
                <div
                  className="w-full h-72 bg-cover bg-center grayscale-[35%] contrast-105 border border-stone-900/20 dark:border-stone-100/20 bg-gradient-to-br from-stone-300 to-stone-400 dark:from-stone-700 dark:to-stone-800"
                  style={{ backgroundImage: `url('${lead.image}')` }}
                ></div>
                <figcaption className="text-[11px] text-stone-500 mt-2 italic">
                  Foto: interní archiv ALPS ALPINE
                </figcaption>
              </figure>
            )}
            <div className="md:columns-2 md:gap-10 md:[column-rule:1px_solid_rgb(28_25_23_/_0.15)] dark:md:[column-rule:1px_solid_rgb(245_245_244_/_0.15)]">
              <p className="text-[15px] leading-relaxed text-stone-700 dark:text-stone-300 first-letter:font-display first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:leading-[0.85] first-letter:text-accent">
                {lead.body}
              </p>
              <p className="text-[15px] leading-relaxed text-stone-700 dark:text-stone-300 mt-4">
                Podrobnosti a všechny předchozí zprávy najdete v rubrice Aktuality. Připomínky k obsahu zpravodaje
                posílejte redakci prostřednictvím IT helpdesku.
              </p>
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-stone-500 mt-4">
              {formatDateCz(lead.date)} · {lead.views} čtenářů
            </p>
          </article>
        )}

        <aside className="col-span-12 lg:col-span-4 lg:border-l lg:border-stone-900/20 dark:lg:border-stone-100/20 lg:pl-8">
          <h3 className="font-display text-lg font-bold border-b-2 border-stone-900 dark:border-stone-100 pb-2 mb-1">
            Další zprávy
          </h3>
          {rest.map((a) => (
            <article
              key={a.id}
              onClick={() => navigate('news')}
              className="py-4 border-b border-stone-900/15 dark:border-stone-100/15 cursor-pointer group"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-1.5">{a.category}</p>
              <h4 className="font-display text-lg font-semibold leading-snug group-hover:text-accent transition-colors">
                {a.title}
              </h4>
              <p className="text-[13px] text-stone-600 dark:text-stone-400 mt-1.5 line-clamp-2 leading-relaxed">
                {a.body}
              </p>
            </article>
          ))}
          <button
            onClick={() => navigate('news')}
            className="mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-accent flex items-center gap-1 hover:gap-2 transition-all"
          >
            Archiv aktualit <ArrowUpRight size={13} />
          </button>
        </aside>
      </div>

      {/* Dvojitá linka – oddělení rubrik */}
      <div className="my-10 border-t-2 border-b border-stone-900 dark:border-stone-100 border-b-stone-900/25 dark:border-b-stone-100/25 h-1.5"></div>

      {/* Spodní rubriky */}
      <div className="grid grid-cols-12 gap-8">
        <section className="col-span-12 md:col-span-4">
          <h3 className="font-display text-lg font-bold border-b-2 border-stone-900 dark:border-stone-100 pb-2 mb-4">
            Agenda týdne
          </h3>
          {events.loading && <Loading />}
          <div className="flex flex-col gap-3.5">
            {events.data?.map((e) => {
              const d = new Date(e.date);
              return (
                <div key={e.id} className="flex items-baseline gap-2 text-[14px]">
                  <span className="font-display font-bold whitespace-nowrap">
                    {d.getDate()}. {d.getMonth() + 1}.
                  </span>
                  <span className="flex-1 border-b border-dotted border-stone-400 dark:border-stone-600 -translate-y-1"></span>
                  <span className="text-right">
                    <span className="font-semibold">{e.title}</span>
                    <span className="block text-[11px] text-stone-500">{e.time} · {e.location}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="col-span-12 md:col-span-4 md:border-l md:border-stone-900/20 dark:md:border-stone-100/20 md:pl-8">
          <h3 className="font-display text-lg font-bold border-b-2 border-stone-900 dark:border-stone-100 pb-2 mb-4">
            Dnes v kantýně
          </h3>
          {canteen.loading && <Loading />}
          {todayMenu ? (
            <div className="flex flex-col gap-3">
              <p className="text-[13px] italic text-stone-600 dark:text-stone-400 flex items-center gap-2">
                <Soup size={14} className="text-accent" /> {todayMenu.soup}
              </p>
              {todayMenu.mains.map((m, i) => (
                <p key={i} className="text-[14px] leading-snug">
                  <span className="font-display font-bold text-accent mr-2">{['I.', 'II.', 'III.'][i] ?? `${i + 1}.`}</span>
                  {m}
                </p>
              ))}
              <button
                onClick={() => navigate('canteen')}
                className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-accent flex items-center gap-1 hover:gap-2 transition-all"
              >
                Celý jídelní lístek <ArrowUpRight size={13} />
              </button>
            </div>
          ) : (
            !canteen.loading && (
              <p className="text-[14px] text-stone-600 dark:text-stone-400 italic">O víkendu kantýna nevaří.</p>
            )
          )}
        </section>

        <section className="col-span-12 md:col-span-4 md:border-l md:border-stone-900/20 dark:md:border-stone-100/20 md:pl-8">
          <h3 className="font-display text-lg font-bold border-b-2 border-stone-900 dark:border-stone-100 pb-2 mb-4">
            Služby a čas
          </h3>
          <div className="flex flex-col gap-2 text-[14px] mb-5">
            <ContactLine label="Ostraha areálu" value="linka 9911" />
            <ContactLine label="Zdravotní středisko" value="linka 4455" />
            <ContactLine label="IT helpdesk" value="linka 1400" />
          </div>
          <EditorialClocks />
        </section>
      </div>

      {/* Systémy – inzertní řádka */}
      <div className="mt-10 pt-4 border-t border-stone-900/25 dark:border-stone-100/25">
        {links.loading && <Loading lines={1} />}
        <p className="text-[13px] text-stone-600 dark:text-stone-400 leading-loose">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-900 dark:text-stone-100 mr-3">
            Firemní systémy:
          </span>
          {links.data?.map((l, i) => (
            <React.Fragment key={l.id}>
              {i > 0 && <span className="mx-2.5 text-stone-400">·</span>}
              <a
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="font-semibold underline decoration-stone-400 underline-offset-4 hover:text-accent hover:decoration-accent transition-colors"
              >
                {l.label}
              </a>
            </React.Fragment>
          ))}
        </p>
      </div>
    </motion.div>
  );
}

function ContactLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-semibold">{label}</span>
      <span className="flex-1 border-b border-dotted border-stone-400 dark:border-stone-600 -translate-y-1"></span>
      <span className="text-stone-600 dark:text-stone-400">{value}</span>
    </div>
  );
}

function EditorialClocks() {
  const now = useNow();
  return (
    <div className="flex flex-col gap-2 text-[14px]">
      {zones.map((z) => (
        <div key={z.tz} className="flex items-baseline gap-2">
          <span className="font-semibold">{z.city}</span>
          <span className="flex-1 border-b border-dotted border-stone-400 dark:border-stone-600 -translate-y-1"></span>
          <span className="font-display font-bold">
            {now.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit', timeZone: z.tz })}
          </span>
        </div>
      ))}
    </div>
  );
}
