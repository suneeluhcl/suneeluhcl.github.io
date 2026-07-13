import { useEffect, useRef, useState } from "react";

/**
 * Reveal-on-scroll via IntersectionObserver + CSS transition.
 * Same fade-up behavior as before, with zero animation-library JS.
 */
export default function Reveal({ children, delay = 0, y = 28, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal${shown ? " reveal-in" : ""} ${className}`}
      style={{ "--reveal-y": `${y}px`, transitionDelay: shown ? `${delay}s` : "0s" }}
    >
      {children}
    </div>
  );
}
