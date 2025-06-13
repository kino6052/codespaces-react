import { useEffect, useRef } from "react";

interface UseAnimationTimerProps {
  interval: number;
  isPlaying: boolean;
  onTick: () => void;
}

export const useAnimationTimer = ({
  interval,
  isPlaying,
  onTick,
}: UseAnimationTimerProps) => {
  const lastUpdateRef = useRef(Date.now());
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlaying) return;

    const animate = () => {
      const now = Date.now();
      if (now - lastUpdateRef.current >= interval) {
        onTick();
        lastUpdateRef.current = now;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, interval, onTick]);
};
