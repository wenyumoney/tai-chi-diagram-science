"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay multiplier in ms per child (default 80ms) */
  stagger?: number;
  /** Threshold for intersection (default 0.1) */
  threshold?: number;
  /** Root margin for earlier/later triggering (default "0px 0px -40px 0px") */
  rootMargin?: string;
}

export default function ScrollReveal({
  children,
  className = "",
  stagger = 80,
  threshold = 0.1,
  rootMargin = "0px 0px -40px 0px",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div
      ref={ref}
      className={`${className} ${
        visible ? "animate-fade-up-stagger-reveal" : ""
      }`}
      style={
        {
          "--stagger-delay": `${stagger}ms`,
          // When not visible, children have opacity: 0 to prevent flash
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
