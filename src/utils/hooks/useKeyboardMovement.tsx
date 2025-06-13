import { useEffect, useState } from "react";
import { EDirection } from "../../types/direction";

interface UseKeyboardMovementProps {
  step: number;
  onMove: (newLocation: [number, number], direction: EDirection) => void;
  currentLocation: [number, number];
}

export const useKeyboardMovement = ({
  step,
  onMove,
  currentLocation,
}: UseKeyboardMovementProps) => {
  const [isMoving, setIsMoving] = useState(false);
  const [[offsetX, offsetY], setOffset] = useState([0, 0]);
  const [direction, setDirection] = useState(EDirection.Down);

  useEffect(() => {
    if (!isMoving) return;

    const lastMoveTime = Date.now();
    const moveInterval = setInterval(() => {
      const now = Date.now();
      if (now - lastMoveTime >= step) {
        const newLocation: [number, number] = [
          currentLocation[0] + offsetX,
          currentLocation[1] + offsetY,
        ];

        onMove(newLocation, direction);
      }
    }, step);

    return () => {
      clearInterval(moveInterval);
    };
  }, [currentLocation, offsetX, offsetY, direction, onMove, step, isMoving]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const movements: Record<string, [number, number, EDirection]> = {
        ArrowUp: [0, -1, EDirection.Up],
        ArrowDown: [0, 1, EDirection.Down],
        ArrowLeft: [-1, 0, EDirection.Left],
        ArrowRight: [1, 0, EDirection.Right],
      };

      const movement = movements[event.key];
      if (!movement) return;

      setOffset([movement[0], movement[1]]);
      setDirection(movement[2]);

      setIsMoving(true);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      setIsMoving(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [currentLocation, onMove, step]);

  return { isMoving };
};
