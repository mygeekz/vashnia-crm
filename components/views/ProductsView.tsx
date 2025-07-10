import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, ProductStatus } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { GlassTable, GlassTableCell } from '../ui/GlassTable';
import { PlusIcon, EditIcon, DeleteIcon, SearchIcon, DownloadIcon } from '../../assets/icons';

const API_BASE = '/api';                      // آدرس بک‌اند

/* ────────── Modal افزودن / ویرایش ────────── */
const ProductModal: React.FC<{
  product: Partial<Product> | null;
  onClose: () => void;
  onSave: (p: Product) => void;
}> = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Product>>(
    product || { name: '', category: '', status: ProductStatus.Available }
  );

  if (!product) return null;

  const handleSave = () => {
    const id = product.id || `VSH-${Math.floor(Math.random() * 900) + 100}`;
    onSave({ id, ...(formData as Product) });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <GlassCard>
          <h2 className="text-xl font-bold mb-4">
            {product.id ? 'ویرایش محصول' : 'افزودن محصول جدید'}
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="نام محصول"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 bg-white/10 rounded-md border border-white/20 focus:ring-green-500 focus:border-green-500"
            />

            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full p-2 bg-white/10 rounded-md border border-white/20 focus:ring-green-500 focus:border-green-500 text-white"
            >
              <option className="bg-gray-800" value="">
                انتخاب دسته‌بندی
              </option>
              <option className="bg-gray-800" value="آجیل">
                آجیل
              </option>
              <option className="bg-gray-800" value="خشکبار">
                خشکبار
              </option>
              <option className="bg-gray-800" value="برنج">
                برنج
              </option>
              <option className="bg-gray-800" value="شکلات">
                شکلات
              </option>
              <option className="bg-gray-800" value="تنقلات">
                تنقلات
              </option>
            </select>

            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  checked={formData.status === ProductStatus.Available}
                  onChange={() =>
                    setFormData({ ...formData, status: ProductStatus.Available })
                  }
                  className="form-radio text-green-500 bg-gray-700"
                />
                <span>موجود</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  checked={formData.status === ProductStatus.Unavailable}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      status: ProductStatus.Unavailable,
                    })
                  }
                  className="form-radio text-red-500 bg-gray-700"
                />
                <span>ناموجود</span>
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-md bg-gray-500/50 hover:bg-gray-500/80 transition-colors"
              >
                لغو
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 transition-colors"
              >
                ذخیره محصول
              </motion.button>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};

/* ────────── صفحهٔ اصلی محصولات ────────── */
export const ProductsView: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] =
    useState<Partial<Product> | null>(null);

  /* دریافت از API */
  useEffect(() => {
    fetch(`${API_BASE}/products`)
      .then((r) => r.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  /* جستجوی محلی */
  const filteredProducts = useMemo(
    () =>
      products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [products, searchTerm]
  );

  /* ذخیره (POST یا PUT) */
  const handleSave = (productToSave: Product) => {
    const method = products.some((p) => p.id === productToSave.id)
      ? 'PUT'
      : 'POST';

    fetch(
      `${API_BASE}/products${method === 'PUT' ? '/' + productToSave.id : ''}`,
      {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productToSave),
      }
    )
      .then((r) => r.json())
      .then((saved) => {
        setProducts((prev) => {
          const exists = prev.some((p) => p.id === saved.id);
          return exists
            ? prev.map((p) => (p.id === saved.id ? saved : p))
            : [saved, ...prev];
        });
        setEditingProduct(null);
      })
      .catch(console.error);
  };

  /* حذف */
  const handleDelete = (id: string) => {
    fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' })
      .then(() => setProducts((prev) => prev.filter((p) => p.id !== id)))
      .catch(console.error);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">مدیریت محصولات</h1>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-yellow-600/80 rounded-lg hover:bg-yellow-700"
          >
            <DownloadIcon className="w-4 h-4" />
            افزودن گروهی (اکسل)
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setEditingProduct({})}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
          >
            <PlusIcon className="w-5 h-5" />
            افزودن محصول
          </motion.button>
        </div>
      </div>

      <GlassCard>
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="جستجوی سریع محصولات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pr-10 bg-white/10 rounded-md border border-white/20 focus:ring-green-500 focus:border-green-500"
            />
            <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <GlassTable
          headers={['کد محصول', 'نام محصول', 'دسته‌بندی', 'وضعیت', 'عملیات']}
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.tr
                key={product.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white/5 border-b border-white/10 hover:bg-white/20 transition-colors"
              >
                <GlassTableCell className="font-mono">
                  {product.id}
                </GlassTableCell>
                <GlassTableCell className="font-medium text-white">
                  {product.name}
                </GlassTableCell>
                <GlassTableCell>{product.category}</GlassTableCell>
                <GlassTableCell>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      product.status === ProductStatus.Available
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-red-500/20 text-red-300'
                    }`}
                  >
                    {product.status === ProductStatus.Available
                      ? 'موجود'
                      : 'ناموجود'}
                  </span>
                </GlassTableCell>
                <GlassTableCell>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setEditingProduct(product)}
                      className="text-yellow-400 hover:text-yellow-300"
                    >
                      <EditIcon className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(product.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <DeleteIcon className="w-5 h-5" />
                    </motion.button>
                  </div>
                </GlassTableCell>
              </motion.tr>
            ))}
          </AnimatePresence>
        </GlassTable>
      </GlassCard>

      <AnimatePresence>
        {editingProduct && (
          <ProductModal
            product={editingProduct}
            onClose={() => setEditingProduct(null)}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
