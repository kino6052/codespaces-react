import React from "react";

export interface WithPositioningProps {
  plane?: number;
  position?: { x: number; y: number };
}

export const withPositioning = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return ({ plane = 0, position, ...props }: P & WithPositioningProps) => {
    const positioningStyles = {
      zIndex: plane,
      position: position ? ("absolute" as const) : undefined,
      left: position?.x,
      top: position?.y,
    };

    return (
      <div style={positioningStyles}>
        <WrappedComponent {...(props as P)} />
      </div>
    );
  };
};
