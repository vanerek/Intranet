import React from 'react';
import { Soup, ExternalLink } from 'lucide-react';
import { useApi, type CanteenDay } from '../lib/api';
import { Card, Loading, ErrorBox } from '../components/ui';

const dayNames = ['', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek'];

export default function Canteen() {
  const canteen = useApi<CanteenDay[]>('/api/canteen');
  const todayIdx = new Date().getDay();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white tracking-tight pt-2">
          Jídelníček kantýny
        </h1>
        <a
          href="https://jidelna.example.alps.cz"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 bg-gradient-to-r from-accent to-accent-2 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5 transition-all"
        >
          Objednat oběd <ExternalLink size={14} />
        </a>
      </div>

      {canteen.loading && <Loading />}
      {canteen.error && <ErrorBox message={canteen.error} />}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        {canteen.data?.map((day) => {
          const isToday = day.day === todayIdx;
          return (
            <Card
              key={day.day}
              className={`p-5 flex flex-col gap-3 ${isToday ? '!border-accent/60 ring-2 ring-accent/30' : ''}`}
              delay={day.day * 0.05}
              hover
            >
              <div className="flex items-center justify-between">
                <h3 className="font-black text-slate-900 dark:text-white uppercase text-sm tracking-wide">
                  {dayNames[day.day]}
                </h3>
                {isToday && (
                  <span className="text-[10px] font-black bg-gradient-to-r from-accent to-accent-2 text-white px-2.5 py-0.5 rounded-full uppercase shadow-md shadow-accent/25">
                    Dnes
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 italic flex items-center gap-1.5">
                <Soup size={14} className="text-accent shrink-0" /> {day.soup}
              </p>
              <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                {day.mains.map((m, i) => (
                  <p key={i} className="text-sm text-slate-800 dark:text-slate-200 flex gap-2">
                    <span className="text-accent font-black shrink-0">{i + 1}.</span> {m}
                  </p>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      <p className="text-xs text-slate-400">
        Výdej obědů 11:00 – 13:30. Obědy objednávejte den předem do 14:00 v objednávkovém systému.
      </p>
    </div>
  );
}
