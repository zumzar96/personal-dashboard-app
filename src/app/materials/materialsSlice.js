import { createSlice } from "@reduxjs/toolkit";
import { materialsApiSlice } from "./materialsApiSlice";
import { toast } from "react-toastify";

const materialsSlice = createSlice({
  name: "materials",
  initialState: null,
  extraReducers: (builder) => {
    builder.addMatcher(
      materialsApiSlice.endpoints.getMaterials.matchRejected,
      () => {
        toast.error("Error while loading materials");
      }
    );
    builder.addMatcher(
      materialsApiSlice.endpoints.createMaterial.matchFulfilled,
      () => {
        toast.success("Create material succes");
      }
    );
    builder.addMatcher(
      materialsApiSlice.endpoints.createMaterial.matchRejected,
      () => {
        toast.error("Create material error");
      }
    );
    builder.addMatcher(
      materialsApiSlice.endpoints.editMaterial.matchFulfilled,
      () => {
        toast.success("Edit material succes");
      }
    );
    builder.addMatcher(
      materialsApiSlice.endpoints.editMaterial.matchRejected,
      () => {
        toast.error("Edit material error");
      }
    );
    builder.addMatcher(
      materialsApiSlice.endpoints.deleteMaterials.matchFulfilled,
      () => {
        toast.success("Delete material success");
      }
    );
    builder.addMatcher(
      materialsApiSlice.endpoints.deleteMaterials.matchRejected,
      () => {
        toast.error("Delete material error");
      }
    );
  },
});

export default materialsSlice.reducer;
