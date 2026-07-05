import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { pageFromHash, initialDesign, designs, type Page, type Design } from './lib/nav';
import { AuroraShell, EditorialShell, NeoShell, CorporateShell } from './components/shells';
import Dashboard from './pages/Dashboard';
import News from './pages/News';
import Directory from './pages/Directory';
import Canteen from './pages/Canteen';
import Links from './pages/Links';

export type { Page } from './lib/nav';

export default function App() {
  const [page, setPage] = useState<Page>(pageFromHash);
  const [design, setDesign] = useState<Design>(initialDesign);
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const onHashChange = () => setPage(pageFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    document.documentElement.dataset.design = design;
    localStorage.setItem('design', design);
  }, [design]);

  const navigate = (p: Page) => {
    setPage(p);
    window.location.hash = p;
    window.scrollTo({ top: 0 });
  };

  const content = (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${page}-${design}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {page === 'dashboard' && <Dashboard navigate={navigate} design={design} />}
        {page === 'news' && <News />}
        {page === 'directory' && <Directory />}
        {page === 'canteen' && <Canteen />}
        {page === 'links' && <Links />}
      </motion.div>
    </AnimatePresence>
  );

  const shellProps = { page, navigate, dark, toggleDark: () => setDark(!dark) };
  const Shell =
    design === 'editorial'
      ? EditorialShell
      : design === 'neo'
        ? NeoShell
        : design === 'corporate'
          ? CorporateShell
          : AuroraShell;

  return (
    <>
      <Shell {...shellProps}>{content}</Shell>

      {/* Plovoucí přepínač designových variant */}
      <div className="fixed bottom-5 right-5 z-[60] glass-strong rounded-full p-1.5 flex items-center gap-1 shadow-[0_12px_36px_rgba(2,20,60,0.18)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.5)]">
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
    </>
  );
}
