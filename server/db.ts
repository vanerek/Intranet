import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, 'data');
fs.mkdirSync(dataDir, { recursive: true });

export const db = new Database(path.join(dataDir, 'intranet.db'));
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS announcements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    category TEXT NOT NULL,
    image TEXT,
    date TEXT NOT NULL,
    pinned INTEGER NOT NULL DEFAULT 0,
    views INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    location TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    position TEXT NOT NULL,
    department TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    location TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    label TEXT NOT NULL,
    url TEXT NOT NULL,
    category TEXT NOT NULL,
    icon TEXT NOT NULL,
    description TEXT
  );

  CREATE TABLE IF NOT EXISTS canteen (
    day INTEGER PRIMARY KEY,
    soup TEXT NOT NULL,
    mains TEXT NOT NULL
  );
`);

function isoDaysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

function isoDaysAhead(days: number): string {
  return isoDaysAgo(-days);
}

export function seedIfEmpty() {
  const count = db.prepare('SELECT COUNT(*) AS n FROM announcements').get() as { n: number };
  if (count.n > 0) return;

  const insertAnnouncement = db.prepare(
    'INSERT INTO announcements (title, body, category, image, date, pinned, views) VALUES (?, ?, ?, ?, ?, ?, ?)'
  );
  const announcements: [string, string, string, string | null, string, number, number][] = [
    [
      'Celozávodní dovolená 2026 – termíny',
      'Vedení společnosti schválilo termíny celozávodní dovolené pro rok 2026. Letní odstávka proběhne od 27. 7. do 7. 8. 2026, zimní od 21. 12. 2026 do 1. 1. 2027. Prosíme, plánujte si dovolenou s ohledem na tyto termíny.',
      'HR', 'https://picsum.photos/seed/vacation/800/400', isoDaysAgo(1), 1, 843,
    ],
    [
      'Spuštění nového intranetu',
      'Vítejte na novém firemním intranetu ALPS ALPINE. Najdete zde aktuality, adresář zaměstnanců, jídelníček závodní kantýny a rychlý přístup do všech firemních systémů. Připomínky a náměty posílejte na IT helpdesk.',
      'IT', 'https://picsum.photos/seed/intranet/800/400', isoDaysAgo(2), 1, 1245,
    ],
    [
      'Odstávka SAP – plánovaná údržba',
      'V sobotu proběhne plánovaná údržba systému SAP ERP. Systém bude nedostupný od 22:00 do 04:00. Výrobní systémy MES nebudou odstávkou dotčeny.',
      'IT', null, isoDaysAgo(3), 0, 412,
    ],
    [
      'Výsledky Q1 – překročili jsme plán',
      'Závod ALCZ překročil plán prvního čtvrtletí o 6 %. Děkujeme všem zaměstnancům za skvělou práci. Podrobné výsledky představí vedení na čtvrtletním setkání.',
      'Firma', 'https://picsum.photos/seed/results/800/400', isoDaysAgo(5), 0, 967,
    ],
    [
      'Nová linka SMT-4 v hale B',
      'V hale B byla uvedena do provozu nová osazovací linka SMT-4. Linka zvyšuje kapacitu osazování o 20 % a je určena především pro projekty automotive displejů.',
      'Výroba', 'https://picsum.photos/seed/smt/800/400', isoDaysAgo(8), 0, 654,
    ],
    [
      'Zdravotní dny – prevence na pracovišti',
      'Ve dnech 15.–16. 7. proběhnou v areálu zdravotní dny. Na programu je měření tlaku, zraku a konzultace fyzioterapeuta. Registrace na HR portálu.',
      'HR', null, isoDaysAgo(10), 0, 328,
    ],
    [
      'Sběr elektroodpadu a udržitelnost',
      'V rámci programu udržitelnosti byl v areálu rozšířen sběr tříděného odpadu o elektroodpad. Sběrné boxy najdete u vrátnice a v hale A.',
      'Firma', null, isoDaysAgo(14), 0, 201,
    ],
  ];
  for (const a of announcements) insertAnnouncement.run(...a);

  const insertEvent = db.prepare('INSERT INTO events (title, date, time, location) VALUES (?, ?, ?, ?)');
  const events: [string, string, string, string][] = [
    ['Čtvrtletní setkání se zaměstnanci', isoDaysAhead(3), '14:00 – 15:30', 'Jídelna / MS Teams'],
    ['Odstávka SAP (údržba)', isoDaysAhead(5), '22:00 – 04:00', 'Globální'],
    ['Zdravotní dny', isoDaysAhead(10), '08:00 – 16:00', 'Zasedačka A1'],
    ['Školení BOZP – noví zaměstnanci', isoDaysAhead(12), '09:00 – 12:00', 'Školicí středisko'],
    ['Rodinný den ALPS ALPINE', isoDaysAhead(30), '10:00 – 17:00', 'Areál závodu'],
  ];
  for (const e of events) insertEvent.run(...e);

  const insertEmployee = db.prepare(
    'INSERT INTO employees (name, position, department, email, phone, location) VALUES (?, ?, ?, ?, ?, ?)'
  );
  const employees: [string, string, string, string, string, string][] = [
    ['Petr Svoboda', 'Ředitel závodu', 'Vedení', 'psvoboda@alps.cz', '+420 461 100 101', 'Budova A / 1. patro'],
    ['Jana Dvořáková', 'HR manažerka', 'HR', 'jdvorakova@alps.cz', '+420 461 100 120', 'Budova A / přízemí'],
    ['Martin Novotný', 'Vedoucí IT', 'IT', 'mnovotny@alps.cz', '+420 461 100 140', 'Budova A / 2. patro'],
    ['Lucie Procházková', 'Specialistka náboru', 'HR', 'lprochazkova@alps.cz', '+420 461 100 121', 'Budova A / přízemí'],
    ['Tomáš Krejčí', 'Vedoucí výroby – hala A', 'Výroba', 'tkrejci@alps.cz', '+420 461 100 210', 'Hala A'],
    ['Eva Marková', 'Vedoucí kvality', 'Kvalita', 'emarkova@alps.cz', '+420 461 100 230', 'Budova B / 1. patro'],
    ['Jiří Beneš', 'Procesní inženýr SMT', 'Inženýring', 'jbenes@alps.cz', '+420 461 100 245', 'Hala B'],
    ['Kateřina Veselá', 'Účetní', 'Finance', 'kvesela@alps.cz', '+420 461 100 150', 'Budova A / 2. patro'],
    ['Pavel Horák', 'Vedoucí logistiky', 'Logistika', 'phorak@alps.cz', '+420 461 100 260', 'Sklad / expedice'],
    ['Michal Urban', 'IT podpora / helpdesk', 'IT', 'murban@alps.cz', '+420 461 100 141', 'Budova A / 2. patro'],
    ['Veronika Šimková', 'Plánovačka výroby', 'Logistika', 'vsimkova@alps.cz', '+420 461 100 261', 'Budova B / přízemí'],
    ['David Fiala', 'Technik údržby', 'Údržba', 'dfiala@alps.cz', '+420 461 100 280', 'Hala A'],
  ];
  for (const emp of employees) insertEmployee.run(...emp);

  const insertLink = db.prepare(
    'INSERT INTO links (label, url, category, icon, description) VALUES (?, ?, ?, ?, ?)'
  );
  const links: [string, string, string, string, string][] = [
    ['SAP ERP', 'https://sap.example.alps.cz', 'system', 'database', 'Podnikový systém – nákup, sklady, finance'],
    ['MES Výroba', 'https://mes.example.alps.cz', 'system', 'cpu', 'Řízení a sledování výroby'],
    ['WMS Logistika', 'https://wms.example.alps.cz', 'system', 'truck', 'Skladový systém'],
    ['HR Portál', 'https://hr.example.alps.cz', 'app', 'badge-check', 'Výplatní pásky, dovolené, benefity'],
    ['Docházka', 'https://dochazka.example.alps.cz', 'app', 'fingerprint', 'Docházkový systém'],
    ['IT Helpdesk', 'https://helpdesk.example.alps.cz', 'app', 'headphones', 'Hlášení požadavků a závad IT'],
    ['MS Teams', 'https://teams.microsoft.com', 'app', 'monitor', 'Firemní komunikace'],
    ['Objednávka obědů', 'https://jidelna.example.alps.cz', 'app', 'utensils', 'Objednávkový systém kantýny'],
  ];
  for (const l of links) insertLink.run(...l);

  const insertCanteen = db.prepare('INSERT INTO canteen (day, soup, mains) VALUES (?, ?, ?)');
  const menu: [number, string, string[]][] = [
    [1, 'Hovězí vývar s nudlemi', ['Svíčková na smetaně, houskový knedlík', 'Kuřecí steak s grilovanou zeleninou', 'Zeleninové rizoto s parmazánem (veg.)']],
    [2, 'Česnečka s krutony', ['Vepřový guláš, chléb', 'Smažený sýr, brambory, tatarka', 'Bulgur se zeleninou a cizrnou (veg.)']],
    [3, 'Rajská polévka s rýží', ['Kuře na paprice, těstoviny', 'Pečená krkovice, špenát, knedlík', 'Zapečené brambory s brokolicí (veg.)']],
    [4, 'Zelňačka', ['Hovězí roštěná, rýže', 'Kuřecí řízek, bramborová kaše', 'Čočka na kyselo, vejce (veg.)']],
    [5, 'Kulajda', ['Rybí filé na másle, brambory', 'Špagety boloňské', 'Smažený květák, brambory, tatarka (veg.)']],
  ];
  for (const [day, soup, mains] of menu) insertCanteen.run(day, soup, JSON.stringify(mains));
}
