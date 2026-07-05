// Statická ukázková data pro build bez API serveru (GitHub Pages / demo).
// Obsahově zrcadlí seed v server/db.ts; aktivuje se proměnnou VITE_STATIC_DATA=true.
import type { Announcement, CompanyEvent, Employee, QuickLink, CanteenDay } from './api';

function isoDaysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

const announcements: Announcement[] = [
  {
    id: 1,
    title: 'Celozávodní dovolená 2026 – termíny',
    body: 'Vedení společnosti schválilo termíny celozávodní dovolené pro rok 2026. Letní odstávka proběhne od 27. 7. do 7. 8. 2026, zimní od 21. 12. 2026 do 1. 1. 2027. Prosíme, plánujte si dovolenou s ohledem na tyto termíny.',
    category: 'HR',
    image: 'https://picsum.photos/seed/vacation/800/400',
    date: isoDaysAgo(1),
    pinned: 1,
    views: 843,
  },
  {
    id: 2,
    title: 'Spuštění nového intranetu',
    body: 'Vítejte na novém firemním intranetu ALPS ALPINE. Najdete zde aktuality, adresář zaměstnanců, jídelníček závodní kantýny a rychlý přístup do všech firemních systémů. Připomínky a náměty posílejte na IT helpdesk.',
    category: 'IT',
    image: 'https://picsum.photos/seed/intranet/800/400',
    date: isoDaysAgo(2),
    pinned: 1,
    views: 1245,
  },
  {
    id: 3,
    title: 'Odstávka SAP – plánovaná údržba',
    body: 'V sobotu proběhne plánovaná údržba systému SAP ERP. Systém bude nedostupný od 22:00 do 04:00. Výrobní systémy MES nebudou odstávkou dotčeny.',
    category: 'IT',
    image: null,
    date: isoDaysAgo(3),
    pinned: 0,
    views: 412,
  },
  {
    id: 4,
    title: 'Výsledky Q1 – překročili jsme plán',
    body: 'Závod ALCZ překročil plán prvního čtvrtletí o 6 %. Děkujeme všem zaměstnancům za skvělou práci. Podrobné výsledky představí vedení na čtvrtletním setkání.',
    category: 'Firma',
    image: 'https://picsum.photos/seed/results/800/400',
    date: isoDaysAgo(5),
    pinned: 0,
    views: 967,
  },
  {
    id: 5,
    title: 'Nová linka SMT-4 v hale B',
    body: 'V hale B byla uvedena do provozu nová osazovací linka SMT-4. Linka zvyšuje kapacitu osazování o 20 % a je určena především pro projekty automotive displejů.',
    category: 'Výroba',
    image: 'https://picsum.photos/seed/smt/800/400',
    date: isoDaysAgo(8),
    pinned: 0,
    views: 654,
  },
  {
    id: 6,
    title: 'Zdravotní dny – prevence na pracovišti',
    body: 'Ve dnech 15.–16. 7. proběhnou v areálu zdravotní dny. Na programu je měření tlaku, zraku a konzultace fyzioterapeuta. Registrace na HR portálu.',
    category: 'HR',
    image: null,
    date: isoDaysAgo(10),
    pinned: 0,
    views: 328,
  },
  {
    id: 7,
    title: 'Sběr elektroodpadu a udržitelnost',
    body: 'V rámci programu udržitelnosti byl v areálu rozšířen sběr tříděného odpadu o elektroodpad. Sběrné boxy najdete u vrátnice a v hale A.',
    category: 'Firma',
    image: null,
    date: isoDaysAgo(14),
    pinned: 0,
    views: 201,
  },
];

const events: CompanyEvent[] = [
  { id: 1, title: 'Čtvrtletní setkání se zaměstnanci', date: isoDaysAgo(-3), time: '14:00 – 15:30', location: 'Jídelna / MS Teams' },
  { id: 2, title: 'Odstávka SAP (údržba)', date: isoDaysAgo(-5), time: '22:00 – 04:00', location: 'Globální' },
  { id: 3, title: 'Zdravotní dny', date: isoDaysAgo(-10), time: '08:00 – 16:00', location: 'Zasedačka A1' },
  { id: 4, title: 'Školení BOZP – noví zaměstnanci', date: isoDaysAgo(-12), time: '09:00 – 12:00', location: 'Školicí středisko' },
  { id: 5, title: 'Rodinný den ALPS ALPINE', date: isoDaysAgo(-30), time: '10:00 – 17:00', location: 'Areál závodu' },
];

