import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
=======
import { ArrowLeft, Copy } from 'lucide-react';
>>>>>>> cc155ab (app done)
import { useRequestHistory } from '../hooks/useRequests';
import { useCurrentRequest } from '../hooks/useCurrentRequest';
import type { RequestStatus, RequestType } from '../types/models';

<<<<<<< HEAD
=======
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950';

>>>>>>> cc155ab (app done)
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

<<<<<<< HEAD
    // Duplicating starts a fresh request, inheriting type/department/items
    // from the original, but will get its own new Request ID once saved.
=======
>>>>>>> cc155ab (app done)
    dispatch({
      type: 'START_REQUEST',
      payload: { requestType: request.type, department: request.department },
    });
    dispatch({ type: 'LOAD_ITEMS', payload: request.items });

    navigate('/review');
  }

  return (
<<<<<<< HEAD
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
=======
    <div className="min-h-screen w-full bg-black flex justify-center selection:bg-zinc-800">
      <div className="w-full max-w-md min-h-screen flex flex-col relative pb-28">
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl px-5 py-5 border-b border-zinc-900/50">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className={`p-2 -ml-2 rounded-full text-zinc-400 hover:text-white transition-colors ${FOCUS_RING}`}
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-bold text-white tracking-tight">History</h1>
            <div className="w-8" /> {/* Spacer */}
          </div>
        </div>

        <div className="flex-1 px-5 pt-6">
          {/* Custom Styled Filter Dropdowns */}
          <div className="flex gap-2.5 mb-6">
            <div className="flex-1 relative">
              <label htmlFor="type-filter" className="sr-only">Filter by type</label>
              <select
                id="type-filter"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as RequestType | 'All')}
                className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-[1.25rem] pl-4 pr-8 py-3 text-zinc-300 text-xs font-semibold tracking-wide focus:border-zinc-700 outline-none appearance-none"
              >
                <option value="All">All Types</option>
                <option value="Urgent">Urgent Only</option>
                <option value="Bulk">Bulk Only</option>
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="flex-1 relative">
              <label htmlFor="status-filter" className="sr-only">Filter by status</label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as RequestStatus | 'All')}
                className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-[1.25rem] pl-4 pr-8 py-3 text-zinc-300 text-xs font-semibold tracking-wide focus:border-zinc-700 outline-none appearance-none"
              >
                <option value="All">All Statuses</option>
                <option value="Sent">Sent</option>
                <option value="Fulfilled">Fulfilled</option>
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Request List */}
          <div className="space-y-3">
            {filtered?.map((request) => (
              <div
                key={request.id}
                className="bg-zinc-900/40 border border-zinc-900 rounded-[2rem] p-5 transition-all"
              >
                <div
                  onClick={() => navigate(`/history/${request.id}`)}
                  className="cursor-pointer"
                >
                  {/* Top Row: Request ID, Type badge, and Status badge */}
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-white text-base font-bold tracking-wide">
                        REQ-{String(request.id).padStart(4, '0')}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                          request.type === 'Urgent'
                            ? 'bg-amber-500/10 text-amber-400'
                            : 'bg-blue-500/10 text-blue-400'
                        }`}
                      >
                        {request.type}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                        request.status === 'Fulfilled'
                          ? 'bg-green-500/10 text-green-400'
                          : 'bg-yellow-500/10 text-yellow-400'
                      }`}
                    >
                      {request.status}
                    </span>
                  </div>

                  {/* Info Row: Department and Date meta details */}
                  <div className="flex flex-col gap-1 mb-4">
                    <p className="text-[15px] font-semibold text-zinc-300 leading-snug">
                      {request.department}
                    </p>
                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-500 uppercase tracking-wider">
                      <span>{request.date}</span>
                      <span>•</span>
                      <span>{request.items.length} item{request.items.length !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions: Duplicate & Details Buttons */}
                <div className="pt-4 border-t border-zinc-800/60 flex gap-2.5">
                  <button
                    onClick={() => handleDuplicate(request.id!)}
                    className={`flex-1 flex items-center justify-center gap-2 bg-zinc-900 border border-zinc-800/80 text-zinc-200 hover:text-white py-3 rounded-2xl text-xs font-semibold tracking-wide active:scale-95 transition-all ${FOCUS_RING}`}
                  >
                    <Copy size={14} />
                    Duplicate
                  </button>

                  <button
                    onClick={() => navigate(`/history/${request.id}`)}
                    className={`flex-1 bg-white text-zinc-950 py-3 rounded-2xl text-xs font-bold tracking-wide active:scale-95 transition-all ${FOCUS_RING}`}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}

            {filtered?.length === 0 && (
              <div className="text-center py-16 text-zinc-500">
                <p className="text-base font-semibold text-zinc-400">No matching requests</p>
                <p className="text-xs mt-1 text-zinc-600 font-mono uppercase tracking-wider">Try changing the filters</p>
              </div>
            )}
          </div>
        </div>

      </div>
>>>>>>> cc155ab (app done)
    </div>
  );
}