import axios from 'axios';

export const FETCH_NASA_LOADING = 'FETCH_NASA_LOADING';
export const FETCH_NASA_SUCCESS = 'FETCH_NASA_SUCCESS';
export const FETCH_NASA_FAILED  = 'FETCH_NASA_FAILED';

export const nasaLoading = () => ( { type: FETCH_NASA_LOADING } );

export const nasaLoadSuccess = data => ( {
  type: FETCH_NASA_SUCCESS,
  payload: data
} );

export const nasaLoadFailure = error => ( {
  type: FETCH_NASA_FAILED,
  payload: error
} );

export function fetchNasa() {
  return function( dispatch ) {
    dispatch( nasaLoading() );

    return axios
      .get( 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY' )
      .then( res => dispatch( nasaLoadSuccess( res.data ) ) )
      .catch( error => dispatch( nasaLoadFailure( error ) ) );
  }
}
