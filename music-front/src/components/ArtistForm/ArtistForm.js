import React, { useState } from 'react';
import { Grid, makeStyles, Button } from '@material-ui/core';
import FileInput from '../UI/Form/FileInput';
import FormElement from '../UI/Form/FormElement';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(2)
    },
}))

const ArtistForm = ({onSubmit}) => {
    const classes = useStyles();
    const [state, setState] = useState({
        title: '',
        information: '',
        image: ''
    });
    const submitFormHandler = e => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(state).forEach(key => {
            formData.append(key,state[key]);
        })
        onSubmit(formData);
    }
    const inputChangeHandler = event => {
        const {name, value} = event.target;
        setState(prevState => {
            return {...prevState, [name]: value}
        });
    }
    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];
        setState(prevState => ({
            ...prevState,
            [name]: file
        }));
    };
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
                    label='Information' 
                    onChange={inputChangeHandler} 
                    name='information' 
                    required={false}
                    value={state.information}
                    multiline={true}
                    rows={3}/>
                <Grid item xs>
                    <FileInput label='Image' name='image' onChange={fileChangeHandler}/>
                </Grid>
                <Grid item xs>
                    <Button type='submit' color='primary' variant='contained'>Create</Button>
                </Grid>
            </Grid>
        </form>
    )
};

export default ArtistForm;
