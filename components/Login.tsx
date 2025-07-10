import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { VoshniaLogo } from '../assets/icons';
import { API_BASE } from '@/constants';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [mobile,   setMobile]   = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');

  /* ارسال فرم لاگین */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile, password })
    })
      .then(async (res) => {
        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg || 'خطا در ورود');
        }
        /* بررسی Content-Type */
        const ct = res.headers.get('content-type') || '';
        if (!ct.includes('application/json')) {
          const txt = await res.text();
          throw new Error(`Unexpected response: ${txt}`);
        }
        return res.json();
      })
      .then(({ token }) => {
        localStorage.setItem('token', token);
        onLogin();               // هدایت به داشبورد
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md p-8 space-y-8 bg-gray-700/10 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10"
      >
        {/* لوگو و تیتر */}
        <div className="text-center">
          <VoshniaLogo className="w-24 h-24 mx-auto text-green-400" />
          <h2 className="mt-6 text-3xl font-bold text-white">بازرگانی وش نیا</h2>
          <p className="mt-2 text-sm text-gray-300">ورود به پنل مدیریت</p>
        </div>

        {/* فرم ورود */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px">
            <input
              type="tel"
              required
              placeholder="شماره موبایل"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="rounded-t-md w-full px-3 py-3 bg-gray-900/50 border border-gray-500/50 placeholder-gray-400 text-white focus:ring-green-500 focus:border-green-500"
            />
            <input
              type="password"
              required
              placeholder="رمز عبور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-b-md w-full px-3 py-3 bg-gray-900/50 border-t-0 border border-gray-500/50 placeholder-gray-400 text-white focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {error && <p className="text-sm text-red-400 text-center">{error}</p>}

          <div className="flex justify-end text-sm">
            <a href="#" className="text-green-400 hover:text-green-300">
              فراموشی رمز عبور
            </a>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 bg-green-600 rounded-md text-white font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500"
          >
            ورود
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
