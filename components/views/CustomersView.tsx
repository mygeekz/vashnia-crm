
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MOCK_CUSTOMERS } from '../../constants';
import { Customer } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { GlassTable, GlassTableRow, GlassTableCell } from '../ui/GlassTable';
import { PlusIcon } from '../../assets/icons';

export const CustomersView: React.FC = () => {
  const [customers] = useState<Customer[]>(MOCK_CUSTOMERS);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">مدیریت شعبات و مشتریان</h1>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 transition-all">
          <PlusIcon className="w-5 h-5" />
          افزودن مشتری/شعبه
        </motion.button>
      </div>
      
      <GlassCard>
        <GlassTable headers={['نام', 'شماره تماس', 'آدرس', 'تاریخ عضویت']}>
          {customers.map(customer => (
            <GlassTableRow key={customer.id}>
              <GlassTableCell className="font-medium text-white">{customer.name}</GlassTableCell>
              <GlassTableCell className="font-mono text-left" dir="ltr">{customer.phone}</GlassTableCell>
              <GlassTableCell>{customer.address}</GlassTableCell>
              <GlassTableCell>{customer.joinDate}</GlassTableCell>
            </GlassTableRow>
          ))}
        </GlassTable>
      </GlassCard>
    </div>
  );
};
