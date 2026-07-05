import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useApi, type QuickLink } from '../lib/api';
import { Card, Loading, ErrorBox, LinkIconFor, SectionLabel } from '../components/ui';

export default function Links() {
  const links = useApi<QuickLink[]>('/api/links');
  const systems = links.data?.filter((l) => l.category === 'system') ?? [];
  const apps = links.data?.filter((l) => l.category === 'app') ?? [];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white tracking-tight pt-2">
        Systémy a aplikace
      </h1>

      {links.loading && <Loading />}
      {links.error && <ErrorBox message={links.error} />}

      {links.data && (
        <>
          <section>
            <SectionLabel>Firemní systémy</SectionLabel>
            <LinkGrid items={systems} />
          </section>
          <section>
            <SectionLabel>Aplikace a nástroje</SectionLabel>
            <LinkGrid items={apps} />
          </section>
        </>
      )}
    </div>
  );
}

function LinkGrid({ items }: { items: QuickLink[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {items.map((link, i) => (
        <Card key={link.id} delay={Math.min(i * 0.04, 0.2)} hover>
          <a
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col gap-3 p-5 group h-full"
          >
            <div className="flex items-center justify-between">
              <div className="size-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-accent group-hover:to-accent-2 group-hover:text-white group-hover:shadow-lg group-hover:shadow-accent/25 transition-all">
                <LinkIconFor name={link.icon} />
              </div>
              <ExternalLink size={14} className="text-slate-300 group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-accent transition-colors">
                {link.label}
              </h3>
              {link.description && <p className="text-xs text-slate-500 mt-1">{link.description}</p>}
            </div>
          </a>
        </Card>
      ))}
    </div>
  );
}
