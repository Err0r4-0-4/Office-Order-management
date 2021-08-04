import { createSlice, configureStore } from "@reduxjs/toolkit";

const Authlogin = createSlice({
  name: "auth",
  initialState: { isSignedIn: false },
  reducers: {
    toggle(state) {
      state.isSignedIn = !state.isSignedIn;
    },
  },
});
const store = configureStore({ reducer: Authlogin.reducer });

export const Authactions = Authlogin.actions;
export default store;
