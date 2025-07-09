
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { VoshniaLogo } from '../assets/icons';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md p-8 space-y-8 bg-gray-700/10 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10"
      >
        <div className="text-center">
          <VoshniaLogo className="w-24 h-24 mx-auto text-green-400" />
          <h2 className="mt-6 text-3xl font-bold text-center text-white">بازرگانی وش نیا</h2>
          <p className="mt-2 text-center text-sm text-gray-300">ورود به پنل مدیریت</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="mobile-number"
                name="mobile"
                type="tel"
                autoComplete="tel"
                required
                className="appearance-none rounded-t-md relative block w-full px-3 py-3 bg-gray-900/50 border border-gray-500/50 placeholder-gray-400 text-white focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all"
                placeholder="شماره موبایل"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-b-md relative block w-full px-3 py-3 bg-gray-900/50 border-t-0 border border-gray-500/50 placeholder-gray-400 text-white focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all"
                placeholder="رمز عبور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-green-400 hover:text-green-300 transition-colors">
                فراموشی رمز عبور
              </a>
            </div>
          </div>

          <div>
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0px 0px 12px rgba(34, 197, 94, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="group relative flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:ring-offset-gray-800 transition-all"
            >
              ورود
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
