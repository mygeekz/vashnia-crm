
import React from 'react';
import { motion } from 'framer-motion';
import { View } from '../types';
import { DashboardIcon, ProductIcon, CategoryIcon, OrderIcon, CustomerIcon, ReportIcon, TicketIcon, SettingsIcon, LogoutIcon, VoshniaLogo } from '../assets/icons';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  onLogout: () => void;
}

const navItems = [
  { id: 'dashboard', label: 'داشبورد', icon: DashboardIcon },
  { id: 'products', label: 'مدیریت محصولات', icon: ProductIcon },
  { id: 'categories', label: 'دسته‌بندی‌ها', icon: CategoryIcon },
  { id: 'orders', label: 'مدیریت سفارش‌ها', icon: OrderIcon },
  { id: 'customers', label: 'مشتریان و شعب', icon: CustomerIcon },
  { id: 'reports', label: 'گزارش‌ها', icon: ReportIcon },
  { id: 'tickets', label: 'تیکت‌ها', icon: TicketIcon },
  { id: 'settings', label: 'تنظیمات', icon: SettingsIcon },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, onLogout }) => {
  return (
    <aside className="w-64 h-screen p-4 flex flex-col justify-between bg-gray-900/30 backdrop-blur-xl border-l border-white/10">
      <div>
        <div className="flex items-center gap-3 mb-10 px-2">
          <VoshniaLogo className="w-12 h-12 text-green-400" />
          <div>
            <h1 className="text-xl font-bold text-white">بازرگانی وش نیا</h1>
            <p className="text-xs text-gray-400">پنل مدیریت CRM</p>
          </div>
        </div>
        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentView(item.id as View)}
                  className={`flex items-center w-full p-3 my-1 rounded-lg transition-all duration-300 ${
                    currentView === item.id
                      ? 'bg-green-500/20 text-green-300 border-r-4 border-green-400'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5 ml-4" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div>
         <button
          onClick={onLogout}
          className="flex items-center w-full p-3 my-1 rounded-lg transition-colors duration-300 text-gray-400 hover:bg-red-500/20 hover:text-red-300"
        >
          <LogoutIcon className="w-5 h-5 ml-4" />
          <span className="font-medium">خروج از حساب</span>
        </button>
      </div>
    </aside>
  );
};
