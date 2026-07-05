import { useEffect, useState } from 'react';

export interface Announcement {
  id: number;
  title: string;
  body: string;
  category: string;
  image: string | null;
  date: string;
  pinned: number;
  views: number;
}

export interface CompanyEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
}

export interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  location: string;
}

export interface QuickLink {
  id: number;
  label: string;
  url: string;
  category: 'system' | 'app';
  icon: string;
  description: string | null;
}

export interface CanteenDay {
  day: number;
  soup: string;
  mains: string[];
}

// Demo režim bez API serveru (GitHub Pages): data jsou zabalená v buildu.
const STATIC_DATA = import.meta.env.VITE_STATIC_DATA === 'true';

export function useApi<T>(url: string): { data: T | null; loading: boolean; error: string | null } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    if (STATIC_DATA) {
      import('./staticData')
        .then(({ staticResolve }) => {
          if (!cancelled) setData(staticResolve(url) as T);
        })
        .catch((err: Error) => {
          if (!cancelled) setError(err.message);
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
      return () => {
        cancelled = true;
      };
    }
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<T>;
      })
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}

export function formatDateCz(iso: string): string {
  return new Date(iso).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' });
}
