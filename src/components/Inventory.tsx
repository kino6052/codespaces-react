import { memo } from "react";
import { TileSprite } from "../components/Tile";
import { DIM } from "../constants";
import { withDragAndDrop } from "./withDragAndDrop";

interface InventoryItem {
  id: string;
  asset: string;
  position: [number, number];
}

interface InventoryProps {
  items: InventoryItem[];
  onDragStart?: (
    e: React.DragEvent,
    itemId: string,
    position: [number, number]
  ) => void;
  dragState?: {
    isDragging: boolean;
    draggedItemId: string | null;
    startPosition: [number, number] | null;
  };
}

const InventoryComponent = memo(
  ({ items, onDragStart, dragState }: InventoryProps) => {
    const INVENTORY_SIZE = 5;

    return (
      <div
        style={{
          position: "absolute",
          width: INVENTORY_SIZE * DIM,
          height: INVENTORY_SIZE * DIM,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          border: "4px solid #333",
        }}
      >
        {/* Background tiles */}
        {new Array(INVENTORY_SIZE)
          .fill(null)
          .map((_, y) =>
            new Array(INVENTORY_SIZE)
              .fill(null)
              .map((_, x) => (
                <TileSprite
                  asset="./slot.png"
                  location={[x * DIM, y * DIM]}
                  key={`bg-${x}-${y}`}
                  plane={0}
                  height={DIM}
                  width={DIM}
                />
              ))
          )}

        {/* Item tiles */}
        {items.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => onDragStart?.(e, item.id, item.position)}
            style={{
              position: "absolute",
              left: item.position[0],
              top: item.position[1],
              cursor: "move",
              opacity:
                dragState?.isDragging && dragState.draggedItemId === item.id
                  ? 0.5
                  : 1,
            }}
          >
            <TileSprite
              asset={item.asset}
              location={[0, 0]}
              plane={1}
              height={DIM}
              width={DIM}
              isHighlighted
            />
          </div>
        ))}
        <p
          style={{
            textAlign: "center",
            color: "#333",
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "10px",
            position: "absolute",
            top: -24,
          }}
        >
          inventory
        </p>
      </div>
    );
  }
);

export const Inventory = withDragAndDrop(InventoryComponent);
