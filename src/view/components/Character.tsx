import React from "react";
import { EDirection } from "../../types/direction";
import { CharacterSprite as CharacterSpriteComponent } from "./CharacterSprite";
import { withPositioning } from "../../utils/hocs/withPositioning";

//
// Character Component
//
interface CharacterProps {
  direction: EDirection;
  location: [number, number];
  isMoving: boolean;
  isHighlighted?: boolean;
}

const CharacterSprite = withPositioning(CharacterSpriteComponent);

export const Character: React.FC<CharacterProps> = ({
  direction = EDirection.Down,
  location,
  isMoving,
  isHighlighted,
}) => {
  return (
    <CharacterSprite
      direction={direction}
      location={location}
      isMoving={isMoving}
      isHighlighted={isHighlighted}
    />
  );
};
