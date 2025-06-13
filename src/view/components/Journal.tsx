import React, { useState } from "react";

export type TJournalProps = {
  title: string;
  text: string;
  onNextEntry?: () => void;
  onPreviousEntry?: () => void;
};

export const Journal: React.FC<TJournalProps> = ({
  title,
  text,
  onNextEntry,
  onPreviousEntry,
}) => {
  const [currentSpread, setCurrentSpread] = useState(0);
  const wordsPerPage = 50;
  const words = text.split(" ");
  const totalPages = Math.ceil(words.length / wordsPerPage);
  const totalSpreads = Math.ceil(totalPages / 2);

  const getPageContent = (pageNum: number) => {
    const start = pageNum * wordsPerPage;
    const end = start + wordsPerPage;
    return words.slice(start, end).join(" ");
  };

  const handlePrevious = () => {
    if (currentSpread === 0 && onPreviousEntry) {
      onPreviousEntry();
    } else {
      setCurrentSpread((prev) => Math.max(0, prev - 1));
    }
  };

  const handleNext = () => {
    if (currentSpread === totalSpreads - 1 && onNextEntry) {
      onNextEntry();
    } else {
      setCurrentSpread((prev) => Math.min(totalSpreads - 1, prev + 1));
    }
  };

  const containerStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "640px",
    height: "480px",
    backgroundImage: "url(/journal.png)",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    zIndex: 1000,
  };

  const contentStyle: React.CSSProperties = {
    padding: "40px",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
    margin: "60px 100px",
    gap: "20px",
  };

  const pageStyle: React.CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  };

  const navigationStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 40px",
    marginTop: "auto",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "5px 15px",
    cursor: "pointer",
    backgroundColor: "#4a4a4a",
    color: "white",
    border: "none",
    borderRadius: "4px",
  };

  const textStyle: React.CSSProperties = {
    maxWidth: "300px",
    fontSize: "14px",
    background: "#ffffff99",
    padding: "4px",
  };

  const secondPageContent =
    currentSpread * 2 + 1 < totalPages
      ? getPageContent(currentSpread * 2 + 1)
      : "";

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <div style={pageStyle}>
          <h3 style={textStyle}>{title}</h3>
          <p style={textStyle}>{getPageContent(currentSpread * 2)}</p>
        </div>

        <div style={pageStyle}>
          {secondPageContent && <p style={textStyle}>{secondPageContent}</p>}
        </div>
      </div>
      <div style={navigationStyle}>
        <button
          style={buttonStyle}
          onClick={handlePrevious}
          disabled={currentSpread === 0 && !onPreviousEntry}
        >
          Previous
        </button>
        <span
          style={{
            color: "white",
            fontSize: "14px",
            background: "#00000099",
            padding: "4px",
            borderRadius: "4px",
          }}
        >
          Pages {currentSpread * 2 + 1}-
          {Math.min((currentSpread + 1) * 2, totalPages)} of {totalPages}
        </span>
        <button
          style={buttonStyle}
          onClick={handleNext}
          disabled={currentSpread === totalSpreads - 1 && !onNextEntry}
        >
          Next
        </button>
      </div>
    </div>
  );
};
