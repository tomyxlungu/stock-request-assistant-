import { useState } from 'react';
import { addProduct } from '../hooks/useProducts';

interface AddProductModalProps {
  onClose: () => void;
}

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
          </div>
        </form>
      </div>
    </div>
  );
}