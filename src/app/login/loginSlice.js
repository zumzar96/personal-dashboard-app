import { createSlice } from "@reduxjs/toolkit";
import loginApi from "./loginApi";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
    token: localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null,
  },
  reducers: {
    logout: (state) => {
        localStorage.removeItem("token")
        state.token = null;
     
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      loginApi.endpoints.setLogin.matchFulfilled,
      (state, { payload }) => {
        console.log("token", payload);
        state.token = payload.idToken;
        state.user = payload.user;
        localStorage.setItem("token", JSON.stringify(state.token));
      }
    );
  },
});

export const { logout } = loginSlice.actions


export default loginSlice.reducer;

// export const selectCurrentUser = (state) => state.auth.user;
