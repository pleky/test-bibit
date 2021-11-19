import {
  FETCH_MOVIE_DETAIL_FAILURE,
  FETCH_MOVIE_DETAIL_REQUEST,
  FETCH_MOVIE_DETAIL_SUCCESS,
} from "./constants/actionTypes";
import { api } from "../../utils/api";

const startRequest = () => {
  return {
    type: FETCH_MOVIE_DETAIL_REQUEST,
  };
};

const onSuccess = (data) => {
  return {
    type: FETCH_MOVIE_DETAIL_SUCCESS,
    payload: data.data,
  };
};

const onError = (error) => {
  return {
    type: FETCH_MOVIE_DETAIL_FAILURE,
    payload: error,
  };
};

export const fetchMovieDetailAction = (title) => async (dispatch) => {
  dispatch(startRequest());
  try {
    const response = await api.get(`?apikey=504ec674&t=${title}&plot=full`);
    dispatch(onSuccess(response));
  } catch (error) {
    onError(error);
  }
};
