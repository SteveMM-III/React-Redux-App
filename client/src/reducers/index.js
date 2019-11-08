import { FETCH_NASA_LOADING, FETCH_NASA_SUCCESS, FETCH_NASA_FAILED } from '../actions';

export const initialState = {
  nasa: {},
  error: null,
  isFetching: false
};

export const appReducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case FETCH_NASA_LOADING:
      return {
        ...state,
        isFetching: true,
        error: null
      }
    case FETCH_NASA_SUCCESS:
      return {
        ...state,
        nasa: action.payload,
        isFetching: false,
        error: null
      }
    case FETCH_NASA_FAILED:
      return {
        ...state,
        nasa: {},
        isFetching: false,
        error: action.payload
      }
    default:
      return state;
  }
};
