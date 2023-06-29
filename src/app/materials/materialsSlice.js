import { createSlice } from "@reduxjs/toolkit";
import { productsApiSlice } from "./materialsApiSlice";
import { toast } from "react-toastify";

const materialsSlice = createSlice({
  name: "materials",
  initialState: null,
  extraReducers: (builder) => {
    builder.addMatcher(
      productsApiSlice.endpoints.createMaterial.matchFulfilled,
      () => {
        toast.success("Create material succes");
      }
    );
    builder.addMatcher(
      productsApiSlice.endpoints.createMaterial.matchRejected,
      () => {
        toast.error("Create material error");
      }
    );
    builder.addMatcher(
      productsApiSlice.endpoints.editMaterial.matchFulfilled,
      () => {
        toast.success("Edit material succes");
      }
    );
    builder.addMatcher(
      productsApiSlice.endpoints.editMaterial.matchRejected,
      () => {
        toast.error("Edit material error");
      }
    );
    builder.addMatcher(
      productsApiSlice.endpoints.deleteMaterials.matchFulfilled,
      () => {
        toast.success("Delete material success");
      }
    );
    builder.addMatcher(
      productsApiSlice.endpoints.deleteMaterials.matchRejected,
      () => {
        toast.error("Delete material error");
      }
    );
  },
});

export default materialsSlice.reducer;
