import { createSlice } from "@reduxjs/toolkit";
import { warehouseMaterialsApiSlice } from "./warehouseApiSlice";
import { toast } from "react-toastify";

const warehouseSlice = createSlice({
  name: "warehouseMaterials",
  initialState: null,
  extraReducers: (builder) => {
    builder.addMatcher(
      warehouseMaterialsApiSlice.endpoints.getWarehouseMaterials.matchRejected,
      (state, action) => {
        //RTK Query internal rejection occurs
        //TODO find better solution to distinguish between RTK Query internal rejections and server errors
        console.log("state", action);
        if (action.meta.rejectedWithValue) {
          toast.error("Error while loading warehouse materials");
        }
      }
    );

    builder.addMatcher(
      warehouseMaterialsApiSlice.endpoints.warehouseMaterialCordinates
        .matchRejected,
      () => {
        toast.error("Error while setting warehouse material on map");
      }
    );
  },
});

export default warehouseSlice.reducer;
