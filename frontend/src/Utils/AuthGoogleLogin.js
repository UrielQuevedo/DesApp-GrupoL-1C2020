import React from 'react';
import GoogleLogin from 'react-google-login';
import '../Styles/ButtonGoogle.css';

const AuthGoogleLogin = () => {

    const responseGoogle = (response) => {
        console.log(response);
    }

    return (
        <div>
                <GoogleLogin
                clientId="561793782261-01t0p7n71thmbqqum17ovu537cm3881m.apps.googleusercontent.com"
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