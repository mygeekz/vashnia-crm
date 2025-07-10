import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { GlassTable, GlassTableCell } from '../ui/GlassTable';
import { Ticket, TicketStatus } from '../../types';
import { SearchIcon } from '../../assets/icons';

const API_BASE = '/api';

export const TicketsView: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/tickets`)
      .then(r => r.json())
      .then(setTickets)
      .catch(console.error);
  }, []);

  const filtered = tickets.filter(t =>
    (t.title + t.id + t.department)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-white">سیستم تیکت‌ها</h1>

      <GlassCard>
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-full max-w-sm">
            <input
              className="w-full p-2 pr-10 bg-white/10 rounded-md border border-white/20 focus:ring-green-500 focus:border-green-500"
              placeholder="جستجوی تیکت…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <GlassTable headers={['کد', 'عنوان', 'دپارتمان', 'وضعیت', 'آخرین بروزرسانی']}>
          <AnimatePresence>
            {filtered.map(t => (
              <motion.tr
                key={t.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white/5 border-b border-white/10"
              >
                <GlassTableCell className="font-mono">{t.id}</GlassTableCell>
                <GlassTableCell>{t.title}</GlassTableCell>
                <GlassTableCell>{t.department}</GlassTableCell>
                <GlassTableCell>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      t.status === TicketStatus.Closed
                        ? 'bg-green-500/20 text-green-300'
                        : t.status === TicketStatus.InProgress
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : 'bg-red-500/20 text-red-300'
                    }`}
                  >
                    {t.status}
                  </span>
                </GlassTableCell>
                <GlassTableCell>{t.lastUpdate}</GlassTableCell>
              </motion.tr>
            ))}
          </AnimatePresence>
        </GlassTable>
      </GlassCard>
    </div>
  );
};
