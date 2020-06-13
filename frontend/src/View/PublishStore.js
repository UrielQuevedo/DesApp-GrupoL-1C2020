import React, { useState, useContext } from 'react';
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
import { Link } from 'react-router-dom';
import { publishStore } from '../Service/Api';
import { UserContext } from '../Context/UserContext';
import '../Styles/PublishStore.css';

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

    const { user } = useContext(UserContext);
    const { register, handleSubmit } = useForm();
    const [ payments, setState ] = useState({
        checkedA: '',
        checkedB: '',
    })
    
    const handleChange = (event) => {
        setState({ ...payments, [event.target.name]: event.target.checked });
    }

    const publishStore = (store) => {
        console.log(store);
    }

    return (
        <React.Fragment>
            <br/> <br/> <br/>
             <CssBaseline />
             <Container fixed>
                    <div className="containerPublishStore">
                        <form onSubmit={handleSubmit(publishStore)}>
                        <div className="containerData"> 
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
                                    name="location"
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
                                    name="maxDistance"
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
                                    name="sector"
                                    fullWidth
                                    inputRef={register}
                                />
                                <div>
                                    <p>Metodos de pago</p>
                                    <FormControlLabel
                                        control={<GreenCheckbox checked={payments.checkedA} onChange={handleChange} name="checkedA" />}
                                        label="Efectivo"
                                        name="EFECTIVO"
                                        value="EFECTIVO"
                                        inputRef={register}
                                    />
                                    <FormControlLabel
                                        control={<GreenCheckbox checked={payments.checkedB} onChange={handleChange} name="checkedB" />}
                                        label="Tarjeta"
                                        name="TARJETA"
                                        value="TARJETA"
                                        inputRef={register}
                                    />
                                </div>
                        </div>
                        <div className="containerButton">
                            <Link style={{ textDecoration:'none' }} to="/">
                                <Button color="primary">
                                    Volver al home
                                </Button>
                            </Link>
                            <div className="buttonRight">
                                <Button variant="contained" type="submit" color="primary">
                                    Crear tienda
                                </Button>
                            </div>
                        </div>
                        </form>
                    </div>
             </Container>
        </React.Fragment>
    )
}

export default PublishStore;


