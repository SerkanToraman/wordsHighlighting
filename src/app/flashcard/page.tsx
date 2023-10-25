"use client";
import React from "react";
import { useWordSelector } from "@/store/store";

const Page: React.FC = () => {
  const savedWords = useWordSelector((state) => state.wordReducer.flashCardWords);
  return (
    <div>
      <h1>a</h1>
      {savedWords.map((word, index) => (
        <p key={index}>{word}</p>
      ))}
    </div>
  );
};

export default Page;
