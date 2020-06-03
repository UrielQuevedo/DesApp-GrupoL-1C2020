import { Box, Button, Checkbox, CircularProgress, CssBaseline, FormControlLabel, Grid, IconButton, InputAdornment, TextField, Typography } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { Alert } from '@material-ui/lab';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { loginRequest } from '../Service/Api';
import '../Styles/Auth.css';

const Login = () => {

  const { register, handleSubmit } = useForm();
  //TODO el remember funcione
  const [ isRemember, setIsRemember ] = useState(false);
  const [ error, setError ] = useState();
  const [ loading, setLoading  ] = useState(false);
  const [ showPassword, setShowPassword ] = useState(false);
  const { setAuth } = useContext(AuthContext);

  const sendLoginForm = async (data, e) => {
    setLoading(true);
    try {
      const userData = await loginRequest(data);
      setAuth({ type:'LOG_IN', isRemember:true, id: userData.id });
    } catch (error) {
      setError(error.response.data.message)
    }
    setLoading(false);
    e.target.reset();
  }

  return (
    <Grid container justify="center">
      <CssBaseline />
      <Grid
        container
        item
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
              type={ showPassword ? 'text' : 'password' }
              id="password"
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordarme"
              style={{ marginTop:'15px' }}
            />
            { error && <Alert variant="filled" severity="error" style={{ marginTop:'15px' }}>{error}</Alert> }
            <Box style={{ position:'relative' }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                style={{ margin: '20px 0 20px 0' }}
                >
                Ingresar
              </Button>
              {/* //TODO mejorar el estilo del loading */}
              { loading && <CircularProgress style={{ position:'absolute', top:'50%', left:'50%', marginLeft:'-12px', marginTop:'-12px'  }}  size={24} /> }
            </Box>
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