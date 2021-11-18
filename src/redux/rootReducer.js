import { combineReducers } from "redux";
import { movieDetailReducer } from "../modules/movieDetail/reducer";
import { movieListReducer } from "../modules/movieList/reducer";

export const rootReducer = combineReducers({
  movieList: movieListReducer,
  movieDetail: movieDetailReducer,
});
