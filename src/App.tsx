import React, { useEffect, useState } from 'react';
import { Bell, Moon, Sun, Building2, Menu, X } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import News from './pages/News';
import Directory from './pages/Directory';
import Canteen from './pages/Canteen';
import Links from './pages/Links';

export type Page = 'dashboard' | 'news' | 'directory' | 'canteen' | 'links';

const pages: { id: Page; label: string }[] = [
  { id: 'dashboard', label: 'Nástěnka' },
  { id: 'news', label: 'Aktuality' },
  { id: 'directory', label: 'Adresář' },
  { id: 'canteen', label: 'Jídelníček' },
  { id: 'links', label: 'Systémy' },
];

function pageFromHash(): Page {
  const hash = window.location.hash.replace('#', '');
  return pages.some((p) => p.id === hash) ? (hash as Page) : 'dashboard';
}

export default function App() {
  const [page, setPage] = useState<Page>(pageFromHash);

  useEffect(() => {
    const onHashChange = () => setPage(pageFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  const navigate = (p: Page) => {
    setPage(p);
    window.location.hash = p;
    setMenuOpen(false);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden selection:bg-accent/30">
      <header className="sticky-nav px-4 md:px-10 py-3">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              className="xl:hidden p-2 text-slate-600 dark:text-slate-400"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <button onClick={() => navigate('dashboard')} className="flex flex-col items-start">
              <h2 className="text-primary dark:text-white text-2xl font-black leading-none tracking-tighter uppercase italic">
                ALPS ALPINE
              </h2>
              <span className="text-[10px] font-bold text-primary dark:text-slate-400 uppercase italic tracking-wider ml-1">
                extends your senses
              </span>
            </button>
          </div>

          <nav className="hidden xl:flex items-center gap-8">
            {pages.map((p) => (
              <button
                key={p.id}
                onClick={() => navigate(p.id)}
                className={
                  page === p.id
                    ? 'text-accent text-sm font-semibold border-b-2 border-accent pb-1'
                    : 'text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-accent transition-colors pb-1 border-b-2 border-transparent'
                }
              >
                {p.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              onClick={() => setDark(!dark)}
              aria-label="Přepnout tmavý režim"
            >
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block"></div>
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-none">Jan Novák</p>
                <p className="text-[10px] text-slate-500 font-medium">Vedoucí provozu</p>
              </div>
              <div
                className="size-10 rounded-full bg-slate-200 border-2 border-accent/20 bg-cover bg-center"
                style={{ backgroundImage: "url('https://picsum.photos/seed/user123/100/100')" }}
              ></div>
            </div>
          </div>
        </div>

        {menuOpen && (
          <nav className="xl:hidden flex flex-col gap-1 pt-3 pb-1 max-w-[1440px] mx-auto">
            {pages.map((p) => (
              <button
                key={p.id}
                onClick={() => navigate(p.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  page === p.id
                    ? 'bg-accent/10 text-accent font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {p.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1 max-w-[1440px] mx-auto w-full p-6">
        {page === 'dashboard' && <Dashboard navigate={navigate} />}
        {page === 'news' && <News />}
        {page === 'directory' && <Directory />}
        {page === 'canteen' && <Canteen />}
        {page === 'links' && <Links />}
      </main>

      <footer className="mt-12 w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 opacity-50 grayscale">
            <Building2 size={24} />
            <span className="font-black text-sm uppercase tracking-tighter">Alps Alpine Co., Ltd.</span>
          </div>
          <div className="flex gap-8 text-[11px] font-medium text-slate-500 uppercase tracking-widest">
            <a className="hover:text-accent transition-colors" href="#">
              Ochrana údajů
            </a>
            <a className="hover:text-accent transition-colors" href="#">
              Podmínky užití
            </a>
            <a className="hover:text-accent transition-colors" href="#">
              Compliance
            </a>
            <a className="hover:text-accent transition-colors" href="https://www.alpsalpine.com" target="_blank" rel="noreferrer">
              Web společnosti
            </a>
          </div>
          <p className="text-[10px] text-slate-400">© 2026 Alps Alpine. Všechna práva vyhrazena.</p>
        </div>
      </footer>
    </div>
  );
}
