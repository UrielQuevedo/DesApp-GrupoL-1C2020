import React from 'react';
import GoogleLogin from 'react-google-login';
import { registerRequest } from '../Service/Api';
import '../Styles/ButtonGoogle.css';

const AuthGoogleLogin = () => {

    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    const responseGoogle = (response) => {
        const profile = response.profileObj;
        /* Si el email existe en el server, me traigo el token y lo guardo en el localstorage
            para futuras peticiones, y se redirige al home.
           Si no existe, guardas la data de la cuenta de google, guardas token el localstorage
           y se redirige a mylocation  */ 
        const account = {
            email: profile.email,
            password: "123",
            username: profile.name
        }

        registerRequest(account)
        .then((data) => {
            console.log(data)
        })
        .catch((error) => {
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