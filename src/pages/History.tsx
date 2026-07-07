import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRequestHistory } from '../hooks/useRequests';
import { useCurrentRequest } from '../hooks/useCurrentRequest';
import type { RequestStatus, RequestType } from '../types/models';

export default function History() {
  const navigate = useNavigate();
  const requests = useRequestHistory();
  const { dispatch } = useCurrentRequest();

  const [typeFilter, setTypeFilter] = useState<RequestType | 'All'>('All');
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'All'>('All');

  const filtered = requests?.filter((r) => {
    if (typeFilter !== 'All' && r.type !== typeFilter) return false;
    if (statusFilter !== 'All' && r.status !== statusFilter) return false;
    return true;
  });

  function handleDuplicate(requestId: number) {
    const request = requests?.find((r) => r.id === requestId);
    if (!request) return;

    // Duplicating starts a fresh request, inheriting type/department/items
    // from the original, but will get its own new Request ID once saved.
    dispatch({
      type: 'START_REQUEST',
      payload: { requestType: request.type, department: request.department },
    });
    dispatch({ type: 'LOAD_ITEMS', payload: request.items });

    navigate('/review');
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">History</h1>

      <div className="flex gap-2 mb-4 text-sm">
        <select
          aria-label="Filter by request type"
          className="border rounded p-1"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as RequestType | 'All')}
        >
          <option value="All">All types</option>
          <option value="Urgent">Urgent</option>
          <option value="Bulk">Bulk</option>
        </select>

        <select
          aria-label="Filter by request status"
          className="border rounded p-1"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as RequestStatus | 'All')}
        >
          <option value="All">All statuses</option>
          <option value="Sent">Sent</option>
          <option value="Fulfilled">Fulfilled</option>
        </select>
      </div>

      <ul className="space-y-2">
        {filtered?.map((request) => (
          <li key={request.id} className="border rounded p-3">
            <div
              onClick={() => navigate(`/history/${request.id}`)}
              className="cursor-pointer flex justify-between items-center"
            >
              <div>
                <p className="font-medium">
                  REQ-{String(request.id).padStart(4, '0')} · {request.type}
                </p>
                <p className="text-xs text-gray-500">
                  {request.date} · {request.department} · {request.items.length} item(s)
                </p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  request.status === 'Fulfilled'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {request.status}
              </span>
            </div>
            <button
              onClick={() => handleDuplicate(request.id!)}
              className="text-sm underline mt-2"
            >
              Duplicate this request
            </button>
          </li>
        ))}

        {filtered?.length === 0 && (
          <li className="text-sm text-gray-500 text-center py-6">
            No requests match these filters.
          </li>
        )}
      </ul>
    </div>
  );
}