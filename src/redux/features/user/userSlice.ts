import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (!action.payload?.user) {
        console.error("Invalid user payload:", action.payload);
        return;
      }

      // Create a deep clone of the user object
      const userData = JSON.parse(JSON.stringify(action.payload.user));

      // Ensure subscriptions exists and is properly formatted
      const subscriptions = Array.isArray(userData.subscriptions)
        ? userData.subscriptions
        : [];

      state.user = {
        ...userData,
        subscriptions, // This guarantees subscriptions is always an array
      };
      state.token = action.payload.token;

      // console.log("Redux user state updated:", {
      //   id: state.user?.id,
      //   subscriptionCount: subscriptions.length,
      // });
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;