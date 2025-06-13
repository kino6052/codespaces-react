import React, { useEffect } from "react";
import { Character } from "./components/Character";
import DialogueBox from "./components/DialogueBox";
import { TileSprite } from "./components/Tile";
import "./styles.css";
import {
  state001,
  state002,
  state003,
  state004,
  StateSubject,
  TState,
} from "../state";
import { NUM, DIM, TILE_DIM, TILE_NUM } from "../constants";
import { Inventory } from "./components/Inventory";
import { useState } from "react";
import { Journal } from "./components/Journal";

// Tile types for procedural generation
const TILE_TYPES = {
  GRASS: "/tiles/grass.png",
  PATH: "/tiles/path.png",
  WATER: "/tiles/water.png",
  TREE: "/tiles/tree.png",
  ROCK: "/tiles/rock.png",
  HOUSE: "/tiles/house.png",
};

// Pre-generated map data for consistent gameplay
const DEFAULT_MAP_DATA = Array(TILE_NUM)
  .fill(null)
  .map((_, y) =>
    Array(TILE_NUM)
      .fill(null)
      .map((_, x) => {
        const tiles: string[] = [];

        // Base terrain layer
        if (x === 0 || y === 0 || x === TILE_NUM - 1 || y === TILE_NUM - 1) {
          tiles.push(TILE_TYPES.GRASS);
          tiles.push(TILE_TYPES.TREE); // Border with trees
        } else if (
          x === Math.floor(TILE_NUM / 2) ||
          y === Math.floor(TILE_NUM / 2)
        ) {
          tiles.push(TILE_TYPES.PATH); // Main paths
        } else {
          // Base terrain
          tiles.push(TILE_TYPES.GRASS);

          // Random decorative overlays (20% chance)
          if (Math.random() < 0.2) {
            const overlays = [
              TILE_TYPES.ROCK,
              TILE_TYPES.TREE,
              TILE_TYPES.WATER,
              TILE_TYPES.HOUSE,
            ];
            tiles.push(overlays[Math.floor(Math.random() * overlays.length)]);
          }
        }

        return tiles;
      })
  );

// Generate a map using pre-generated data
const generateMap = (mapData = DEFAULT_MAP_DATA) => {
  const tiles: Array<{
    type: string;
    location: [number, number];
    layer: number;
  }> = [];
  for (let y = 0; y < mapData.length; y++) {
    for (let x = 0; x < mapData[y].length; x++) {
      // Create a tile for each layer at this position
      mapData[y][x].forEach((tileType, layer) => {
        tiles.push({
          type: tileType,
          location: [x * TILE_DIM, y * TILE_DIM],
          layer, // Add layer information for rendering order
        });
      });
    }
  }
  return tiles;
};

const AppComponent = (state: TState) => {
  const { character, characters, dialogue, items } = state;
  const [inventoryItems, setInventoryItems] = useState(
    Object.entries(character.inventory || {}).map(([key, item]) => ({
      id: key,
      asset: item.asset,
      position: item.location,
    }))
  );

  const handleInventoryDragEnd = (
    itemId: string,
    newPosition: [number, number]
  ) => {
    setInventoryItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, position: newPosition } : item
      )
    );
  };

  // Generate the map once when component mounts
  const [mapTiles] = useState(generateMap());

  return (
    <>
      <div
        style={{
          backgroundImage: "url('/bg.jpg')",
          backgroundSize: "200px",
          backgroundRepeat: "repeat",
          width: "100vw",
          height: "100vh",
          position: "relative",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
        }}
      >
        <div
          style={{
            border: "4px solid grey",
            position: "absolute",
            width: `${NUM * DIM}px`,
            height: `${NUM * DIM}px`,
            top: `calc(50% - ${(NUM * DIM) / 2}px)`,
            left: `calc(50% - ${(NUM * DIM) / 2}px)`,
          }}
        >
          {/* Render the procedural map */}
          {mapTiles
            .sort((a, b) => (a.layer || 0) - (b.layer || 0))
            .map((tile, index) => (
              <TileSprite
                key={`tile-${index}`}
                location={tile.location as [number, number]}
                asset={tile.type}
              />
            ))}

          {Object.entries(items).map(([key, item]) => (
            <TileSprite
              key={key}
              location={item.location}
              asset={item.asset}
              isHighlighted={item.isHighlighted}
            />
          ))}
          <Character
            location={character.location}
            isMoving={character.isMoving}
            direction={character.direction}
          />
          {Object.entries(characters).map(([key, character]) => (
            <Character
              key={key}
              location={character.location}
              isMoving={false}
              direction={character.direction}
              isHighlighted={character.isHighglighted}
            />
          ))}
          {dialogue && (
            <DialogueBox
              title={dialogue.title}
              message={dialogue.message}
              characterImage={dialogue.characterImage}
            />
          )}
          {character.inventory && (
            <Inventory
              items={inventoryItems}
              onDragEnd={handleInventoryDragEnd}
            />
          )}
          {character.journal && <Journal {...character.journal} />}
        </div>
      </div>
    </>
  );
};

export default function App() {
  const [state, setState] = useState<TState>(StateSubject.getValue());

  useEffect(() => {
    const subscription = StateSubject.subscribe((newState) => {
      console.log("newState", newState);
      setState(newState);
    });

    return () => subscription.unsubscribe();
  }, []);

  return <AppComponent {...state} />;
}
