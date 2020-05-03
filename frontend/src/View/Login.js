import React, { useState } from 'react'
import '../Styles/Login.css';
import { Typography, Box, Grid, Button, TextField, FormControlLabel, Checkbox, CssBaseline } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Login = () => {

  const { register, handleSubmit, errors } = useForm();
  const [ isRemember, setIsRemember ] = useState(false);

  const sendLoginForm = (data, e) => {
    console.log(data);
  }

  return (
    <Grid justify="center" style={{display:'flex'}}>
      <CssBaseline />
      <Grid
        lg="3"
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid direction="column" justify="center" alignItems="center" className="login-box">
          <Typography
            component="h2"
            align="center"
            variant="h3"
          >
            Iniciar Sesión
          </Typography>
          <form onSubmit={handleSubmit(sendLoginForm)}>
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
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordarme"
              style={{ marginTop:'20px' }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ margin: '20px 0 20px 0' }}
              >
              Ingresar
            </Button>
            <Grid container justify="center" style={{ marginBottom:'20px' }}>
              <div>
                ¿No tienes una cuenta?
                <Link to="/register" style={{marginLeft:'5px'}}>
                  Regístrate
                </Link>
              </div>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Login;