const employees: Employee[] = [
  { id: 1, name: 'Petr Svoboda', position: 'Ředitel závodu', department: 'Vedení', email: 'psvoboda@alps.cz', phone: '+420 461 100 101', location: 'Budova A / 1. patro' },
  { id: 2, name: 'Jana Dvořáková', position: 'HR manažerka', department: 'HR', email: 'jdvorakova@alps.cz', phone: '+420 461 100 120', location: 'Budova A / přízemí' },
  { id: 3, name: 'Martin Novotný', position: 'Vedoucí IT', department: 'IT', email: 'mnovotny@alps.cz', phone: '+420 461 100 140', location: 'Budova A / 2. patro' },
  { id: 4, name: 'Lucie Procházková', position: 'Specialistka náboru', department: 'HR', email: 'lprochazkova@alps.cz', phone: '+420 461 100 121', location: 'Budova A / přízemí' },
  { id: 5, name: 'Tomáš Krejčí', position: 'Vedoucí výroby – hala A', department: 'Výroba', email: 'tkrejci@alps.cz', phone: '+420 461 100 210', location: 'Hala A' },
  { id: 6, name: 'Eva Marková', position: 'Vedoucí kvality', department: 'Kvalita', email: 'emarkova@alps.cz', phone: '+420 461 100 230', location: 'Budova B / 1. patro' },
  { id: 7, name: 'Jiří Beneš', position: 'Procesní inženýr SMT', department: 'Inženýring', email: 'jbenes@alps.cz', phone: '+420 461 100 245', location: 'Hala B' },
  { id: 8, name: 'Kateřina Veselá', position: 'Účetní', department: 'Finance', email: 'kvesela@alps.cz', phone: '+420 461 100 150', location: 'Budova A / 2. patro' },
  { id: 9, name: 'Pavel Horák', position: 'Vedoucí logistiky', department: 'Logistika', email: 'phorak@alps.cz', phone: '+420 461 100 260', location: 'Sklad / expedice' },
  { id: 10, name: 'Michal Urban', position: 'IT podpora / helpdesk', department: 'IT', email: 'murban@alps.cz', phone: '+420 461 100 141', location: 'Budova A / 2. patro' },
  { id: 11, name: 'Veronika Šimková', position: 'Plánovačka výroby', department: 'Logistika', email: 'vsimkova@alps.cz', phone: '+420 461 100 261', location: 'Budova B / přízemí' },
  { id: 12, name: 'David Fiala', position: 'Technik údržby', department: 'Údržba', email: 'dfiala@alps.cz', phone: '+420 461 100 280', location: 'Hala A' },
];

const links: QuickLink[] = [
  { id: 1, label: 'SAP ERP', url: 'https://sap.example.alps.cz', category: 'system', icon: 'database', description: 'Podnikový systém – nákup, sklady, finance' },
  { id: 2, label: 'MES Výroba', url: 'https://mes.example.alps.cz', category: 'system', icon: 'cpu', description: 'Řízení a sledování výroby' },
  { id: 3, label: 'WMS Logistika', url: 'https://wms.example.alps.cz', category: 'system', icon: 'truck', description: 'Skladový systém' },
  { id: 4, label: 'HR Portál', url: 'https://hr.example.alps.cz', category: 'app', icon: 'badge-check', description: 'Výplatní pásky, dovolené, benefity' },
  { id: 5, label: 'Docházka', url: 'https://dochazka.example.alps.cz', category: 'app', icon: 'fingerprint', description: 'Docházkový systém' },
  { id: 6, label: 'IT Helpdesk', url: 'https://helpdesk.example.alps.cz', category: 'app', icon: 'headphones', description: 'Hlášení požadavků a závad IT' },
  { id: 7, label: 'MS Teams', url: 'https://teams.microsoft.com', category: 'app', icon: 'monitor', description: 'Firemní komunikace' },
  { id: 8, label: 'Objednávka obědů', url: 'https://jidelna.example.alps.cz', category: 'app', icon: 'utensils', description: 'Objednávkový systém kantýny' },
];

const canteen: CanteenDay[] = [
  { day: 1, soup: 'Hovězí vývar s nudlemi', mains: ['Svíčková na smetaně, houskový knedlík', 'Kuřecí steak s grilovanou zeleninou', 'Zeleninové rizoto s parmazánem (veg.)'] },
  { day: 2, soup: 'Česnečka s krutony', mains: ['Vepřový guláš, chléb', 'Smažený sýr, brambory, tatarka', 'Bulgur se zeleninou a cizrnou (veg.)'] },
  { day: 3, soup: 'Rajská polévka s rýží', mains: ['Kuře na paprice, těstoviny', 'Pečená krkovice, špenát, knedlík', 'Zapečené brambory s brokolicí (veg.)'] },
  { day: 4, soup: 'Zelňačka', mains: ['Hovězí roštěná, rýže', 'Kuřecí řízek, bramborová kaše', 'Čočka na kyselo, vejce (veg.)'] },
  { day: 5, soup: 'Kulajda', mains: ['Rybí filé na másle, brambory', 'Špagety boloňské', 'Smažený květák, brambory, tatarka (veg.)'] },
];

/** Zodpoví stejné URL jako Express API, jen nad daty zabalenými v buildu. */
export function staticResolve(url: string): unknown {
  const u = new URL(url, 'http://static.local');
  const params = u.searchParams;

  switch (u.pathname) {
    case '/api/announcements': {
      const category = params.get('category');
      let result = announcements.filter((a) => !category || category === 'all' || a.category === category);
      result = [...result].sort((a, b) => b.pinned - a.pinned || b.date.localeCompare(a.date));
      const limit = params.get('limit');
      if (limit) result = result.slice(0, Number(limit));
      return result;
    }
    case '/api/announcements/categories':
      return [...new Set(announcements.map((a) => a.category))].sort((a, b) => a.localeCompare(b, 'cs'));
    case '/api/events': {
      const today = new Date().toISOString().slice(0, 10);
      const limit = Number(params.get('limit') ?? 20);
      return events
        .filter((e) => e.date >= today)
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(0, limit);
    }
    case '/api/employees': {
      const q = (params.get('q') ?? '').toLowerCase();
      const department = params.get('department');
      return employees
        .filter(
          (e) =>
            (!q ||
              e.name.toLowerCase().includes(q) ||
              e.position.toLowerCase().includes(q) ||
              e.email.toLowerCase().includes(q)) &&
            (!department || department === 'all' || e.department === department)
        )
        .sort((a, b) => a.name.localeCompare(b.name, 'cs'));
    }
    case '/api/employees/departments':
      return [...new Set(employees.map((e) => e.department))].sort((a, b) => a.localeCompare(b, 'cs'));
    case '/api/links':
      return links;
    case '/api/canteen':
      return canteen;
    default:
      throw new Error(`Neznámá cesta: ${u.pathname}`);
  }
}
