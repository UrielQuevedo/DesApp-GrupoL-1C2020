import React, { useContext } from 'react';
import GoogleLogin from 'react-google-login';
import { registerGoogleRequest, loginGoogleRequest } from '../Service/Api';
import { AuthContext } from '../Context/AuthContext';
import '../Styles/ButtonGoogle.css';

const AuthGoogleLogin = () => {

    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const { setAuth } = useContext(AuthContext);

    const responseGoogle = (response) => {
        const profile = response.profileObj;
        console.log(profile);
        const googleAccount = {
            email: profile.email,
            username: profile.name
        }
        fetchLoginGoogleAccount(googleAccount);
    }
    
    const fetchLoginGoogleAccount = (googleAccount) => {
        loginGoogleRequest(googleAccount.email) 
        .then(data => {
            console.log(data);
            localStorage.setItem('authorization', data.token);
            setAuth({ type:'LOG_IN', isRemember:true, id: data.id });
        })  
        .catch(_ => {
            fetchRegisterAccountGoogle(googleAccount);    
        })
    }

    const fetchRegisterAccountGoogle = (googleAccount) => {
        registerGoogleRequest(googleAccount)
        .then(_ => {
            console.log("Se registro el usuario correctamente");
            fetchLoginGoogleAccount(googleAccount);
        })
        .catch(error => {
            console.log(error.response.data.message);
        })  
    }

    return (
        <div>
            <GoogleLogin
            clientId={clientId}
            buttonText="Iniciar sesión con Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            className="buttonGoogle"
            />
        </div>
    )
}

export default AuthGoogleLogin;