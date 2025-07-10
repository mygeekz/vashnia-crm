import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Order, OrderStatus } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { GlassTable, GlassTableCell } from '../ui/GlassTable';
import { SearchIcon } from '../../assets/icons';

const API_BASE = '/api';

export const OrdersView: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState('');

  /* دریافت فهرست سفارش‌ها */
  useEffect(() => {
    fetch(`${API_BASE}/orders`)
      .then(r => r.json())
      .then(setOrders)
      .catch(console.error);
  }, []);

  const filtered = orders.filter(o =>
    (o.customerName + o.id)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-white">مدیریت سفارش‌ها</h1>

      <GlassCard>
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-full max-w-sm">
            <input
              className="w-full p-2 pr-10 bg-white/10 rounded-md border border-white/20 focus:ring-green-500 focus:border-green-500"
              placeholder="جستجو در سفارش‌ها…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <GlassTable headers={['کد سفارش', 'مشتری/شعبه', 'تاریخ', 'وضعیت']}>
          <AnimatePresence>
            {filtered.map(o => (
              <motion.tr
                key={o.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white/5 border-b border-white/10"
              >
                <GlassTableCell className="font-mono">{o.id}</GlassTableCell>
                <GlassTableCell>{o.customerName}</GlassTableCell>
                <GlassTableCell>{o.date}</GlassTableCell>
                <GlassTableCell>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      o.status === OrderStatus.Delivered
                        ? 'bg-green-500/20 text-green-300'
                        : o.status === OrderStatus.Shipped
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : 'bg-blue-500/20 text-blue-300'
                    }`}
                  >
                    {o.status}
                  </span>
                </GlassTableCell>
              </motion.tr>
            ))}
          </AnimatePresence>
        </GlassTable>
      </GlassCard>
    </div>
  );
};
