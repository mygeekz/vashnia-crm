
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { GlassTable, GlassTableRow, GlassTableCell } from '../ui/GlassTable';
import { PlusIcon, EditIcon, DeleteIcon } from '../../assets/icons';

interface Category {
    id: number;
    name: string;
    productCount: number;
}

const MOCK_CATEGORIES: Category[] = [
    { id: 1, name: 'آجیل', productCount: 15 },
    { id: 2, name: 'خشکبار', productCount: 22 },
    { id: 3, name: 'برنج', productCount: 5 },
    { id: 4, name: 'شکلات', productCount: 30 },
    { id: 5, name: 'تنقلات', productCount: 18 },
];

export const CategoryView: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");

    const handleAddCategory = () => {
        if(newCategoryName.trim() !== "") {
            const newCategory: Category = {
                id: Math.max(...categories.map(c => c.id)) + 1,
                name: newCategoryName,
                productCount: 0,
            };
            setCategories([newCategory, ...categories]);
            setNewCategoryName("");
            setIsModalOpen(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">مدیریت دسته‌بندی‌ها</h1>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 transition-all">
                    <PlusIcon className="w-5 h-5" />
                    افزودن دسته‌بندی
                </motion.button>
            </div>
            
            <GlassCard>
                <GlassTable headers={['نام دسته‌بندی', 'تعداد محصولات', 'عملیات']}>
                  <AnimatePresence>
                    {categories.map(cat => (
                      <motion.tr
                        key={cat.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-white/5 border-b border-white/10 hover:bg-white/20 transition-colors duration-200"
                      >
                          <GlassTableCell className="font-medium text-white">{cat.name}</GlassTableCell>
                          <GlassTableCell>{cat.productCount}</GlassTableCell>
                          <GlassTableCell>
                            <div className="flex gap-3">
                              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-yellow-400 hover:text-yellow-300"><EditIcon className="w-5 h-5"/></motion.button>
                              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-red-400 hover:text-red-300"><DeleteIcon className="w-5 h-5"/></motion.button>
                            </div>
                          </GlassTableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </GlassTable>
            </GlassCard>

            <AnimatePresence>
              {isModalOpen && (
                 <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <motion.div
                      initial={{ y: -50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 50, opacity: 0 }}
                      className="w-full max-w-md"
                      onClick={e => e.stopPropagation()}
                    >
                      <GlassCard>
                          <h2 className="text-xl font-bold mb-4">افزودن دسته‌بندی جدید</h2>
                          <input 
                            type="text" 
                            placeholder="نام دسته‌بندی" 
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            className="w-full p-2 bg-white/10 rounded-md border border-white/20 focus:ring-green-500 focus:border-green-500"
                          />
                          <div className="flex justify-end gap-3 pt-4 mt-2">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-md bg-gray-500/50 hover:bg-gray-500/80 transition-colors">لغو</button>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleAddCategory} className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 transition-colors">افزودن</motion.button>
                          </div>
                      </GlassCard>
                    </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
        </div>
    );
};
