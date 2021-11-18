import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";

function Thumbnail({ item, onClickImage }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/movie/${item.Title}`);
  };
  return (
    <Card sx={{ mb: 2 }}>
      <CardMedia
        onClick={onClickImage}
        component="img"
        height="300"
        image={item.Poster}
        alt={item.Title}
        sx={{ cursor: "pointer" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.Title} ({item.Year})
        </Typography>
        <Chip label={item.Type} />
      </CardContent>

      <CardActions>
        <Button color="secondary" onClick={handleNavigate}>
          Show Detail
        </Button>
      </CardActions>
    </Card>
  );
}

Thumbnail.propTypes = {};

export default Thumbnail;
