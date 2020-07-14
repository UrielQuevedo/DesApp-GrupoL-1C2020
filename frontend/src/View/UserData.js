import { Button, CircularProgress, Divider, Grid, TextField, InputAdornment, IconButton } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import React, { useContext, useState } from 'react';
import DataContainerProfile from '../Components/ProfileView/DataContainerProfile';
import NavigationProfile from '../Components/ProfileView/NavigationProfile';
import { UserContext } from '../Context/UserContext';
import { useEditUserProfile } from '../Service/AuthService';
import '../Styles/User.css';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const UserData = () => {
  const { user, setUser } = useContext(UserContext);

  const defaultValuesToEdit = (data) => {
    return {
      actualEmail: data.email,
      actualPassword: '',
      username: data.username,
      email: data.email,
      password: '',
    }
  }

  const [ userToEdit, setUserToEdit ] = useState(defaultValuesToEdit(user));
  const { postEditUser, userEditLoading, error, setError } = useEditUserProfile(userToEdit);
  const [ isCorrectly, setIsCorrectly ] = useState(false);
  const [ showPassword, setShowPassword ] = useState(false);

  const handleChangeUserValue = (type, value) => {
    setUserToEdit({ ...userToEdit, [type]: value });
  }

  const setValuesToEdit = (data) => {
    setUserToEdit(defaultValuesToEdit(data));
    setError('');
    setIsCorrectly(true);
    setUser(data);
  }

  const handlerError = (response) => {
    setIsCorrectly(false);
    setError(response.data.message);
  }

  const onSubmitSendEdit = (e) => {
    e.preventDefault();
    postEditUser(setValuesToEdit, handlerError);
    e.target.reset();
  }

  const customInput = (title, type, defaultValue, placeholder) => {
    return (
      <div>
        <div style={{ marginBottom:'5px', color:'#ffff' }}>
          { title }
        </div>
        <TextField
          type={type}
          placeholder={placeholder}
          size="small"
          className="form-item"
          variant="outlined"
          onChange={(e) => handleChangeUserValue(defaultValue, e.target.value)}
          value={userToEdit[defaultValue]}
        />
      </div>
    );
  }

  const inputPropsShowPassowrd = () => {
    return {
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
    }
  }

  const settingView = () => {
    return (
      <Grid container item justify="center" style={{padding:'10px'}}>
        <Grid container item justify="center" className="container-form" direction="column">
          <form onSubmit={onSubmitSendEdit}>
            {customInput("Nombre de Usuario", "text", "username")}
            {customInput("Correo Electronico", "email", "email")}
            {customInput("Nueva Contraseña", "password", "password", "Ingresar contraseña")}
            <Divider style={{ background:'#ffff' }} variant="middle" />
            <div>
              <p style={{fontSize:'18px', color:'#ffff'}}>
                Para confirmar los cambios debe ingresar la contraseña actual
              </p>
              <TextField
                type={ showPassword ? "text" : "password" }
                required size="small"
                className="form-item"
                variant="outlined"
                placeholder="Ingresar contraseña actual"
                onChange={(e) => handleChangeUserValue("actualPassword", e.target.value)}
                InputProps={inputPropsShowPassowrd()}
              />
              { error && <div style={{ color:'#ffff', display:'flex', borderLeft:'3px solid #ffff' }}> <HighlightOffIcon style={{ color:'#ffff', margin:'0 5px 0 5px' }} />  { error }. </div>}
            </div>
            <Grid container item justify="flex-end" style={{ marginBottom:'10px' }}>
              { userEditLoading && <CircularProgress size={28} style={{ color:'#ffff', marginRight:'15px', position:'relative', top:'3px' }} /> }
              { isCorrectly && !userEditLoading && <CheckCircleOutlineIcon style={{ color:'#0f0', position:'relative', marginRight:'10px', top:'5px', transform:'scale(1.2)' }} /> }
              <Button type="submit" variant="contained" color="primary">
                Aceptar
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container justify="center" direction="row" style={{ marginTop:'4.5rem', display:'flex', marginBottom:'30px' }}>
      <Grid container item xs={9} justify="center">
        <NavigationProfile actualView={1} />
        <DataContainerProfile title="Editar Mis Datos" view={settingView} />
      </Grid>
    </Grid>
  );
}

export default UserData;