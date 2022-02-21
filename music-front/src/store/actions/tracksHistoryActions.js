import axiosApi from '../../axiosApi';
import {push} from 'connected-react-router'

export const ADD_TRACK_HISTORY_SUCCESS = 'ADD_TRACK_HISTORY_SUCCESS';
export const ADD_TRACK_HISTORY_FAILURE = 'ADD_TRACK_HISTORY_FAILURE';
export const FETCH_TRACK_SUCCESS = 'FETCH_TRACK_SUCCESS';
export const FETCH_TRACK_FAILURE = 'FETCH_TRACK_FAILURE';

const addTrackHistorySuccess = track => {
    return  {type: ADD_TRACK_HISTORY_SUCCESS, track}
}
const fetchTrackHistorySuccess = tracks => {
    return {type: FETCH_TRACK_SUCCESS, tracks};
}
const fetchTrackHistoryFailure = error => {
    return {type: FETCH_TRACK_FAILURE, error};
}
export const addTrackHistory = (track, token) => {
    return async dispatch => {
        try{
            if(token){
                const response = await axiosApi.post('/track_history', {'track': track}, {
                    headers: {
                      'ContentType': 'application/json',
                      'Authorization': token
                    }
                })
                dispatch(addTrackHistorySuccess(response.data))
                dispatch(push('/track_history'))
            }else{
                dispatch(push('/login'))
            }           
        }catch(e) {
            if(e.response && e.response.data) {
                dispatch(fetchTrackHistoryFailure(e.response.data))
            }else{
                dispatch(fetchTrackHistoryFailure({global: 'No internet'}))
            }
        }
        
    }
}
export const fetchTrackHistory = token => {
    return async dispatch => {
        try{
            const response = await axiosApi.get('/track_history', {
                headers: {
                  'Authorization': token
                }
            })
            dispatch(fetchTrackHistorySuccess(response.data))
        }catch(e) {
            if(e.response && e.response.data) {
                return dispatch(fetchTrackHistoryFailure(e.response.data))
            }else{
                return dispatch(fetchTrackHistoryFailure({global: 'No internet'}))
            }
        }       
    }   
};