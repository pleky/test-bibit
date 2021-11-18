import {
  FETCH_MOVIE_LIST_FAILURE,
  FETCH_MOVIE_LIST_REQUEST,
  FETCH_MOVIE_LIST_SUCCESS,
} from "./constants/actionTypes";
import { api } from "../../utils/api";

const startRequest = (keyword) => {
  return {
    type: FETCH_MOVIE_LIST_REQUEST,
    keyword: keyword,
  };
};

const onSuccess = (data) => {
  return {
    type: FETCH_MOVIE_LIST_SUCCESS,
    payload: data.data.Search,
    totalResults: data.data.totalResults,
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
    dispatch(startRequest(title));
    try {
      const response = await api.get(
        `?apikey=9fbc926a&s=${title}&page=${page}`
      );

      if (response.data.Response === "False") {
        dispatch(onError(response.data.Error));
      } else {
        dispatch(onSuccess(response));
        callback();
      }
    } catch (error) {
      console.log(error, "something error");
    }
  };
