import axiosApi from '../../axiosApi';
import { push } from "connected-react-router";

export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';
export const CREATE_TRACK_SUCCESS = 'CREATE_TRACK_SUCCESS';
export const DELETE_TRACK_BY_ID_SUCCESS = 'DELETE_TRACK_BY_ID_SUCCESS';
export const PUBLISH_TRACK_SUCCESS = 'PUBLISH_TRACK_SUCCESS';

export const fetchTracksSuccess = tracks => {
    return {type: FETCH_TRACKS_SUCCESS, tracks};
};
export const fetchTracks = (query) => {
    if(query){
        return dispatch => {
            return axiosApi.get(`/tracks${query}`).then(
                response => dispatch(fetchTracksSuccess(response.data))
            )
        }
    }else{
        return dispatch => {
            return axiosApi.get('/tracks').then(
                response => dispatch(fetchTracksSuccess(response.data))
            )
        }
    }
};
export const createTrackSuccess = () => {
    return {type: CREATE_TRACK_SUCCESS};
};
export const createTrack = trackData => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token
        const headers = {'Authorization': token}
        await axiosApi.post('/tracks', trackData, {headers});
        dispatch(createTrackSuccess());
        dispatch(push('/tracks'))
    }
}
export const deleteTrackByIdSuccess = () => {
    return {type: DELETE_TRACK_BY_ID_SUCCESS};
}
export const deleteTrack = id => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token
        const headers = {'Authorization': token}
        const response = await axiosApi.delete(`/tracks/${id}`, {headers});
        dispatch(deleteTrackByIdSuccess(response.data));
    }
}
export const publishTrackSuccess = () => {
    return {type: PUBLISH_TRACK_SUCCESS};
};
export const publishTrack = track => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token
        const headers = {'Authorization': token}     
        await axiosApi.post(`/tracks/${track._id}/publish`, track, {headers});
        dispatch(publishTrackSuccess());
    }
}
