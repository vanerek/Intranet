import React from 'react';
import { 
  Bell, 
  Settings, 
  Info, 
  Globe, 
  BarChart3, 
  BadgeCheck, 
  Monitor, 
  Building2, 
  ShieldCheck, 
  Stethoscope, 
  Headphones, 
  Newspaper, 
  Calendar, 
  Database, 
  Cpu, 
  Truck, 
  Cloud, 
  Fingerprint, 
  MapPin, 
  Clock, 
  CloudSun,
  ChevronRight,
  MoreHorizontal,
  ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden selection:bg-accent/30">
      {/* Header */}
      <header className="sticky-nav px-4 md:px-10 py-3">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <h2 className="text-primary dark:text-white text-2xl font-black leading-none tracking-tighter uppercase italic">ALPS ALPINE</h2>
                <span className="text-[10px] font-bold text-primary dark:text-slate-400 uppercase italic tracking-wider ml-1">extends your senses</span>
              </div>
            </div>
          </div>
          
          <nav className="hidden xl:flex items-center gap-8">
            <a className="text-accent text-sm font-semibold border-b-2 border-accent pb-1" href="#">Dashboard</a>
            <a className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-accent transition-colors" href="#">Directory</a>
            <a className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-accent transition-colors" href="#">Global News</a>
            <a className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-accent transition-colors" href="#">HR & Benefits</a>
            <a className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-accent transition-colors" href="#">Support</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
            <button className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <Settings size={20} />
            </button>
            <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1"></div>
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-none">John Doe</p>
                <p className="text-[10px] text-slate-500 font-medium">Operations Manager</p>
              </div>
              <div 
                className="size-10 rounded-full bg-slate-200 border-2 border-accent/20 bg-cover bg-center" 
                style={{ backgroundImage: "url('https://picsum.photos/seed/user123/100/100')" }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1440px] mx-auto w-full p-6 grid grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <aside className="col-span-12 lg:col-span-3 flex flex-col gap-6">
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm"
          >
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Global Information</h3>
            <nav className="flex flex-col gap-1">
              <SidebarLink icon={<Info size={18} />} label="ALCZ General Info" active />
              <SidebarLink icon={<Globe size={18} />} label="Global Links" />
              <SidebarLink icon={<BarChart3 size={18} />} label="Corporate Strategy" />
              <SidebarLink icon={<BadgeCheck size={18} />} label="HR Portal" />
              <SidebarLink icon={<Monitor size={18} />} label="IT Support Desk" />
              <SidebarLink icon={<Building2 size={18} />} label="Facilities & Logistics" />
            </nav>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm"
          >
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Contacts</h3>
            <div className="flex flex-col gap-4">
              <ContactItem 
                icon={<ShieldCheck className="text-accent" size={18} />} 
                title="Facility Security" 
                subtitle="Ext: 9911 (Emergency)" 
                bgColor="bg-accent/10"
              />
              <ContactItem 
                icon={<Stethoscope className="text-green-600" size={18} />} 
                title="Medical Center" 
                subtitle="Ext: 4455 • Bld C" 
                bgColor="bg-green-500/10"
              />
              <ContactItem 
                icon={<Headphones className="text-amber-600" size={18} />} 
                title="Global IT Helpdesk" 
                subtitle="24/7 Available" 
                bgColor="bg-amber-500/10"
              />
            </div>
          </motion.section>
        </aside>

        {/* Center Content */}
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-6">
          <motion.section 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm"
          >
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Newspaper className="text-accent" size={20} />
                Announcements
              </h2>
              <a className="text-xs font-bold text-accent hover:underline" href="#">View Archive</a>
            </div>
            <div className="p-6 flex flex-col gap-6">
              <div className="group cursor-pointer">
                <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="bg-accent text-white text-[10px] font-black px-2 py-1 rounded uppercase mb-2 inline-block">Global Event</span>
                    <h3 className="text-white font-bold text-xl">Annual General Meeting 2024</h3>
                  </div>
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
                    style={{ backgroundImage: "url('https://picsum.photos/seed/meeting/800/400')" }}
                  ></div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-2">Join our leadership team for a comprehensive review of the 2023 performance and the strategic roadmap for the upcoming fiscal year.</p>
                <div className="flex items-center gap-4 text-[11px] text-slate-400 font-medium">
                  <span className="flex items-center gap-1"><Calendar size={14} /> March 15, 2024</span>
                  <span className="flex items-center gap-1"><Monitor size={14} /> 1.2k views</span>
                </div>
              </div>
              
              <div className="h-[1px] bg-slate-100 dark:bg-slate-800"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <NewsCard 
                  image="https://picsum.photos/seed/eco/400/300"
                  title="Sustainability Initiatives"
                  desc="New environmental impact report released for all EU facilities."
                />
                <NewsCard 
                  image="https://picsum.photos/seed/market/400/300"
                  title="Q1 Market Update"
                  desc="Analyzing global trends and our quarterly performance metrics."
                />
              </div>
            </div>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
          >
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="text-accent" size={20} />
                Company Calendar
              </h2>
              <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
                <MoreHorizontal className="text-slate-500" size={20} />
              </button>
            </div>
            <div className="p-0">
              <div className="flex flex-col">
                <CalendarItem month="Mar" day="18" title="Quarterly Town Hall" time="14:00 - 15:30 • MS Teams" />
                <CalendarItem month="Mar" day="21" title="System Maintenance (SAP)" time="22:00 - 04:00 • Global" />
              </div>
              <div className="p-4 bg-slate-50/50 dark:bg-slate-800/20 text-center">
                <button className="text-xs font-bold text-slate-500 hover:text-accent uppercase tracking-wider">Sync with my Outlook</button>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Right Sidebar */}
        <aside className="col-span-12 lg:col-span-3 flex flex-col gap-6">
          <motion.section 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm"
          >
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Global Systems</h3>
            <div className="grid grid-cols-1 gap-3">
              <SystemButton icon={<Database size={18} />} label="SAP ERP" dark />
              <SystemButton icon={<Cpu size={18} />} label="MES Production" darkSecondary />
              <SystemButton icon={<Truck size={18} />} label="WMS Logistics" />
              <SystemButton icon={<Cloud size={18} />} label="Workday HR" />
            </div>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm"
          >
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Applications</h3>
            <div className="flex flex-col gap-2">
              <AppLink icon={<Cpu size={18} />} label="MES" />
              <AppLink icon={<BadgeCheck size={18} />} label="HR Portal" />
              <AppLink icon={<Fingerprint size={18} />} label="Attendance" />
            </div>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm"
          >
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Clock size={14} />
              World Clocks
            </h3>
            <div className="flex flex-col gap-4">
              <WorldClock city="Prague, CZ" date="14 Mar, 2024" time="09:42" label="Local Time" />
              <WorldClock city="Tokyo, JP" date="14 Mar, 2024" time="17:42" label="+8 Hours" />
              <WorldClock city="McAllen, US" date="14 Mar, 2024" time="02:42" label="-7 Hours" last />
            </div>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-200 dark:bg-slate-800 rounded-xl p-5 shadow-inner mt-auto"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase">Local Facility</p>
                <h4 className="text-sm font-black text-slate-900 dark:text-white">Prague, CZ</h4>
              </div>
              <div className="text-right">
                <CloudSun className="text-accent inline-block mb-1" size={20} />
                <p className="text-sm font-bold text-slate-900 dark:text-white">12°C</p>
              </div>
            </div>
          </motion.section>
        </aside>
      </main>

      {/* Footer */}
      <footer className="mt-12 w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 opacity-50 grayscale">
            <Building2 size={24} />
            <span className="font-black text-sm uppercase tracking-tighter">Alps Alpine Co., Ltd.</span>
          </div>
          <div className="flex gap-8 text-[11px] font-medium text-slate-500 uppercase tracking-widest">
            <a className="hover:text-accent transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-accent transition-colors" href="#">Terms of Use</a>
            <a className="hover:text-accent transition-colors" href="#">Compliance</a>
            <a className="hover:text-accent transition-colors" href="#">Corporate Site</a>
          </div>
          <p className="text-[10px] text-slate-400">© 2024 Alps Alpine. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function SidebarLink({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <a 
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
        active 
          ? 'bg-accent/10 text-accent font-semibold' 
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
      }`} 
      href="#"
    >
      {icon}
      <span className="text-sm">{label}</span>
    </a>
  );
}

function ContactItem({ icon, title, subtitle, bgColor }: { icon: React.ReactNode, title: string, subtitle: string, bgColor: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`size-8 rounded-full ${bgColor} flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-slate-900 dark:text-white">{title}</p>
        <p className="text-[10px] text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}

function NewsCard({ image, title, desc }: { image: string, title: string, desc: string }) {
  return (
    <div className="flex flex-col gap-3 group cursor-pointer">
      <div 
        className="h-32 w-full rounded-lg bg-cover bg-center border border-slate-100 dark:border-slate-800 group-hover:opacity-90 transition-opacity" 
        style={{ backgroundImage: `url('${image}')` }}
      ></div>
      <div>
        <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-accent transition-colors">{title}</h4>
        <p className="text-xs text-slate-500 line-clamp-2 mt-1">{desc}</p>
      </div>
    </div>
  );
}

function CalendarItem({ month, day, title, time }: { month: string, day: string, title: string, time: string }) {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
      <div className="flex flex-col items-center justify-center min-w-[50px] h-[50px] bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <span className="text-[10px] font-bold text-slate-500 uppercase">{month}</span>
        <span className="text-lg font-black text-slate-900 dark:text-white leading-none">{day}</span>
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{title}</h4>
        <p className="text-xs text-slate-500 flex items-center gap-1">
          <Clock size={12} /> {time}
        </p>
      </div>
      <ChevronRight className="text-slate-300 group-hover:text-accent transition-colors" size={20} />
    </div>
  );
}

