import React, { useState } from "react";

interface DragState {
  isDragging: boolean;
  draggedItemId: string | null;
  startPosition: [number, number] | null;
}

export interface WithDragAndDropProps {
  onDragEnd?: (itemId: string, newPosition: [number, number]) => void;
}

export const withDragAndDrop = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return ({ onDragEnd, ...props }: P & WithDragAndDropProps) => {
    const [dragState, setDragState] = useState<DragState>({
      isDragging: false,
      draggedItemId: null,
      startPosition: null,
    });

    const handleDragStart = (
      e: React.DragEvent,
      itemId: string,
      position: [number, number]
    ) => {
      setDragState({
        isDragging: true,
        draggedItemId: itemId,
        startPosition: position,
      });
      e.dataTransfer.setData("text/plain", itemId);
    };

    const handleDragEnd = (e: React.DragEvent) => {
      if (dragState.draggedItemId && onDragEnd) {
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / 64); // Using DIM (64) from constants
        const y = Math.floor((e.clientY - rect.top) / 64);
        onDragEnd(dragState.draggedItemId, [x * 64, y * 64]);
      }
      setDragState({
        isDragging: false,
        draggedItemId: null,
        startPosition: null,
      });
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
    };

    return (
      <div onDragOver={handleDragOver} onDrop={handleDragEnd}>
        <WrappedComponent
          {...(props as P)}
          dragState={dragState}
          onDragStart={handleDragStart}
        />
      </div>
    );
  };
};
