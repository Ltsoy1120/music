import { FETCH_ALBUMS_SUCCESS } from "../actions/albumsActions";

const initialState = {
  albums: []
};

const albumsReducer = (state=initialState, action) => {
  switch(action.type){
    case FETCH_ALBUMS_SUCCESS:
      return {...state, albums: action.albums};
    default:
      return state;
  }
};

export default albumsReducer;