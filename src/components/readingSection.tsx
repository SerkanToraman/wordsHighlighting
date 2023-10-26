"use client";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addFlashCardWord, addKnownWord } from "@/store/features/word-slice";
import { useWordSelector } from "@/store/store";
import { translation } from "@/data/text";

const enText = translation.map((item) => item[0]).join(" ");
const trText = translation.map((item) => item[1]).join(" ");

const ReadingSection: React.FC = () => {
  const dispatch = useDispatch();
  const flashCardWords = useWordSelector(
    (state) => state.wordReducer.flashCardWords
  );
  const knownWords = useWordSelector((state) => state.wordReducer.knownWords);
  const [startPosition, setStartPosition] = useState<number | null>(null);
  const [selectedPhrase, setSelectedPhrase] = useState<string>("");
  const [selectedWords, setSelectedWords] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  const handleAddToFlashCards = (word: string) => {
    dispatch(addFlashCardWord(word));
  };
  const handleAddToKnownWords = (word: string) => {
    dispatch(addKnownWord(word));
  };

  const checkIfWordIsInFlashCards = (
    sentence: string,
    flashCardWords: string[]
  ) => {
    const indices: Array<number | number[]> = [];
    const wordsInSentence = sentence.split(" ");

    flashCardWords.forEach((phrase) => {
      const wordsInPhrase = phrase.split(" ");
      if (wordsInPhrase.length > 1) {
        const subIndices: number[] = [];
        for (
          let i = 0;
          i <= wordsInSentence.length - wordsInPhrase.length;
          i++
        ) {
          const joinedPhrase = wordsInSentence
            .slice(i, i + wordsInPhrase.length)
            .map((word) => word.replace(/^[\W_]+|[\W_]+$/g, ""))
            .join(" ");
          if (joinedPhrase.toLowerCase() === phrase.toLowerCase()) {
            for (let j = i; j < i + wordsInPhrase.length; j++) {
              subIndices.push(j);
            }
          }
          console.log("joinedPhrase", joinedPhrase);
          console.log("phrase", phrase);
        }

        if (subIndices.length > 0) {
          indices.push(subIndices);
        }
      } else {
        wordsInSentence.forEach((word, index) => {
          if (
            word.toLowerCase().replace(/^[\W_]+|[\W_]+$/g, "") ===
            phrase.toLowerCase()
          ) {
            indices.push(index);
          }
        });
      }
    });

    return indices;
  };

  const indices = checkIfWordIsInFlashCards(enText, flashCardWords);

  const handlePageClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      showModal &&
      !(modalRef.current?.contains(target) || target.closest("span"))
    ) {
      setShowModal(false);
      setSelectedWords([]);
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
        .map((i) =>
          enText
            .split(" ")
            [i].replace(/^[\W_]+|[\W_]+$/g, "")
            .trim()
        )
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
          100;

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
    console.log("indices", indices);
  }, [selectedWords]);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    cleanWord: string,
    index: number
  ) => {
    setStartPosition(index);
    setShowModal(false);
    setSelectedWords([]);
  };

  const getTranslation = (selectedPhrase: string) => {
    const cleanSelectedPhrase = selectedPhrase
      .replace(/^[\W_]+|[\W_]+$/g, "")
      .trim();
    for (let i = 0; i < translation.length; i++) {
      const cleanEnPhrase = translation[i][0]
        .replace(/^[\W_]+|[\W_]+$/g, "")
        .trim();
      if (cleanEnPhrase === cleanSelectedPhrase) {
        return translation[i][1];
      }
    }
    const wordsInPhrase = cleanSelectedPhrase.split(" ");
    let translatedPhrase = "";
    for (let i = 0; i < wordsInPhrase.length; i++) {
      const cleanWord = wordsInPhrase[i];
      for (let j = 0; j < translation.length; j++) {
        if (translation[j][0].includes(cleanWord)) {
          translatedPhrase += translation[j][1] + " ";
          break;
        }
      }
    }
    return translatedPhrase.trim();
  };

  return (
    <div className="w-full flex flex-col">
      <p>
        {enText.split(" ").map((word, index) => {
          const cleanWord = word.replace(/^[\W_]+|[\W_]+$/g, "");
          const beginningPunctuation = word.match(/^(\W+)/)?.[1] || "";
          const endPunctuation = word.match(/(\W+)$/)?.[1] || "";

          const isNextIndexSelected =
            indices.some((item) => {
              if (Array.isArray(item)) {
                const currentArrayIndex = item.indexOf(index);
                if (
                  currentArrayIndex !== -1 &&
                  item[currentArrayIndex + 1] === index + 1
                ) {
                  return true;
                }
              }
              return false;
            }) || false;

          const hasBackground =
            indices.some((item) => {
              if (Array.isArray(item)) {
                return item.includes(index);
              } else {
                return item === index;
              }
            }) || false;

          return (
            <span key={index}>
              <span>{beginningPunctuation}</span>
              <span
                onMouseDown={(e) => handleMouseDown(e, cleanWord, index)}
                onMouseUp={(e) => handleMouseUp(e, cleanWord, index)}
                style={{
                  display: "inline-block",
                  backgroundColor: indices.some((item) =>
                    Array.isArray(item) ? item.includes(index) : item === index
                  )
                    ? "rgb(196 181 253)"
                    : selectedWords.includes(index)
                    ? "yellow"
                    : !knownWords.includes(cleanWord)
                    ? "rgb(103 232 249)"
                    : "transparent",
                }}
              >
                {cleanWord}
              </span>
              <span>{endPunctuation}</span>

              {hasBackground && isNextIndexSelected ? (
                <span
                  style={{
                    display: "inline-block",
                    backgroundColor: "rgb(196 181 253)",
                  }}
                >
                  &nbsp;
                </span>
              ) : (
                <span>&nbsp;</span>
              )}
            </span>
          );
        })}
      </p>
      {showModal && (
        <div
          ref={modalRef}
          className="fixed z-10 overflow-y-auto top-0 w-50 left-0"
          style={{
            position: "absolute",
            top: modalPosition.top,
            left: modalPosition.left,
          }}
        >
          <div className=" flex flex-col items-center gap-2 rounded-3xl bg-indigo-600 p-4 shadow-lg  text-white">
            <p className="font-bold">{getTranslation(selectedPhrase)}</p>
            <button
              className="border rounded-3xl text-sm p-2 hover:bg-white hover:text-indigo-600"
              onClick={() => handleAddToFlashCards(selectedPhrase)}
            >
              Add to flashcards
            </button>
            <button
              className="border rounded-3xl text-sm p-2 hover:bg-white hover:text-indigo-600"
              onClick={() => handleAddToKnownWords(selectedPhrase)}
            >
              Add to known words
            </button>
          </div>
        </div>
      )}
      {/* <p>
        {flashCardWords.map((word, index) => (
          <p key={index}>{word}</p>
        ))}
      </p> */}
    </div>
  );
};

export default ReadingSection;