function SystemButton({ icon, label, dark = false, darkSecondary = false }: { icon: React.ReactNode, label: string, dark?: boolean, darkSecondary?: boolean }) {
  let baseClass = "flex items-center justify-between w-full p-4 rounded-lg transition-all group border";
  let colorClass = "bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700";
  
  if (dark) {
    colorClass = "bg-slate-900 text-white border-transparent hover:bg-accent";
  } else if (darkSecondary) {
    colorClass = "bg-slate-800 text-white border-transparent hover:bg-accent";
  }

  return (
    <button className={`${baseClass} ${colorClass}`}>
      <div className="flex items-center gap-3">
        {icon}
        <span className={`${dark || darkSecondary ? 'font-black tracking-tight' : 'font-bold'}`}>{label}</span>
      </div>
      <ExternalLink className="group-hover:translate-x-1 transition-transform" size={14} />
    </button>
  );
}

function AppLink({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <a className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700" href="#">
      <div className="text-accent">{icon}</div>
      <span className="text-sm font-semibold">{label}</span>
    </a>
  );
}

function WorldClock({ city, date, time, label, last = false }: { city: string, date: string, time: string, label: string, last?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${!last ? 'border-b border-slate-100 dark:border-slate-800 pb-3' : ''}`}>
      <div className="flex items-center gap-3">
        <MapPin className="text-slate-400" size={16} />
        <div>
          <p className="text-xs font-bold text-slate-900 dark:text-white">{city}</p>
          <p className="text-[10px] text-slate-500">{date}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-black text-accent">{time}</p>
        <p className="text-[9px] text-slate-400 font-medium">{label}</p>
      </div>
    </div>
  );
}
