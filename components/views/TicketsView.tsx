
import React, { useState } from 'react';
import { MOCK_TICKETS } from '../../constants';
import { Ticket, TicketStatus } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { GlassTable, GlassTableRow, GlassTableCell } from '../ui/GlassTable';
import { PlusIcon } from '../../assets/icons';
import { motion } from 'framer-motion';


export const TicketsView: React.FC = () => {
    const [tickets] = useState<Ticket[]>(MOCK_TICKETS);

    const getStatusColor = (status: TicketStatus) => {
        switch (status) {
          case TicketStatus.Open:
            return 'bg-green-500/20 text-green-300';
          case TicketStatus.InProgress:
            return 'bg-yellow-500/20 text-yellow-300';
          case TicketStatus.Closed:
            return 'bg-red-500/20 text-red-300';
          default:
            return 'bg-gray-500/20 text-gray-300';
        }
      };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">تیکت‌ها</h1>
                 <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 transition-all">
                    <PlusIcon className="w-5 h-5" />
                    تیکت جدید
                </motion.button>
            </div>
            
            <GlassCard>
                <div className="flex justify-end mb-4">
                    <select className="p-2 bg-white/10 rounded-md border border-white/20 focus:ring-green-500 focus:border-green-500 text-white text-sm">
                        <option className="bg-gray-800" value="">فیلتر بر اساس دپارتمان</option>
                        <option className="bg-gray-800" value="فنی">فنی</option>
                        <option className="bg-gray-800" value="فروش">فروش</option>
                        <option className="bg-gray-800" value="مالی">مالی</option>
                    </select>
                </div>
                <GlassTable headers={['کد تیکت', 'عنوان', 'دپارتمان', 'وضعیت', 'آخرین بروزرسانی']}>
                    {tickets.map(ticket => (
                        <GlassTableRow key={ticket.id}>
                            <GlassTableCell className="font-mono">{ticket.id}</GlassTableCell>
                            <GlassTableCell className="font-medium text-white">{ticket.title}</GlassTableCell>
                            <GlassTableCell>{ticket.department}</GlassTableCell>
                            <GlassTableCell>
                                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(ticket.status)}`}>
                                    {ticket.status}
                                </span>
                            </GlassTableCell>
                            <GlassTableCell>{ticket.lastUpdate}</GlassTableCell>
                        </GlassTableRow>
                    ))}
                </GlassTable>
            </GlassCard>
        </div>
    );
};
