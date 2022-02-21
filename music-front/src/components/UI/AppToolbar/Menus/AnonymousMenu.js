import React from 'react'
import { makeStyles, Button } from '@material-ui/core';
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({   
    link: {
        margin: theme.spacing(1, 1.5),
    }
}));
const AnonymousMenu = () => {
    const classes = useStyles()

    return (
        <>
        <Button to="/register" color="inherit" variant="outlined" component={Link} className={classes.link}>
            Sign up
        </Button>
        <Button to="/login" color="inherit" variant="outlined" component={Link} className={classes.link}>
            Sign in
        </Button>
    </>
    )
}

export default AnonymousMenu
