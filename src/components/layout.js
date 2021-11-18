import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CssBaseline from "@mui/material/CssBaseline";
import { useDebounce } from "../hooks/useDebounce";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchMovieListAction } from "../modules/movieList/action";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Layout({ children }) {
  const [search, setSearch] = React.useState("");
  const dispatch = useDispatch();
  const debounceValue = useDebounce(search, 500);

  const handleChange = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  React.useEffect(() => {
    if (debounceValue.length >= 3 || debounceValue.length === 0) {
      dispatch(
        fetchMovieListAction({
          title: debounceValue || "batman",
          page: 1,
        })
      );
    }
  }, [debounceValue, dispatch]);

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          flexGrow: 1,
          mx: "auto",
          minHeight: "100vh",
          backgroundColor: "#FAFAFA",
          paddingBottom: "2rem",
        }}
      >
        <AppBar position="sticky">
          <Toolbar>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={handleChange}
              />
            </Search>

            <Typography ml="auto" variant="h6" color="inherit">
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                OMDB
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>

        {children}
      </Box>
    </>
  );
}
