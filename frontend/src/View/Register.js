import { Box, Button, CircularProgress, CssBaseline, Grid, IconButton, InputAdornment, TextField, Typography } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { registerRequest } from '../Service/Api';
import '../Styles/Auth.css';

const Register = () => {

  const { register, handleSubmit } = useForm();
  const [ showPassword, setShowPassword ] = useState(false);
  const [ error, setError ] = useState();
  const [ loading, setLoading ] = useState(false);
  const { push } = useHistory();

  const sendRegisterForm = async (data, e) => {
    //TODO Mejorar estructura
    if (data.password === data.password_confirmed) {
      setLoading(true);
      try {
        const _ = await registerRequest(data);
        push('/login/location');
      } catch (error) {
        //TODO Visualizar este error
        console.log(error.response.data.message);
      }
      setLoading(false);
    } else {
      setError('Las contraseñas no coinciden');
    }
    e.target.reset();
  }

  //TODO Emprolijar y sacar codigo repetido
  return (
    <Grid container justify="center">
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
                >
                Registrarse
              </Button>
              { loading && <CircularProgress style={{ position:'absolute', top:'37%', left:'47%' }} size={24} /> }
            </Box>
            <Grid container justify="center" style={{ marginBottom:'20px' }}>
              <div>
                ¿Ya tienes una cuenta?
                <Link to="/login" style={{ marginLeft:'5px' }}>
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