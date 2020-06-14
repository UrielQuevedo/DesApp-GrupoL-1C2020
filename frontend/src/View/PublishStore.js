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
import { publishStoreRequest } from '../Service/Api';
import { UserContext } from '../Context/UserContext';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
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
    const [ sector, setSector ] = useState('');
    const [ payments, setState ] = useState({
        checkedA: false,
        checkedB: false,
    })
    
    const handleChangePayments = (event) => {
        setState({ ...payments, [event.target.name]: event.target.checked });
    }

    const publishStore = (store) => {
        const store_data = setData(store);
        console.log(store_data);
        publishStoreRequest(user.id, store_data)
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error.message);
        })
    }
    
    const setData = (store) => {
        const payments = [];
        if(store.checkedA) {
            payments.push(store.checkedA);
        }
        if(store.checkedB) {
            payments.push(store.checkedB);
        }

        const result = {
            name: store.name,
            location: user.location,
            maxDistance: store.maxDistance,
            sector: sector,
            payments: payments
        }

        return result;
    }

    const handleChangeSector = (event) => {
        setSector(event.target.value);
        console.log(event.target.value);
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
                                <FormControl fullWidth>
                                    <InputLabel id="select-sector">Sector</InputLabel>
                                    <Select
                                        fullWidth
                                        labelId="select-sector"
                                        id="sector"
                                        label="SECTOR"
                                        value={sector}
                                        onChange={handleChangeSector}
                                        >
                                        <MenuItem value={"FARMACIA"}>Farmacia</MenuItem>
                                        <MenuItem value={"KIOSCO"}>Kiosco</MenuItem>
                                        <MenuItem value={"DIETICA"}>Dietetica</MenuItem>
                                        <MenuItem value={"ALMACEN"}>Almacen</MenuItem>
                                        <MenuItem value={"VERDULERIA"}>Verduleria</MenuItem>
                                        <MenuItem value={"CARNICERIA"}>Carniceria</MenuItem>
                                    </Select>
                                </FormControl>
                                <div>
                                    <p>Metodos de pago</p>
                                    <FormControlLabel
                                        control={<GreenCheckbox checked={payments.checkedA} onChange={handleChangePayments} name="checkedA" />}
                                        label="Efectivo"
                                        name="EFECTIVO"
                                        value="EFECTIVO"
                                        inputRef={register}
                                    />
                                    <FormControlLabel
                                        control={<GreenCheckbox checked={payments.checkedB} onChange={handleChangePayments} name="checkedB" />}
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


