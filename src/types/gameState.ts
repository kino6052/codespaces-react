// Game state types
export interface GameState {
  // Visual/Scene state
  scene: {
    currentScene: string;
    characters: CharacterState[];
    objects: ObjectState[];
    background: string;
  };

  // Player state
  player: {
    inventory: string[];
    flags: Record<string, boolean>;
    stats: Record<string, number>;
    currentLocation: [number, number];
  };

  // Story/Quest state
  story: {
    activeQuests: QuestState[];
    completedQuests: string[];
    storyFlags: Record<string, boolean>;
  };

  // Dialogue/Conversation state
  dialogue: {
    availableOptions: DialogueOption[];
    currentConversation?: string;
    conversationHistory: string[];
  };
}

// Character state
export interface CharacterState {
  id: string;
  position: [number, number];
  currentAnimation: string;
  isVisible: boolean;
  interactionState: 'idle' | 'talking' | 'walking';
}

// Object state
export interface ObjectState {
  id: string;
  position: [number, number];
  isInteractable: boolean;
  currentState: string;
}

// Quest state
export interface QuestState {
  id: string;
  status: 'active' | 'completed' | 'failed';
  objectives: {
    id: string;
    description: string;
    isCompleted: boolean;
    prerequisites?: string[];
  }[];
}

// Dialogue option
export interface DialogueOption {
  id: string;
  text: string;
  prerequisites: {
    flags?: string[];
    quests?: string[];
    stats?: Record<string, number>;
  };
  consequences: {
    flags?: Record<string, boolean>;
    quests?: string[];
    stats?: Record<string, number>;
  };
  nextDialogue?: string;
}

// Example of how to use these types:
export const initialGameState: GameState = {
  scene: {
    currentScene: 'main-room',
    characters: [],
    objects: [],
    background: 'main-room-bg.png'
  },
  player: {
    inventory: [],
    flags: {},
    stats: {
      friendship: 0,
      trust: 0
    },
    currentLocation: [0, 0]
  },
  story: {
    activeQuests: [],
    completedQuests: [],
    storyFlags: {}
  },
  dialogue: {
    availableOptions: [],
    conversationHistory: []
  }
}; 