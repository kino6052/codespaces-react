import { generateMap } from "./map/mapData";
import { TState } from "./state";
import { EDirection } from "./types/direction";
import { WithDragAndDropProps } from "./utils/hocs/withDragAndDrop";
import { InventoryProps } from "./view/components/Inventory";
import { TJournalProps } from "./view/components/Journal";
import { SaveLoadButtonsProps, SaveLoadScreenProps } from "./view/components/SaveLoad";

export const mapStateToProps = (state: TState): TProps => {
  return {
    mapTiles: generateMap(),
    items: state.items || {
      item1: {
        asset: "item1",
        location: [0, 0],
        isHighlighted: false,
      },
    },
    characters: state.characters || {},
    dialogue: state.dialogue,
    character: {
      location: state.character.location,
      isMoving: state.character.isMoving,
      direction: state.character.direction,
    },
    journalProps: state.character.journal
      ? {
        title: state.character.journal?.title || "",
        text: state.character.journal?.text || "",
        onNextEntry: () => { },
        onPreviousEntry: () => { },
      }
      : undefined,
    inventoryProps: state.character.inventory
      ? {
        items: Object.entries(state.character.inventory || {}).map(
          ([key, item]) => ({
            id: key,
            asset: item.asset,
            position: item.location,
          })
        ),
        onDragEnd: () => { },
      }
      : undefined,
    saveLoadButtonsProps: {
      onSaveClick: () => { },
      onLoadClick: () => { },
    },
    saveLoadProps: undefined,
  };
};

export type TProps = {
  mapTiles: Array<{ type: string; location: [number, number]; layer: number }>;
  items: Record<
    string,
    { asset: string; location: [number, number]; isHighlighted?: boolean }
  >;
  characters: Record<
    string,
    {
      asset: string;
      location: [number, number];
      isHighglighted?: boolean;
      direction: EDirection;
      isMoving?: boolean;
    }
  >;
  dialogue?: {
    title: string;
    message: string;
    characterImage: string;
  };
  character: {
    location: [number, number];
    isMoving: boolean;
    direction: EDirection;
  };
  journalProps?: TJournalProps;
  inventoryProps?: InventoryProps & WithDragAndDropProps;
  saveLoadButtonsProps: SaveLoadButtonsProps;
  saveLoadProps?: SaveLoadScreenProps;
};
