import { useState } from 'react';
import { addProduct } from '../hooks/useProducts';

interface AddProductModalProps {
  onClose: () => void;
}

<<<<<<< HEAD
=======
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950';

>>>>>>> cc155ab (app done)
export default function AddProductModal({ onClose }: AddProductModalProps) {
  const [itemNumber, setItemNumber] = useState('');
  const [description, setDescription] = useState('');
  const [unit, setUnit] = useState('');
  const [department, setDepartment] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!itemNumber || !description || !unit || !department) return;

    await addProduct({ itemNumber, description, unit, department });
    onClose();
  }

<<<<<<< HEAD
  return (
    <div className="fixed inset-0 bg-black/40 flex items-end justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-t-xl p-4">
        <h2 className="text-lg font-bold mb-3">Add New Product</h2>

        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            className="w-full border rounded p-2"
            placeholder="Item number"
            value={itemNumber}
            onChange={(e) => setItemNumber(e.target.value)}
            autoFocus
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

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 bg-black text-white rounded p-2"
            >
              Add Product
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border rounded p-2"
            >
              Cancel
            </button>
=======
  // Dismiss sheet when tapping the backdrop
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-end justify-center z-50 transition-opacity duration-200"
    >
      <div className="bg-zinc-950 border-t border-zinc-900 w-full max-w-md rounded-t-[2.5rem] px-6 pt-3 pb-8 shadow-2xl will-change-transform">
        
        {/* Tactile Drag Handle */}
        <div className="w-10 h-1 bg-zinc-800 rounded-full mx-auto mb-6" />

        <div className="flex items-center justify-between mb-5 px-1">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">
            Add New Product
          </h2>
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest bg-zinc-900 px-2 py-1 rounded-md">
            Draft
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <div>
              <label htmlFor="modal-itemNumber" className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 ml-1">
                Item Number
              </label>
              <input
                id="modal-itemNumber"
                className="w-full bg-zinc-900/60 border border-zinc-850 rounded-[1.25rem] px-4 py-3 text-white placeholder-zinc-650 focus:border-zinc-700 outline-none text-sm transition-all"
                placeholder="e.g. WH-00123"
                value={itemNumber}
                onChange={(e) => setItemNumber(e.target.value)}
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="modal-description" className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 ml-1">
                Description
              </label>
              <input
                id="modal-description"
                className="w-full bg-zinc-900/60 border border-zinc-850 rounded-[1.25rem] px-4 py-3 text-white placeholder-zinc-650 focus:border-zinc-700 outline-none text-sm transition-all"
                placeholder="Product name or details"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="modal-unit" className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 ml-1">
                  Unit
                </label>
                <input
                  id="modal-unit"
                  className="w-full bg-zinc-900/60 border border-zinc-850 rounded-[1.25rem] px-4 py-3 text-white placeholder-zinc-650 focus:border-zinc-700 outline-none text-sm transition-all"
                  placeholder="e.g. Box, Pack, Each"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="modal-department" className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 ml-1">
                  Department
                </label>
                <input
                  id="modal-department"
                  className="w-full bg-zinc-900/60 border border-zinc-850 rounded-[1.25rem] px-4 py-3 text-white placeholder-zinc-650 focus:border-zinc-700 outline-none text-sm transition-all"
                  placeholder="Stores, Kitchen..."
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2.5 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 bg-zinc-905 border border-zinc-850 text-zinc-400 hover:text-white py-3.5 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all active:scale-[0.97] ${FOCUS_RING}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 bg-white text-zinc-950 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all active:scale-[0.97] ${FOCUS_RING}`}
            >
              Add Product
            </button>
>>>>>>> cc155ab (app done)
          </div>
        </form>
      </div>
    </div>
  );
}