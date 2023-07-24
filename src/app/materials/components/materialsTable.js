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
        <Typography variant={"h5"} color={'neutral.light'}>
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
      slotProps={{
        panel: {
          sx: {
            "& .MuiInput-input": {
              height: "1.2rem",
            },
            // '& .MuiDataGrid-filterForm': {
            //   bgcolor: 'lightblue',
            // },
          },
        },
      }}
      loading={loading}
      rows={data === undefined || error ? [] : data.materials} //TODO improve error handling & implement custom no data overlay
      getRowId={(row) => row._id}
      rowCount={data?.pages} //TODO remove ? operator
      columns={columns}
      paginationModel={paginationModel}
      initialState={{
        pagination: {
          paginationModel,
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
      // pageSizeOptions={[4]}
      checkboxSelection
      keepNonExistentRowsSelected
    />
  );
}
