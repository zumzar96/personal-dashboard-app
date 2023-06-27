import { configureStore } from "@reduxjs/toolkit";
import authApi from "../login/authApiSlice";
import loginReducer from "../login/loginSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    login: loginReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
    devTools: true
});

export default store;
// export const RootState = store.getState
// export const AppDispatch = store.dispatch
