import React, { useState } from 'react';
import { Calendar, Eye, Pin } from 'lucide-react';
import { useApi, formatDateCz, type Announcement } from '../lib/api';
import { Card, Loading, ErrorBox, CategoryBadge } from '../components/ui';

export default function News() {
  const [category, setCategory] = useState('all');
  const categories = useApi<string[]>('/api/announcements/categories');
  const announcements = useApi<Announcement[]>(`/api/announcements?category=${encodeURIComponent(category)}`);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Aktuality</h1>
        <div className="flex gap-2 flex-wrap">
          <FilterChip label="Vše" active={category === 'all'} onClick={() => setCategory('all')} />
          {categories.data?.map((c) => (
            <FilterChip key={c} label={c} active={category === c} onClick={() => setCategory(c)} />
          ))}
        </div>
      </div>

      {announcements.loading && <Loading />}
      {announcements.error && <ErrorBox message={announcements.error} />}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {announcements.data?.map((a, i) => (
          <Card key={a.id} className="overflow-hidden flex flex-col" delay={Math.min(i * 0.05, 0.3)}>
            {a.image && (
              <div className="h-40 w-full bg-cover bg-center" style={{ backgroundImage: `url('${a.image}')` }}></div>
            )}
            <div className="p-5 flex flex-col gap-3 flex-1">
              <div className="flex items-center gap-2">
                <CategoryBadge category={a.category} />
                {a.pinned === 1 && (
                  <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 uppercase">
                    <Pin size={12} /> Připnuto
                  </span>
                )}
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white leading-snug">{a.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">{a.body}</p>
              <div className="flex items-center gap-4 text-[11px] text-slate-400 font-medium pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="flex items-center gap-1">
                  <Calendar size={13} /> {formatDateCz(a.date)}
                </span>
                <span className="flex items-center gap-1">
                  <Eye size={13} /> {a.views}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {announcements.data?.length === 0 && (
        <p className="text-center text-slate-500 py-12">V této kategorii zatím nejsou žádné aktuality.</p>
      )}
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
        active
          ? 'bg-accent text-white'
          : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-accent hover:text-accent'
      }`}
    >
      {label}
    </button>
  );
}
