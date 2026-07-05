import { useEffect, useState } from 'react';

export function greeting(): string {
  const h = new Date().getHours();
  if (h < 9) return 'Dobré ráno';
  if (h < 12) return 'Dobré dopoledne';
  if (h < 18) return 'Dobré odpoledne';
  return 'Dobrý večer';
}

export const czMonths = ['led', 'úno', 'bře', 'dub', 'kvě', 'čvn', 'čvc', 'srp', 'zář', 'říj', 'lis', 'pro'];

export const zones = [
  { city: 'Sebranice, CZ', tz: 'Europe/Prague', label: 'Místní čas' },
  { city: 'Tokio, JP', tz: 'Asia/Tokyo', label: 'Centrála' },
  { city: 'McAllen, US', tz: 'America/Chicago', label: 'Závod USA' },
];

export function useNow(intervalMs = 30_000): Date {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);
  return now;
}

export function currentShift(): string {
  const h = new Date().getHours();
  if (h >= 6 && h < 14) return 'Ranní';
  if (h >= 14 && h < 22) return 'Odpolední';
  return 'Noční';
}
