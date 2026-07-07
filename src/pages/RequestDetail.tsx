<<<<<<< HEAD
import { useParams, useNavigate } from 'react-router-dom';
import { useRequestById, updateRequestStatus } from '../hooks/useRequests';

=======
import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowLeft, CheckCircle, Clock } from 'lucide-react';
import { useRequestById, updateRequestStatus } from '../hooks/useRequests';

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950';

>>>>>>> cc155ab (app done)
export default function RequestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const requestId = id ? Number(id) : undefined;
  const request = useRequestById(requestId);

<<<<<<< HEAD
  if (request === undefined) {
    return <div className="p-4 text-center text-gray-500">Loading...</div>;
  }

  if (request === null || !request) {
    return (
      <div className="p-4 max-w-md mx-auto text-center text-gray-500">
        <p>Request not found.</p>
        <button onClick={() => navigate('/history')} className="underline mt-2">
=======
  const containerRef = useRef<HTMLDivElement>(null);

  // Hardware-accelerated entrance animation, bypassing OS restrictions
  useEffect(() => {
    if (!request) return;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ 
        defaults: { 
          ease: 'power3.out',
          force3D: true // Forces GPU rendering layer
        } 
      });
      
      tl.from('.anim-header', { y: -10, opacity: 0, duration: 0.35 })
        .from('.anim-info', { y: 15, opacity: 0, duration: 0.4 }, '-=0.15')
        .from('.anim-items', { y: 15, opacity: 0, duration: 0.4 }, '-=0.2')
        .from('.anim-status', { y: 15, opacity: 0, duration: 0.4 }, '-=0.2');
    }, containerRef);
    
    return () => ctx.revert();
  }, [!!request]);

  if (request === undefined) {
    return (
      <div className="min-h-screen w-full bg-black flex items-center justify-center">
        <p className="text-xs font-mono font-bold text-zinc-600 uppercase tracking-widest animate-pulse">
          Loading request...
        </p>
      </div>
    );
  }

  if (request === null) {
    return (
      <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center p-6 text-center">
        <p className="text-[15px] font-semibold text-zinc-400 mb-6">Request not found.</p>
        <button
          onClick={() => navigate('/history')}
          className={`px-6 py-3 bg-white text-zinc-950 rounded-2xl text-xs font-bold uppercase tracking-wider active:scale-95 transition-all ${FOCUS_RING}`}
        >
>>>>>>> cc155ab (app done)
          Back to History
        </button>
      </div>
    );
  }

  async function toggleStatus() {
    if (!request?.id) return;
    const nextStatus = request.status === 'Sent' ? 'Fulfilled' : 'Sent';
    await updateRequestStatus(request.id, nextStatus);
  }

