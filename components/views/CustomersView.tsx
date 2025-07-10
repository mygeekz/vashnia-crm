import React, { useState, useEffect } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { GlassTable, GlassTableCell } from '../ui/GlassTable';
import { Customer } from '../../types';
import { SearchIcon } from '../../assets/icons';

const API_BASE = '/api';

export const CustomersView: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/clients`)
      .then(r => r.json())
      .then(setCustomers)
      .catch(console.error);
  }, []);

  const filtered = customers.filter(c =>
    (c.name + c.phone + c.id)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-white">مشتریان و شعبات</h1>

      <GlassCard>
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-full max-w-sm">
            <input
              className="w-full p-2 pr-10 bg-white/10 rounded-md border border-white/20 focus:ring-green-500 focus:border-green-500"
              placeholder="جستجو…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <GlassTable headers={['کد', 'نام', 'تلفن', 'آدرس', 'تاریخ عضویت']}>
          {filtered.map(c => (
            <tr key={c.id} className="bg-white/5 border-b border-white/10">
              <GlassTableCell className="font-mono">{c.id}</GlassTableCell>
              <GlassTableCell>{c.name}</GlassTableCell>
              <GlassTableCell>{c.phone}</GlassTableCell>
              <GlassTableCell>{c.address}</GlassTableCell>
              <GlassTableCell>{c.joinDate}</GlassTableCell>
            </tr>
          ))}
        </GlassTable>
      </GlassCard>
    </div>
  );
};
