import { useLayoutEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import gsap from "gsap";

export default function PageTransition() {
  const pageRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useLayoutEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {

      const tl = gsap.timeline();

      tl.fromTo(
        pageRef.current,
        {
          opacity: 0,
          clipPath: "inset(10% 0% 0% 0%)",
          y: 20,
        },
        {
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          y: 0,
          duration: 0.45,
          ease: "power3.out",
        }
      );

    }, pageRef);

    return () => ctx.revert();

  }, [location.pathname]);


  return (
    <div
      ref={pageRef}
      className="w-full"
    >
      <Outlet />
    </div>
  );
}