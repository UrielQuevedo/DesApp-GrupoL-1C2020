import React from 'react';
import GoogleLogin from 'react-google-login';
import '../Styles/ButtonGoogle.css';

const AuthGoogleLogin = () => {

    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    const responseGoogle = (response) => {
        console.log(response);
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