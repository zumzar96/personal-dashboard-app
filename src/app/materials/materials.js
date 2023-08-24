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
import { useTheme } from "@mui/material/styles";

const Materials = () => {
  const theme = useTheme();
  const [keyword, setKeyword] = useState(""); //TODO adjust keyword param handling
  const [openMaterialDialog, setOpenMaterialDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [viewMaterialMode, setViewMaterialMode] = useState(false);
  const [checkboxSelectionModel, setCheckboxSelectionModel] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const { data, isError, isFetching } = useGetMaterialsQuery({
    keyword,
    pageNumber: paginationModel.page,
  });

  const [getMaterialByIdOnRowClick, result] = useLazyGetMaterialByIdQuery();

  const paginationModelHandler = (paginationModel) => {
    setPaginationModel(paginationModel);
  };

  const viewMaterialModeHandler = () => {
    setViewMaterialMode(!viewMaterialMode);
  };

  const emptyCheckboxSelectionModelHandler = () => {
    setCheckboxSelectionModel([]);
  };

  const newCheckboxSelectionModelHandler = (checkboxSelectionModel) => {
    setCheckboxSelectionModel(checkboxSelectionModel);
  };

  const toggleMaterialModalHandler = () => {
    setOpenMaterialDialog(!openMaterialDialog);
    if (viewMaterialMode) {
      viewMaterialModeHandler();
    }
  };

  const toggleDeleteMaterialModalHandler = () => {
    setOpenDeleteDialog(!openDeleteDialog);
  };

  const onRowSelectionHandler = (materialId) => {
    getMaterialByIdOnRowClick({ materialId });
    setViewMaterialMode(true);
    setOpenMaterialDialog(true);
  };

  return (
    <>
      <Grid container spacing={1}>
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
            onClick={toggleDeleteMaterialModalHandler}
          >
            Delete
          </CreateButton>
          <CreateButton
            variant="contained"
            onClick={toggleMaterialModalHandler}
          >
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
            paginationModelHandler={paginationModelHandler}
            error={isError}
            loading={isFetching}
            onRowSelectionHandler={onRowSelectionHandler}
            checkboxSelectionModel={checkboxSelectionModel}
            newCheckboxSelectionModelHandler={newCheckboxSelectionModelHandler}
          />
        </Grid>
      </Grid>

      <MaterialDialog
        viewMaterialModeHandler={viewMaterialModeHandler}
        viewMaterialMode={viewMaterialMode}
        openMaterialDialog={openMaterialDialog}
        toggleMaterialModalHandler={toggleMaterialModalHandler} //TODO wrape in separate handler function
        materialById={result}
      ></MaterialDialog>
      <DeleteMaterialDialog
        open={openDeleteDialog}
        toggleDeleteMaterialModalHandler={toggleDeleteMaterialModalHandler}
        checkboxSelectionModel={checkboxSelectionModel} //TODO wrape in separate handler function
        emptyCheckboxSelectionModelHandler={emptyCheckboxSelectionModelHandler}
      ></DeleteMaterialDialog>
    </>
  );
};

export default Materials;
