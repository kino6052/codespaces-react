import React from "react";

export type SaveSlotProps = {
  slotNumber: number;
  saveData?: {
    timestamp: string;
    preview: string;
  };
  onSelect: () => void;
};

const SaveSlot = ({ slotNumber, saveData, onSelect }: SaveSlotProps) => (
  <div
    style={{
      border: "2px solid #666",
      padding: "10px",
      margin: "5px",
      cursor: "pointer",
      backgroundColor: saveData ? "#e0e0e0" : "#f0f0f0",
      width: "200px",
    }}
    onClick={onSelect}
  >
    <div style={{ fontWeight: "bold" }}>Slot {slotNumber}</div>
    {saveData ? (
      <>
        <div>{saveData.timestamp}</div>
        <div style={{ fontSize: "0.8em", color: "#666" }}>
          {saveData.preview}
        </div>
      </>
    ) : (
      <div style={{ color: "#999" }}>Empty</div>
    )}
  </div>
);

export type SaveLoadScreenProps = {
  mode: "save" | "load";
  slots: Array<{
    slotNumber: number;
    saveData?: {
      timestamp: string;
      preview: string;
    };
  }>;
  onSlotSelect: (slotNumber: number) => void;
  onBack: () => void;
};

const SaveLoadScreen = ({
  mode,
  slots,
  onSlotSelect,
  onBack,
}: SaveLoadScreenProps) => (
  <div
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.5)",
      zIndex: 1000,
    }}
  >
    <div
      style={{ marginBottom: "20px", fontSize: "1.2em", fontWeight: "bold" }}
    >
      {mode === "save" ? "Save Game" : "Load Game"}
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {slots.map((slot) => (
        <SaveSlot
          key={slot.slotNumber}
          slotNumber={slot.slotNumber}
          saveData={slot.saveData}
          onSelect={() => onSlotSelect(slot.slotNumber)}
        />
      ))}
    </div>
    <button
      onClick={onBack}
      style={{
        marginTop: "20px",
        padding: "8px 16px",
        backgroundColor: "#666",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      Back
    </button>
  </div>
);

export type SaveLoadButtonsProps = {
  onSaveClick: () => void;
  onLoadClick: () => void;
};

const SaveLoadButtons = ({
  onSaveClick,
  onLoadClick,
}: SaveLoadButtonsProps) => (
  <div
    style={{
      position: "absolute",
      top: "10px",
      right: "10px",
      display: "flex",
      gap: "10px",
    }}
  >
    <button
      onClick={onSaveClick}
      style={{
        padding: "8px 16px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      Save
    </button>
    <button
      onClick={onLoadClick}
      style={{
        padding: "8px 16px",
        backgroundColor: "#2196F3",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      Load
    </button>
  </div>
);

export { SaveLoadButtons, SaveLoadScreen };
