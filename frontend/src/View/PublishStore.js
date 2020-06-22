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
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import DialogChangeLocation from './DialogChangeLocation';
import { useHistory } from 'react-router';
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
    const [ location, setLocation ] = useState({});
    const { push } = useHistory();
    const [ actualCoords, setActualCoords ] = useState({
        latitude: user.location.latitude,
        longitude: user.location.longitude
    });
    const [ payments, setPayments ] = useState({
        checkedA: false,
        checkedB: false,
    })
    const [ daysOfWeek, setDaysOfWeek ] = useState({
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
    })
    const handleChangePayments = (event) => {
        setPayments({ ...payments, [event.target.name]: event.target.checked });
    }

    const handleChangeDaysOfWeek = (event) => {
        console.log(event.target.value);
        setDaysOfWeek({ ...daysOfWeek, [event.target.name]: event.target.checked });
    }

    const publishStore = (store) => {
        console.log(store);
        const store_data = setData(store);
        console.log(store_data);
        publishStoreRequest(user.id, store_data)
        .then(data => {
            console.log(data);
            push('/store');
        })
        .catch(error => {
            console.log(error.message);
        })
    }
    
    const setData = (store) => {
        const result = {
            name: store.name,
            sector: sector,
            location: {
                address: location.address,
                latitude: location.latitude,
                longitude: location.longitude
            },
            payments: setDataPayments(store),
            maxDistance: parseInt(store.maxDistance),
            openDays: setDataOpenDays(),
            times: setDataTimes(store)
        }

        return result;
    }

    const setDataTimes = (store) => {
        const times = [];
        if(store.of && store.until) {
            times.push({ of: store.of, until: store.until })
        }
        if(store.of2 && store.until2) {
            times.push({ of: store.of2, until: store.until2 })
        }

        return times;
    }

    const setDataPayments = (store) => {
        const payments = [];
        if(store.checkedA) {
            payments.push(store.checkedA);
        }
        if(store.checkedB) {
            payments.push(store.checkedB);
        }

        return payments;
    }

    const setDataOpenDays = () => {
        const openDays = [];
        if(daysOfWeek.monday) {
            openDays.push('MONDAY');
        }
        if(daysOfWeek.tuesday) {
            openDays.push('TUESDAY');
        }
        if(daysOfWeek.wednesday) {
            openDays.push('WEDNESDAY');
        }
        if(daysOfWeek.thursday) {
            openDays.push('THURSDAY');
        }
        if(daysOfWeek.friday) {
            openDays.push('FRIDAY');
        }
        if(daysOfWeek.saturday) {
            openDays.push('SATURDAY');
        }
        if(daysOfWeek.sunday) {
            openDays.push('SUNDAY');
        }
        
        return openDays;
    }

    const handleChangeSector = (event) => {
        setSector(event.target.value);
        console.log(event.target.value);
    }

    return (
        <React.Fragment>
             <CssBaseline />
             <Container fixed>
                    <div className="containerPublishStore">
                        <form onSubmit={handleSubmit(publishStore)}>
                        <Grid container spacing={2} className="containerData"> 
                            <Grid item xs={12} md={12}>
                                <TextField
                                    autoFocus
                                    required
                                    id="name"
                                    label="Nombre"
                                    type="text"
                                    name="name"
                                    fullWidth
                                    inputRef={register}
                                />
                                </Grid>
                                <Grid item md={12}>
                                    <DialogChangeLocation actualCoords={actualCoords} setActualCoords={setActualCoords}
                                                     location={location} setLocation={setLocation} /> 
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        autoFocus
                                        required
                                        id="Distancia maxima"
                                        label="Distancia maxima"
                                        type="number"
                                        name="maxDistance"
                                        fullWidth
                                        inputRef={register}
                                    /> 
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth >
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
                                            <MenuItem value={"DIETETICA"}>Dietetica</MenuItem>
                                            <MenuItem value={"ALMACEN"}>Almacen</MenuItem>
                                            <MenuItem value={"VERDULERIA"}>Verduleria</MenuItem>
                                            <MenuItem value={"CARNICERIA"}>Carniceria</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={12}>
                                    <p style={{ textAlign: 'center', margin: '0px' }}> Dias </p>
                                </Grid> 
                                <Grid item md={3}>
                                    <FormControlLabel
                                        control={<GreenCheckbox checked={daysOfWeek.monday} onChange={handleChangeDaysOfWeek} name="monday" />}
                                        label="Lunes"
                                        name="MONDAY"
                                        value="MONDAY"
                                        inputRef={register}
                                    />
                                </Grid>
                                <Grid item md={3}>
                                    <FormControlLabel
                                        control={<GreenCheckbox checked={daysOfWeek.tuesday} onChange={handleChangeDaysOfWeek} name="tuesday" />}
                                        label="Martes"
                                        name="TUESDAY"
                                        value="TUESDAY"
                                        inputRef={register}
                                    />
                                </Grid>
                                <Grid item md={3}>
                                    <FormControlLabel
                                        control={<GreenCheckbox checked={daysOfWeek.wednesday} onChange={handleChangeDaysOfWeek} name="wednesday" />}
                                        label="Miercoles"
                                        name="WEDNESDAY"
                                        value="WEDNESDAY"
                                        inputRef={register}
                                    />
                                </Grid>
                                <Grid item md={3}>
                                    <FormControlLabel
                                        control={<GreenCheckbox checked={daysOfWeek.thursday} onChange={handleChangeDaysOfWeek} name="thursday" />}
                                        label="Jueves"
                                        name="THURSDAY"
                                        value="THURSDAY"
                                        inputRef={register}
                                    />
                                </Grid>
                                <Grid item md={3}>
                                    <FormControlLabel
                                        control={<GreenCheckbox checked={daysOfWeek.friday} onChange={handleChangeDaysOfWeek} name="friday" />}
                                        label="Viernes"
                                        name="FRIDAY"
                                        value="FRIDAY"
                                        inputRef={register}
                                    />
                                </Grid>
                                <Grid item md={3}>  
                                    <FormControlLabel
                                        control={<GreenCheckbox checked={daysOfWeek.saturday} onChange={handleChangeDaysOfWeek} name="saturday" />}
                                        label="Sabado"
                                        name="SATURDAY"
                                        value="SATURDAY"
                                        inputRef={register}
                                    />
                                </Grid>
                                <Grid item md={3}>
                                    <FormControlLabel
                                        control={<GreenCheckbox checked={daysOfWeek.sunday} onChange={handleChangeDaysOfWeek} name="sunday" />}
                                        label="Domingo"
                                        name="SUNDAY"
                                        value="SUNDAY"
                                        inputRef={register}
                                    />
                                </Grid>
                                <Grid md={6}>
                                    <p style={{ textAlign: 'center' }}> Metodos de pago </p>
                                </Grid>
                                <Grid md={6}>
                                    <p style={{ textAlign: 'center' }}> Horarios </p>
                                </Grid>
                                <Grid md={6} >
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
                                </Grid>
                                <Grid md={2}>
                                    <TextField
                                        id="time"
                                        type="time"
                                        name="of"
                                        inputRef={register}
                                    />
                                     <TextField
                                        id="time"
                                        type="time"
                                        name="of2"
                                        inputRef={register}
                                    />
                                </Grid>
                                <Grid md={2}>
                                    <p style={{ textIndent: '20px' }}> hasta </p>
                                    <p style={{ textIndent: '20px' }}> hasta </p>
                                </Grid>
                                <Grid md={2}>
                                    <TextField
                                        id="time"
                                        type="time"
                                        name="until"
                                        inputRef={register}
                                    />
                                     <TextField
                                        id="time"
                                        type="time"
                                        name="until2"
                                        inputRef={register}
                                    />
                                </Grid>
                        </Grid>
                        <Grid md={12} className='containerButton'>
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
                        </Grid>
                        </form>
                    </div>
             </Container>
        </React.Fragment>
    )
}

export default PublishStore;


