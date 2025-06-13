import React from "react";
import { SpriteTile } from "./SpriteAnimation";

interface ITileSprite {
  asset: string;
  location: [number, number];
  plane?: number;
  width?: number;
  height?: number;
  isHighlighted?: boolean;
}

export const TileSprite: React.FC<ITileSprite> = ({
  asset,
  location,
  plane = 0,
  width = 64,
  height = 64,
  isHighlighted,
}) => {
  const style: React.CSSProperties = {
    position: "absolute",
    left: location[0],
    top: location[1],
    transform: "",
  };

  return (
    <div style={style}>
      <SpriteTile
        width={width}
        height={height}
        plane={plane}
        isHighlighted={isHighlighted}
        extraStyles={{
          backgroundImage: `url(${asset})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
};
