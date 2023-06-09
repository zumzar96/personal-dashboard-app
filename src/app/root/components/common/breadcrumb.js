import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Icon from "@mdi/react";

const commonBreadcrumbs = ({
  children,
  color,
  variant,
  disabled,
  sx,
  breadcrumbPath,
}) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {breadcrumbPath.map((bData, i, arr) => {
        return (
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            key={bData.pathName}
            color={arr.length - 1 === i ? "black" : null}//TODO ajdust color values
          >
            <Icon path={bData.icon} size={0.7} />
            {bData.pathName}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default commonBreadcrumbs;
