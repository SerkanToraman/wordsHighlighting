"use client";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addWord } from "@/store/features/word-slice";
import { useWordSelector } from "@/store/store";

const Page: React.FC = () => {
  const dispatch = useDispatch();
  const savedWords = useWordSelector((state) => state.wordReducer.savedWords);
  const [startPosition, setStartPosition] = useState<number | null>(null);
  const [selectedPhrase, setSelectedPhrase] = useState<string>("");
  const [selectedWords, setSelectedWords] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  const handleAddToFlashcards = (word: string) => {
    dispatch(addWord(word));
  };

  const handlePageClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      showModal &&
      !(modalRef.current?.contains(target) || target.closest("span"))
    ) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handlePageClick);
    return () => {
      window.removeEventListener("click", handlePageClick);
    };
  }, [showModal]);

  const handleMouseUp = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    cleanWord: string,
    index: number
  ) => {
    if (startPosition !== null) {
      const selected = Array.from(
        { length: Math.abs(index - startPosition) + 1 },
        (_, i) => Math.min(index, startPosition) + i
      );
      setSelectedWords(selected);
      const selectedWordList = selected
        .map((i) => sentence.split(" ")[i].replace(/[^\w\s'()-]$/, ""))
        .join(" ");
      console.log("Selected words:", selectedWordList);
      setSelectedPhrase(selectedWordList);
    }
    setTimeout(() => {
      const firstSpan = document.querySelector(
        `span:nth-child(${Math.min(startPosition as number, index) + 1})`
      ) as HTMLElement;
      const lastSpan = document.querySelector(
        `span:nth-child(${Math.max(startPosition as number, index) + 1})`
      ) as HTMLElement;

      if (firstSpan && lastSpan) {
        const firstSpanPosition = firstSpan.getBoundingClientRect();
        const lastSpanPosition = lastSpan.getBoundingClientRect();

        const top =
          Math.min(firstSpanPosition.top, lastSpanPosition.top) +
          window.scrollY +
          30;

        const left =
          (firstSpanPosition.left + lastSpanPosition.right) / 2 +
          window.scrollX -
          80;

        setShowModal(true);
        setModalPosition({
          top: top,
          left: left,
        });
      }
    }, 0);
  };

  useEffect(() => {
    console.log(selectedWords);
    console.log(showModal);
  }, [selectedWords]);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    cleanWord: string,
    index: number
  ) => {
    setStartPosition(index);
    setSelectedWords([]);
  };

  const sentence =
    "Alexander the Great (356-323 BC), Macedonian king, forged one of history's largest empires through relentless military campaigns. Notable victories over Persia showcased his tactical genius. His ambition extended beyond conquest, promoting the blending of Greek and Persian cultures. However, his troops' refusal to advance into India halted further expansion. His sudden death at 32 led to his empire's fragmentation among warring generals, marking the end of the Hellenistic period. His legacy endures, shaping Western civilization's military strategies and cultural integration.";

  return (
    <div className="w-full flex flex-col">
      <p>
        {sentence.split(" ").map((word, index) => {
          const cleanWord = word.replace(/[^\w\s'()-]/g, "");
          const punctuation = word.replace(/[\w\s'()-]/g, "");

          return (
            <span key={index}>
              <span
                onMouseDown={(e) => handleMouseDown(e, cleanWord, index)}
                onMouseUp={(e) => handleMouseUp(e, cleanWord, index)}
                style={{
                  display: "inline-block",
                  backgroundColor: selectedWords.includes(index)
                    ? "yellow"
                    : "transparent",
                }}
              >
                {cleanWord}
              </span>
              <span>{punctuation}</span>
              <span>&nbsp;</span>
            </span>
          );
        })}
      </p>
      {showModal && (
        <div
          ref={modalRef}
          className="fixed z-10 overflow-y-auto top-0 w-full left-0"
          style={{
            position: "absolute",
            top: modalPosition.top,
            left: modalPosition.left,
          }}
        >
          <div className="bg-emerald-500 w-40 p-4 shadow-lg">
            {selectedPhrase}
            <button onClick={() => handleAddToFlashcards(selectedPhrase)}>
              Add to flashcards
            </button>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
      <p>
        {savedWords.map((word, index) => (
          <p key={index}>{word}</p>
        ))}
      </p>
    </div>
  );
};

export default Page;
