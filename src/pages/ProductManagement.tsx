import { useState } from 'react';
import {
  useAllProducts,
  addProduct,
  updateProduct,
  archiveProduct,
  unarchiveProduct,
} from '../hooks/useProducts';
import type { Product } from '../types/models';

export default function ProductManagement() {
  const products = useAllProducts();

  const [itemNumber, setItemNumber] = useState('');
  const [description, setDescription] = useState('');
  const [unit, setUnit] = useState('');
  const [department, setDepartment] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

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
    </div>
  );
}