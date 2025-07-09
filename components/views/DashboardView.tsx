
import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { OrderIcon, ProductIcon, CustomerIcon } from '../../assets/icons';

const StatCard = ({ icon, title, value, color }: { icon: React.ElementType, title: string, value: string, color: string }) => {
  const Icon = icon;
  return (
    <GlassCard className="flex items-center p-4">
      <div className={`p-3 rounded-full bg-${color}-500/20 text-${color}-300`}>
        <Icon className="w-8 h-8" />
      </div>
      <div className="mr-4">
        <p className="text-lg font-semibold text-white">{value}</p>
        <p className="text-sm text-gray-400">{title}</p>
      </div>
    </GlassCard>
  );
};

export const DashboardView: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">داشبورد</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard icon={OrderIcon} title="سفارش‌های جدید" value="2" color="green" />
        <StatCard icon={ProductIcon} title="محصولات نیازمند شارژ" value="1" color="yellow" />
        <StatCard icon={CustomerIcon} title="کل مشتریان" value="154" color="blue" />
      </div>

      <div className="mt-8">
        <GlassCard>
          <h2 className="text-xl font-semibold text-white mb-4">آخرین فعالیت‌ها</h2>
          <ul className="space-y-4">
            <li className="flex items-center p-3 bg-white/5 rounded-lg">
              <span className="text-green-400 ml-3">ثبت سفارش</span>
              <span>سفارش جدیدی توسط شعبه تهران ثبت شد.</span>
              <span className="mr-auto text-xs text-gray-400">۵ دقیقه پیش</span>
            </li>
            <li className="flex items-center p-3 bg-white/5 rounded-lg">
              <span className="text-yellow-400 ml-3">ویرایش محصول</span>
              <span>محصول "پسته اکبری" ویرایش شد.</span>
              <span className="mr-auto text-xs text-gray-400">۱ ساعت پیش</span>
            </li>
            <li className="flex items-center p-3 bg-white/5 rounded-lg">
              <span className="text-blue-400 ml-3">مشتری جدید</span>
              <span>مشتری جدیدی با نام "رضا محمدی" اضافه شد.</span>
              <span className="mr-auto text-xs text-gray-400">۳ ساعت پیش</span>
            </li>
          </ul>
        </GlassCard>
      </div>
    </div>
  );
};
