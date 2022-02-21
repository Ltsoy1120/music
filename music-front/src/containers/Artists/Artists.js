import React, {useEffect} from 'react';
import { Typography, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { deleteArtist, fetchArtists, publishArtist } from '../../store/actions/artistsActions';
import ArtistCard from '../../components/ArtistCard/ArtistCard';

const Artists = () => {
    const artists = useSelector(state => state.artists.artists);
    const user = useSelector(state => state.users.user);
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);
    const publishHandler = artist => {
        dispatch(publishArtist(artist))
        dispatch(fetchArtists())
    }
    const deleteHandler = (id) => {
        dispatch(deleteArtist(id))
        dispatch(fetchArtists())
    }
    const artistsForAdmin = 
        artists.map(artist => (
            <ArtistCard
                key = {artist._id}
                id={artist._id}
                title={artist.title}
                image={artist.image} 
                published={artist.published}
                publishOnClick={()=> {publishHandler(artist)}}
                deleteOnClick={()=> {deleteHandler(artist._id)}}
                user={user}
            />
        ))
    let artistsUser =[]

    if(user){
        artists.map( artist => {
            if(artist.published ){ 
                artistsUser.push(artist)
            } 
            if(!artist.published && artist.user===user._id){
                artistsUser.push(artist)
            }
            return artistsUser
        })
    }
    
    const artistsForUser = 
        artistsUser.map(art => (
            <ArtistCard
                key = {art._id}
                id={art._id}
                title={art.title}
                image={art.image} 
                published={art.published}
                user={user}
            />  
        ))      

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item container direction="row" justify="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h4">
                        Artists
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container direction="row" spacing={1}>
                {user && user.role ==='admin'?
                    artistsForAdmin : artistsForUser
                }                
            </Grid>
        </Grid>
  );
}
export default Artists;    