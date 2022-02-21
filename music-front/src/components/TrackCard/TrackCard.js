import React from 'react';
import { Grid, Card, CardContent, makeStyles, Typography, CardActions, Button, CardHeader } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    card: {
        height: '100%'
    }
})
const TrackCard = ({title, id, number, duration, addHandler, published, publishOnClick, deleteOnClick, user}) => {
    const classes = useStyles();
    
    return (
        <Grid item xs={12} sm={12} md={6} lg={3}>
            <Card  className={classes.card} >
                <CardContent >
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
                ): user && user.role ==='user' && !published? (                    
                    <CardHeader className={classes.head} title="Not published!"
                                subheader="I created this album"/>
                ): <CardHeader className={classes.head}/>}
                     <Typography variant="h6">
                        {number}
                    </Typography>
                    <Typography variant="h6">
                        {title}
                    </Typography>
                    <Typography variant="h6">
                        {duration}
                    </Typography>
                    <Button size="small" color="primary" onClick={()=>{addHandler(id)}}>
                            ADD TO HISTORY
                    </Button>
                </CardContent>
            </Card>
        </Grid>
    )
}
TrackCard.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    number: PropTypes.number,
    duration: PropTypes.string
}
export default TrackCard;