<<<<<<< HEAD
  return (
    <div className="p-4 max-w-md mx-auto">
      <button onClick={() => navigate('/history')} className="text-sm underline mb-4">
        ← Back to History
      </button>

      <h1 className="text-lg font-bold mb-1">
        REQ-{String(request.id).padStart(4, '0')} · {request.type}
      </h1>
      <p className="text-sm text-gray-500 mb-1">
        {request.date} · {request.department}
      </p>
      <p className="text-sm text-gray-500 mb-4">Prepared by {request.preparedBy}</p>

      <ul className="space-y-2 mb-6">
        {request.items.map((item) => (
          <li key={item.productId} className="border rounded p-3">
            <p className="font-medium">{item.description}</p>
            <p className="text-xs text-gray-500">
              {item.itemNumber} · {item.quantity} {item.unit}
            </p>
          </li>
        ))}
      </ul>

      <button
        onClick={toggleStatus}
        className={`w-full rounded p-3 font-medium ${
          request.status === 'Fulfilled'
            ? 'bg-yellow-100 text-yellow-700'
            : 'bg-green-100 text-green-700'
        }`}
      >
        {request.status === 'Sent'
          ? 'Mark as Fulfilled'
          : 'Mark as Sent (undo)'}
      </button>
=======
  const isFulfilled = request.status === 'Fulfilled';
  const totalQuantity = request.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen w-full bg-black flex justify-center selection:bg-zinc-800">
      <div ref={containerRef} className="w-full max-w-md min-h-screen flex flex-col relative pb-28">
        
        {/* Sticky Header */}
        <div className="anim-header will-change-transform sticky top-0 z-50 bg-black/80 backdrop-blur-xl px-5 py-5 border-b border-zinc-900/50">
          <button
            onClick={() => navigate('/history')}
            className={`flex items-center gap-1.5 p-2 -ml-2 rounded-full text-zinc-400 hover:text-white transition-colors w-fit ${FOCUS_RING}`}
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-bold tracking-tight">Back</span>
          </button>
        </div>

        <div className="flex-1 px-5 pt-6">
          
          {/* Request Info Card */}
          <div className="anim-info will-change-transform bg-zinc-900/40 border border-zinc-900 rounded-[2rem] p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-2xl font-bold text-white tracking-wide">
                  REQ-{String(request.id).padStart(4, '0')}
                </span>
                <span
                  className={`w-fit text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    request.type === 'Urgent'
                      ? 'bg-amber-500/10 text-amber-400'
                      : 'bg-blue-500/10 text-blue-400'
                  }`}
                >
                  {request.type} Request
                </span>
              </div>

              <div
                className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl ${
                  isFulfilled
                    ? 'bg-green-500/10 text-green-400'
                    : 'bg-yellow-500/10 text-yellow-400'
                }`}
              >
                {isFulfilled ? <CheckCircle size={24} /> : <Clock size={24} />}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-[11px] uppercase tracking-widest font-bold">
              <div>
                <p className="text-zinc-600 mb-1">Date</p>
                <p className="text-zinc-300">{request.date}</p>
              </div>
              <div>
                <p className="text-zinc-600 mb-1">Total Qty</p>
                <p className="text-zinc-300 font-mono text-sm leading-none mt-0.5">{totalQuantity}</p>
              </div>
              <div className="col-span-2">
                <p className="text-zinc-600 mb-1">Department & Preparer</p>
                <p className="text-zinc-300 normal-case tracking-normal text-[13px]">
                  {request.department} <span className="text-zinc-600 mx-1">•</span> {request.preparedBy}
                </p>
              </div>
            </div>

            {/* Sent → Fulfilled progress indicator */}
            <div className="mt-8 pt-5 border-t border-zinc-800/60">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white shrink-0" />
                <div
                  className={`flex-1 h-0.5 rounded-full ${
                    isFulfilled ? 'bg-green-400' : 'bg-zinc-800'
                  }`}
                />
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    isFulfilled ? 'bg-green-400' : 'bg-zinc-800 border border-zinc-600'
                  }`}
                />
              </div>
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-2 px-0.5">
                <span className="text-white">Sent</span>
                <span className={isFulfilled ? 'text-green-400' : ''}>Fulfilled</span>
              </div>
            </div>
          </div>

          {/* Items List */}
          <div className="anim-items will-change-transform mb-8">
            <div className="flex items-center justify-between mb-4 px-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Requested Items
              </p>
              <span className="text-[10px] font-bold text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded-md">
                {request.items.length}
              </span>
            </div>

            <div className="space-y-2.5">
              {request.items.map((item) => (
                <div
                  key={item.productId}
                  className="bg-zinc-900/60 border border-zinc-850 rounded-[1.25rem] p-4 flex items-center justify-between"
                >
                  <div className="flex-1 pr-4">
                    <p className="font-semibold text-[14px] text-white leading-snug">
                      {item.description}
                    </p>
                    <p className="text-[11px] text-zinc-500 mt-1 font-mono font-bold uppercase tracking-wider">
                      {item.itemNumber}
                    </p>
                  </div>
                  <div className="shrink-0 bg-zinc-950 border border-zinc-800/80 px-3 py-2 rounded-xl text-right">
                    <span className="block font-mono text-sm font-bold text-white">
                      {item.quantity}
                    </span>
                    <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">
                      {item.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status Toggle Action */}
          <button
            onClick={toggleStatus}
            className={`anim-status will-change-transform w-full py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all active:scale-[0.985] flex items-center justify-center gap-2 ${FOCUS_RING} ${
              isFulfilled
                ? 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                : 'bg-white text-zinc-950'
            }`}
          >
            {isFulfilled ? (
              'Revert to Sent'
            ) : (
              <>
                Mark as Fulfilled <CheckCircle size={16} strokeWidth={2.5} />
              </>
            )}
          </button>
          
        </div>
      </div>
>>>>>>> cc155ab (app done)
    </div>
  );
}