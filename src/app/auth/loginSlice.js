import { createSlice } from "@reduxjs/toolkit";
import authApi from "./authApiSlice";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    user_info: localStorage.getItem("user_info")
      ? JSON.parse(localStorage.getItem("user_info"))
      : null,
    socket: null,
    persisted_number_of_notificaitons: localStorage.getItem(
      "persisted_number_of_notificaitons"
    )
      ? JSON.parse(localStorage.getItem("persisted_number_of_notificaitons"))
      : 0,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user_info"); //TODO improve logout handling
      state.user_info = null;
    },
    addSocket: (state, action) => {
      state.socket = action.payload;
    },
    setNumberOfNotificaitons: (state, action) => {
      localStorage.setItem(
        "persisted_number_of_notificaitons",
        JSON.stringify(action.payload)
      );
      state.persisted_number_of_notificaitons = action.payload;
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

export const { logout, addSocket, setNumberOfNotificaitons } =
  loginSlice.actions;

export default loginSlice.reducer;
