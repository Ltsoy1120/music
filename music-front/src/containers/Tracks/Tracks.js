import React, {useEffect} from 'react';
import { Typography, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTrack, fetchTracks, publishTrack } from '../../store/actions/tracksActions';
import TrackCard from '../../components/TrackCard/TrackCard';
import { fetchAlbums } from '../../store/actions/albumsActions';
import queryString from 'query-string'
import { addTrackHistory } from '../../store/actions/tracksHistoryActions';

const Tracks = (props) => {
   
    const query = props.history.location.search;
    let params = queryString.parse(props.location.search);

    const tracks = useSelector(state => state.tracks.tracks);
    const albums = useSelector(state => state.albums.albums);
    const user = useSelector(state => state.users.user);
    let token=''
    if(user !== null){
        token = user.token
    }
    

    let artistName = ''
    albums.map(album => {
        if(album._id === params.album){
            artistName = album.artist.title 
        }
        return artistName
    })
    
    let albumName = '';
    if(tracks.length>0 && tracks[0].album){
        albumName = tracks[0].album.title;
    }
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTracks(query));
        dispatch(fetchAlbums());
    }, [dispatch, query]);
    
    const addTrackHistoryHandler = (id) => {
        dispatch(addTrackHistory(id, token))
    }
    const publishHandler = track => {
        dispatch(publishTrack(track))
        dispatch(fetchTracks())
    }
    const deleteHandler = (id) => {
        dispatch(deleteTrack(id))
        dispatch(fetchTracks())
    }
    const tracksForAdmin = 
        tracks.map(track => (
            <TrackCard
                key = {track._id}
                id={track._id}
                title={track.title}
                album={track.album}
                duration={track.duration}
                number={track.number}
                published={track.published}
                addHandler={()=> {addTrackHistoryHandler(track._id)}}
                publishOnClick={()=> {publishHandler(track)}}
                deleteOnClick={()=> {deleteHandler(track._id)}}
                user={user}
            />
        ))
    let tracksUser =[]

    if(user){
        tracks.map( track => {
            if(track.published ){ 
                tracksUser.push(track)
            } 
            if(!track.published && track.user===user._id){
                tracksUser.push(track)
                 
            }
        return tracksUser
        })
    }  
    const tracksForUser = 
        tracksUser.map(track => (
            <TrackCard
                key = {track._id}
                id={track._id}
                title={track.title}
                album={track.album}
                duration={track.duration}
                number={track.number}
                published={track.published}
                addHandler={()=> {addTrackHistoryHandler(track._id)}}
                user={user}
            />  
        ))      
  return (
    <Grid container direction="column" spacing={2}>
       <Grid item>
            <Typography variant="h4">
                Tracks
            </Typography>
        </Grid>
        {query?(
                <Grid item>
                <Typography variant="h6">
                   Artist "{artistName}"
                </Typography> 
                <Typography variant="h6">
                   Album "{albumName}"
                </Typography> 
            </Grid>
            ): null
        }            
        <Grid item container direction="row" spacing={1}>
            {user && user.role ==='admin'?
                tracksForAdmin : tracksForUser
            } 
        </Grid>
    </Grid>         
  );
};
export default Tracks;
