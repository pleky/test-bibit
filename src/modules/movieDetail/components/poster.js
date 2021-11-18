import { Box } from "@mui/system";
import React from "react";
import Proptypes from "prop-types";

export default function Poster({ url }) {
  return (
    <Box sx={style}>
      <img src={url} alt={url} style={{ width: "100%", height: "auto" }} />
    </Box>
  );
}

const style = {
  display: "flex",
  justifyContent: "center",
  borderRadius: "10px",
  overflow: "hidden",
  backgroundColor: "white",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  overflow: "hidden",
  flex: 2.4,
  marginBottom: 2,
};

Poster.propTypes = {
  url: Proptypes.string.isRequired,
};
