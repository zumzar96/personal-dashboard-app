import { createSlice } from "@reduxjs/toolkit";
import { warehouseMaterialsApiSlice } from "./warehouseApiSlice";
import { toast } from "react-toastify";

const warehouseSlice = createSlice({
  name: "warehouse",
  initialState: null,
  extraReducers: (builder) => {
    builder.addMatcher(
        warehouseMaterialsApiSlice.endpoints.getWarehouseMaterials.matchRejected,
      () => {
        toast.error("Error while loading warehouse materials");
      }
    );

    builder.addMatcher(
        warehouseMaterialsApiSlice.endpoints.warehouseMaterialCordinates.matchRejected,
      () => {
        toast.error("Error while setting warehouse material on map");
      }
    );
  },
});

export default warehouseSlice.reducer;
