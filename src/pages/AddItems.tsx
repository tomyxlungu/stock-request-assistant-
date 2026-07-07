<<<<<<< HEAD
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useActiveProducts } from '../hooks/useProducts';
import { useCurrentRequest } from '../hooks/useCurrentRequest';
import AddProductModal from '../components/AddProductModal';
import type { RequestType } from '../types/models';

=======
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Search } from 'lucide-react';
import { useActiveProducts } from '../hooks/useProducts';
import { useCurrentRequest } from '../hooks/useCurrentRequest';
import AddProductModal from '../components/AddProductModal';
import type { RequestType, Product } from '../types/models';

// --- EXTRACTED COMPONENT FOR PERFORMANCE ---
// This isolates the quantity state so modifying one item doesn't re-render the whole list.
const ProductCard = React.memo(({ 
  product, 
  onAdd, 
  isJustAdded 
}: { 
  product: Product; 
  onAdd: (product: Product, quantity: number) => void;
  isJustAdded: boolean;
}) => {
  const [qty, setQty] = useState(1);

  const handleAddClick = () => {
    onAdd(product, qty);
    setQty(1); // Reset to default after adding
  };

  return (
    <div
      className={`group border rounded-3xl p-4 bg-zinc-900/60 transition-all duration-200 ${
        isJustAdded 
          ? 'border-emerald-500 bg-emerald-950/30' 
          : 'border-zinc-800 hover:border-zinc-600'
      }`}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <p className="font-medium text-white text-[17px] leading-tight tracking-[-0.01em]">
            {product.description}
          </p>
          <p className="text-xs text-zinc-500 mt-1 font-mono">
            {product.itemNumber} • {product.unit}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Quantity Controls */}
          <div className="flex items-center bg-zinc-950/80 border border-zinc-700 rounded-2xl px-1">
            <button
              type="button"
              aria-label={`Decrease quantity for ${product.description}`}
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-9 h-9 flex items-center justify-center text-zinc-400 hover:text-white active:scale-95 transition-transform"
            >
              −
            </button>

            <input
              type="number"
              min={1}
              aria-label={`Quantity of ${product.description}`}
              className="w-8 bg-transparent text-center text-white font-medium outline-none text-base"
              value={qty || ''}
              onFocus={(e) => e.target.select()} // Auto-selects text for easier mobile typing
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                setQty(isNaN(val) ? 1 : val);
              }}
            />

            <button
              type="button"
              aria-label={`Increase quantity for ${product.description}`}
              onClick={() => setQty((q) => q + 1)}
              className="w-9 h-9 flex items-center justify-center text-zinc-400 hover:text-white active:scale-95 transition-transform"
            >
              +
            </button>
          </div>

          {/* Add Button */}
          <button
            onClick={handleAddClick}
            className={`px-5 py-2.5 rounded-2xl font-medium text-sm transition-all active:scale-95 flex items-center justify-center min-w-[80px] ${
              isJustAdded
                ? 'bg-emerald-500 text-black'
                : 'bg-white text-black hover:bg-zinc-200'
            }`}
          >
            {isJustAdded ? '✓ Added' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
});

// --- MAIN COMPONENT ---
>>>>>>> cc155ab (app done)
export default function AddItems() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, dispatch } = useCurrentRequest();
  const products = useActiveProducts();

  const [search, setSearch] = useState('');
<<<<<<< HEAD
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [showAddProduct, setShowAddProduct] = useState(false);

  // On first load, pick up the type passed from Home (or keep existing state if already set)
=======
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [justAddedId, setJustAddedId] = useState<number | null>(null);

  // Sync request type from navigation state if present
