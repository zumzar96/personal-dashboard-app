import { createSlice } from "@reduxjs/toolkit";
import authApi from "./authApiSlice";

const loginSlice = createSlice({
  name: "login",
  socket: null,
  initialState: {
    user: null,
    user_info: localStorage.getItem("user_info")
      ? JSON.parse(localStorage.getItem("user_info"))
      : null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user_info"); //TODO improve logout handling
      state.user_info = null;
    },
    addSocket: (state, action) => {
      state.socket = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.user_info = payload;
        state.user = payload.user;
        localStorage.setItem("user_info", JSON.stringify(state.user_info));
      }
    );
  },
});

export const { logout, addSocket } = loginSlice.actions;

export default loginSlice.reducer;
