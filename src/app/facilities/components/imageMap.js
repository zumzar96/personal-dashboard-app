import React from "react";
import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import * as sxProps from "../styles/styles.ts";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import SvgIconC from "../../../assets/svg/undraw_remotely_2j6y.svg";
import { Icon } from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  useMap,
  TileLayer,
  ImageOverlay,
} from "react-leaflet";
import DraggableMarker from "./draggableMarker.js";

const ImageMap = ({
  disabled,
  setMap,
  setRemoveFromMapMaterial,
  setActiveBlurForStorage,
  currentMapMaterials,
  setWarehouseMaterialCordinates,
}) => {
  const map = useMap();

  useEffect(() => {
    setMap(map);
  }, [map]);


  return (
    <>
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
      {currentMapMaterials.map((material) => (
        <DraggableMarker
          disabled={disabled}
          key={material.name}
          material={material}
          setRemoveFromMapMaterial={setRemoveFromMapMaterial}
          setWarehouseMaterialCordinates={setWarehouseMaterialCordinates}
        />
      ))}
    </>
  );
};

export default ImageMap;
