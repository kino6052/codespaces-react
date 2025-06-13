import React from "react";
import { EDirection } from "../types/direction";
import { useKeyboardMovement } from "../hooks/useKeyboardMovement";
import { CharacterSprite } from "./CharacterSprite";

//
// Character Component
//
interface CharacterProps {
  direction: EDirection;
  location: [number, number];
  isMoving: boolean;
  isHighlighted?: boolean;
}

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
