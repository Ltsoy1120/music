import React from 'react';
import { Grid, Card, CardContent, CardMedia, makeStyles, Typography, CardActions, Button, CardHeader } from '@material-ui/core';
import {Link} from 'react-router-dom';
import {apiURL} from '../../config';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    card: {
        height: '100%',
        underline: 'none'
    },
    head: {
        height: 68
    },
    media: {
        height: 250,
        paddingTop: '56.25%'
    }
})
const AlbumCard = ({title, id, yearOfIssue, image, tracksCount, user, publishOnClick, deleteOnClick, published}) => {
    
    const classes = useStyles();
    let cardImage = "Image Not Available";
    if(image) {
        cardImage = apiURL + '/uploads/' + image;
    }
    return (
        <Grid item xs={12} sm={12} md={6} lg={3}>
            {user && user.role ==='admin' && !published? (
                    <>
                    <Typography variant="subtitle2">
                        Not published!
                    </Typography>
                    <CardActions >
                        <Button size="small" color="primary" onClick={publishOnClick}>
                            PUBLISH
                        </Button>
                        <Button size="small" color="primary" onClick={deleteOnClick}>
                            DELETE
                        </Button>
                    </CardActions>
                    </>
                ) : user && user.role ==='admin'? (
                    <CardHeader className={classes.head} action={
                        <Button size="small" color="primary" onClick={deleteOnClick}>
                            DELETE
                        </Button>}
                    />
                ) : user && user.role ==='user' && !published? (                    
                    <CardHeader className={classes.head} title="Not published!"
                                subheader="I created this album"/>
                ): <CardHeader className={classes.head}/>}
            <Card  className={classes.card} component={Link} to={'/tracks?album='+id}>
                <CardMedia 
                    className={classes.media}
                    image={cardImage}
                    title={title}
                    />
                <CardContent>
                    <Typography variant="h6" >
                        Album title: {title}
                    </Typography>
                    <Typography variant="h6">
                        Release year: {yearOfIssue}
                    </Typography>
                    <Typography variant="h6">
                        Number of tracks: {tracksCount}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}
AlbumCard.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    yearOfIssue: PropTypes.number,
    image: PropTypes.string
}
export default AlbumCard;