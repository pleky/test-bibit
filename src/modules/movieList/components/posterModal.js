import { Modal } from "@mui/material";
import React from "react";
import Fade from "@mui/material/Fade";
import { Box } from "@mui/system";
import PropTypes from "prop-types";

export default function PosterModal({ visible, onClose, imageUrl }) {
  return (
    <Modal open={visible} onClose={onClose}>
      <Fade in={visible}>
        <Box sx={style}>
          <img src={imageUrl} loading="lazy" />
        </Box>
      </Fade>
    </Modal>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  boxShadow: 24,
  p: 1.5,
  display: "flex",
  justifyContent: "center",
  borderRadius: "8px",
};

PosterModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
};
