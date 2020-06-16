import { Button, Divider, Grid, TextField } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import NavigationProfile from '../Components/ProfileView/NavigationProfile';
import { UserContext } from '../Context/UserContext';
import '../Styles/User.css';
import DataContainerProfile from '../Components/ProfileView/DataContainerProfile';

const UserData = () => {
  const { user } = useContext(UserContext);
  const [ userToEdit, setUserToEdit ] = useState({
    username: user.username,
    email: user.email,
  });

  const handleChangeUserValue = (type, value) => {
    setUserToEdit({ ...userToEdit, [type]: value });
  }

  const onSubmitSendEdit = (e) => {
    e.preventDefault();
    setUserToEdit(userToEdit);
    e.target.reset();
    //Enviar datos
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
          defaultValue={userToEdit[defaultValue]}
        />
      </div>
    );
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
                type="password"
                required size="small"
                className="form-item"
                variant="outlined"
                placeholder="Ingresar contraseña actual"
                onChange={(e) => handleChangeUserValue("actualPassword", e.target.value)}
              />
            </div>
            <Grid container item justify="flex-end" style={{ marginBottom:'10px' }}>
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
    <Grid container justify="center" direction="row" style={{ marginTop:'4.5rem', display:'flex' }}>
      <Grid container item xs={9} justify="center">
        <NavigationProfile actualView={1} />
        <DataContainerProfile title="Editar Mis Datos" view={settingView} />
      </Grid>
    </Grid>
  );
}

export default UserData;