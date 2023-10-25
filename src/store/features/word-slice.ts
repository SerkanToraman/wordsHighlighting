import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: WordState;
};

type WordState = {
  flashCardWords: string[];
  knownWords: string[];
};

const initialState: WordState = {
  flashCardWords: [],
  knownWords: [],
};

export const word = createSlice({
  name: "word",
  initialState,
  reducers: {
    addFlashCardWord: (state, action: PayloadAction<string>) => {
      const newWord = action.payload;
      if (!state.flashCardWords.includes(newWord)) {
        state.flashCardWords.push(newWord);
      }
    },
    addKnownWord: (state, action: PayloadAction<string>) => {
      const newWords = action.payload
        .split(" ")
        .filter((word) => word.trim() !== "");
      newWords.forEach((newWord) => {
        if (!state.knownWords.includes(newWord)) {
          state.knownWords.push(newWord);
        }
      });
    },
  },
});

export const { addFlashCardWord, addKnownWord } = word.actions;

export default word.reducer;
