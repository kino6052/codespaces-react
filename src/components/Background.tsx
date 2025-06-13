import { memo } from "react";
import { TileSprite } from "../components/Tile";
import { NUM, DIM } from "../constants";

export const Background = memo(() => {
  return (
    <>
      {new Array(NUM)
        .fill(null)
        .map((_, y) =>
          new Array(NUM)
            .fill(null)
            .map((_, x) => (
              <TileSprite
                asset="./grass.png"
                location={[x * DIM, y * DIM]}
                key={`${x}-${y}`}
                plane={0}
                height={DIM}
                width={DIM}
              />
            ))
        )}
    </>
  );
});
