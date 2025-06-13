import { useEffect, useState, useMemo, memo } from "react";
import { DIM, NUM } from "../constants";
import { mapStateToProps, TProps } from "../mapper";
import { StateSubject, TState } from "../state";
import { Character } from "./components/Character";
import DialogueBox from "./components/DialogueBox";
import { Inventory } from "./components/Inventory";
import { Journal } from "./components/Journal";
import { SaveLoadButtons, SaveLoadScreen } from "./components/SaveLoad";
import { TileSprite as TileSpriteBase } from "./components/Tile";
import { useMusic } from "../utils/hooks/useMusic";
import "./styles.css";

const TileSprite = memo(TileSpriteBase);

const AppComponent = (props: TProps) => {
  const {
    mapTiles,
    items,
    characters,
    dialogue,
    character,
    journalProps,
    inventoryProps,
    saveLoadProps,
    saveLoadButtonsProps,
  } = props;

  // Add music playback with play button
  const { handlePlay } = useMusic("/music.mp3");

  const sortedTiles = useMemo(
    () =>
      mapTiles
        .sort((a, b) => (a.layer || 0) - (b.layer || 0))
        .map((tile) => (
          <TileSprite
            key={`tile-${tile.type}-${tile.location[0]}-${tile.location[1]}`}
            location={tile.location as [number, number]}
            asset={tile.type}
          />
        )),
    [mapTiles]
  );

  const itemTiles = useMemo(
    () =>
      Object.entries(items).map(([key, item]) => (
        <TileSprite
          key={key}
          location={item.location}
          asset={item.asset}
          isHighlighted={item.isHighlighted}
        />
      )),
    [items]
  );

  return (
    <>
      <button
        onClick={handlePlay}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Play Music
      </button>
      <div
        style={{
          backgroundImage: "url('/bg.jpg')",
          backgroundSize: "200px",
          backgroundRepeat: "repeat",
          width: "100vw",
          height: "100vh",
          position: "relative",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          opacity: 0.1,
        }}
      ></div>
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
        {sortedTiles}

        {itemTiles}
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
        {inventoryProps && <Inventory {...inventoryProps} />}
        {journalProps && <Journal {...journalProps} />}

        <SaveLoadButtons {...saveLoadButtonsProps} />
        {saveLoadProps && <SaveLoadScreen {...saveLoadProps} />}
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

  return <AppComponent {...mapStateToProps(state)} />;
}
