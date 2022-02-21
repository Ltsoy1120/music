import React from 'react';
import { Grid, Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    card: {
        height: '100%'
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
const TrackHistoryCard = ({albums, albumId, trackName, datetime}) => {    
    const classes = useStyles();
    let artistName = ''
    albums.map(album => {
        if(album._id === albumId){
            artistName = album.artist.title 
        }
        return artistName
    })

    return (
        <Grid item >
            <Card  className={classes.card} >
                <CardContent className={classes.cardContent} >
                    <Typography variant="h6">
                        {artistName}
                    </Typography>
                    <Typography variant="h6">
                        {trackName}
                    </Typography>
                    <Typography variant="h6">
                        {datetime}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}
TrackHistoryCard.propTypes = {
    id: PropTypes.string.isRequired,
    datetime: PropTypes.string
}
export default TrackHistoryCard;