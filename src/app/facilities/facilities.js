import React from "react";
import { useState } from "react";
import * as sxProps from "./styles/styles.ts";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import BreadcrumbPath from "../root/components/common/breadcrumb";
import { mdiTableAccount, mdiChartTimeline } from "@mdi/js";
import CreateButton from "../root/components/common/button";
import SearchInput from "../root/components/common/input";
import {
  MapContainer,
  Marker,
  Popup,
  useMap,
  TileLayer,
  ImageOverlay,
} from "react-leaflet";
import { LatLngBounds } from "leaflet";

const Facilities = () => {
  const boundss = [
    [34, 9],
    [32, 11],
  ];
  const [materialsLocation, setMaterialsLocation] = useState([]);

  //   const onDropHandler = (e) => {
  //     console.log("hoce,", e.dataTransfer);
  // const parsed = JSON.parse(e.dataTransfer.getData("dragged"));
  // console.log("parsed", parsed);
  // const rect = e.target.getBoundingClientRect();
  // const coordinates = map.containerPointToLatLng(
  //   L.point([e.clientX - rect.left, e.clientY - rect.top])
  // );
  // parsed.coordinates = coordinates;

  // setStorageFloorPlanDevices(() => {
  //   return storageFloorPlanDevices.filter((item) => parsed.id !== item.id);
  // });

  // setCurrentFloorPlanDevices([...currentFloorPlanDevices, parsed]);
  // setActiveBlur(false);
  //   };

  const testDrags = [
    { name: "test", cordinates: "test" },
    { name: "test1", cordinates: "test1" },
  ];

  const onDragHandler = (e, widgetType) => {
    e.dataTransfer.setData("widgetType", widgetType);
  };

  const onDropHandler = (e) => {
    const materialsLoc = e.dataTransfer.getData("widgetType");
    const materialsLocccc = e.dataTransfer;
    console.log("materialsLocccc", materialsLocccc);
    setMaterialsLocation([...materialsLocation, materialsLoc]);
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  console.log("materials cordinates", materialsLocation);

  return (
    <Grid
      container
      sx={sxProps.gridContainer}
      xs={10}
      sm={10}
      md={10}
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
        <Box sx={sxProps.facilitiesWrapper}>
          <Box
            sx={sxProps.mapWrapper}
            draggable
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = "move";
              // console.log("e.dataTransfer.dropEffect", e.dataTransfer);
            }}
            onDrop={onDropHandler}
          >
            <link
              rel="stylesheet"
              href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
              integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
              crossorigin=""
            />
            <script
              src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
              integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
              crossorigin=""
            ></script>
            <MapContainer
              center={[5, 208]}
              zoom={1}
              maxZoom={10}
              style={{ width: "100%", height: "100%" }}
              // zoomControl={false}
            >
              {/* <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://firebasestorage.googleapis.com/v0/b/personaldashboadapp.appspot.com/o/files%2FScreenshot%202023-06-27%20164047.png%20%20%20%20%20%20%202023-7-4%2010%3A0%3A52?alt=media&token=f05ea013-22ce-4b93-8cff-b808ff4e3479"
            /> */}
              <ImageOverlay
                //   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://firebasestorage.googleapis.com/v0/b/personaldashboadapp.appspot.com/o/files%2FScreenshot%202023-06-27%20164047.png%20%20%20%20%20%20%202023-7-4%2010%3A0%3A52?alt=media&token=f05ea013-22ce-4b93-8cff-b808ff4e3479"
                bounds={[
                  [-526.5, -125],
                  [521.5, 523],
                ]}
                //   opacity={0.5}
                //   zIndex={10}
              />
              {/* <Marker position={[51.505, -0.09]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker> */}
            </MapContainer>
          </Box>
          <Box sx={sxProps.facilityMaterialsWrapper}>
            {testDrags.map((text, index) => (
              <div
                key={text}
                disablePadding
                // sx={{ display: "block" }}
                draggable
                onDragStart={(e) => onDragHandler(e, text.name)}
                // onClick={() => navigate(`${pathname}/stats`)}
              >
                {text.name}
              </div>
            ))}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Facilities;
