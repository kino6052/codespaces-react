import { BehaviorSubject } from "rxjs";
import { EDirection } from "./types/direction";

export type TState = {
  character: {
    location: [number, number];
    direction: EDirection;
    isMoving: boolean;
    inventory: {
      [key: string]: {
        location: [number, number];
        asset: string;
      };
    } | undefined;
    journal: {
      title: string,
      text: string
    } | undefined;
  };
  characters: {
    [key: string]: {
      location: [number, number];
      direction: EDirection;
      asset: string;
      isHighglighted: boolean; // when we are close to the character, we highlight them so that we know we can interact with them
    };
  };
  dialogue: {
    title: string;
    message: string;
    characterImage: string;
  } | undefined;
  items: {
    [key: string]: {
      location: [number, number];
      asset: string;
      isHighlighted?: boolean;
    };
  };
};

export type TStoryState = {
  [key: string]: {
    cutscene: string;
    next?: string;
  };
};

export type TCutscene = {
  [key: string]: (TState & { duration: number })[];
};

// NOTE: Cutscene is a list of states that are played one after the other.
// The duration is the time in milliseconds that the state is played.
// The duration is used to calculate the time that the next state should be played.
// The next state is the state that is played after the duration.
// The next state is used to calculate the time that the next state should be played.
// The next state is used to calculate the time that the next state should be played.
export const custscenes: TCutscene = {
  "cutscene-001": [
    {
      character: {
        location: [0, 0],
        direction: EDirection.Down,
        isMoving: false,
        inventory: {},
        journal: undefined,
      },
      characters: {},
      dialogue: {
        title: "intro",
        message: "oh hi",
        characterImage: "./npc-talking.png",
      },
      items: {},
      duration: 1000,
    },
    {
      character: {
        location: [0, 0],
        direction: EDirection.Down,
        isMoving: false,
        inventory: {},
        journal: undefined,
      },
      characters: {},
      dialogue: {
        title: "intro",
        message: "oh hi",
        characterImage: "./npc-talking.png",
      },
      items: {},
      duration: 1000,
    },
  ],
};

export const characterState001: TStoryState = {
  intro: {
    cutscene: "cutscene-001",
    next: "intro-002",
  },
  "expect-item": {
    cutscene: "cutscene-002",
    next: "expect-item-002",
  },
  "expect-item-002": {
    cutscene: "cutscene-003",
    next: "thanks",
  },
  thanks: {
    cutscene: "cutscene-004",
    next: "end",
  },
  end: {
    cutscene: "cutscene-005",
  },
};

export const state001: TState = {
  character: {
    location: [230, 100],
    direction: EDirection.Down,
    isMoving: false,
    inventory: undefined,
    journal: undefined
  },
  characters: {
    "npc-001": {
      location: [500, 164],
      asset: "./cycle.png",
      isHighglighted: false,
      direction: EDirection.Left,

    },
  },
  dialogue: undefined,
  items: {
    "chest-001": {
      location: [320, 100],
      asset: "",
    },
  },
};

export const state002: TState = {
  character: {
    location: [230, 100],
    direction: EDirection.Down,
    isMoving: false,
    inventory: undefined,
    journal: undefined
  },
  characters: {
    "npc-001": {
      location: [500, 164],
      asset: "./cycle.png",
      isHighglighted: true,
      direction: EDirection.Left,

    },
  },
  dialogue: {
    characterImage: '/character.png',
    message: "Hello there! I've been waiting for you. The village needs your help with something important.",
    title: "Mr. Robinson"
  },
  items: {
    "chest-001": {
      location: [320, 100],
      asset: "",
      isHighlighted: true
    },
  },
};

export const state003: TState = {
  character: {
    location: [230, 100],
    direction: EDirection.Down,
    isMoving: false,
    inventory: {
      "test": {
        asset: "./chest.png",
        location: [0, 0]
      }
    },
    journal: undefined
  },
  characters: {
    "npc-001": {
      location: [500, 164],
      asset: "./cycle.png",
      isHighglighted: true,
      direction: EDirection.Left,

    },
  },
  dialogue: {
    characterImage: '/character.png',
    message: "Hello there! I've been waiting for you. The village needs your help with something important.",
    title: "Mr. Robinson"
  },
  items: {
    "chest-001": {
      location: [320, 100],
      asset: "",
      isHighlighted: true
    },
  },
};

export const state004: TState = {
  character: {
    location: [230, 100],
    direction: EDirection.Down,
    isMoving: false,
    inventory: undefined,
    journal: {
      title: 'Diary Entry',
      text: 'Today I explored the village and met Mr. Robinson. He seems to have an important task for me. I should investigate what he needs help with.'
    }
  },
  characters: {
    "npc-001": {
      location: [500, 164],
      asset: "./cycle.png",
      isHighglighted: true,
      direction: EDirection.Left,

    },
  },
  dialogue: {
    characterImage: '/character.png',
    message: "Hello there! I've been waiting for you. The village needs your help with something important.",
    title: "Mr. Robinson"
  },
  items: {
    "chest-001": {
      location: [320, 100],
      asset: "",
      isHighlighted: true
    },
  },
};

export const StateSubject = new BehaviorSubject<TState>(state002);