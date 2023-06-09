import * as React from "react";
import { DataGrid, GridValueGetterParams } from "@mui/x-data-grid";

const columns = [//TODO adjust column names 
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
    field: "name",
    headerName: "Aae",
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
  error
}) {
  return (
    <DataGrid
      loading={loading}
      rows={data === undefined || error ? [] : data.products}//TODO improve error handling & implement custom no data overlay
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
      paginationMode="server"
      onPaginationModelChange={setPaginationModel}
      pageSizeOptions={[2]}
      checkboxSelection
      disableRowSelectionOnClick
    />
  );
}
