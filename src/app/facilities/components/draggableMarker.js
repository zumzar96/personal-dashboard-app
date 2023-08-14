import React from "react";
import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import * as sxProps from "../styles/styles.ts";
import "leaflet/dist/leaflet.css";
import SvgIconC from "../../../assets/svg/fabric-material-svgrepo-com.svg";
import SvgIconMarker from "../../../assets/svg/map-marker-slash-svgrepo-com.svg";
import SvgIconMarkerT from "../../../assets/svg/undraw_remotely_2j6y.svg";
import { Icon } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import "../styles/draggableMarker.css";

const myIcon = new Icon({
  iconUrl: SvgIconC,
  iconSize: [60, 100],
});

const DraggableMarker = ({
  material,
  disabled,
  removeMaterialFromMapHandler,
  setWarehouseMaterialCordinates,
}) => {
  const [position, setPosition] = useState(material.cordinates || null);
  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {//TODO reasearch all eventHandlers
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          setWarehouseMaterialCordinates({
            id: material._id,
            cordinates: marker.getLatLng(),
          });
        }
      },
    }),
    []
  );

  // useEffect(() => {
  //   if (position) {
  //     setWarehouseMaterialCordinates({
  //       id: material._id,
  //       cordinates: position,
  //     });
  //   }
  // }, [position.lat, position.lng]);

  return (
    <Marker
      draggable={disabled}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={myIcon}
    >
      <Popup minWidth={90}>
        {/* TODO */}
        <div>
          <div>
            <span style={{ color: "#808080", fontSize: "15px" }}>Name:</span>
            <span style={{ color: "#464444", fontSize: "15px" }}>
              {material.name}
            </span>
          </div>
          <div>
            <span style={{ color: "#808080", fontSize: "15px" }}>
              Count in stock:
            </span>
            <span style={{ color: "#464444", fontSize: "15px" }}>
              {material.countInStock}
            </span>
          </div>
          <div>
            <span style={{ color: "#808080", fontSize: "15px" }}>Brand:</span>
            <span style={{ color: "#464444", fontSize: "15px" }}>
              {material.brand}
            </span>
          </div>
          <div>
            <span style={{ color: "#808080", fontSize: "15px" }}>
              Category:
            </span>
            <span style={{ color: "#464444", fontSize: "15px" }}>
              {material.category}
            </span>
          </div>
          <div>
            <span style={{ color: "#808080", fontSize: "15px" }}>
              Description:
            </span>
            <span style={{ color: "#464444", fontSize: "15px" }}>
              {material.description}
            </span>
          </div>
          <div style={{ width: "100px" }}>
            <button
              className={disabled ? "btn" : "btnDisabled"}
              disabled={!disabled}
              onClick={() => removeMaterialFromMapHandler(material)}
            >
              <svg
                style={{ marginBottom: "-5px" }}
                width="22px"
                height="22px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.4126 9.82746C14.4085 9.41327 14.0694 9.08082 13.6553 9.08492C13.2411 9.08902 12.9086 9.42811 12.9127 9.84231L14.4126 9.82746ZM12.9732 11.5923L12.4309 11.0742L12.4309 11.0742L12.9732 11.5923ZM11.2662 11.5849C10.852 11.5892 10.5197 11.9284 10.524 12.3426C10.5282 12.7568 10.8675 13.0891 11.2817 13.0848L11.2662 11.5849ZM4.32782 18.489C4.04454 18.7912 4.05988 19.2658 4.36208 19.5491C4.66428 19.8323 5.1389 19.817 5.42218 19.5148L4.32782 18.489ZM8.58118 16.1448C8.86446 15.8426 8.84912 15.368 8.54692 15.0847C8.24472 14.8014 7.7701 14.8168 7.48682 15.119L8.58118 16.1448ZM19.0719 4.95607C19.3554 4.654 19.3402 4.17937 19.0382 3.89594C18.7361 3.61252 18.2615 3.62763 17.9781 3.9297L19.0719 4.95607ZM15.7356 6.3197C15.4521 6.62176 15.4672 7.0964 15.7693 7.37982C16.0714 7.66324 16.546 7.64813 16.8294 7.34607L15.7356 6.3197ZM16.9193 6.4367C16.7005 6.085 16.238 5.97726 15.8863 6.19606C15.5346 6.41486 15.4269 6.87735 15.6457 7.22906L16.9193 6.4367ZM15.4947 14.6089L16.0355 15.1285L16.0371 15.1269L15.4947 14.6089ZM11.2739 19.0019L10.7333 19.5217C10.8747 19.6688 11.07 19.7519 11.274 19.7519C11.4781 19.7518 11.6734 19.6687 11.8148 19.5215L11.2739 19.0019ZM8.57466 15.1121C8.28759 14.8135 7.81281 14.8041 7.51421 15.0912C7.21561 15.3783 7.20626 15.8531 7.49334 16.1517L8.57466 15.1121ZM16.8306 7.34482C17.1139 7.04263 17.0986 6.568 16.7964 6.28471C16.4942 6.00142 16.0196 6.01675 15.7363 6.31894L16.8306 7.34482ZM7.48683 15.1189C7.20354 15.4211 7.21887 15.8958 7.52106 16.1791C7.82325 16.4623 8.29788 16.447 8.58117 16.1448L7.48683 15.1189ZM6.05895 14.6112C6.3143 14.9374 6.78569 14.9948 7.11184 14.7394C7.43799 14.4841 7.49539 14.0127 7.24005 13.6865L6.05895 14.6112ZM7.05023 5.82188L7.59254 6.33995L7.59282 6.33966L7.05023 5.82188ZM14.4837 5.90251C14.8044 6.1647 15.2769 6.11728 15.5391 5.79661C15.8013 5.47594 15.7539 5.00344 15.4332 4.74125L14.4837 5.90251ZM12.2749 8.45016C12.5932 8.71526 13.0661 8.67216 13.3312 8.35389C13.5963 8.03562 13.5532 7.56271 13.235 7.29761L12.2749 8.45016ZM11.2739 7.33488L11.2738 6.58484L11.2662 6.58492L11.2739 7.33488ZM9.57469 8.07743L9.03243 7.55931L9.03243 7.55931L9.57469 8.07743ZM8.88517 9.83488L9.63523 9.83678L9.63514 9.82746L8.88517 9.83488ZM8.81795 11.8589C9.07033 12.1873 9.54118 12.249 9.86963 11.9966C10.1981 11.7442 10.2597 11.2733 10.0074 10.9449L8.81795 11.8589ZM12.9127 9.84231C12.9173 10.3059 12.7419 10.7487 12.4309 11.0742L13.5154 12.1105C14.1004 11.4983 14.421 10.6767 14.4126 9.82746L12.9127 9.84231ZM12.4309 11.0742C12.1205 11.3991 11.7011 11.5804 11.2662 11.5849L11.2817 13.0848C12.1268 13.0761 12.9299 12.7233 13.5154 12.1105L12.4309 11.0742ZM5.42218 19.5148L8.58118 16.1448L7.48682 15.119L4.32782 18.489L5.42218 19.5148ZM17.9781 3.9297L15.7356 6.3197L16.8294 7.34607L19.0719 4.95607L17.9781 3.9297ZM15.6457 7.22906C16.9993 9.40494 16.7086 12.2518 14.9523 14.0909L16.0371 15.1269C18.2695 12.7892 18.6319 9.18953 16.9193 6.4367L15.6457 7.22906ZM14.9539 14.0893L10.7331 18.4823L11.8148 19.5215L16.0355 15.1285L14.9539 14.0893ZM11.8146 18.4821L8.57466 15.1121L7.49334 16.1517L10.7333 19.5217L11.8146 18.4821ZM15.7363 6.31894L7.48683 15.1189L8.58117 16.1448L16.8306 7.34482L15.7363 6.31894ZM7.24005 13.6865C5.52774 11.4994 5.68115 8.34081 7.59254 6.33995L6.50791 5.30381C4.07978 7.8456 3.88898 11.8395 6.05895 14.6112L7.24005 13.6865ZM7.59282 6.33966C9.44439 4.39935 12.4178 4.21338 14.4837 5.90251L15.4332 4.74125C12.7573 2.55346 8.89768 2.79951 6.50763 5.3041L7.59282 6.33966ZM13.235 7.29761C12.683 6.83784 11.9906 6.58478 11.2738 6.58488L11.274 8.08488C11.636 8.08483 11.9895 8.21242 12.2749 8.45016L13.235 7.29761ZM11.2662 6.58492C10.4211 6.59363 9.618 6.94647 9.03243 7.55931L10.1169 8.59556C10.4274 8.2707 10.8468 8.08932 11.2817 8.08484L11.2662 6.58492ZM9.03243 7.55931C8.44749 8.17149 8.12681 8.99302 8.13521 9.8423L9.63514 9.82746C9.63055 9.36391 9.80592 8.92107 10.1169 8.59556L9.03243 7.55931ZM8.13518 9.83299C8.13333 10.5656 8.37277 11.2795 8.81795 11.8589L10.0074 10.9449C9.76647 10.6314 9.63415 10.241 9.63517 9.83677L8.13518 9.83299Z"
                  fill="#5b5555"
                />
              </svg>
            </button>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default DraggableMarker;
