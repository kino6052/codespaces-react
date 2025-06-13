interface UseSpritePositionProps {
  currentFrame: number;
  frameWidth: number;
  frameHeight: number;
  row: number;
}

export const useSpritePosition = ({
  currentFrame,
  frameWidth,
  frameHeight,
  row,
}: UseSpritePositionProps) => {
  return {
    backgroundPosition: `-${currentFrame * frameWidth}px -${
      row * frameHeight
    }px`,
    width: frameWidth,
    height: frameHeight,
  };
};
