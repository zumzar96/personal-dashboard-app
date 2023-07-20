import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import MaterialsTable from "./components/materialsTable";
import {
  useGetMaterialsQuery,
  useLazyGetMaterialByIdQuery,
} from "./materialsApiSlice";
import BreadcrumbPath from "../root/components/common/breadcrumb";
import { mdiTableAccount, mdiLandPlots } from "@mdi/js";
import SearchInput from "../root/components/common/input";
import CreateButton from "../root/components/common/button";
import MaterialDialog from "./components/materialDialog";
import DeleteMaterialDialog from "./components/materialDeleteDialog";
import * as sxProps from "./styles/styles.ts";

const Materials = () => {
  const [keyword, setKeyword] = useState(""); //TODO adjust keyword param handling
  const [openMaterialDialog, setOpenMaterialDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [viewMaterialMode, setViewMaterialMode] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 1,
  });

  const { data, isError, isFetching } = useGetMaterialsQuery({
    keyword,
    pageNumber: paginationModel.page,
  });

  const [checkboxSelectionModel, setCheckboxSelectionModel] = useState([]);

  const [getMaterialByIdOnRowClick, result] = useLazyGetMaterialByIdQuery();

  const createMaterialHandler = () => {
    setOpenMaterialDialog(true);
    setViewMaterialMode(false);
  };

  const deleteMaterialHandler = () => {
    setOpenDeleteDialog(true);
  };

  const onRowsSelectionHandler = (materialId) => {
    getMaterialByIdOnRowClick({ materialId });
    setViewMaterialMode(true);
    setOpenMaterialDialog(true);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={sxProps.breadcrumbWrapper}>
          <BreadcrumbPath
            breadcrumbPath={[
              {
                pathName: "Dashboard",
                icon: mdiTableAccount,
              },
              {
                pathName: "Materials",
                icon: mdiLandPlots,
              },
            ]}
          />
        </Grid>
        <Grid item xs={12} sx={sxProps.buttonWrapper}>
          <CreateButton
            disabled={!checkboxSelectionModel.length}
            variant="contained"
            onClick={deleteMaterialHandler}
          >
            Delete
          </CreateButton>
          <CreateButton variant="contained" onClick={createMaterialHandler}>
            Create
          </CreateButton>
        </Grid>
        <Grid item xs={12} sx={sxProps.inputWrapper}>
          <SearchInput
            id={"search_input"}
            onChange={(e) => setKeyword(e.target.value)}
            label={"Search"}
          />
        </Grid>
        <Grid sx={sxProps.gridItemWrapper} item xs={12}>
          <MaterialsTable
            data={data}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            error={isError}
            loading={isFetching}
            onRowsSelectionHandler={onRowsSelectionHandler}
            checkboxSelectionModel={checkboxSelectionModel}
            setCheckboxSelectionModel={setCheckboxSelectionModel}
          />
        </Grid>
      </Grid>

      <MaterialDialog
        setViewMaterialMode={setViewMaterialMode}
        viewMaterialMode={viewMaterialMode}
        openMaterialDialog={openMaterialDialog}
        setOpenMaterialDialog={setOpenMaterialDialog} //TODO wrape in separate handler function
        materialById={result}
      ></MaterialDialog>
      <DeleteMaterialDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        checkboxSelectionModel={checkboxSelectionModel} //TODO wrape in separate handler function
        setCheckboxSelectionModel={setCheckboxSelectionModel}
      ></DeleteMaterialDialog>
    </>
  );
};

export default Materials;
