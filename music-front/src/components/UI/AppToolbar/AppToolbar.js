import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles, Breadcrumbs } from '@material-ui/core';
import { Link } from 'react-router-dom'
import UserMenu from './Menus/UserMenu';
import AnonymousMenu from './Menus/AnonymousMenu';

const useStyles = makeStyles(theme => ({   
    mainLink: {
        color: 'white',
        textDecoration: 'none',
        '&:hover': {
            color: 'inherit'
        }
    },
    staticToolbar: {
        marginBottom: theme.spacing(2)
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    }
}));

const AppToolbar = ({user}) => {
    const classes = useStyles();    

    return (
        <>
        <AppBar position="fixed">
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6" className={classes.toolbarTitle}>
                    <Link to="/" className={classes.mainLink}>Music of all genres</Link>
                </Typography>
                <Breadcrumbs maxItems={2} aria-label="breadcrumb">
                    <Link to='/' className={classes.mainLink}>
                        Artists
                    </Link>
                    <Link to='/albums' className={classes.mainLink}>
                        Albums
                    </Link>
                    <Link to='/tracks' className={classes.mainLink}>
                        Tracks
                    </Link>
                </Breadcrumbs>
                {user ? (
                    <UserMenu user={user}/>
                ) : (
                   <AnonymousMenu />
                )}
                
            </Toolbar>
        </AppBar>
        <Toolbar className={classes.staticToolbar}/>
        </>
    )
};
export default AppToolbar;