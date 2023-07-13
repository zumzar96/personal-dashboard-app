import React from "react";
import * as sxProps from "../styles/styles.ts";
import Box from "@mui/material/Box";
import Loader from "../../root/components/common/loader.js";
import SvgIconC from "../../../assets/svg/fabric-material-svgrepo-com.svg";
import { Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

const IconBox = ({
  warehouseMaterialsLoading,
  iconBoxMaterials,
  isMapInteractive,
  onDragHandler,
}) => {
  return (
    <Box sx={sxProps.materialsIconBoxWrapper}>
      {warehouseMaterialsLoading ? (
        <Loader></Loader>
      ) : (
        iconBoxMaterials.map((material, index) => (
          <Tooltip title={material.name} placement="top-start">
            <Box
              key={material.id}
              draggable={isMapInteractive}
              onDragStart={(e) => onDragHandler(e, material)}
              sx={sxProps.boxMaterialWrapper}
            >
              <img
                style={{ width: "4rem", height: "4rem" }}
                src={SvgIconC}
                draggable={isMapInteractive}
              />
              <Box>
                <Typography sx={sxProps.boxMaterialTextWrapper}>
                  {material.name}
                </Typography>
              </Box>
            </Box>
          </Tooltip>
        ))
      )}
    </Box>
  );
};

export default IconBox;
