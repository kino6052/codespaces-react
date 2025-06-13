import { TILE_NUM, TILE_DIM } from "../constants";

// Tile types for procedural generation
export const TILE_TYPES = {
  GRASS: "/tiles/grass.png",
  PATH: "/tiles/path.png",
  WATER: "/tiles/water.png",
  TREE: "/tiles/tree.png",
  ROCK: "/tiles/rock.png",
  HOUSE: "/tiles/house.png",
};

// Pre-generated map data for consistent gameplay
export const DEFAULT_MAP_DATA = [
  [
    ["/tiles/grass.png", "/tiles/tree.png"],
    ["/tiles/grass.png", "/tiles/tree.png"],
    ["/tiles/grass.png", "/tiles/tree.png"],
    ["/tiles/grass.png", "/tiles/tree.png"],
    ["/tiles/grass.png", "/tiles/tree.png"],
    ["/tiles/grass.png", "/tiles/tree.png"],
    ["/tiles/grass.png", "/tiles/tree.png"],
    ["/tiles/grass.png", "/tiles/tree.png"],
    ["/tiles/grass.png", "/tiles/tree.png"],
    ["/tiles/grass.png", "/tiles/tree.png"],
  ],
  [
    ["/tiles/grass.png", "/tiles/tree.png"],
    ["/tiles/grass.png", "/tiles/house.png"],
    ["/tiles/grass.png"],
    ["/tiles/grass.png"],
    ["/tiles/grass.png", "/tiles/rock.png"],
    ["/tiles/path.png"],
    ["/tiles/grass.png", "/tiles/rock.png"],
    ["/tiles/grass.png"],
    ["/tiles/grass.png", "/tiles/rock.png"],
    ["/tiles/grass.png", "/tiles/tree.png"],
  ],
  [
    ["/tiles/grass.png", "/tiles/tree.png"],
    ["/tiles/grass.png", "/tiles/rock.png"],
    ["/tiles/grass.png", "/tiles/tree.png"],
    ["/tiles/grass.png"],
    ["/tiles/grass.png", "/tiles/tree.png"],
    ["/tiles/path.png"],
    ["/tiles/grass.png"],
    ["/tiles/grass.png"],
    ["/tiles/grass.png"],
    ["/tiles/grass.png", "/tiles/tree.png"],
  ],
  [
    ["/tiles/grass.png", "/tiles/tree.png"],
    ["/tiles/grass.png"],
    ["/tiles/grass.png", "/tiles/tree.png"],
    ["/tiles/grass.png"],
    ["/tiles/grass.png"],
    ["/tiles/path.png"],
    ["/tiles/grass.png"],
    ["/tiles/grass.png"],
    ["/tiles/grass.png"],
    ["/tiles/grass.png", "/tiles/tree.png"],
  ],
  [
    ["/tiles/grass.png", "/tiles/tree.png"],
    ["/tiles/grass.png"],
    ["/tiles/grass.png"],
    ["/tiles/grass.png"],
    ["/tiles/grass.png"],
    ["/tiles/path.png"],
    ["/tiles/grass.png"],
    ["/tiles/grass.png"],
    ["/tiles/grass.png"],
    ["/tiles/grass.png", "/tiles/tree.png"],
  ],
  [
    ["/tiles/grass.png", "/tiles/tree.png"],
    ["/tiles/path.png"],
    ["/tiles/path.png"],
    ["/tiles/path.png"],
    ["/tiles/path.png"],
    ["/tiles/path.png"],
    ["/tiles/path.png"],
    ["/tiles/path.png"],
    ["/tiles/path.png"],
    ["/tiles/grass.png", "/tiles/tree.png"],
  ],
  [
    ["/tiles/grass.png", "/tiles/tree.png"],
    ["/tiles/grass.png"],
    ["/tiles/grass.png"],
    ["/tiles/grass.png"],
    ["/tiles/grass.png"],
    ["/tiles/path.png"],
    ["/tiles/grass.png"],
    ["/tiles/grass.png"],
    ["/tiles/grass.png"],
    ["/tiles/grass.png", "/tiles/tree.png"],
  ],
  [
    ["/tiles/grass.png", "/tiles/tree.png"],
    ["/tiles/grass.png"],
    ["/tiles/grass.png"],
    ["/tiles/grass.png"],
    ["/tiles/grass.png"],
    ["/tiles/path.png"],
    ["/tiles/grass.png"],
    ["/tiles/grass.png", "/tiles/chest.png"],
    ["/tiles/grass.png"],
    ["/tiles/grass.png", "/tiles/tree.png"],
  ],
  [
    ["/tiles/grass.png", "/tiles/tree.png"],
    ["/tiles/grass.png"],
    ["/tiles/grass.png"],
    ["/tiles/grass.png", "/tiles/rock.png"],
    ["/tiles/grass.png"],
    ["/tiles/path.png"],
    ["/tiles/grass.png"],
    ["/tiles/grass.png"],
    ["/tiles/grass.png"],
    ["/tiles/grass.png", "/tiles/tree.png"],
  ],
  [
    ["/tiles/grass.png", "/tiles/tree.png"],
    ["/tiles/grass.png", "/tiles/tree.png"],
    ["/tiles/grass.png", "/tiles/tree.png"],
    ["/tiles/grass.png", "/tiles/tree.png"],
    ["/tiles/grass.png", "/tiles/tree.png"],
    ["/tiles/grass.png", "/tiles/tree.png"],
    ["/tiles/grass.png", "/tiles/tree.png"],
    ["/tiles/grass.png", "/tiles/tree.png"],
    ["/tiles/grass.png", "/tiles/tree.png"],
    ["/tiles/grass.png", "/tiles/tree.png"],
  ],
];

// Generate a map using pre-generated data
export const generateMap = (mapData = DEFAULT_MAP_DATA) => {
  const tiles: Array<{ type: string; location: [number, number]; layer: number }> = [];
  for (let y = 0; y < mapData.length; y++) {
    for (let x = 0; x < mapData[y].length; x++) {
      // Create a tile for each layer at this position
      mapData[y][x].forEach((tileType, layer) => {
        tiles.push({
          type: tileType,
          location: [x * TILE_DIM, y * TILE_DIM],
          layer,
        });
      });
    }
  }
  return tiles;
}; 