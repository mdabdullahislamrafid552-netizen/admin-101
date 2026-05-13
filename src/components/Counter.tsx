import { useEffect, useRef } from "react";
import { animate, useInView, useMotionValue, useTransform, motion } from "motion/react";

export function Counter({ value, duration = 2.5, delay = 0.2, className = "" }: { value: number; duration?: number; delay?: number; className?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { 
        duration: duration, 
        ease: [0.16, 1, 0.3, 1],
        delay: delay 
      });
      return controls.stop;
    }
  }, [inView, value, count, duration, delay]);

  return <motion.span ref={ref} className={className}>{rounded}</motion.span>;
}
