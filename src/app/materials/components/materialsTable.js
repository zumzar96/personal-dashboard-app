import * as React from "react";
import { useState } from "react";
import { DataGrid, GridValueGetterParams } from "@mui/x-data-grid";
import ImageIcon from "@mui/icons-material/Image";
import moment from "moment";
import Typography from "../../root/components/common/typography";

const columns = [
  {
    field: "name",
    headerName: "Name",
    type: "text",
    flex: 1,
    minWidth: 120,
    // headerAlign: "center",
    // align: "center",
    renderCell: ({ row: { name } }) => {
      return (
        <Typography variant={"h5"} color={"neutral.light"}>
          {name}
        </Typography>
      );
    },
  },
  {
    field: "brand",
    headerName: "Brand",
    flex: 1,
    minWidth: 120,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "category",
    headerName: "Category",
    flex: 1,
    minWidth: 120,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "description",
    headerName: "Description",
    type: "number",
    flex: 1,
    minWidth: 120,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "image",
    headerName: "Image",
    type: "file",
    flex: 1,
    minWidth: 120,
    headerAlign: "center",
    align: "center",
    renderCell: () => {
      return <ImageIcon sx={{ color: "#5fc6cf" }} />; //<-- Mui icons should be put this way here.
    },
  },
  {
    field: "createdAt",
    headerName: "Created",
    // type: "date",
    flex: 1,
    minWidth: 120,
    headerAlign: "center",
    align: "center",
    valueFormatter: (params) =>
      moment(params?.value).format("DD/MM/YYYY hh:mm A"),
  },
  {
    field: "updatedAt",
    headerName: "Updated",
    // type: "date",
    flex: 1,
    minWidth: 120,
    headerAlign: "center",
    align: "center",
    valueFormatter: (params) =>
      moment(params?.value).format("DD/MM/YYYY hh:mm A"),
  },
  // {
  //   field: "updatedAt",
  //   headerName: "Updated",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   flex: 1,
  //   minWidth: 150,
  //   headerAlign: "center",
  //   align: "center",
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  // },
];

export default function MaterialsTable({
  data,
  paginationModel,
  paginationModelHandler,
  loading,
  error,
  onRowSelectionHandler,
  checkboxSelectionModel,
  newCheckboxSelectionModelHandler,
}) {
  return (
    <DataGrid
      slotProps={{
        panel: {
          sx: {
            "& .MuiPaper-root": {
              // backgroundColor: "green",
              minWidth: "200px",
            },
            "& .MuiFormControl-root": {
              // backgroundColor: "purple",
              ":not(:first-child)": { width: "100%" },
            },
            "& .MuiInput-input": {
              height: "1.2rem",
              // backgroundColor: "blue",

              // width: "2rem",
            },
            "& .MuiInputLabel-root": {
              // backgroundColor: "red",
              marginBottom: "0.5rem",
            },
            "& .MuiInputLabel-shrink": {
              transform: "translate(-1px, 5px) scale(0.8) !important",
            },
            // "& .MuiInputLabel-outlined": {
            //   transform: "translate(14px, 10px) scale(1)",
            // },
            "& .MuiDataGrid-filterForm": {
              display: "flex",
              flexDirection: "column",
              // backgroundColor: "red",
              alignItems: "flex-end",
              // width: "5rem",
            },
          },
        },
      }}
      loading={loading}
      rows={loading || error ? [] : data.materials} //TODO mui data grid issue https://github.com/mui/mui-x/issues/3650#issuecomment-1034113913
      getRowId={(row) => row._id}
      rowCount={data?.count} //TODO mui data grid issue https://github.com/mui/mui-x/issues/3650#issuecomment-1034113913
      columns={columns}
      paginationModel={paginationModel}
      initialState={{
        pagination: {
          paginationModel,
        },
      }}
      onRowClick={(material) => onRowSelectionHandler(material.row._id)}
      disableRowSelectionOnClick
      onRowSelectionModelChange={(newCheckboxSelectionModel) => {
        newCheckboxSelectionModelHandler(newCheckboxSelectionModel);
      }}
      rowSelectionModel={checkboxSelectionModel}
      paginationMode="server"
      onPaginationModelChange={paginationModelHandler}
      checkboxSelection
      keepNonExistentRowsSelected
    />
  );
}
