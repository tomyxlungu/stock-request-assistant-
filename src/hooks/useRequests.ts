import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/db';
import type { Request, RequestStatus } from '../types/models';

// Saves a finished request to Dexie. Returns the new auto-generated ID,
// which doubles as the Request ID (formatted as REQ-000X wherever displayed).
export async function saveRequest(
  request: Omit<Request, 'id' | 'status'>
): Promise<number> {
  return db.requests.add({ ...request, status: 'Sent' });
}

// All requests, most recent first — used by the History screen.
export function useRequestHistory() {
  return useLiveQuery(
    () => db.requests.orderBy('id').reverse().toArray(),
    []
  );
}

// A single request by ID — used by the Request Detail screen.
export function useRequestById(id: number | undefined) {
  return useLiveQuery(() => {
    if (id === undefined) return undefined;
    return db.requests.get(id);
  }, [id]);
}

export async function updateRequestStatus(id: number, status: RequestStatus) {
  return db.requests.update(id, { status });
}