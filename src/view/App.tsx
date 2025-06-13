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
import { NUM, DIM } from "../constants";
import { Inventory } from "./components/Inventory";
import { useState } from "react";
import { Journal } from "./components/Journal";

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
        <TileSprite
          key=""
          location={[0, 0]}
          asset={"/village.png"}
          height={640}
          width={640}
        />
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
