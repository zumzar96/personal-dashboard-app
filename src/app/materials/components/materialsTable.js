import * as React from "react";
import { useState } from "react";
import { DataGrid, GridValueGetterParams } from "@mui/x-data-grid";

const columns = [
  {
    field: "name",
    headerName: "Name",
    type: "number",
    flex: 1,
    minWidth: 150,
    headerAlign: "center",
    align: "center",
  },
  //TODO adjust column names
  {
    field: "brand",
    headerName: "First name",
    flex: 1,
    minWidth: 150,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "category",
    headerName: "Last name",
    flex: 1,
    minWidth: 150,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "description",
    headerName: "Age",
    type: "number",
    flex: 1,
    minWidth: 150,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "user",
    headerName: "Abe",
    type: "number",
    flex: 1,
    minWidth: 150,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "ace",
    headerName: "Ace",
    type: "number",
    flex: 1,
    minWidth: 150,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    flex: 1,
    minWidth: 150,
    headerAlign: "center",
    align: "center",
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

export default function MaterialsTable({
  data,
  paginationModel,
  setPaginationModel,
  loading,
  error,
  onRowsSelectionHandler,
  checkboxSelectionModel,
  setCheckboxSelectionModel,
}) {
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  return (
    <DataGrid
      sx={{
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#8b888f",
          color: "#ffffff",
          borderBottom: "none",
        },
        "& .MuiCheckbox-root": {
          color: `#666464 !important`,
        },
      }}
      loading={loading}
      rows={data === undefined || error ? [] : data.products} //TODO improve error handling & implement custom no data overlay
      getRowId={(row) => row._id}
      rowCount={10}
      columns={columns}
      paginationModel={paginationModel}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 2,
          },
        },
      }}
      onRowClick={(material) => onRowsSelectionHandler(material.row._id)}
      disableRowSelectionOnClick
      onRowSelectionModelChange={(newCheckboxSelectionModel) => {
        setCheckboxSelectionModel(newCheckboxSelectionModel);
      }}
      rowSelectionModel={checkboxSelectionModel}
      paginationMode="server"
      onPaginationModelChange={setPaginationModel}
      pageSizeOptions={[2]}
      checkboxSelection
      keepNonExistentRowsSelected
    />
  );
}
