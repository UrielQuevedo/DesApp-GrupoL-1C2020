import React, { useState } from 'react'
import '../Styles/Login.css';
import { Typography, Grid, Button, TextField, CssBaseline, InputAdornment, IconButton, CircularProgress, Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { registerRequest } from '../Service/Api';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const Register = () => {

  const { register, handleSubmit } = useForm();
  const [ showPassword, setShowPassword ] = useState(false);
  const [ error, setError ] = useState();
  const [ loading, setLoading ] = useState(false);
  const { push } = useHistory();

  const sendRegisterForm = async (data, e) => {
    //TODO Mejorar estructura
    if (data.password === data.password_confirmed) {
      setLoading(!loading);
      try {
        const _ = await registerRequest(data);
        push('/');
      } catch (error) {
        //TODO Visualizar este error
        console.log(error.response.data.message);
      }
    } else {
      setError('Las contraseñas no coinciden');
    }
    e.target.reset();
  }

  //TODO Emprolijar y sacar codigo repetido
  return (
    <Grid container justify="center" style={{display:'flex'}}>
      <CssBaseline />
      <Grid
        item
        container
        lg={3}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid container direction="column" justify="center" alignItems="center" className="login-box">
          <Typography
            component="h2"
            align="center"
            variant="h3"
          >
            Crear Cuenta
          </Typography>
          <form onSubmit={handleSubmit(sendRegisterForm)}>
            <TextField
              margin="normal"
              inputRef={register}
              fullWidth
              required
              label="Nombre de Usuario"
              name="username"
              type="text"
              id="username"
            />
            <TextField
              margin="normal"
              inputRef={register}
              fullWidth
              required
              label="Correo Electronico"
              name="email"
              type="email"
              id="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              inputRef={register}
              fullWidth
              required
              label="Contraseña"
              name="password"
              type={ showPassword ? 'text' : 'password' }
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              inputRef={register}
              fullWidth
              required
              label="Confirmar Contraseña"
              name="password_confirmed"
              type={ showPassword ? 'text' : 'password' }
              id="password_confirmed"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            { error && <Alert variant="filled" severity="error">{error}</Alert> }
            <Box style={{position:'relative'}}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                color="primary"
                style={{ margin: '20px 0 20px 0', height:'30px' }}
                >
                Registrarse
              </Button>
              { loading && <CircularProgress style={{ position:'absolute', top:'50%', left:'50%', marginLeft:'-12px', marginTop:'-12px'  }}  size={24} /> }
            </Box>
            <Grid container justify="center" style={{ marginBottom:'20px' }}>
              <div>
                ¿Ya tienes una cuenta?
                <Link to="/login" style={{marginLeft:'5px'}}>
                  Iniciar Sesión
                </Link>
              </div>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Register;