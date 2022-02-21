import React, { useEffect } from 'react'
import { Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { createTrack } from '../../store/actions/tracksActions';
import { fetchAlbums } from '../../store/actions/albumsActions';
import TrackForm from '../../components/TrackForm/TrackForm';
import { fetchArtists } from '../../store/actions/artistsActions';

const NewTrack = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAlbums())
        dispatch(fetchArtists())
    }, [dispatch])

    const albums = useSelector(state => state.albums.albums)
    const artists = useSelector(state => state.artists.artists)

    const onTrackFormSubmit = async trackData => {
        await dispatch(createTrack(trackData));
    };

    return (
        <>
            <Typography variant='h4'>New track</Typography>
            <TrackForm
                albums={albums}
                artists={artists}
                onSubmit={onTrackFormSubmit}/>
        </>
    )
}

export default NewTrack;
