import { Container, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout";
import { fetchMovieListAction } from "./action";
import Thumbnail from "./components/thumbnail";
import { Box } from "@mui/system";
import PosterModal from "./components/posterModal";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { useDebounce } from "../../hooks/useDebounce";

export default function MovieList() {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [pageYOffset, setPageYOffset] = useState(window.pageYOffset);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debounceValue = useDebounce(search, 500);
  const ref = useRef({});

  const movieList = useSelector((state) => state.movieList);

  useEffect(() => {
    dispatch(
      fetchMovieListAction({
        page: 1,
      })
    );
  }, []);

  useEffect(() => {
    if (debounceValue.length >= 3) {
      dispatch(
        fetchMovieListAction({
          page: 1,
          title: debounceValue,
        })
      );
    }
  }, [dispatch, debounceValue]);

  useIntersectionObserver({
    enabled: movieList.hasNextPage,
    target: ref,
    onIntersect: () => {
      dispatch(
        fetchMovieListAction({
          page: page + 1,
          title: search,
          callback: () => {
            setPage(page + 1);
            setPageYOffset(window.pageYOffset);
          },
        })
      );
    },
  });

  const handleClickImage = (url) => {
    setImageUrl(url);
    setVisible(true);
  };

  useLayoutEffect(() => {
    window.scrollTo({
      top: pageYOffset,
      behavior: "smooth",
    });
  }, [pageYOffset, movieList.data.length]);

  const _handleSearch = (keyword) => {
    setSearch(keyword);
    setPage(1);
    setPageYOffset(0);
  };

  return (
    <Layout onSearch={_handleSearch} withSearchBar={true}>
      <Container sx={{ marginTop: 2 }}>
        {movieList.isLoading &&
          placeHolderData.map((val) => (
            <React.Fragment key={val}>
              <Skeleton
                animation="wave"
                sx={style}
                variant="rectangular"
                height={400}
              />
            </React.Fragment>
          ))}
        {movieList?.data?.map((movie) => (
          <React.Fragment key={movie.imdbID}>
            <Thumbnail
              item={movie}
              onClickImage={() => handleClickImage(movie.Poster)}
            />
          </React.Fragment>
        ))}

        {movieList.isError && <Typography>{movieList.errorMessage}</Typography>}

        <PosterModal
          visible={visible}
          imageUrl={imageUrl}
          onClose={() => setVisible(false)}
        />
      </Container>
      <Box ref={ref} />
    </Layout>
  );
}

const placeHolderData = [1, 2, 3, 4, 5, 6];

const style = {
  bgcolor: "grey.300",
  marginBottom: 2,
  width: "100%",
  borderRadius: "10px",
};
