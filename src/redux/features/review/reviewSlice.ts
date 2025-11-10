import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Review } from "../../api/review/reviewApi";

interface ReviewState {
  reviews: Review[];
}

const initialState: ReviewState = {
  reviews: [],
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setReviews: (state, action: PayloadAction<Review[]>) => {
      state.reviews = action.payload;
    },
    addReview: (state, action: PayloadAction<Review>) => {
      state.reviews.push(action.payload);
    },
    removeReview: (state, action: PayloadAction<string>) => {
      state.reviews = state.reviews.filter((r) => r.id !== action.payload);
    },
    cleanReviews: (state) => {
      state.reviews = [];
    },
  },
});

export const { setReviews, addReview, removeReview, cleanReviews } =
  reviewSlice.actions;
export default reviewSlice.reducer;
