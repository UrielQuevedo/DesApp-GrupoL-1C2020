import React from 'react';
import GoogleLogin from 'react-google-login';
import { registerLoginRequest, loginGoogleRequest } from '../Service/Api';
import { useHistory } from 'react-router';
import '../Styles/ButtonGoogle.css';

const AuthGoogleLogin = () => {

    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const { push } = useHistory();

    const responseGoogle = (response) => {
        const profile = response.profileObj;
        console.log(profile);
        /* Si el email existe en el server, me traigo el token y lo guardo en el localstorage
            para futuras peticiones, y se redirige al home.
           Si no existe, guardas la data de la cuenta de google, guardas token el localstorage
           y se redirige a mylocation  */ 

        loginGoogleRequest(profile.email) 
        .then((data) => {
            console.log(data);
            push('/mylocation');
        })  
        .catche((error) => {
            console.log(error.response.data.message);
        })


        /*const account = {
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
        }) */
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