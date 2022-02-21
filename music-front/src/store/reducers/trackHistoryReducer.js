import { FETCH_TRACK_FAILURE, FETCH_TRACK_SUCCESS } from "../actions/tracksHistoryActions";

const initialState = {
    trackHistory: [],
    trackHistoryError: null
};

const trackHistoryReducer = (state=initialState, action) => {
   
  switch(action.type){
    case FETCH_TRACK_SUCCESS:
      return {...state, trackHistory: action.tracks};
    case FETCH_TRACK_FAILURE:
      return {...state, trackHistoryError: action.error};
    default:
      return state;
  }
};

export default trackHistoryReducer;