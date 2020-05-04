import React, { useState } from 'react'
import '../Styles/Login.css';
import { Typography, Box, Grid, Button, TextField, FormControlLabel, Checkbox, CssBaseline } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { registerRequest } from '../Service/Api';

const Register = () => {

  const { register, handleSubmit } = useForm();
  const { push } = useHistory();

  const sendRegisterForm = (data, e) => {
    registerRequest(data)
      .then(_ => push('/home'))
      .catch((error) => console.log(error.response));
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
              type="password"
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
              type="password"
              id="password_confirmed"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ margin: '20px 0 20px 0' }}
              >
              Registrarse
            </Button>
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