import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useActiveProducts } from '../hooks/useProducts';
import { useCurrentRequest } from '../hooks/useCurrentRequest';
import AddProductModal from '../components/AddProductModal';
import type { RequestType } from '../types/models';

export default function AddItems() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, dispatch } = useCurrentRequest();
  const products = useActiveProducts();

  const [search, setSearch] = useState('');
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [showAddProduct, setShowAddProduct] = useState(false);

  // On first load, pick up the type passed from Home (or keep existing state if already set)
  useEffect(() => {
    const incomingType = (location.state as { type?: RequestType } | null)?.type;
    if (incomingType && state.type !== incomingType) {
      dispatch({
        type: 'START_REQUEST',
        payload: { requestType: incomingType, department: '' },
      });
    }
  }, [location.state]); // eslint-disable-line react-hooks/exhaustive-deps

  const filteredProducts = products?.filter((p) =>
    p.description.toLowerCase().includes(search.toLowerCase()) ||
    p.itemNumber.toLowerCase().includes(search.toLowerCase())
  );

  function handleAdd(productId: number) {
    const product = products?.find((p) => p.id === productId);
    const quantity = quantities[productId] || 1;
    if (!product) return;

    dispatch({
      type: 'ADD_ITEM',
      payload: {
        productId: product.id!,
        itemNumber: product.itemNumber,
        description: product.description,
        unit: product.unit,
        quantity,
      },
    });

    // reset that product's quantity input after adding
    setQuantities((q) => ({ ...q, [productId]: 1 }));
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-bold">
          {state.type === 'Urgent' ? 'Urgent Request' : 'Bulk Request'}
        </h1>
        <span className="text-sm text-gray-500">{state.items.length} item(s) added</span>
      </div>

      <input
        className="w-full border rounded p-2 mb-3"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul className="space-y-2 mb-4">
        {filteredProducts?.map((product) => (
          <li key={product.id} className="border rounded p-3 flex justify-between items-center">
            <div>
              <p className="font-medium">{product.description}</p>
              <p className="text-xs text-gray-500">
                {product.itemNumber} · {product.unit}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor={`qty-${product.id}`} className="sr-only">
                Quantity for {product.description}
              </label>
              <input
                id={`qty-${product.id}`}
                type="number"
                min={1}
                className="w-16 border rounded p-1 text-center"
                value={quantities[product.id!] ?? 1}
                onChange={(e) =>
                  setQuantities((q) => ({ ...q, [product.id!]: Number(e.target.value) }))
                }
              />
              <button
                onClick={() => handleAdd(product.id!)}
                className="bg-black text-white px-3 py-1 rounded text-sm"
              >
                Add
              </button>
            </div>
          </li>
        ))}

        {filteredProducts?.length === 0 && (
          <li className="text-sm text-gray-500 text-center py-4">
            No products found.{' '}
            <button
              onClick={() => setShowAddProduct(true)}
              className="underline text-black"
            >
              Add a new product
            </button>
          </li>
        )}
      </ul>

      {filteredProducts && filteredProducts.length > 0 && (
        <button
          onClick={() => setShowAddProduct(true)}
          className="text-sm underline mb-4"
        >
          Can't find it? Add a new product
        </button>
      )}

      <button
        onClick={() => navigate('/review')}
        disabled={state.items.length === 0}
        className="w-full bg-black text-white rounded p-3 disabled:opacity-40"
      >
        Review Request ({state.items.length})
      </button>

      {showAddProduct && (
        <AddProductModal onClose={() => setShowAddProduct(false)} />
      )}
    </div>
  );
}