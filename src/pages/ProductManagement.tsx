import { useState } from 'react';
<<<<<<< HEAD
=======
import { ArrowLeft, Edit2, Archive, ArchiveRestore } from 'lucide-react';
>>>>>>> cc155ab (app done)
import {
  useAllProducts,
  addProduct,
  updateProduct,
  archiveProduct,
  unarchiveProduct,
} from '../hooks/useProducts';
import type { Product } from '../types/models';

<<<<<<< HEAD
=======
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950';

>>>>>>> cc155ab (app done)
export default function ProductManagement() {
  const products = useAllProducts();

  const [itemNumber, setItemNumber] = useState('');
  const [description, setDescription] = useState('');
  const [unit, setUnit] = useState('');
  const [department, setDepartment] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
<<<<<<< HEAD
=======
  const [showArchived, setShowArchived] = useState(false);
>>>>>>> cc155ab (app done)

  function resetForm() {
    setItemNumber('');
    setDescription('');
    setUnit('');
    setDepartment('');
    setEditingId(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!itemNumber || !description || !unit || !department) return;

    if (editingId !== null) {
      await updateProduct(editingId, { itemNumber, description, unit, department });
    } else {
      await addProduct({ itemNumber, description, unit, department });
    }
    resetForm();
  }

  function startEdit(product: Product) {
    setEditingId(product.id!);
    setItemNumber(product.itemNumber);
    setDescription(product.description);
    setUnit(product.unit);
    setDepartment(product.department);
  }

<<<<<<< HEAD
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Products</h1>

      <form onSubmit={handleSubmit} className="space-y-2 mb-6 border-b pb-4">
        <input
          className="w-full border rounded p-2"
          placeholder="Item number"
          value={itemNumber}
          onChange={(e) => setItemNumber(e.target.value)}
        />
        <input
          className="w-full border rounded p-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="w-full border rounded p-2"
          placeholder="Unit (e.g. Box, Pack)"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />
        <input
          className="w-full border rounded p-2"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <div className="flex gap-2">
          <button type="submit" className="bg-black text-white px-4 py-2 rounded">
            {editingId !== null ? 'Save changes' : 'Add product'}
          </button>
          {editingId !== null && (
            <button type="button" onClick={resetForm} className="px-4 py-2 rounded border">
              Cancel
            </button>
          )}
        </div>
      </form>

      <ul className="space-y-2">
        {products?.map((product) => (
          <li
            key={product.id}
            className={`border rounded p-3 flex justify-between items-center ${
              product.archived ? 'opacity-50' : ''
            }`}
          >
            <div>
              <p className="font-medium">
                {product.itemNumber} — {product.description}
              </p>
              <p className="text-sm text-gray-500">
                {product.unit} · {product.department}
                {product.archived && ' · Archived'}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(product)} className="text-sm underline">
                Edit
              </button>
              {product.archived ? (
                <button
                  onClick={() => unarchiveProduct(product.id!)}
                  className="text-sm underline"
                >
                  Unarchive
                </button>
              ) : (
                <button
                  onClick={() => archiveProduct(product.id!)}
                  className="text-sm underline text-red-600"
                >
                  Archive
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
=======
  const activeProducts = products?.filter(p => !p.archived) || [];
  const archivedProducts = products?.filter(p => p.archived) || [];

  const displayedProducts = showArchived ? archivedProducts : activeProducts;

  return (
    <div className="min-h-screen w-full bg-black flex justify-center selection:bg-zinc-800">
      <div className="w-full max-w-md min-h-screen flex flex-col relative pb-28">
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl px-5 py-5 border-b border-zinc-900/50">
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.history.back()}
              className={`p-2 -ml-2 rounded-full text-zinc-400 hover:text-white transition-colors flex items-center gap-1 ${FOCUS_RING}`}
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-bold text-white tracking-tight">Products</h1>
            <div className="w-8" /> {/* Spacer */}
          </div>
        </div>

        <div className="flex-1 px-5 pt-6">
          {/* Add / Edit Form */}
          <form 
            onSubmit={handleSubmit} 
            className="bg-zinc-900/40 border border-zinc-900 rounded-[2rem] p-5 mb-8"
          >
            <h2 className="text-[15px] font-bold text-white uppercase tracking-wider mb-5">
              {editingId !== null ? 'Edit Product' : 'Add New Product'}
            </h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="itemNumber" className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
                  Item Number
                </label>
                <input
                  id="itemNumber"
                  className="w-full bg-zinc-950 border border-zinc-850 rounded-[1.25rem] px-4 py-3 text-white placeholder-zinc-600 focus:border-zinc-700 outline-none text-sm transition-all"
                  placeholder="e.g. WH-00123"
                  value={itemNumber}
                  onChange={(e) => setItemNumber(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
                  Description
                </label>
                <input
                  id="description"
                  className="w-full bg-zinc-950 border border-zinc-850 rounded-[1.25rem] px-4 py-3 text-white placeholder-zinc-600 focus:border-zinc-700 outline-none text-sm transition-all"
                  placeholder="Product description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="unit" className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
                    Unit
                  </label>
                  <input
                    id="unit"
                    className="w-full bg-zinc-950 border border-zinc-850 rounded-[1.25rem] px-4 py-3 text-white placeholder-zinc-600 focus:border-zinc-700 outline-none text-sm transition-all"
                    placeholder="Box, Pack, Each..."
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="department" className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
                    Department
                  </label>
                  <input
                    id="department"
                    className="w-full bg-zinc-950 border border-zinc-850 rounded-[1.25rem] px-4 py-3 text-white placeholder-zinc-600 focus:border-zinc-700 outline-none text-sm transition-all"
                    placeholder="Stores, Kitchen..."
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2.5 mt-6">
              <button
                type="submit"
                className={`flex-1 bg-white text-zinc-950 font-bold py-3.5 rounded-2xl text-xs tracking-wide active:scale-95 transition-all ${FOCUS_RING}`}
              >
                {editingId !== null ? 'Save Changes' : 'Add Product'}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  onClick={resetForm}
                  className={`px-5 bg-zinc-900 border border-zinc-850 text-zinc-400 hover:text-white rounded-2xl text-xs font-semibold tracking-wide transition-colors ${FOCUS_RING}`}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* Toggle Section */}
          <div className="flex items-center justify-between mb-4 px-1">
            <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">
              {showArchived ? 'Archived Products' : 'Active Products'} ({displayedProducts.length})
            </p>
            <button
              onClick={() => setShowArchived(!showArchived)}
              className={`text-xs text-blue-400 font-semibold hover:text-blue-300 transition-colors ${FOCUS_RING}`}
            >
              {showArchived ? 'Show Active' : 'Show Archived'}
            </button>
          </div>

          {/* Products List */}
          <div className="space-y-3 pb-8">
            {displayedProducts.map((product) => (
              <div
                key={product.id}
                className={`bg-zinc-900/40 border border-zinc-900 rounded-[2rem] p-5 transition-all ${
                  product.archived ? 'opacity-70' : ''
                }`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <span className="font-mono text-xs text-zinc-500 font-bold uppercase tracking-wider block mb-1">
                      {product.itemNumber}
                    </span>
                    <p className="text-[15px] font-semibold text-white leading-snug">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-500 uppercase tracking-wider mt-3">
                      <span>{product.unit}</span>
                      <span>•</span>
                      <span>{product.department}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => startEdit(product)}
                      className={`flex items-center gap-1.5 bg-zinc-900/80 border border-zinc-850/80 text-blue-400 hover:text-blue-300 px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-colors ${FOCUS_RING}`}
                    >
                      <Edit2 size={12} />
                      Edit
                    </button>

                    {product.archived ? (
                      <button
                        onClick={() => unarchiveProduct(product.id!)}
                        className={`flex items-center gap-1.5 bg-zinc-900/80 border border-zinc-850/80 text-emerald-400 hover:text-emerald-300 px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-colors ${FOCUS_RING}`}
                      >
                        <ArchiveRestore size={12} />
                        Unarchive
                      </button>
                    ) : (
                      <button
                        onClick={() => archiveProduct(product.id!)}
                        className={`flex items-center gap-1.5 bg-zinc-900/80 border border-zinc-850/80 text-red-400 hover:text-red-300 px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-colors ${FOCUS_RING}`}
                      >
                        <Archive size={12} />
                        Archive
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {displayedProducts.length === 0 && (
              <div className="text-center py-16 text-zinc-500">
                <p className="text-base font-semibold text-zinc-400">
                  {showArchived ? 'No archived products' : 'No products yet'}
                </p>
                <p className="text-xs mt-1 text-zinc-600 font-mono uppercase tracking-wider">
                  {showArchived ? 'Archive is empty' : 'Use the form to add items'}
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
>>>>>>> cc155ab (app done)
    </div>
  );
}