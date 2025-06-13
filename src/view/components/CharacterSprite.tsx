import React from "react";
import { SpriteAnimation } from "./SpriteAnimation";
import { EDirection } from "../../types/direction";

interface CharacterSpriteProps {
  direction: EDirection;
  location: [number, number];
  isMoving: boolean;
  isHighlighted?: boolean;
}

export const CharacterSprite: React.FC<CharacterSpriteProps> = ({
  direction,
  location,
  isMoving,
  isHighlighted,
}) => {
  const style: React.CSSProperties = {
    position: "absolute",
    left: location[0],
    top: location[1],
    transform: "translate(-50%, -50%)",
  };

  return (
    <div style={style}>
      <SpriteAnimation
        isHighlighted={isHighlighted}
        spriteSheet="./cycle.png"
        frameWidth={64}
        frameHeight={64}
        row={direction}
        totalFrames={9}
        fps={30}
        isPlaying={isMoving}
        isLooping={true}
      />
    </div>
  );
};
