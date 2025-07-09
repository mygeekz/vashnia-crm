
import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { DownloadIcon } from '../../assets/icons';

export const ReportsView: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">گزارش‌ها</h1>
      
      <GlassCard className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">ایجاد گزارش جدید</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">بازه زمانی</label>
            <select className="w-full p-2 bg-white/10 rounded-md border border-white/20 focus:ring-green-500 focus:border-green-500 text-white">
              <option className="bg-gray-800">ماه اخیر</option>
              <option className="bg-gray-800">۳ ماه اخیر</option>
              <option className="bg-gray-800">سال اخیر</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">دسته‌بندی محصولات</label>
            <select className="w-full p-2 bg-white/10 rounded-md border border-white/20 focus:ring-green-500 focus:border-green-500 text-white">
              <option className="bg-gray-800">همه</option>
              <option className="bg-gray-800">آجیل</option>
              <option className="bg-gray-800">خشکبار</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">شعبه/مشتری</label>
            <select className="w-full p-2 bg-white/10 rounded-md border border-white/20 focus:ring-green-500 focus:border-green-500 text-white">
              <option className="bg-gray-800">همه</option>
              <option className="bg-gray-800">شعبه تهران</option>
              <option className="bg-gray-800">شعبه اصفهان</option>
            </select>
          </div>
          <div className="self-end">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 transition-all">
              ایجاد گزارش
            </motion.button>
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">نتایج گزارش</h2>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600/80 border border-transparent rounded-lg hover:bg-blue-700 transition-all">
            <DownloadIcon className="w-4 h-4"/>
            دانلود اکسل
          </motion.button>
        </div>
        <div className="text-center py-10 text-gray-400">
          <p>برای مشاهده نتایج، یک گزارش ایجاد کنید.</p>
        </div>
      </GlassCard>
    </div>
  );
};
