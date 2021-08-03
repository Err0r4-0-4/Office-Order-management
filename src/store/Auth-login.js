import React from "react";
import { createSlice } from "@reduxjs/toolkit";

createSlice({
  name: "auth",
  initialState: { isSignedIn: false },
  reducers: {
    toggle,
  },
});
const Authlogin = () => {
  return <div></div>;
};

export default Auth - login;
