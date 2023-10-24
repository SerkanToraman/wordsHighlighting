import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: WordState;
};

type WordState = {
  savedWords: string[];
};

const initialState: WordState = {
  savedWords: [],
};

export const word = createSlice({
  name: "word",
  initialState,
  reducers: {
    addWord: (state, action: PayloadAction<string>) => {
      state.savedWords.push(action.payload);
    },
  },
});

export const { addWord } = word.actions;

export default word.reducer;
