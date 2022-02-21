import React, { useState } from 'react';
import { Grid, makeStyles, Button } from '@material-ui/core';
import FormElement from '../UI/Form/FormElement';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(2)
    },
}))

const TrackForm = ({onSubmit, albums, artists}) => {
    const classes = useStyles();
    const [state, setState] = useState({
        title: '',
        artist: '',
        album: '',
        duration: '',
        number: ''
    });

    const submitFormHandler = e => {
        e.preventDefault();
        onSubmit({...state});
    }

    const inputChangeHandler = event => {
        const {name, value} = event.target;
        setState(prevState => {
            return {...prevState, [name]: value}
        });
        

    }

    return (
        <form autoComplete='off' className={classes.root} onSubmit={submitFormHandler}>
            <Grid container direction='column' spacing={2}>
                <FormElement 
                    label='Title' 
                    onChange={inputChangeHandler} 
                    name='title' 
                    required={true}
                    value={state.title}/>
                <FormElement 
                    label='Artist' 
                    onChange={inputChangeHandler} 
                    name='artist' 
                    required={true}
                    value={state.artist}
                    select={true}
                    options={artists}/>
                <FormElement 
                    label='Album' 
                    onChange={inputChangeHandler} 
                    name='album' 
                    required={true}
                    value={state.album}
                    select={true}
                    options={albums.filter( album => album.artist._id === state.artist )}/>
                <FormElement 
                    label='Duration' 
                    onChange={inputChangeHandler} 
                    name='duration' 
                    required={false}
                    value={state.duration}/>
                <FormElement 
                    label='Track number' 
                    onChange={inputChangeHandler} 
                    name='number' 
                    required={false}
                    value={state.number}/>
                <Grid item xs>
                    <Button type='submit' color='primary' variant='contained'>Create</Button>
                </Grid>
            </Grid>
        </form>
    )
};

export default TrackForm;
