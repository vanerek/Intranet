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
  LoaderCircle,
  TriangleAlert,
} from 'lucide-react';

export function Card({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm ${className}`}
    >
      {children}
    </motion.section>
  );
}

export function CardHeader({ icon, title, action }: { icon?: React.ReactNode; title: string; action?: React.ReactNode }) {
  return (
    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
        {icon}
        {title}
      </h2>
      {action}
    </div>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{children}</h3>;
}

export function Loading({ label = 'Načítání…' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 p-8 text-slate-400 text-sm">
      <LoaderCircle className="animate-spin" size={18} />
      {label}
    </div>
  );
}

export function ErrorBox({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 p-4 m-4 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 text-sm">
      <TriangleAlert size={16} />
      Data se nepodařilo načíst ({message}). Běží API server?
    </div>
  );
}

export function CategoryBadge({ category }: { category: string }) {
  const colors: Record<string, string> = {
    HR: 'bg-green-500/10 text-green-700 dark:text-green-400',
    IT: 'bg-accent/10 text-accent',
    Firma: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
    Výroba: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
  };
  return (
    <span
      className={`text-[10px] font-black px-2 py-1 rounded uppercase inline-block ${
        colors[category] ?? 'bg-slate-500/10 text-slate-600 dark:text-slate-400'
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
