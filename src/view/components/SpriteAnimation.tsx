//
// SpriteAnimation Component

import React from "react";
import { useFrameAnimation } from "../../utils/hooks/useFrameAnimation";
import { useSpritePosition } from "../../utils/hooks/useSpritePosition";

interface SpriteTileProps {
  width: number;
  height: number;
  extraStyles?: Record<string, unknown>;
  isHighlighted?: boolean;
}

export const SpriteTile: React.FC<SpriteTileProps> = ({
  width,
  height,
  extraStyles,
  isHighlighted,
}) => {
  return (
    <div
      style={{
        ...extraStyles,
        border: isHighlighted ? "2px dashed aqua" : undefined,
        width,
        height,
      }}
    />
  );
};

interface SpriteAnimationProps {
  spriteSheet: string;
  frameWidth: number;
  frameHeight: number;
  totalFrames: number;
  fps: number;
  isPlaying?: boolean;
  isLooping?: boolean;
  onEnd?: () => void;
  row: number;
  extraStyles?: Record<string, unknown>;
  isSpritesheet?: boolean;
  isHighlighted?: boolean;
}

export const SpriteAnimation: React.FC<SpriteAnimationProps> = ({
  spriteSheet,
  frameWidth,
  frameHeight,
  row,
  totalFrames,
  fps,
  isPlaying = true,
  isLooping = true,
  onEnd,
  extraStyles,
  isSpritesheet = true,
  isHighlighted,
}) => {
  if (!isSpritesheet) {
    return (
      <SpriteTile
        width={frameWidth}
        height={frameHeight}
        extraStyles={{
          ...extraStyles,
          backgroundImage: `url(${spriteSheet})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
    );
  }

  const currentFrame = useFrameAnimation({
    totalFrames,
    fps,
    isPlaying,
    isLooping,
    onEnd,
  });

  const { backgroundPosition, width, height } = useSpritePosition({
    currentFrame,
    frameWidth,
    frameHeight,
    row,
  });

  return (
    <SpriteTile
      width={width}
      height={height}
      isHighlighted={isHighlighted}
      extraStyles={{
        ...extraStyles,
        backgroundImage: `url(${spriteSheet})`,
        backgroundPosition,
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};
