import React, { useEffect, useState } from "react";

const styles = {
  container: {
    display: "flex",
    alignItems: "flex-start",
    backgroundColor: "#222",
    color: "#fff",
    padding: "16px",
    borderRadius: "8px",
    width: "500px",
    fontFamily: "monospace",
    position: "absolute",
    bottom: "-64px",
    left: "24px",
  },
  image: {
    width: "64px",
    height: "64px",
    marginRight: "16px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  textBox: {
    flexGrow: 1,
    paddingTop: "6px",
  },
  text: {
    margin: 0,
    fontSize: "16px",
    lineHeight: "1.4",
    whiteSpace: "pre-wrap",
    color: "white",
  },
};

export default function DialogueBox({
  title,
  message,
  characterImage,
}: {
  title: string;
  message: string;
  characterImage: string;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setDisplayedText("");
    setIndex(0);
  }, [message]);

  useEffect(() => {
    if (index < message.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + message.charAt(index));
        setIndex((prev) => prev + 1);
      }, 30); // Typing speed (ms)
      return () => clearTimeout(timeout);
    }
  }, [index, message]);

  return (
    <div style={styles.container as React.CSSProperties}>
      <img
        src={characterImage}
        alt="Character"
        style={{ ...styles.image, objectFit: "cover" as const }}
      />
      <div style={styles.textBox}>
        <b style={styles.text}>{title}</b>
        <p style={styles.text}>{displayedText}</p>
      </div>
    </div>
  );
}
