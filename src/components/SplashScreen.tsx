import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { Zap } from 'lucide-react';

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onFinish, 300); // Small delay for clean exit
      },
    });

    // Logo animation
    tl.fromTo(
      '.splash-logo',
      { scale: 0.7, opacity: 0, y: 10 },
      { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.2)' }
    );

    // Fake progress (smooth like Apple)
    tl.to(
      { progress: 0 },
      {
        progress: 100,
        duration: 1.4,
        ease: 'power2.inOut',
        onUpdate: function () {
          setProgress(Math.floor(this.targets()[0].progress));
        },
      },
      '-=0.3'
    );

    // Text fade in
    tl.fromTo(
      '.splash-text',
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.4 },
      '-=1'
    );

    return () => {
      tl.kill();
    };
  }, [onFinish]);

  return (
    <div className="splash-container fixed inset-0 z-50 bg-zinc-950 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        {/* Logo */}
        <div className="splash-logo w-20 h-20 bg-gradient-to-br  rounded-3xl flex items-center justify-center mb-10">
          <Zap size={42} className="text-white" />
        </div>

        {/* Progress Bar - Apple style */}
        <div className="w-64 h-1 bg-zinc-800 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-white rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading Text */}
        <p className="splash-text font-mono text-xs tracking-[3px] text-zinc-500">
          LOADING
        </p>
      </div>
    </div>
  );
}