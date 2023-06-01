import { configureStore } from "@reduxjs/toolkit";
import loginApi from "../login/loginApi";
import loginReducer from "../login/loginSlice";

export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    login: loginReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginApi.middleware),
});

export default store;
// export const RootState = store.getState
// export const AppDispatch = store.dispatch
