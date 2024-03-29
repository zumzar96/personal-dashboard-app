import { configureStore } from "@reduxjs/toolkit";
import authApi from "../auth/authApiSlice";
import loginReducer from "../auth/loginSlice";
import materialsApi from "../materials/materialsApiSlice";
import rootApiSlice from "../root/rootApiSlice";
import materialsReducer from "../materials/materialsSlice";
import warehouseReducer from "../facilities/warehouseSlice";

export const store = configureStore({
  reducer: {
    [rootApiSlice.reducerPath]: rootApiSlice.reducer,
    login: loginReducer,
    materials: materialsReducer,
    warehouse: warehouseReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rootApiSlice.middleware),
  devTools: true,
});

export default store;
// export const RootState = store.getState
// export const AppDispatch = store.dispatch
