import React from "react";
import { SpriteTile } from "./SpriteAnimation";
import { withPositioning } from "../../utils/hocs/withPositioning";

interface ITileSprite {
  asset: string;
  location: [number, number];
  width?: number;
  height?: number;
  isHighlighted?: boolean;
}

const TileSpriteComponent = withPositioning(SpriteTile);

export const TileSprite: React.FC<ITileSprite> = ({
  asset,
  location,
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
      <TileSpriteComponent
        width={width}
        height={height}
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
