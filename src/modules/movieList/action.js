import {
  FETCH_MOVIE_LIST_FAILURE,
  FETCH_MOVIE_LIST_REQUEST,
  FETCH_MOVIE_LIST_SUCCESS,
} from "./constants/actionTypes";
import { api } from "../../utils/api";

const startRequest = () => {
  return {
    type: FETCH_MOVIE_LIST_REQUEST,
  };
};

const onSuccess = (data, keyword, page) => {
  return {
    type: FETCH_MOVIE_LIST_SUCCESS,
    payload: data.data.Search,
    totalResults: data.data.totalResults,
    keyword: keyword,
    page,
  };
};

const onError = (error) => {
  return {
    type: FETCH_MOVIE_LIST_FAILURE,
    payload: error,
  };
};

export const fetchMovieListAction =
  ({ title = "batman", page, callback = () => {} }) =>
  async (dispatch) => {
    let newTitle = !title.length ? "batman" : title;
    dispatch(startRequest());
    try {
      const response = await api.get(
        `?apikey=504ec674&s=${newTitle}&page=${page}`
      );

      if (response.data.Response === "False") {
        dispatch(onError(response.data.Error));
      } else {
        dispatch(onSuccess(response, newTitle, page));
        callback();
      }
    } catch (error) {
      console.log(error, "something error");
    }
  };
