import React, { useState } from 'react';
import { Search, Mail, Phone, MapPin } from 'lucide-react';
import { useApi, type Employee } from '../lib/api';
import { Card, Loading, ErrorBox } from '../components/ui';

export default function Directory() {
  const [query, setQuery] = useState('');
  const [department, setDepartment] = useState('all');
  const departments = useApi<string[]>('/api/employees/departments');
  const employees = useApi<Employee[]>(
    `/api/employees?q=${encodeURIComponent(query)}&department=${encodeURIComponent(department)}`
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white tracking-tight pt-2">
          Adresář zaměstnanců
        </h1>
        <div className="flex gap-3 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Hledat jméno, pozici, e-mail…"
              className="glass pl-9 pr-4 py-2.5 rounded-xl text-sm w-64 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 transition-shadow"
            />
          </div>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="glass px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 transition-shadow dark:[&>option]:bg-slate-900"
          >
            <option value="all">Všechna oddělení</option>
            {departments.data?.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {employees.loading && <Loading />}
      {employees.error && <ErrorBox message={employees.error} />}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {employees.data?.map((emp, i) => (
          <Card key={emp.id} className="p-5" delay={Math.min(i * 0.03, 0.2)} hover>
            <div className="flex items-start gap-4">
              <div className="size-12 rounded-2xl bg-gradient-to-br from-accent to-accent-2 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-lg shadow-accent/20">
                {initials(emp.name)}
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-slate-900 dark:text-white">{emp.name}</h3>
                <p className="text-xs text-slate-500 mb-1">{emp.position}</p>
                <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded uppercase">
                  {emp.department}
                </span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2 text-xs text-slate-600 dark:text-slate-400">
              <a href={`mailto:${emp.email}`} className="flex items-center gap-2 hover:text-accent transition-colors truncate">
                <Mail size={14} className="shrink-0" /> {emp.email}
              </a>
              <a href={`tel:${emp.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone size={14} className="shrink-0" /> {emp.phone}
              </a>
              <span className="flex items-center gap-2">
                <MapPin size={14} className="shrink-0" /> {emp.location}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {employees.data?.length === 0 && (
        <p className="text-center text-slate-500 py-12">Nikdo nenalezen. Zkuste upravit hledání.</p>
      )}
    </div>
  );
}

function initials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('');
}
