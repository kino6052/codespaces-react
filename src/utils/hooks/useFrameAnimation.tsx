import { useEffect, useRef, useState } from "react";
import { useAnimationTimer } from "./useAnimationTimer";

interface UseFrameAnimationProps {
  totalFrames: number;
  fps: number;
  isPlaying?: boolean;
  isLooping?: boolean;
  onEnd?: () => void;
}

export const useFrameAnimation = ({
  totalFrames,
  fps,
  isPlaying = false,
  isLooping = false,
  onEnd,
}: UseFrameAnimationProps) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const interval = 1000 / fps;

  useAnimationTimer({
    interval,
    isPlaying,
    onTick: () => {
      setCurrentFrame((prevFrame) => {
        const nextFrame = prevFrame + 1;
        if (nextFrame >= totalFrames) {
          if (isLooping) return 0;
          onEnd?.();
          return prevFrame;
        }
        return nextFrame;
      });
    },
  });

  return isPlaying ? currentFrame : 0;
};
