import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import MaterialsTable from "./materialsTable";
import { useGetProductsQuery } from "./materialsApiSlice";
import BreadcrumbPath from "../root/components/common/breadcrumb";
import { mdiTableAccount, mdiLandPlots } from "@mdi/js";
import SearchInput from "../root/components/common/input";

export default function Materials() {
  const [keyword, setKeyword] = useState(""); //TODO adjust keyword param handling
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 2,
  });

  const { data, isLoading, isError, isFetching } = useGetProductsQuery({
    keyword,
    pageNumber: paginationModel.page,
  });

  return (
    //TODO refactor grid layout code
    <Grid container item={true} xs={10} sm={10} md={10} lg={12} xl={12}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Box
          sx={{
            marginTop: "5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "82%",
            }}
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
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "82%",
            }}
          >
            <span>Button</span>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "82%",
            }}
          >
            {/* TODO add separate filter component including search' */}
            <SearchInput
              onChange={(e) => setKeyword(e.target.value)}
              label={"Search"}
            />
          </Box>
          <Box sx={{ display: "flex", height: "30rem", width: "82%" }}>
            <MaterialsTable
              data={data}
              paginationModel={paginationModel}
              setPaginationModel={setPaginationModel}
              error={isError}
              loading={isFetching}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
