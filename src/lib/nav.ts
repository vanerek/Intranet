import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, Newspaper, Users, UtensilsCrossed, LayoutGrid } from 'lucide-react';

export type Page = 'dashboard' | 'news' | 'directory' | 'canteen' | 'links';

export const pages: { id: Page; label: string; icon: LucideIcon }[] = [
  { id: 'dashboard', label: 'Nástěnka', icon: LayoutDashboard },
  { id: 'news', label: 'Aktuality', icon: Newspaper },
  { id: 'directory', label: 'Adresář', icon: Users },
  { id: 'canteen', label: 'Jídelníček', icon: UtensilsCrossed },
  { id: 'links', label: 'Systémy', icon: LayoutGrid },
];

export function pageFromHash(): Page {
  const hash = window.location.hash.replace('#', '');
  return pages.some((p) => p.id === hash) ? (hash as Page) : 'dashboard';
}

export type Design = 'glass' | 'editorial' | 'neo';

export const designs: { id: Design; label: string }[] = [
  { id: 'glass', label: 'Aurora' },
  { id: 'editorial', label: 'Papír' },
  { id: 'neo', label: 'Neon' },
];

export function initialDesign(): Design {
  const fromUrl = new URLSearchParams(window.location.search).get('design');
  if (designs.some((d) => d.id === fromUrl)) return fromUrl as Design;
  const saved = localStorage.getItem('design');
  if (designs.some((d) => d.id === saved)) return saved as Design;
  return 'glass';
}

export interface ShellProps {
  page: Page;
  navigate: (page: Page) => void;
  dark: boolean;
  toggleDark: () => void;
  children: React.ReactNode;
}
