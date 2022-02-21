import React, { useEffect } from 'react'
import { Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { fetchArtists } from '../../store/actions/artistsActions';
import { createAlbum } from '../../store/actions/albumsActions';
import AlbumForm from '../../components/AlbumForm/AlbumForm';

const NewAlbum = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchArtists())
    }, [dispatch])

    const artists = useSelector(state => state.artists.artists)

    const onAlbumFormSubmit = async albumData => {
        await dispatch(createAlbum(albumData));
    };

    return (
        <>
            <Typography variant='h4'>New album</Typography>
            <AlbumForm 
                artists={artists}
                onSubmit={onAlbumFormSubmit}/>
        </>
    )
}

export default NewAlbum;
