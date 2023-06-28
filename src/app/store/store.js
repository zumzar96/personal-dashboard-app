import { configureStore } from "@reduxjs/toolkit";
import authApi from "../login/authApiSlice";
import loginReducer from "../login/loginSlice";
import materialsApi from "../materials/materialsApiSlice";
import rootApiSlice from "../root/rootApiSlice";

export const store = configureStore({
  reducer: {
    [rootApiSlice.reducerPath]: rootApiSlice.reducer,
    login: loginReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rootApiSlice.middleware),
  devTools: true,
});

export default store;
// export const RootState = store.getState
// export const AppDispatch = store.dispatch
