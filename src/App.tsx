import React, { useEffect, useState } from 'react';
import { Bell, Moon, Sun, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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

type Design = 'glass' | 'editorial' | 'neo';

const designs: { id: Design; label: string }[] = [
  { id: 'glass', label: 'Aurora' },
  { id: 'editorial', label: 'Papír' },
  { id: 'neo', label: 'Neon' },
];

function initialDesign(): Design {
  const fromUrl = new URLSearchParams(window.location.search).get('design');
  if (designs.some((d) => d.id === fromUrl)) return fromUrl as Design;
  const saved = localStorage.getItem('design');
  if (designs.some((d) => d.id === saved)) return saved as Design;
  return 'glass';
}

function pageFromHash(): Page {
  const hash = window.location.hash.replace('#', '');
  return pages.some((p) => p.id === hash) ? (hash as Page) : 'dashboard';
}

export default function App() {
  const [page, setPage] = useState<Page>(pageFromHash);
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [design, setDesign] = useState<Design>(initialDesign);

  useEffect(() => {
    const onHashChange = () => setPage(pageFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.design = design;
    localStorage.setItem('design', design);
  }, [design]);

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
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden selection:bg-accent/25">
      {/* Plovoucí skleněná navigace */}
      <header className="sticky top-0 z-50 px-3 md:px-6 pt-3">
        <div className="max-w-[1440px] mx-auto glass-strong rounded-2xl shadow-[0_8px_30px_rgba(2,20,60,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] px-4 md:px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                className="xl:hidden p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-900/5 dark:hover:bg-white/5 rounded-xl transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <button onClick={() => navigate('dashboard')} className="flex flex-col items-start group">
                <h2 className="text-primary dark:text-white text-xl md:text-2xl font-black leading-none tracking-tighter uppercase italic group-hover:text-accent transition-colors">
                  ALPS ALPINE
                </h2>
                <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase italic tracking-[0.2em] ml-0.5">
                  extends your senses
                </span>
              </button>
            </div>

            {/* Pilulková navigace s animovaným indikátorem */}
            <nav className="hidden xl:flex items-center gap-1 bg-slate-900/5 dark:bg-white/5 rounded-full p-1">
              {pages.map((p) => (
                <button
                  key={p.id}
                  onClick={() => navigate(p.id)}
                  className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    page === p.id
                      ? 'text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {page === p.id && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: 'spring', bounce: 0.25, duration: 0.55 }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-2 shadow-lg shadow-accent/30"
                    />
                  )}
                  <span className="relative z-10">{p.label}</span>
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-1.5 md:gap-2">
              <button
                className="p-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-900/5 dark:hover:bg-white/5 rounded-xl transition-colors"
                onClick={() => setDark(!dark)}
                aria-label="Přepnout tmavý režim"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={dark ? 'sun' : 'moon'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
                    {dark ? <Sun size={19} /> : <Moon size={19} />}
                  </motion.span>
                </AnimatePresence>
              </button>
              <button className="relative p-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-900/5 dark:hover:bg-white/5 rounded-xl transition-colors">
                <Bell size={19} />
                <span className="absolute top-2 right-2 size-2 bg-gradient-to-r from-accent to-accent-2 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
              </button>
              <div className="h-7 w-px bg-slate-300/60 dark:bg-slate-700/60 mx-1 hidden sm:block"></div>
              <div className="flex items-center gap-3 pl-1">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-slate-900 dark:text-white leading-none">Jan Novák</p>
                  <p className="text-[10px] text-slate-500 font-medium mt-0.5">Vedoucí provozu</p>
                </div>
                <div className="relative">
                  <div className="size-10 rounded-full bg-gradient-to-br from-accent to-accent-2 text-white flex items-center justify-center font-black text-sm ring-2 ring-white/70 dark:ring-slate-700/70">
                    JN
                  </div>
                  <span className="absolute bottom-0 right-0 size-2.5 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.nav
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="xl:hidden flex flex-col gap-1 overflow-hidden"
              >
                <div className="pt-3 pb-1 flex flex-col gap-1">
                  {pages.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => navigate(p.id)}
                      className={`text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                        page === p.id
                          ? 'bg-gradient-to-r from-accent to-accent-2 text-white shadow-lg shadow-accent/25'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-900/5 dark:hover:bg-white/5'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main className="flex-1 max-w-[1440px] mx-auto w-full p-4 md:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {page === 'dashboard' && <Dashboard navigate={navigate} />}
            {page === 'news' && <News />}
            {page === 'directory' && <Directory />}
            {page === 'canteen' && <Canteen />}
            {page === 'links' && <Links />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Plovoucí přepínač designových variant */}
      <div className="fixed bottom-5 right-5 z-50 glass-strong rounded-full p-1.5 flex items-center gap-1 shadow-[0_12px_36px_rgba(2,20,60,0.18)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.5)]">
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-2 hidden sm:block">
          Vzhled
        </span>
        {designs.map((d) => (
          <button
            key={d.id}
            onClick={() => setDesign(d.id)}
            className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
              design === d.id
                ? 'text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {design === d.id && (
              <motion.span
                layoutId="design-pill"
                transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-2"
              />
            )}
            <span className="relative z-10">{d.label}</span>
          </button>
        ))}
      </div>

      <footer className="mt-10 w-full px-4 md:px-6 pb-6">
        <div className="max-w-[1440px] mx-auto glass rounded-2xl px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-black text-xs uppercase tracking-tighter italic text-slate-500 dark:text-slate-400">
            Alps Alpine Co., Ltd.
          </span>
          <div className="flex gap-6 text-[11px] font-semibold text-slate-500 uppercase tracking-widest">
            <a className="hover:text-accent transition-colors" href="#">
              Ochrana údajů
            </a>
            <a className="hover:text-accent transition-colors" href="#">
              Compliance
            </a>
            <a
              className="hover:text-accent transition-colors"
              href="https://www.alpsalpine.com"
              target="_blank"
              rel="noreferrer"
            >
              Web společnosti
            </a>
          </div>
          <p className="text-[10px] text-slate-400">© 2026 Alps Alpine. Všechna práva vyhrazena.</p>
        </div>
      </footer>
    </div>
  );
}
