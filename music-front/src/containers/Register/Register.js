import React, { useState } from 'react'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography, Grid, Link, Avatar, Button } from '@material-ui/core'
import { Link as RouterLink} from 'react-router-dom'
import { registerUser } from '../../store/actions/usersActions'
import { useDispatch, useSelector } from 'react-redux';
import FormElement from '../../components/UI/Form/FormElement'
import FacebookLoginButton from '../../components/FacebookLoginButton/FacebookLoginButton'
import FileInput from '../../components/UI/Form/FileInput'


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}))

const Register = () => {
    const classes = useStyles()
    const [state, setState] = useState({
        username: '',
        password: '',
        displayName: '',
        avatarImage: ''
    })
    const error = useSelector(state => state.users.registerError)

    const inputChangeHandler = e => {
        const {name, value} = e.target;
        setState (prevState => {
            return {...prevState,[name]: value}
        })
    }
    const fileChangeHandler = e => {
      const name = e.target.name;
      const file = e.target.files[0];
      setState(prevState => ({
          ...prevState,
          [name]: file
      }));
  };
    const dispatch = useDispatch()

    const submitFormHandler = async event=> {
      event.preventDefault()
      await dispatch(registerUser({...state}));
    }
    const getFieldError = fieldName => {
      try{
        return error.errors[fieldName].message
      }catch(e){
        return undefined
      }
    }
    return (
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              User registration
            </Typography>
            <form className={classes.form} onSubmit={submitFormHandler} noValidate>
              <Grid container spacing={2}>
              <FormElement
                    id='password'
                    label='Password'
                    name='password'
                    type='password'
                    required={true}
                    onChange={inputChangeHandler}
                    error={getFieldError('password')}
                  />
                  <FormElement
                    id='username'
                    label='Username'
                    name='username'
                    required={true}
                    onChange={inputChangeHandler}
                    error={getFieldError('username')}
                    autoFocus
                  />
                  
                  <FormElement
                    label='Display Name'
                    name='displayName'
                    required={true}
                    onChange={inputChangeHandler}
                    error={getFieldError('displayName')}
                  />
                  <Grid item xs>
                    <FileInput label='Avatar Image' name='avatarImage' onChange={fileChangeHandler}/>
                </Grid>
              </Grid>
              <Button
                id="signUp"
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <FacebookLoginButton/>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to="/login" component={RouterLink} variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
    )
}

export default Register
