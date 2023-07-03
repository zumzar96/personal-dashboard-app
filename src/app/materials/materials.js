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
    //TODO refactor grid layout code
    <Grid
      container
      sx={sxProps.gridContainer}
      xs={10}
      sm={10}
      md={10}
      lg={12}
      xl={12}
    >
      <Grid
        sx={sxProps.gridItemWrapper}
        item
      >
        <Box
          sx={sxProps.breadcrumbWrapper}
        >
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
        </Box>
        <Box
          sx={sxProps.buttonWrapper}
        >
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
        </Box>
        <Box
          sx={sxProps.inputWrapper}
        >
          {/* TODO add separate filter component including search' */}
          <SearchInput
            //TODO
            //sx={{
            // input: {
            //   height: "0.7rem",
            // },
            // "& .MuiInputLabel-shrink": {
            //   transform: "translate(14px, -8px) scale(0.8) !important",
            // },
            // "& .MuiInputLabel-outlined": {
            //   transform: "translate(14px, 9px) scale(1) ",
            // },
            //}}
            id={"search_input"}
            onChange={(e) => setKeyword(e.target.value)}
            label={"Search"}
          />
        </Box>
        <Box
          sx={sxProps.tableWrapper}
        >
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
        </Box>
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
    </Grid>
  );
};

export default Materials;
