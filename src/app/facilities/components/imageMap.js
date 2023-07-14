import React from "react";
import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import SvgIconC from "../../../assets/svg/undraw_remotely_2j6y.svg";
import { useMap, ImageOverlay } from "react-leaflet";
import DraggableMarker from "./draggableMarker.js";

const ImageMap = ({
  disabled,
  setMap,
  removeMaterialFromMapHandler,
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
        /*TODO */
        //   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://firebasestorage.googleapis.com/v0/b/personaldashboadapp.appspot.com/o/files%2Fstock-example.png%20%20%20%20%20%20%202023-7-14%209%3A49%3A54?alt=media&token=cea53674-762e-4aa9-a888-094abdc1d970"
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
          removeMaterialFromMapHandler={removeMaterialFromMapHandler}
          setWarehouseMaterialCordinates={setWarehouseMaterialCordinates}
        />
      ))}
    </>
  );
};

export default ImageMap;
