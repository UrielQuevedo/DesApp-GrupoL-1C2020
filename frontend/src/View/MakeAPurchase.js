import { Grid, Step, StepLabel, Stepper } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import EditQuantity from '../Components/MakeAPurchase/EditQuantity';
import SelectPayment from '../Components/MakeAPurchase/SelectPayment';
import SelectWithDrawalMethod from '../Components/MakeAPurchase/SelectWithDrawalMethod';
import { ShoppingCartContext } from '../Context/ShoppingCartContext';
import { useMakePuchase } from '../Service/ShoppingCartService';
import { UserContext } from '../Context/UserContext';
import SuccessfulPurchase from '../Components/MakeAPurchase/SuccessfulPurchase';

const MakeAPurchase = () => {
  const { shoppingCart, setShoppingCart } = useContext(ShoppingCartContext);
  const { user } = useContext(UserContext);
  const [ activeStep, setActiveStep ] = useState(0);
  const { makeAPurchase, values, setValues } = useMakePuchase(user.id);
  const steps = ['Editar Carrito', 'Forma de Pago', 'Tipo de Entrega'];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBuy = (e) => {
    e.preventDefault();
    makeAPurchase(setActiveStep, setShoppingCart);
  };

  const StepOptions = () => {
    switch (activeStep) {
      case 0:
        return <EditQuantity shoppingCart={shoppingCart} handleNextStep={handleNext} />;
      case 1:
        return <SelectPayment shoppingCart={shoppingCart} handleNextStep={handleNext} values={values} setValues={setValues} />;
      case 2:
        return <SelectWithDrawalMethod shoppingCart={shoppingCart} handleNextStep={handleNext} handleBuy={handleBuy} values={values} setValues={setValues} />
      case 3:
        return <SuccessfulPurchase />
      default:
        return <div>This purchase is not valid</div>
    }
  }

  return (
    <Grid container justify="center" style={{ marginTop:'5rem', fontFamily: 'Segoe UI' }}>
      <Grid container item xs="3" justify="center" direction="column">
        <Stepper activeStep={activeStep} alternativeLabel style={{ marginBottom: '15px' }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <StepOptions />
      </Grid>
    </Grid>
  );
}

export default MakeAPurchase;