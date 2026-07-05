import React from 'react';
import type { Design, Page } from '../lib/nav';
import DashboardAurora from './dashboard/Aurora';
import DashboardEditorial from './dashboard/Editorial';
import DashboardNeo from './dashboard/Neo';

export default function Dashboard({ navigate, design }: { navigate: (page: Page) => void; design: Design }) {
  if (design === 'editorial') return <DashboardEditorial navigate={navigate} />;
  if (design === 'neo') return <DashboardNeo navigate={navigate} />;
  return <DashboardAurora navigate={navigate} />;
}
