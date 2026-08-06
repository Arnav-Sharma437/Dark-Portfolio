import { useRef, useEffect } from "react";
import { useSpring } from "framer-motion";

export default function useMagnetic(strength = 0.5) {
  const ref = useRef<HTMLDivElement | HTMLAnchorElement | HTMLButtonElement | null>(null);
  
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as globalThis.MouseEvent;
      const { clientX, clientY } = mouseEvent;
      const { width, height, left, top } = node.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      
      x.set(middleX * strength);
      y.set(middleY * strength);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    node.addEventListener("mousemove", handleMouseMove);
    node.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      node.removeEventListener("mousemove", handleMouseMove);
      node.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [x, y, strength]);

  return { ref, x, y };
}
