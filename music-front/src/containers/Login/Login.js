import React, { useState } from 'react'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography, Grid, Link, Avatar, Button } from '@material-ui/core'
import { Link as RouterLink} from 'react-router-dom'
import { loginUser } from '../../store/actions/usersActions'
import { useDispatch, useSelector } from 'react-redux';
import FormElement from '../../components/UI/Form/FormElement'
import Alert from '@material-ui/lab/Alert'
import FacebookLoginButton from '../../components/FacebookLoginButton/FacebookLoginButton'


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
    alert: {
        marginTop: theme.spacing(3),
        width: '100%'
    }
}))

const Login = () => {
    const classes = useStyles()
    const [state, setState] = useState({
        username: '',
        password: ''
    })
    const error = useSelector(state => state.users.loginError)

    const inputChangeHandler = e => {
        const {name, value} = e.target;
        setState (prevState => {
            return {...prevState,[name]: value}
        })
    }
    const dispatch = useDispatch()

    const submitFormHandler = async event=> {
      event.preventDefault()
      await dispatch(loginUser({...state}));
    }
    
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    User login
                </Typography>
                {
                error && <Alert severity='error' className={classes.alert}>
                 {error.error}
                </Alert>
                }
                <form className={classes.form} onSubmit={submitFormHandler} noValidate>
                    <Grid container spacing={2}>
                        <FormElement
                            label='Enter username'
                            name='username'
                            required={true}
                            onChange={inputChangeHandler}
                            autoFocus
                        />
                        <FormElement
                            label='Password'
                            name='password'
                            type='password'
                            required={true}
                            onChange={inputChangeHandler}
                        />
                    </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign In
                </Button>
                <FacebookLoginButton/>
                <Grid container justify="flex-end">
                    <Grid item>
                    <Link to="/register" component={RouterLink} variant="body2">
                        Or Sign up
                    </Link>
                    </Grid>
                </Grid>
                </form>
            </div>
        </Container>
    )
}

export default Login
