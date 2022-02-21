import axiosApi from '../../axiosApi';
import { push } from "connected-react-router";

export const FETCH_ARTISTS_SUCCESS = 'FETCH_ARTISTS_SUCCESS';
export const CREATE_ARTIST_SUCCESS = 'CREATE_ARTIST_SUCCESS';
export const DELETE_ARTIST_BY_ID_SUCCESS = 'DELETE_COMMENT_BY_ID_SUCCESS';
export const PUBLISH_ARTIST_SUCCESS = 'PUBLISH_ARTIST_SUCCESS';

export const fetchArtistsSuccess = artists => {
    return {type: FETCH_ARTISTS_SUCCESS, artists};
};
export const fetchArtists = () => {
    return async dispatch => {
        const response = await axiosApi.get('/artists');
        return dispatch(fetchArtistsSuccess(response.data));                                    
    }
};
export const createArtistSuccess = () => {
    return {type: CREATE_ARTIST_SUCCESS};
};
export const createArtist = artistData => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token
        const headers = {'Authorization': token}
        await axiosApi.post('/artists', artistData, {headers});
        dispatch(createArtistSuccess());
        dispatch(push('/'))
    }
}
export const deleteArtistByIdSuccess = () => {
    return {type: DELETE_ARTIST_BY_ID_SUCCESS};
}
export const deleteArtist = id => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token
        const headers = {'Authorization': token}
        const response = await axiosApi.delete(`/artists/${id}`, {headers});
        dispatch(deleteArtistByIdSuccess(response.data));
    }
}
export const publishArtistSuccess = () => {
    return {type: PUBLISH_ARTIST_SUCCESS};
};
export const publishArtist = artist => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token
        const headers = {'Authorization': token}     
        await axiosApi.post(`/artists/${artist._id}/publish`, artist, {headers});
        dispatch(publishArtistSuccess());
    }
}