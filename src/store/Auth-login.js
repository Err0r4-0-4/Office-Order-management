import { createSlice, configureStore } from "@reduxjs/toolkit";

const Authlogin = createSlice({
  name: "auth",
  initialState: { isSignedIn: false, member: "" },
  reducers: {
    toggle(state) {
      state.isSignedIn = !state.isSignedIn;
    },
    allocation(state, action) {
      state.member = action.payload;
    },
  },
});
const store = configureStore({ reducer: Authlogin.reducer });

export const Authactions = Authlogin.actions;
export default store;
