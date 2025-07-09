
import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { DownloadIcon } from '../../assets/icons';

export const SettingsView: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">تنظیمات</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GlassCard>
          <h2 className="text-xl font-semibold text-white mb-4">عملیات‌ها</h2>
          <div className="space-y-4">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full flex justify-between items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <span>دانلود فایل اکسل خام محصولات</span>
              <DownloadIcon className="w-5 h-5 text-green-400" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full flex justify-between items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <span>پشتیبان‌گیری از دیتابیس</span>
              <DownloadIcon className="w-5 h-5 text-green-400" />
            </motion.button>
          </div>
        </GlassCard>
        
        <GlassCard>
          <h2 className="text-xl font-semibold text-white mb-4">پروفایل کاربری</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <img src="https://picsum.photos/seed/user/100/100" alt="Profile" className="w-20 h-20 rounded-full border-2 border-green-400" />
              <div>
                <h3 className="font-semibold text-lg">مدیر سیستم</h3>
                <button className="text-sm text-blue-400 hover:underline">تغییر تصویر</button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">رمز عبور فعلی</label>
              <input type="password" className="w-full p-2 bg-white/10 rounded-md border border-white/20" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">رمز عبور جدید</label>
              <input type="password" className="w-full p-2 bg-white/10 rounded-md border border-white/20" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">تکرار رمز عبور جدید</label>
              <input type="password" className="w-full p-2 bg-white/10 rounded-md border border-white/20" />
            </div>
            <div className="pt-2">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 transition-all">
                ذخیره تغییرات
              </motion.button>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
