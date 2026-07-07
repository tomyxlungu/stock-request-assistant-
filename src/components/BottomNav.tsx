import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import {
  Home as HomeIcon,
  History as HistoryIcon,
  Package,
  Settings as SettingsIcon,
} from 'lucide-react';

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950';

const TABS = [
  { path: '/', label: 'Home', Icon: HomeIcon },
  { path: '/history', label: 'History', Icon: HistoryIcon },
  { path: '/products', label: 'Products', Icon: Package },
  { path: '/settings', label: 'Settings', Icon: SettingsIcon },
] as const;

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const containerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const hasPositionedOnce = useRef(false);

  function movePill(animate: boolean) {
    const container = containerRef.current;
    const pill = pillRef.current;
    const activeButton = buttonRefs.current[currentPath];
    if (!container || !pill || !activeButton) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();
    const x = buttonRect.left - containerRect.left;
    const width = buttonRect.width;

    if (width === 0) {
      requestAnimationFrame(() => movePill(animate));
      return;
    }

    if (animate) {
      // 1. Clear any active animations instantly
      gsap.killTweensOf(pill);

      // 2. Reflow optimization: Snap width instantly.
      // Since all tabs are equal flex-1 widths, the width change is minimal or zero, 
      // so we set it statically to avoid layout reflows during the translation.
      gsap.set(pill, { width });

      // 3. Translate purely via hardware-accelerated 'x'
      gsap.to(pill, { 
        x, 
        duration: 0.45,                  // Slightly faster duration suited for slow screens
        ease: 'elastic.out(1, 0.85)',    // Simplified calculation curve for budget mobile GPUs
        force3D: true                    // Strictly forces GPU layer creation on Android
      });

      // 4. Bubble deformation using scale transforms (GPU composite only)
      gsap.fromTo(pill,
        { scaleY: 1, scaleX: 1 },
        {
          scaleY: 0.85,                  // Slightly milder squeeze for rendering performance
          scaleX: 1.06,
          duration: 0.12,
          ease: 'power1.out',
          yoyo: true,
          repeat: 1,
          transformOrigin: '50% 50%',
          force3D: true
        }
      );
    } else {
      gsap.killTweensOf(pill);
      gsap.set(pill, { x, width, scaleX: 1, scaleY: 1 });
    }
  }

  useEffect(() => {
    const animFrame = requestAnimationFrame(() => {
      movePill(hasPositionedOnce.current);
      hasPositionedOnce.current = true;
    });

    return () => cancelAnimationFrame(animFrame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath]);

  useEffect(() => {
    function handleResize() {
      movePill(false);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
      <div
        ref={containerRef}
        className="relative max-w-md mx-auto flex justify-between bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-full px-2 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
      >
        {/* Hardware-accelerated sliding highlight */}
        <div
          ref={pillRef}
          className="absolute top-2 bottom-2 left-0 bg-white rounded-full will-change-transform"
          style={{ width: 0, transform: 'translate3d(0, 0, 0)' }}
        />

        {TABS.map(({ path, label, Icon }) => {
          const isActive = currentPath === path;
          return (
            <button
              key={path}
              ref={(el) => {
                buttonRefs.current[path] = el;
              }}
              onClick={() => navigate(path)}
              className={`relative z-10 flex flex-1 flex-col items-center justify-center gap-0.5 py-1.5 rounded-full transition-colors duration-200 active:scale-95 ${FOCUS_RING} ${
                isActive ? 'text-zinc-950' : 'text-zinc-500'
              }`}
            >
              <Icon size={19} />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}