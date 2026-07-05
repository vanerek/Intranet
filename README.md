# ALPS ALPINE Intranet

Moderní firemní intranet pro zaměstnance ALPS ALPINE (ALCZ). Obsahuje nástěnku s aktualitami a firemním kalendářem, adresář zaměstnanců s vyhledáváním, týdenní jídelníček kantýny a rozcestník firemních systémů a aplikací.

## Technologie

- **Frontend:** React 19 + TypeScript, Vite, Tailwind CSS 4, lucide-react, motion
- **Backend:** Express + better-sqlite3 (SQLite databáze se automaticky vytvoří a naplní ukázkovými daty při prvním spuštění)

## Spuštění pro vývoj

**Požadavky:** Node.js 20+

1. Instalace závislostí:
   ```
   npm install
   ```
2. Spuštění API serveru (port 3001):
   ```
   npm run dev:api
   ```
3. V druhém terminálu spuštění frontendu (port 3000, požadavky na `/api` proxuje na API server):
   ```
   npm run dev
   ```
4. Otevřete http://localhost:3000

## Produkční build

```
npm run build   # sestaví frontend do dist/
npm start       # spustí Express server, který servíruje API i frontend z dist/
```

## Struktura

| Cesta | Popis |
| --- | --- |
| `server/index.ts` | Express API server (aktuality, události, zaměstnanci, odkazy, jídelníček) |
| `server/db.ts` | Schéma SQLite databáze a ukázková data |
| `src/App.tsx` | Aplikační shell – navigace, tmavý režim, hash routing |
| `src/pages/` | Jednotlivé stránky (nástěnka, aktuality, adresář, jídelníček, systémy) |
| `src/components/ui.tsx` | Sdílené UI komponenty |
| `src/lib/api.ts` | Typy API a hook pro načítání dat |

Databáze se ukládá do `server/data/intranet.db` (v gitu ignorováno). Pro nové naplnění ukázkovými daty stačí soubor smazat a restartovat server.

## Kontrola typů

```
npm run lint
```
