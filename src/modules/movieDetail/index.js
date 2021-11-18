import { Container, containerClasses, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Layout from "../../components/layout";
import { fetchMovieDetailAction } from "./action";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import GradeIcon from "@mui/icons-material/Grade";
import Attribute from "./components/attribute";
import { getFirstItemFromStr } from "./helpers";
import Poster from "./components/poster";

export default function MovieDetail({ title }) {
  const dispatch = useDispatch();
  const movieDetail = useSelector((state) => state.movieDetail);
  const params = useParams();

  useEffect(() => {
    dispatch(fetchMovieDetailAction(params.title));
  }, []);

  return (
    <Layout>
      <Box sx={styles.container}>
        <Container sx={{ marginTop: 2 }}>
          <Box sx={{ display: "flex" }}>
            <Poster url={movieDetail.data.Poster} />
            <Box sx={{ flex: 0.2 }} />
            <Box sx={styles.attributeWrapper}>
              <Attribute
                title="Genre"
                value={getFirstItemFromStr(movieDetail.data.Genre)}
                icon={<MovieFilterIcon />}
              />

              <Attribute
                title="Runtime"
                value={movieDetail.data.Runtime}
                icon={<AccessTimeFilledIcon />}
              />
              {/* 
              <Attribute
                title="Rating"
                value={movieDetail.data?.Ratings[0]?.Value}
                icon={<GradeIcon />}
              /> */}
            </Box>
          </Box>

          <Typography variant="h5">
            {movieDetail.data.Title} ({movieDetail.data.Year})
          </Typography>

          <Box mt={2}>
            <Typography variant="h6">Plot</Typography>
            <Typography variant="body1">{movieDetail.data.Plot}</Typography>
          </Box>

          <Box my={2}>
            <Typography variant="h6">Director</Typography>
            <Typography variant="body1">{movieDetail.data.Director}</Typography>
          </Box>

          <Box>
            <Typography variant="h6">Actors</Typography>
            <Typography variant="body1">{movieDetail.data.Actors}</Typography>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: 2,
  },
  attributeWrapper: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
  },
};
