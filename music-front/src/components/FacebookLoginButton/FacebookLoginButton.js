import { Button } from '@material-ui/core'
import React from 'react'
import FacebookLogin from 'react-facebook-login'
import { useDispatch } from 'react-redux'
import {facebookAppID} from '../../config'
import { facebookLogin } from '../../store/actions/usersActions'

const FacebookLoginButton = () => {
    const dispatch = useDispatch()
    const facebookResponse = response => {
        if(response.id) {
        dispatch(facebookLogin(response))
        }
    }
    return (
        <FacebookLogin
            appId={facebookAppID}
            fields='name, email, picture'
            render={({onClick}) => {
                <Button onClick={onClick}>Login with Facebook</Button>
            }}
            callback={facebookResponse}
            />                    
    )
}

export default FacebookLoginButton
