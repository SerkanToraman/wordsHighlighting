"use client";
import React, { useRef, useState } from "react";

const Page: React.FC = () => {
  const selectableText = useRef<HTMLParagraphElement>(null);
  const [startPosition, setStartPosition] = useState<number | null>(null);
  const [endPosition, setEndPosition] = useState<number | null>(null);

  const handleMouseUp = () => {
    if (startPosition !== null && endPosition !== null) {
      console.log("startPosition", startPosition);
      console.log("endPosition", endPosition);
      const fullText = selectableText.current?.innerText;
      const words = sentence.split(" ");
      const selectedPhrase =
        startPosition < endPosition
          ? words.slice(startPosition, endPosition + 1).join(" ")
          : words.slice(endPosition, startPosition + 1).join(" ");
      if (selectedPhrase) {
        alert("Selected phrase: " + selectedPhrase);
      }
      setStartPosition(null);
      setEndPosition(null);
    }
  };
  const handleMouseDown = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    word: string
  ) => {
    const words = sentence.split(" ");
    const startPosition = words.indexOf(word);
    if (startPosition !== -1) {
      setStartPosition(startPosition);
    }
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    word: string
  ) => {
    const words = sentence.split(" ");
    const endPosition = words.indexOf(word);
    if (endPosition !== -1) {
      setEndPosition(endPosition);
    }
  };

  const sentence =
    "Click on a word to select it. This is an example sentence for the UI.";

  return (
    <div>
      <p ref={selectableText} onMouseUp={handleMouseUp}>
        {sentence.split(" ").map((word, index) => (
          <span
            key={index}
            onMouseDown={(e) => handleMouseDown(e, word)}
            onMouseMove={(e) => handleMouseMove(e, word)}
          >
            {word}&nbsp;
          </span>
        ))}
      </p>
    </div>
  );
};

export default Page;