>>>>>>> cc155ab (app done)
  useEffect(() => {
    const incomingType = (location.state as { type?: RequestType } | null)?.type;
    if (incomingType && state.type !== incomingType) {
      dispatch({
        type: 'START_REQUEST',
<<<<<<< HEAD
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
=======
        payload: { requestType: incomingType, department: state.department || '' },
      });
    }
  }, [location.state, state.type, state.department, dispatch]);

  // Memoize filtering to prevent recalculation on every state change
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    const lowerQuery = search.toLowerCase();
    return products.filter((p) =>
      p.description.toLowerCase().includes(lowerQuery) ||
      p.itemNumber.toLowerCase().includes(lowerQuery)
    );
  }, [products, search]);

  // Wrapped in useCallback to prevent child re-renders
  const handleAdd = useCallback((product: Product, quantity: number) => {
    if (!product.id) return;
>>>>>>> cc155ab (app done)

    dispatch({
      type: 'ADD_ITEM',
      payload: {
<<<<<<< HEAD
        productId: product.id!,
=======
        productId: product.id,
>>>>>>> cc155ab (app done)
        itemNumber: product.itemNumber,
        description: product.description,
        unit: product.unit,
        quantity,
      },
    });

<<<<<<< HEAD
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
=======
    setJustAddedId(product.id);
    setTimeout(() => setJustAddedId(null), 900);
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col pb-36"> 
      {/* Unified Sticky Header & Search */}
      <div className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-md px-5 pt-4 pb-4 border-b border-zinc-900 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back</span>
          </button>

          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                state.type === 'Urgent'
                  ? 'bg-amber-500/10 text-amber-400'
                  : 'bg-blue-500/10 text-blue-400'
              }`}
            >
              {state.type || 'Standard'}
            </span>
            <span className="text-sm text-zinc-500 tabular-nums">
              {state.items.length} added
            </span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-white tracking-tight mb-4">
          Add Items
        </h1>

        <div className="relative">
          <label htmlFor="product-search" className="sr-only">
            Search products
          </label>
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
            <Search size={18} />
          </div>
          <input
            id="product-search"
            className="w-full pl-11 pr-4 py-3.5 bg-zinc-900/80 border border-zinc-800 rounded-3xl text-white placeholder-zinc-500 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 outline-none transition-all shadow-inner"
            placeholder="Search by name or item number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col px-5 pt-4">
        {/* Product List */}
        <div className="flex-1 space-y-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={handleAdd}
              isJustAdded={justAddedId === product.id}
            />
          ))}

          {/* Empty State */}
          {filteredProducts.length === 0 && search && (
            <div className="text-center py-16">
              <div className="mx-auto w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4 border border-zinc-800">
                <Search className="text-zinc-600" size={28} />
              </div>
              <p className="text-zinc-300 text-lg font-medium">No matching products</p>
              <p className="text-zinc-500 text-sm mt-1 mb-6 max-w-[250px] mx-auto">
                We couldn't find anything matching "{search}". 
              </p>
              <button
                onClick={() => setShowAddProduct(true)}
                className="inline-flex items-center gap-2 bg-white text-black px-6 py-3.5 rounded-2xl font-semibold hover:bg-zinc-200 transition-colors active:scale-95 shadow-lg shadow-white/5"
              >
                <Plus size={18} />
                Create New Product
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Review Button Container with Gradient fade */}
      <div className="fixed bottom-20 left-0 right-0 z-40 px-5 pb-4 pt-12 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-transparent pointer-events-none">
        <button
          onClick={() => navigate('/review')}
          disabled={state.items.length === 0}
          className="w-full pointer-events-auto bg-white text-black font-semibold py-4 rounded-3xl disabled:bg-zinc-800 disabled:text-zinc-500 active:scale-[0.985] transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/50"
        >
          Review Request
          <span className="text-xs bg-black/10 px-2 py-0.5 rounded-full tabular-nums font-bold">
            {state.items.length}
          </span>
        </button>
      </div>
>>>>>>> cc155ab (app done)

      {showAddProduct && (
        <AddProductModal onClose={() => setShowAddProduct(false)} />
      )}
    </div>
  );
}