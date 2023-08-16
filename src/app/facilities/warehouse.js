import React from "react";
import { useState, useEffect } from "react";
import * as sxProps from "./styles/styles.ts";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import BreadcrumbPath from "../root/components/common/breadcrumb.js";
import { mdiTableAccount, mdiChartTimeline } from "@mdi/js";
import SearchInput from "../root/components/common/input.js";
import { MapContainer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import ImageMap from "./components/imageMap.js";
import {
  useGetWarehouseMaterialsQuery,
  useWarehouseMaterialCordinatesMutation,
} from "./warehouseApiSlice.js";
import Loader from "../root/components/common/loader.js";
import { toast } from "react-toastify";
import WarehouseMaterialsIconsBox from "./components/iconsBox.js";
import { useTheme } from "@mui/material";

const Warehouse = () => {
  const theme = useTheme();
  const [keyword, setKeyword] = useState(""); //TODO adjust keyword param handling
  const [isMapInteractive, setIsMapInteractive] = useState(false);
  const [currentMapMaterials, setCurrentMapMaterials] = useState([]);
  const [iconBoxMaterials, setIconBoxMaterials] = useState([]);
  const [map, setMap] = useState();

  const [
    setWarehouseMaterialCordinates,
    {
      isLoading: setWarehouseMaterialCordinatesLoading,
      isError: setWarehouseMaterialCordinatesError,
      reset: materialCreateResetMuatation,
    },
  ] = useWarehouseMaterialCordinatesMutation();

  const {
    data: werehouseMaterials,
    isError: warehouseMaterialsError,
    isFetching: warehouseMaterialsFetching,
    isLoading: warehouseMaterialsLoading,
  } = useGetWarehouseMaterialsQuery({
    keyword,
  });

  const onDragHandler = (e, draggedMaterial) => {
    e.dataTransfer.setData(`draggedMaterial`, JSON.stringify(draggedMaterial));
  };

  const onDropHandler = (e) => {
    const draggedMaterial = JSON.parse(
      e.dataTransfer.getData("draggedMaterial")
    );
    const rect = e.target.getBoundingClientRect();
    const coordinates = map.containerPointToLatLng(
      L.point([e.clientX - rect.left, e.clientY - rect.top])
    );
    draggedMaterial.cordinates = coordinates;
    setIconBoxMaterials(
      iconBoxMaterials.filter((item) => draggedMaterial._id !== item._id)
    );
    setWarehouseMaterialCordinates({
      id: draggedMaterial._id,
      cordinates: draggedMaterial.cordinates,
    });
    setCurrentMapMaterials([...currentMapMaterials, draggedMaterial]);
  };

  const mapInteractiveHandler = (e) => {
    e.stopPropagation();
    setIsMapInteractive(!isMapInteractive);
  };

  const removeMaterialFromMapHandler = (material) => {
    setCurrentMapMaterials(() => {
      return currentMapMaterials.filter((item) => material._id !== item._id);
    });
    setIconBoxMaterials([...iconBoxMaterials, material]);
    setWarehouseMaterialCordinates({
      id: material._id,
      cordinates: null,
    });
  };

  useEffect(() => {
    if (werehouseMaterials) {
      setCurrentMapMaterials(werehouseMaterials.mapMaterials);
      setIconBoxMaterials(werehouseMaterials.iconboxMaterials);
    }
  }, [warehouseMaterialsLoading]);

  return (
    <Grid container spacing={theme.spacing(1)}>
      <Grid item xs={12} sx={sxProps.breadcrumbWrapper}>
        <BreadcrumbPath
          breadcrumbPath={[
            {
              pathName: "Dashboard",
              icon: mdiTableAccount,
            },
            {
              pathName: "Warehouse",
              icon: mdiChartTimeline,
            },
          ]}
        />
      </Grid>
      <Grid item xs={12} sx={sxProps.inputWrapper}>
        {/* TODO add separate filter component including search' */}
        <SearchInput
          id={"search_input"}
          onChange={(e) => setKeyword(e.target.value)}
          label={"Search"}
        />
      </Grid>
      <Grid item xs={12} sx={sxProps.buttonWrapper}>
        <FormControlLabel
          control={<Switch onClick={mapInteractiveHandler} />}
          label={isMapInteractive ? "Lock map" : "Unlock map"}
        />
      </Grid>

      <Grid item xs={12}>
        <Box sx={sxProps.warehouseWrapper}>
          <Box
            sx={sxProps.mapContainerWrapper}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={onDropHandler}
          >
            <MapContainer
              center={[5, 208]}
              zoom={1}
              maxZoom={10}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "4px",
              }}
            >
              {warehouseMaterialsLoading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "2rem",
                  }}
                >
                  <Loader></Loader>
                </Box>
              ) : (
                <ImageMap
                  disabled={isMapInteractive}
                  removeMaterialFromMapHandler={removeMaterialFromMapHandler}
                  setMap={setMap}
                  currentMapMaterials={currentMapMaterials}
                  setWarehouseMaterialCordinates={
                    setWarehouseMaterialCordinates
                  }
                ></ImageMap>
              )}
            </MapContainer>
          </Box>
          <WarehouseMaterialsIconsBox
            warehouseMaterialsLoading={warehouseMaterialsLoading}
            iconBoxMaterials={iconBoxMaterials}
            isMapInteractive={isMapInteractive}
            onDragHandler={onDragHandler}
          ></WarehouseMaterialsIconsBox>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Warehouse;
