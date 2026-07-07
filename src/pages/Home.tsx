<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  function startRequest(type: 'Urgent' | 'Bulk') {
    // Pass the type via route state, so AddItems knows which kind of
    // request it's building without needing a separate selection step.
    navigate('/add-items', { state: { type } });
  }

  return (
    <div className="p-4 max-w-md mx-auto flex flex-col gap-4 mt-8">
      <h1 className="text-xl font-bold text-center mb-4">Stock Request Assistant</h1>

      <button
        onClick={() => startRequest('Urgent')}
        className="bg-red-600 text-white rounded p-6 text-lg font-semibold"
      >
        Create Urgent Request
      </button>

      <button
        onClick={() => startRequest('Bulk')}
        className="bg-black text-white rounded p-6 text-lg font-semibold"
      >
        Create Bulk Request
      </button>

      <div className="flex justify-between mt-6 text-sm">
        <button onClick={() => navigate('/history')} className="underline">
          View History
        </button>
        <button onClick={() => navigate('/products')} className="underline">
          Manage Products
        </button>
        <button onClick={() => navigate('/settings')} className="underline">
          Settings
        </button>
=======
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import {
  Zap,
  Boxes,
  ChevronRight,
} from 'lucide-react';
import { useRequestHistory } from '../hooks/useRequests';
import { useActiveProducts } from '../hooks/useProducts';

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950';

export default function Home() {
  const navigate = useNavigate();
  const requests = useRequestHistory();
  const activeProducts = useActiveProducts();

  const containerRef = useRef<HTMLDivElement>(null);

  const latestRequest = requests?.[0];
  const pendingCount = requests?.filter((r) => r.status === 'Sent').length ?? 0;
  const productCount = activeProducts?.length ?? 0;
  const isFulfilled = latestRequest?.status === 'Fulfilled';
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  function startRequest(type: 'Urgent' | 'Bulk') {
    navigate('/add-items', { state: { type } });
  }

  // Optimized entrance timeline with hardware acceleration forced
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ 
        defaults: { 
          ease: 'power2.out',
          force3D: true // Forces GPU rendering layer creation for each tween
        } 
      });

      tl.from('.anim-topbar', { y: -10, opacity: 0, duration: 0.3 })
        .from('.anim-heading', { y: 15, opacity: 0, duration: 0.35 }, '-=0.15')
        .from(
          '.anim-hero-card',
          { y: 18, opacity: 0, duration: 0.4, stagger: 0.06 },
          '-=0.2'
        )
        .from('.anim-recent', { y: 15, opacity: 0, duration: 0.35 }, '-=0.15');
    }, containerRef);

    return () => { ctx.revert(); };
  }, []);

  // GPU-friendly status indicator pulse
  useEffect(() => {
    if (pendingCount === 0) return;

    const anim = gsap.to('.pending-dot', {
      scale: 1.25,
      repeat: -1,
      yoyo: true,
      duration: 0.8,
      ease: 'sine.inOut',
      force3D: true, // Prevents layout repaints during the pulse scaling
    });

    return () => { anim.kill(); };
  }, [pendingCount]);

  return (
    <div className="min-h-screen w-full bg-zinc-950 flex justify-center">
      <div ref={containerRef} className="w-full max-w-md min-h-screen flex flex-col relative">
        <div className="flex-1 overflow-y-auto px-5 pt-6 pb-28">
          
          {/* Top bar */}
          <div className="anim-topbar will-change-transform flex items-center justify-between mb-8">
            <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1.5">
              <span className="font-mono text-[11px] text-zinc-400 tracking-wide">
                {today}
              </span>
              {pendingCount > 0 && (
                <span className="pending-dot will-change-transform w-1.5 h-1.5 rounded-full bg-amber-400" />
              )}
            </div>
          </div>

          {/* Heading */}
          <div className="anim-heading will-change-transform mb-6">
            <h1 className="mb-1 text-4xl font-bold text-white tracking-tight">
              Stock Requests.
            </h1>
            <p className="font-mono text-xs text-zinc-500 tracking-wide">
              {productCount} product{productCount === 1 ? '' : 's'} ready to request
            </p>
          </div>

          {/* Hero CTAs */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <button
              onClick={() => startRequest('Urgent')}
              className={`anim-hero-card will-change-transform flex flex-col justify-between bg-zinc-900/60 border border-zinc-800 rounded-3xl p-5 h-44 text-left active:scale-95 transition-transform ${FOCUS_RING}`}
            >
              <div className="flex justify-between items-start w-full">
                <span className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                  <Zap size={22} />
                </span>
                <ChevronRight size={16} className="text-zinc-600 mt-1" />
              </div>
              <div>
                <span className="block text-white font-semibold text-base leading-tight">
                  Urgent Request
                </span>
                <span className="block text-zinc-500 text-xs mt-1 leading-tight">
                  Unexpected shortages
                </span>
              </div>
            </button>

            <button
              onClick={() => startRequest('Bulk')}
              className={`anim-hero-card will-change-transform flex flex-col justify-between bg-zinc-900/60 border border-zinc-800 rounded-3xl p-5 h-44 text-left active:scale-95 transition-transform ${FOCUS_RING}`}
            >
              <div className="flex justify-between items-start w-full">
                <span className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                  <Boxes size={22} />
                </span>
                <ChevronRight size={16} className="text-zinc-600 mt-1" />
              </div>
              <div>
                <span className="block text-white font-semibold text-base leading-tight">
                  Bulk Request
                </span>
                <span className="block text-zinc-500 text-xs mt-1 leading-tight">
                  Planned restocking
                </span>
              </div>
            </button>
          </div>

          {/* Recent request */}
          <div className="anim-recent will-change-transform">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-sm font-medium text-zinc-300">Most recent request</span>
              <button
                onClick={() => navigate('/history')}
                className={`text-xs text-blue-400 rounded ${FOCUS_RING}`}
              >
                See all
              </button>
            </div>

            {latestRequest ? (
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-5">
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-white text-sm font-semibold tracking-wide">
                    REQ-{String(latestRequest.id).padStart(4, '0')}
                  </span>
                  <span
                    className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium ${
                      latestRequest.type === 'Urgent'
                        ? 'bg-amber-500/10 text-amber-400'
                        : 'bg-blue-500/10 text-blue-400'
                    }`}
                  >
                    {latestRequest.type}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2 px-0.5">
                  <span className="w-2 h-2 rounded-full bg-white shrink-0" />
                  <div
                    className={`flex-1 h-0.5 rounded ${
                      isFulfilled ? 'bg-green-400' : 'bg-zinc-700'
                    }`}
                  />
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      isFulfilled ? 'bg-green-400' : 'bg-zinc-700 border border-zinc-600'
                    }`}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-zinc-500 mb-5 font-semibold tracking-wider px-0.5">
                  <span>SENT</span>
                  <span>FULFILLED</span>
                </div>

                <div className="flex justify-between font-mono text-[11px] text-zinc-500 border-t border-zinc-800/60 pt-4 px-0.5">
                  <span>{latestRequest.department}</span>
                  <span>{latestRequest.items.length} item{latestRequest.items.length === 1 ? '' : 's'}</span>
                  <span>{latestRequest.date}</span>
                </div>
              </div>
            ) : (
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 text-center text-sm text-zinc-500">
                No requests yet — create your first one above.
              </div>
            )}
          </div>

        </div>
>>>>>>> cc155ab (app done)
      </div>
    </div>
  );
}