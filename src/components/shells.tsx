import React, { useState } from 'react';
import { Bell, Moon, Sun, Menu, X, Mail, Search, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { pages, type ShellProps } from '../lib/nav';

/* ────────────────────────────────────────────────────────────────────
 * Aurora – plovoucí skleněná lišta s pilulkovou navigací
 * ──────────────────────────────────────────────────────────────────── */
export function AuroraShell({ page, navigate, dark, toggleDark, children }: ShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const go = (p: typeof page) => {
    navigate(p);
    setMenuOpen(false);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden selection:bg-accent/25">
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
              <button onClick={() => go('dashboard')} className="flex flex-col items-start group">
                <h2 className="text-primary dark:text-white text-xl md:text-2xl font-black leading-none tracking-tighter uppercase italic group-hover:text-accent transition-colors">
                  ALPS ALPINE
                </h2>
                <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase italic tracking-[0.2em] ml-0.5">
                  extends your senses
                </span>
              </button>
            </div>

            <nav className="hidden xl:flex items-center gap-1 bg-slate-900/5 dark:bg-white/5 rounded-full p-1">
              {pages.map((p) => (
                <button
                  key={p.id}
                  onClick={() => go(p.id)}
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
              <DarkToggle dark={dark} toggleDark={toggleDark} />
              <button className="relative p-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-900/5 dark:hover:bg-white/5 rounded-xl transition-colors">
                <Bell size={19} />
                <span className="absolute top-2 right-2 size-2 bg-gradient-to-r from-accent to-accent-2 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
              </button>
              <div className="h-7 w-px bg-slate-300/60 dark:bg-slate-700/60 mx-1 hidden sm:block"></div>
              <UserBadge />
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
                      onClick={() => go(p.id)}
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

      <main className="flex-1 max-w-[1440px] mx-auto w-full p-4 md:p-6">{children}</main>

      <footer className="mt-10 w-full px-4 md:px-6 pb-6">
        <div className="max-w-[1440px] mx-auto glass rounded-2xl px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-black text-xs uppercase tracking-tighter italic text-slate-500 dark:text-slate-400">
            Alps Alpine Co., Ltd.
          </span>
          <FooterLinks />
          <p className="text-[10px] text-slate-400">© 2026 Alps Alpine. Všechna práva vyhrazena.</p>
        </div>
      </footer>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────
 * Papír – novinový masthead, textová navigace, tenké linky
 * ──────────────────────────────────────────────────────────────────── */
export function EditorialShell({ page, navigate, dark, toggleDark, children }: ShellProps) {
  const today = new Date().toLocaleDateString('cs-CZ', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden selection:bg-accent/20">
      {/* Masthead */}
      <div className="max-w-[1200px] mx-auto w-full px-4 md:px-8 pt-6">
        <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400 pb-3 border-b border-stone-900/20 dark:border-stone-100/20">
          <span className="first-letter:uppercase">{today}</span>
          <span className="hidden sm:block">Interní zpravodaj závodu ALCZ</span>
          <button
            onClick={toggleDark}
            className="flex items-center gap-1.5 hover:text-accent transition-colors uppercase tracking-[0.18em]"
          >
            {dark ? <Sun size={13} /> : <Moon size={13} />}
            {dark ? 'Světlé' : 'Tmavé'}
          </button>
        </div>

        <div className="text-center py-8">
          <button onClick={() => navigate('dashboard')} className="group">
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-accent transition-colors">
              ALPS ALPINE
            </h1>
            <p className="text-[11px] font-semibold uppercase tracking-[0.5em] text-stone-500 dark:text-stone-400 mt-3">
              extends your senses · Sebranice
            </p>
          </button>
        </div>

        <div className="border-t-2 border-b border-stone-900 dark:border-stone-100 border-b-stone-900/25 dark:border-b-stone-100/25"></div>
      </div>

      {/* Navigace – sticky řádek pod mastheadem */}
      <nav className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-stone-900/15 dark:border-stone-100/15">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex items-center justify-center gap-2 md:gap-10 overflow-x-auto">
          {pages.map((p) => (
            <button
              key={p.id}
              onClick={() => navigate(p.id)}
              className={`relative py-3.5 px-2 text-[13px] font-bold uppercase tracking-[0.14em] whitespace-nowrap transition-colors ${
                page === p.id
                  ? 'text-accent'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              {p.label}
              {page === p.id && (
                <motion.span
                  layoutId="editorial-underline"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-accent"
                />
              )}
            </button>
          ))}
        </div>
      </nav>

      <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 md:px-8 py-8">{children}</main>

      <footer className="mt-10 w-full">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-6 border-t-2 border-stone-900 dark:border-stone-100 flex flex-col md:flex-row justify-between items-center gap-3">
          <span className="font-display font-bold text-sm text-stone-900 dark:text-stone-100">Alps Alpine Co., Ltd.</span>
          <FooterLinks />
          <p className="text-[10px] text-stone-500">© 2026 Alps Alpine. Všechna práva vyhrazena.</p>
        </div>
      </footer>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────
 * Neon – levý ikonový rail + horní stavová lišta, velín
 * ──────────────────────────────────────────────────────────────────── */
export function NeoShell({ page, navigate, dark, toggleDark, children }: ShellProps) {
  const active = pages.find((p) => p.id === page);

  return (
    <div className="relative flex min-h-screen w-full overflow-x-hidden selection:bg-accent/25">
      {/* Ikonový rail */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-16 z-50 flex-col items-center py-4 gap-2 glass-strong border-y-0 border-l-0">
        <button
          onClick={() => navigate('dashboard')}
          className="size-10 rounded-lg bg-gradient-to-br from-accent to-accent-2 text-slate-950 font-display font-bold text-xs flex items-center justify-center mb-4 shadow-lg shadow-accent/30"
          title="ALPS ALPINE"
        >
          AA
        </button>
        {pages.map((p) => {
          const Icon = p.icon;
          const isActive = page === p.id;
          return (
            <button
              key={p.id}
              onClick={() => navigate(p.id)}
              title={p.label}
              className={`relative size-11 rounded-xl flex items-center justify-center transition-colors ${
                isActive
                  ? 'text-accent'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900/5 dark:hover:bg-white/5'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="neo-rail"
                  transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                  className="absolute inset-0 rounded-xl bg-accent/12 border border-accent/30"
                />
              )}
              <Icon size={20} className="relative z-10" />
              {isActive && (
                <span className="absolute -left-[13px] top-1/2 -translate-y-1/2 h-6 w-1 rounded-full bg-gradient-to-b from-accent to-accent-2"></span>
              )}
            </button>
          );
        })}
        <div className="mt-auto flex flex-col items-center gap-2">
          <button
            onClick={toggleDark}
            className="size-11 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-accent hover:bg-slate-900/5 dark:hover:bg-white/5 transition-colors"
            aria-label="Přepnout tmavý režim"
          >
            {dark ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <div className="size-10 rounded-xl bg-gradient-to-br from-accent to-accent-2 text-slate-950 flex items-center justify-center font-display font-bold text-xs">
            JN
          </div>
        </div>
      </aside>

      <div className="flex-1 md:ml-16 flex flex-col min-w-0">
        {/* Horní stavová lišta */}
        <header className="sticky top-0 z-40 glass-strong border-x-0 border-t-0 px-4 md:px-6 py-3 flex items-center justify-between gap-4">
          <div className="font-display text-xs md:text-sm font-bold tracking-wide text-slate-700 dark:text-slate-300 uppercase truncate">
            <span className="text-accent">ALCZ_INTRANET</span>
            <span className="text-slate-400 dark:text-slate-600 mx-2">//</span>
            {active?.label}
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden lg:flex items-center gap-2 font-display text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase">
              <span className="size-1.5 rounded-full bg-accent-2 animate-pulse"></span>
              Všechny systémy v provozu
            </span>
            <button className="relative p-2 text-slate-500 dark:text-slate-400 hover:text-accent transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 size-1.5 bg-accent-2 rounded-full"></span>
            </button>
            <button
              onClick={toggleDark}
              className="md:hidden p-2 text-slate-500 dark:text-slate-400 hover:text-accent transition-colors"
              aria-label="Přepnout tmavý režim"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-900 dark:text-white leading-none font-display">Jan Novák</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Vedoucí provozu</p>
            </div>
          </div>
        </header>

        {/* Mobilní navigace */}
        <nav className="md:hidden sticky top-[53px] z-40 glass border-x-0 px-2 py-2 flex gap-1 overflow-x-auto">
          {pages.map((p) => (
            <button
              key={p.id}
              onClick={() => navigate(p.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-display font-bold whitespace-nowrap uppercase tracking-wide transition-colors ${
                page === p.id
                  ? 'bg-accent/15 text-accent border border-accent/30'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {p.label}
            </button>
          ))}
        </nav>

        <main className="flex-1 w-full max-w-[1400px] mx-auto p-4 md:p-6">{children}</main>

        <footer className="w-full px-4 md:px-6 pb-4">
          <div className="max-w-[1400px] mx-auto pt-4 border-t border-slate-900/10 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 font-display text-[10px] uppercase tracking-wider text-slate-500">
            <span>Alps Alpine Co., Ltd. — ALCZ Sebranice</span>
            <FooterLinks />
            <span>© 2026</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────
 * Corporate – věrně podle alpsalpine.com: wordmark ΛLPSΛLPINE,
 * fotografická hlavička stránky, obsahový panel se zaoblenými rohy,
 * drobečková navigace a čtvercová orámovaná tlačítka
 * ──────────────────────────────────────────────────────────────────── */

export function AlpsWordmark({ light = false }: { light?: boolean }) {
  return (
    <span className="flex flex-col items-start leading-none select-none">
      <span
        className={`text-[26px] font-black tracking-[-0.06em] ${light ? 'text-white' : 'text-accent'}`}
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        ΛLPSΛLPINE
      </span>
      <span className={`text-[11px] font-bold italic tracking-tight mt-0.5 ml-0.5 ${light ? 'text-white/80' : 'text-accent'}`}>
        extends your senses
      </span>
    </span>
  );
}

export function CorporateShell({ page, navigate, dark, toggleDark, children }: ShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = pages.find((p) => p.id === page);
  const go = (p: typeof page) => {
    navigate(p);
    setMenuOpen(false);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden selection:bg-accent/20 bg-slate-100 dark:bg-slate-950">
      {/* Bílá hlavička s wordmarkem a ikonami */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow-sm">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex items-center justify-between gap-6 h-[72px]">
          <button onClick={() => go('dashboard')} className="shrink-0">
            <AlpsWordmark />
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            {pages.map((p) => (
              <button
                key={p.id}
                onClick={() => go(p.id)}
                className={`text-[15px] transition-colors ${
                  page === p.id ? 'text-accent font-bold' : 'text-accent/80 font-medium hover:text-accent'
                }`}
              >
                {p.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4 text-accent dark:text-blue-300">
            <Mail size={22} strokeWidth={1.8} className="hidden sm:block" />
            <button onClick={toggleDark} aria-label="Přepnout tmavý režim">
              {dark ? <Sun size={22} strokeWidth={1.8} /> : <Moon size={22} strokeWidth={1.8} />}
            </button>
            <Search size={22} strokeWidth={1.8} className="hidden sm:block" />
            <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobilní menu ve stylu webu: velké modré položky se čtvercovými šipkami */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800"
            >
              <div className="px-5 py-4 flex flex-col">
                <div className="flex items-center border-2 border-accent/50 rounded-xl bg-white dark:bg-slate-950 px-4 py-2.5 mb-4">
                  <input
                    placeholder="Hledat…"
                    className="flex-1 bg-transparent text-[15px] focus:outline-none placeholder:text-slate-400"
                  />
                  <Search size={20} className="text-accent" />
                </div>
                {pages.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => go(p.id)}
                    className="flex items-center justify-between py-3.5 border-b border-accent/20 last:border-0 group"
                  >
                    <span className={`text-[17px] ${page === p.id ? 'font-bold' : 'font-medium'} text-accent`}>
                      {p.label}
                    </span>
                    <span className="size-9 border-2 border-accent/60 rounded-lg flex items-center justify-center text-accent">
                      <ChevronRight size={18} />
                    </span>
                  </button>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Fotografická hlavička stránky s velkým bílým titulkem */}
      <div className="relative h-52 md:h-72 overflow-hidden bg-gradient-to-br from-[#3a6fd8] to-primary">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://picsum.photos/seed/alcz-hq-${page}/1600/500')` }}
        ></div>
        <div className="absolute inset-0 bg-primary/25"></div>
        <h1 className="relative z-10 h-full flex items-center justify-center text-white text-4xl md:text-6xl font-light tracking-wide">
          {active?.label}
        </h1>
      </div>

      {/* Obsahový panel se zaoblenými rohy přetažený přes fotografii */}
      <div className="relative -mt-8 flex-1 rounded-t-[2.5rem] bg-slate-100 dark:bg-slate-950 shadow-[0_-8px_24px_rgba(0,0,0,0.08)]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-7 pb-2 flex items-center gap-2 text-[14px]">
          <button onClick={() => go('dashboard')} className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent">
            TOP
          </button>
          <ChevronRight size={15} className="text-slate-400" />
          <span className="text-slate-700 dark:text-slate-300">{active?.label}</span>
        </div>
        <main className="max-w-[1280px] mx-auto px-4 md:px-8 pb-12 w-full">{children}</main>
      </div>

      {/* Tmavě modrá patička */}
      <footer className="bg-primary dark:bg-slate-950 dark:border-t dark:border-slate-800 text-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <AlpsWordmark light />
            <p className="text-[11px] text-white/60 mt-3 leading-relaxed">
              Alps Alpine Co., Ltd. — závod ALCZ Sebranice
              <br />
              Interní portál pro zaměstnance
            </p>
          </div>
          <div className="text-[13px] flex flex-col gap-2.5 text-white/85">
            {pages.map((p) => (
              <button key={p.id} onClick={() => go(p.id)} className="text-left hover:underline underline-offset-4 w-fit flex items-center gap-2">
                <ChevronRight size={13} className="text-white/50" /> {p.label}
              </button>
            ))}
          </div>
          <div className="text-[13px] flex flex-col gap-2.5 text-white/85">
            <a className="hover:underline underline-offset-4 w-fit flex items-center gap-2" href="#">
              <ChevronRight size={13} className="text-white/50" /> Ochrana údajů
            </a>
            <a className="hover:underline underline-offset-4 w-fit flex items-center gap-2" href="#">
              <ChevronRight size={13} className="text-white/50" /> Compliance
            </a>
            <a
              className="hover:underline underline-offset-4 w-fit flex items-center gap-2"
              href="https://www.alpsalpine.com"
              target="_blank"
              rel="noreferrer"
            >
              <ChevronRight size={13} className="text-white/50" /> www.alpsalpine.com
            </a>
          </div>
        </div>
        <div className="border-t border-white/15">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-4 text-[10px] text-white/50">
            © 2026 Alps Alpine Co., Ltd. Všechna práva vyhrazena.
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── sdílené drobnosti ─────────────────────────────────────────────── */

function DarkToggle({ dark, toggleDark }: { dark: boolean; toggleDark: () => void }) {
  return (
    <button
      className="p-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-900/5 dark:hover:bg-white/5 rounded-xl transition-colors"
      onClick={toggleDark}
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
  );
}

function UserBadge() {
  return (
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
  );
}

function FooterLinks() {
  return (
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
  );
}
