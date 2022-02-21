import React, {useEffect} from 'react';
import { Typography, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import TrackHistoryCard from '../../components/TrackHistoryCard/TrackHistoryCard';
import { fetchAlbums } from '../../store/actions/albumsActions';
import { fetchTrackHistory } from '../../store/actions/tracksHistoryActions';

const TrackHistory = (props) => {
   
    const albums = useSelector(state => state.albums.albums);
    const user = useSelector(state => state.users.user);
    const userName = user.username

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAlbums());
        dispatch(fetchTrackHistory(props.user.token));
    }, [dispatch, props.user.token]);

    const trackHistories = useSelector(state => state.trackHistory.trackHistory);  

  return (
    <Grid container direction="column" spacing={2}>
        <Grid item >
            <Typography variant="h4">
                Track history of user {userName}
            </Typography> 
        </Grid>
        <Grid item container direction="column" spacing={1}>
            {trackHistories.map(trackHistory => (             
                <TrackHistoryCard
                    key = {trackHistory._id}
                    id={trackHistory._id}
                    trackName={trackHistory.track.title}
                    albums={albums}
                    albumId={trackHistory.track.album}
                    trackHistory={trackHistory}
                    datetime={trackHistory.datetime}
                />
            ))}
        </Grid>
    </Grid>         
  );
};
export default TrackHistory;
