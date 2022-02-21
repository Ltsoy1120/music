import React from 'react';
import { Grid, Card, CardContent, CardMedia, makeStyles, Typography, CardActions, Button, CardHeader } from '@material-ui/core';
import {Link} from 'react-router-dom';
import {apiURL} from '../../config';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    card: {
        height: '100%'
    },
    head: {
        height: 68
    },
    media: {
        height: 250,
        paddingTop: '56.25%'
    }
})
const ArtistCard = ({title, id, image, published, user, publishOnClick, deleteOnClick}) => {
    
    const classes = useStyles();
    let cardImage = "Image Not Available";
    if(image) {
        cardImage = apiURL + '/uploads/' + image;
    }
    return (
        <Grid item xs={12} sm={12} md={6} lg={2}>
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
                                subheader="I created this artist"/>
                ): <CardHeader className={classes.head}/>}
            <Card  className={classes.card} component={Link} to={'/albums?artist='+id}>
                <CardMedia 
                    className={classes.media}
                    image={cardImage}
                    title={title}
                    />
                <CardContent>
                    <Typography variant="h6">
                        {title}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}
ArtistCard.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string
}
export default ArtistCard;