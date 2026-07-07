import Dexie, { type Table } from 'dexie';
import type { Product, Request } from '../types/models';

export class StockRequestDB extends Dexie {
  products!: Table<Product, number>;
  requests!: Table<Request, number>;

  constructor() {
    super('StockRequestAssistantDB');

    this.version(1).stores({
      // '++id' = auto-incrementing primary key
      // other listed fields are indexed for fast queries/filtering
      products: '++id, itemNumber, department, archived',
      requests: '++id, date, department, type, status',
    });
  }
}

export const db = new StockRequestDB();