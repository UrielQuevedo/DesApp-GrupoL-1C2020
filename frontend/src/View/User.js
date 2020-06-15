import { AppBar, Button, Divider, Grid, Tab, Tabs, TextField } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { UserContext } from '../Context/UserContext';
import '../Styles/User.css';

const User = () => {
  const { user } = useContext(UserContext);
  const [ userToEdit, setUserToEdit ] = useState({
    username: user.username,
    email: user.email,
  });

  const NavigationBar = () => {
    return (
      <div style={{ marginTop:'20px' }}>
        <AppBar position="static" color="default">
          <Tabs
            value={1}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Mis Ordenes" />
            <Tab label="Mis Datos" />
            <Tab label="Cubrir Gastos" />
          </Tabs>
        </AppBar>
      </div>
    );
  }

  const Title = ({ title }) => {
    return (
      <div className="container-title">
        <h1>
          { title }
        </h1>
      </div>
    );
  }

  const UserSettings = () => {
    return (
      <Grid container item xs={9} justify="center">
        <NavigationBar />
        <div className="container-settings">
          <Title title="Editar Mis Datos" />
          <Grid container item justify="center" style={{padding:'10px'}}>
            <Grid container item justify="center" className="container-form" direction="column">
              <form>
                <div>
                  <div style={{marginBottom:'5px', marginTop:'20px', color:'#ffff'}}>
                    Nombre de Usuario
                  </div>
                  <TextField size="small" className="form-item" variant="outlined" defaultValue={userToEdit.username} />
                </div>
                <div>
                  <div style={{marginBottom:'5px', color:'#ffff'}}>
                    Correo Electronico
                  </div>
                  <TextField size="small" className="form-item" variant="outlined" defaultValue={userToEdit.email} />
                </div>
                <div>
                  <div style={{marginBottom:'5px', color:'#ffff'}}>
                    Nueva Contraseña
                  </div>
                  <TextField type="password" size="small" className="form-item" variant="outlined" placeholder="Ingresar contraseña" />
                </div>
                <Divider style={{ background:'#ffff' }} variant="middle" />
                <div>
                  <p style={{fontSize:'18px', color:'#ffff'}}>
                    Para confirmar los cambios debe ingresar la contraseña actual
                  </p>
                  <TextField type="password" required size="small" className="form-item" variant="outlined" placeholder="Ingresar contraseña actual" />
                </div>
                <Grid container item justify="flex-end" style={{ marginBottom:'10px' }}>
                  <Button type="submit" variant="contained" color="primary">Aceptar</Button>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </div>
      </Grid>
    );
  }

  return (
    <Grid container justify="center" direction="row" style={{ marginTop:'4.5rem', display:'flex' }}>
      <UserSettings />
    </Grid>
  );
}

export default User;