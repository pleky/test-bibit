import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import MovieList from "./modules/movieList";
import MovieDetail from "./modules/movieDetail";
import { Container } from "@mui/material";

function App() {
  return (
    <Provider store={store}>
      <Container maxWidth="xs">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movie/:title" element={<MovieDetail />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </Provider>
  );
}

export default App;
