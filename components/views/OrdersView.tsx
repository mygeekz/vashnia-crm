
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MOCK_ORDERS } from '../../constants';
import { Order, OrderStatus } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { GlassTable, GlassTableRow, GlassTableCell } from '../ui/GlassTable';
import { SearchIcon } from '../../assets/icons';

export const OrdersView: React.FC = () => {
  const [orders] = useState<Order[]>(MOCK_ORDERS);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.New:
        return 'bg-blue-500/20 text-blue-300';
      case OrderStatus.Confirmed:
        return 'bg-yellow-500/20 text-yellow-300';
      case OrderStatus.Shipped:
        return 'bg-green-500/20 text-green-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">مدیریت سفارش‌ها</h1>
      </div>
      
      <GlassCard>
        <GlassTable headers={['شماره سفارش', 'نام شعبه/مشتری', 'تاریخ ثبت', 'وضعیت', 'جزئیات']}>
          {orders.map(order => (
            <GlassTableRow key={order.id}>
              <GlassTableCell className="font-mono">{order.id}</GlassTableCell>
              <GlassTableCell className="font-medium text-white">{order.customerName}</GlassTableCell>
              <GlassTableCell>{order.date}</GlassTableCell>
              <GlassTableCell>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </GlassTableCell>
              <GlassTableCell>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-3 py-1 text-sm rounded-md bg-white/10 hover:bg-white/20 transition-colors">
                  مشاهده
                </motion.button>
              </GlassTableCell>
            </GlassTableRow>
          ))}
        </GlassTable>
      </GlassCard>
    </div>
  );
};
