import {
  FETCH_MOVIE_LIST_FAILURE,
  FETCH_MOVIE_LIST_REQUEST,
  FETCH_MOVIE_LIST_SUCCESS,
} from "./constants/actionTypes";

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: "",
  isFethingNextPage: false,
  page: 1,
  hasNextPage: false,
  keyword: "batman",
};

export const movieListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIE_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        errorMessage: "",
        isFethingNextPage: state.hasNextPage,
        page: state.page + 1,
        keyword: action.keyword,
      };
    case FETCH_MOVIE_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        data: state.isFethingNextPage
          ? [...state.data, ...action.payload]
          : action.payload,
        hasNextPage: state.page < Math.ceil(action.totalResults / 10),
        isFethingNextPage: false,
      };
    case FETCH_MOVIE_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        errorMessage: action.payload,
        isFethingNextPage: false,
        page: 1,
        hasNextPage: false,
        data: [],
      };
    default:
      return state;
  }
};
