import React from 'react'
import { Typography } from '@material-ui/core'
import ArtistForm from '../../components/ArtistForm/ArtistForm';
import { useDispatch } from 'react-redux'
import { createArtist } from '../../store/actions/artistsActions';

const NewArtist = () => {
    const dispatch = useDispatch();

    const onArtistFormSubmit = async artistData => {
        await dispatch(createArtist(artistData));
    };

    return (
        <>
            <Typography variant='h4'>New artist</Typography>
            <ArtistForm
                onSubmit={onArtistFormSubmit}/>
        </>
    )
}

export default NewArtist;
