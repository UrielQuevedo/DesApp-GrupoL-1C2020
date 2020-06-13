import React from 'react';
import { useForm } from 'react-hook-form';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import '../Styles/Store.css';

const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />)

const PublishStore = () => {

    const { register, handleSubmit } = useForm();
    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: false,
      })
    
      const handleChange = (event) => {
        console.log(event.target.checked);
        setState({ ...state, [event.target.name]: event.target.checked });
      }


    return (
        <React.Fragment>
            <br/> <br/> <br/>
             <CssBaseline />
             <Container fixed>
                    <div className="containerPublishStore">
                        <div className="containerData"> 
                            <form>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    required
                                    id="name"
                                    label="Nombre"
                                    type="text"
                                    name="name"
                                    fullWidth
                                    inputRef={register}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    required
                                    id="Direccion"
                                    label="Dirección"
                                    type="text"
                                    name="Direccion"
                                    fullWidth
                                    inputRef={register}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    required
                                    id="Sector"
                                    label="Sector"
                                    type="text"
                                    name="Sector"
                                    fullWidth
                                    inputRef={register}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    required
                                    id="Distancia maxima"
                                    label="Distancia maxima"
                                    type="number"
                                    name="Distancia maxima"
                                    fullWidth
                                    inputRef={register}
                                /> 
                                <div>
                                    <p>Metodos de pago</p>
                                    <FormControlLabel
                                        control={<GreenCheckbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
                                        label="Efectivo"
                                    />
                                    <FormControlLabel
                                        control={<GreenCheckbox checked={state.checkedB} onChange={handleChange} name="checkedB" />}
                                        label="Tarjeta"
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="containerButton">
                            <Button onClick={() => console.log("volve al home")} color="primary">
                                Volver al home
                            </Button>
                            <div className="buttonRight">
                                <Button variant="contained" type="submit" color="primary" style={{}}>
                                    Crear tienda
                                </Button>
                            </div>
                        </div>
                    </div>
             </Container>
        </React.Fragment>
    )
}

export default PublishStore;


