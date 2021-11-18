import {
  FETCH_MOVIE_DETAIL_FAILURE,
  FETCH_MOVIE_DETAIL_REQUEST,
  FETCH_MOVIE_DETAIL_SUCCESS,
} from "./constants/actionTypes";

const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
};

export const movieDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIE_DETAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    case FETCH_MOVIE_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        data: action.payload,
      };
    case FETCH_MOVIE_DETAIL_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
      };
    default:
      return state;
  }
};
