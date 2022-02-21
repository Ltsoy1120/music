import axiosApi from '../../axiosApi';
import { push } from "connected-react-router";

export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const CREATE_ALBUM_SUCCESS = 'CREATE_ALBUM_SUCCESS';
export const DELETE_ALBUM_BY_ID_SUCCESS = 'DELETE_ALBUM_BY_ID_SUCCESS';
export const PUBLISH_ALBUM_SUCCESS = 'PUBLISH_ALBUM_SUCCESS';

export const fetchAlbumsSuccess = albums => {
    return {type: FETCH_ALBUMS_SUCCESS, albums};
};
export const fetchAlbums = (query) => {
    if(query){
        return dispatch => {
            return axiosApi.get(`/albums${query}`).then(
                response => dispatch(fetchAlbumsSuccess(response.data))
            )
        }
    }else{
        return dispatch => {
            return axiosApi.get('/albums').then(
                response => dispatch(fetchAlbumsSuccess(response.data))
            )
        }
    }
    
};
export const createAlbumSuccess = () => {
    return {type: CREATE_ALBUM_SUCCESS};
};
export const createAlbum = albumData => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token
        const headers = {'Authorization': token}
        await axiosApi.post('/albums', albumData, {headers});
        dispatch(createAlbumSuccess());
        dispatch(push('/albums'))
    }
}
export const deleteAlbumByIdSuccess = () => {
    return {type: DELETE_ALBUM_BY_ID_SUCCESS};
}
export const deleteAlbum = id => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token
        const headers = {'Authorization': token}
        const response = await axiosApi.delete(`/albums/${id}`, {headers});
        dispatch(deleteAlbumByIdSuccess(response.data));
    }
}
export const publishAlbumSuccess = () => {
    return {type: PUBLISH_ALBUM_SUCCESS};
};
export const publishAlbum = album => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token
        const headers = {'Authorization': token}     
        await axiosApi.post(`/albums/${album._id}/publish`, album, {headers});
        dispatch(publishAlbumSuccess());
    }
}