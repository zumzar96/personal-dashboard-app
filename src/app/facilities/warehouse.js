import React from "react";
import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import * as sxProps from "./styles/styles.ts";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import BreadcrumbPath from "../root/components/common/breadcrumb.js";
import { mdiTableAccount, mdiChartTimeline } from "@mdi/js";
import CreateButton from "../root/components/common/button.js";
import SearchInput from "../root/components/common/input.js";
import SvgIconC from "../../assets/svg/fabric-material-svgrepo-com.svg";
import { MapContainer } from "react-leaflet";
import { LatLngBounds } from "leaflet";
import { Icon } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import SvgIcon from "@mui/material/SvgIcon";
import ImageMap from "./components/imageMap.js";
import {
  useGetWarehouseMaterialsQuery,
  useWarehouseMaterialCordinatesMutation,
} from "./warehouseApiSlice.js";

const Warehouse = () => {
  const [keyword, setKeyword] = useState(""); //TODO adjust keyword param handling
  const [materialsLocation, setMaterialsLocation] = useState([]);

  const [map, setMap] = useState();

  const [removeFromMapMaterial, setRemoveFromMapMaterial] = useState();

  const [isMapInteractive, setIsMapInteractive] = useState(false);

  const { data, isError, isFetching } = useGetWarehouseMaterialsQuery({
    keyword,
  });

  const [currentMapMaterials, setCurrentMapMaterials] = useState([]);

  const [setWarehouseMaterialCordinates] =
    useWarehouseMaterialCordinatesMutation();

  const [draggedMaterial, setDraggedMaterial] = useState();

  const [drop, setDrop] = useState(false);

  const onDragHandler = (e, widgetType) => {
    setDraggedMaterial(widgetType);
  };

  const onDropHandler = (e) => {
    const rect = e.target.getBoundingClientRect();
    const coordinates = map.containerPointToLatLng(
      L.point([e.clientX - rect.left, e.clientY - rect.top])
    );

    setDraggedMaterial((prevState) => ({
      ...prevState,
      cordinates: coordinates,
    }));
    setDrop(!drop);
  };

  const interactMapHandler = (e) => {
    e.stopPropagation();
    setIsMapInteractive(!isMapInteractive);
  };

  useEffect(() => {
    if (removeFromMapMaterial) {
      setCurrentMapMaterials(
        currentMapMaterials.filter((m) => m.name !== removeFromMapMaterial.name)
      );
      setRemoveFromMapMaterial(null);
    }
  }, [removeFromMapMaterial]);

  useEffect(() => {
    if (draggedMaterial) {
      setWarehouseMaterialCordinates({
        id: draggedMaterial._id,
        cordinates: draggedMaterial.cordinates,
      });
      setCurrentMapMaterials([...currentMapMaterials, draggedMaterial]);
    }
  }, [drop]);

  useEffect(() => {
    if (data) {
      setCurrentMapMaterials(
        data?.materials.filter((m) => m.cordinates !== null)
      );
    }
  }, [isFetching]);



  return (
    <Grid
      container
      sx={sxProps.gridContainer}
      xs={10}
      sm={10}
      md={12}
      lg={12}
      xl={12}
    >
      <Grid sx={sxProps.gridItemWrapper} item>
        <Box sx={sxProps.breadcrumbWrapper}>
          <BreadcrumbPath
            breadcrumbPath={[
              {
                pathName: "Dashboard",
                icon: mdiTableAccount,
              },
              {
                pathName: "Facilities",
                icon: mdiChartTimeline,
              },
            ]}
          />
        </Box>
        <Box sx={sxProps.inputWrapper}>
          {/* TODO add separate filter component including search' */}
          <SearchInput
            id={"search_input"}
            onChange={(e) => setKeyword(e.target.value)}
            label={"Search"}
          />
        </Box>
        <Box sx={sxProps.buttonWrapper}>
          <FormControlLabel
            control={<Switch onClick={interactMapHandler} />}
            label={isMapInteractive ? "Lock map" : "Unlock map"}
          />
        </Box>

        <Box sx={sxProps.warehouseWrapper}>
          <Box
            sx={sxProps.mapContainerWrapper}
            // draggable
            // onMouseLeave={onMouseLeaveHandler}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            // draggable
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
              // zoomControl={false}
            >
              <ImageMap
                disabled={isMapInteractive}
                setRemoveFromMapMaterial={setRemoveFromMapMaterial}
                setMap={setMap}
                currentMapMaterials={currentMapMaterials}
                setWarehouseMaterialCordinates={setWarehouseMaterialCordinates}
              ></ImageMap>
            </MapContainer>
          </Box>
          <Box sx={sxProps.materialsIconBoxWrapper}>
            {data?.materials
              .filter((m) => m.cordinates === null)
              .map((material, index) => (
                <Box
                  key={material.id}
                  draggable={isMapInteractive}
                  onDragStart={(e) => onDragHandler(e, material)}
                  sx={sxProps.boxMaterialWrapper}
                >
                  {/* <Box
                  // sx={{
                  //   width: "4rem",
                  //   height: "4rem",
                  //   // backgroundColor: "green",
                  // }}
                > */}
                  <img
                    style={{ width: "4rem", height: "4rem" }}
                    src={SvgIconC}
                    draggable={isMapInteractive}
                  />
                  {/* </Box> */}
                  <Box>
                    <Typography sx={sxProps.boxMaterialTextWrapper}>
                      {material.name}
                    </Typography>
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Warehouse;
