// Core enums

export type RequestType = 'Urgent' | 'Bulk';

export type RequestStatus = 'Sent' | 'Fulfilled';

// Product — saved once during setup, reused across requests

export interface Product {
  id?: number;            // Dexie auto-increment primary key
  itemNumber: string;      // user-assigned item number, e.g. "001"
  description: string;     // e.g. "Coca Cola 500ml"
  unit: string;            // e.g. "Box", "Pack", "Case"
  department: string;      // e.g. "Beverages"
  archived: boolean;       // soft delete
}

// A single line item within a request

export interface RequestItem {
  productId: number;       // references Product.id
  itemNumber: string;      // snapshotted at time of request, in case product changes later
  description: string;     // snapshotted at time of request
  unit: string;             // snapshotted at time of request
  quantity: number;
}

// Request — one stock request, either Urgent or Bulk

export interface Request {
  id?: number;              // Dexie auto-increment primary key (shown as REQ-000X)
  date: string;              // ISO date string, auto-filled on creation
  department: string;
  type: RequestType;
  status: RequestStatus;
  preparedBy: string;        // pulled from Settings
  items: RequestItem[];
}