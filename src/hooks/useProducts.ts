import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/db';
import type { Product } from '../types/models';

// Returns only active (non-archived) products, for use in Add Items search.
// Automatically re-renders whenever the underlying data changes.
export function useActiveProducts() {
  return useLiveQuery(
    () => db.products.filter((p) => !p.archived).toArray(),
    []
  );
}

// Returns ALL products including archived ones, for use in Product Management.
export function useAllProducts() {
  return useLiveQuery(() => db.products.toArray(), []);
}

export async function addProduct(product: Omit<Product, 'id' | 'archived'>) {
  return db.products.add({ ...product, archived: false });
}

export async function updateProduct(id: number, changes: Partial<Product>) {
  return db.products.update(id, changes);
}

export async function archiveProduct(id: number) {
  return db.products.update(id, { archived: true });
}

export async function unarchiveProduct(id: number) {
  return db.products.update(id, { archived: false });
}