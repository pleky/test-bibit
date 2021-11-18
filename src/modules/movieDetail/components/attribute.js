import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import PropTypes from "prop-types";

export default function Attribute({ title, value, icon }) {
  return (
    <Box sx={styles.container}>
      {icon}
      <Typography variant="caption" mt={0.5}>
        {title}
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  );
}

const styles = {
  container: {
    padding: 2,
    border: "1px solid #DDD",
    marginBottom: 2,
    borderRadius: "10px",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
};

Attribute.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.element,
};
