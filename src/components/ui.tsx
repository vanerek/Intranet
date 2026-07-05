import React from 'react';
import { motion } from 'motion/react';
import {
  Database,
  Cpu,
  Truck,
  BadgeCheck,
  Fingerprint,
  Headphones,
  Monitor,
  UtensilsCrossed,
  Link as LinkIcon,
  TriangleAlert,
} from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

export function Card({
  children,
  className = '',
  delay = 0,
  hover = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.55, ease: EASE }}
      whileHover={hover ? { y: -4 } : undefined}
      className={`glass rounded-2xl shadow-[0_8px_30px_rgba(2,20,60,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-shadow duration-300 ${
        hover ? 'hover:shadow-[0_18px_44px_rgba(2,20,60,0.13)] dark:hover:shadow-[0_18px_44px_rgba(0,0,0,0.5)]' : ''
      } ${className}`}
    >
      {children}
    </motion.section>
  );
}

export function CardHeader({ icon, title, action }: { icon?: React.ReactNode; title: string; action?: React.ReactNode }) {
  return (
    <div className="px-6 py-4 border-b border-slate-200/60 dark:border-slate-700/50 flex justify-between items-center">
      <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
        {icon && (
          <span className="size-8 rounded-lg bg-gradient-to-br from-accent to-accent-2 text-white flex items-center justify-center shadow-md shadow-accent/25">
            {icon}
          </span>
        )}
        {title}
      </h2>
      {action}
    </div>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.18em] mb-4 flex items-center gap-2">
      <span className="size-1.5 rounded-full bg-gradient-to-r from-accent to-accent-2 shrink-0"></span>
      {children}
    </h3>
  );
}

export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-slate-300/50 dark:bg-slate-700/40 ${className}`} />;
}

/** Skeleton placeholder místo spinneru – obsah „prosvítá“ ještě před načtením. */
export function Loading({ lines = 3 }: { lines?: number; label?: string }) {
  return (
    <div className="p-6 flex flex-col gap-3">
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton key={i} className={`h-4 ${i === 0 ? 'w-2/3' : i % 2 ? 'w-full' : 'w-5/6'}`} />
      ))}
    </div>
  );
}

export function ErrorBox({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 p-4 m-4 rounded-xl bg-red-50/80 dark:bg-red-950/40 text-red-700 dark:text-red-400 text-sm border border-red-200/60 dark:border-red-900/50">
      <TriangleAlert size={16} />
      Data se nepodařilo načíst ({message}). Běží API server?
    </div>
  );
}

export function CategoryBadge({ category }: { category: string }) {
  const colors: Record<string, string> = {
    HR: 'bg-emerald-500/12 text-emerald-700 dark:text-emerald-400 ring-emerald-500/25',
    IT: 'bg-accent/12 text-accent ring-accent/25',
    Firma: 'bg-violet-500/12 text-violet-700 dark:text-violet-400 ring-violet-500/25',
    Výroba: 'bg-amber-500/12 text-amber-700 dark:text-amber-400 ring-amber-500/25',
  };
  return (
    <span
      className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide inline-block ring-1 ${
        colors[category] ?? 'bg-slate-500/12 text-slate-600 dark:text-slate-400 ring-slate-500/25'
      }`}
    >
      {category}
    </span>
  );
}

const linkIcons: Record<string, React.ReactNode> = {
  database: <Database size={18} />,
  cpu: <Cpu size={18} />,
  truck: <Truck size={18} />,
  'badge-check': <BadgeCheck size={18} />,
  fingerprint: <Fingerprint size={18} />,
  headphones: <Headphones size={18} />,
  monitor: <Monitor size={18} />,
  utensils: <UtensilsCrossed size={18} />,
};

export function LinkIconFor({ name }: { name: string }) {
  return <>{linkIcons[name] ?? <LinkIcon size={18} />}</>;
}
