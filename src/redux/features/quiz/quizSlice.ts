import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [],
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    removeQuiz: (state) => {
      state.quizzes = [];
    },
  },
});

export const { setQuizzes, removeQuiz } = quizSlice.actions;
export default quizSlice.reducer;
