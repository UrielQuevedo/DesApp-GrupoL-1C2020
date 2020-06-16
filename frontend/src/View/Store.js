import React , { useState, useEffect, useContext } from 'react';
import ListProduct from './ListProduct';
import DialogAddProduct from './DialogAddProduct';
import { getStoreByIdUserRequest } from '../Service/Api';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { UserContext } from '../Context/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Store = () => {

  const classes = useStyles();
  const { user } = useContext(UserContext);
  const idUser = user.id;
  const [ id, setId ] = useState(null); 
  const [ name, setName ] = useState(null); 
  const [ products, setProducts] = useState(null);
  const [ loading, setLoading] = useState(true);

  useEffect(() => {
    {console.log(user)}
    setLoading(false);
      if(!id) {
        getStoreByIdUserRequest(idUser)
        .then(data => {
          console.log(data);
          const { id, name, products } = data;
          setId(id);
          setName(name);
          setProducts(products);
        })
        .catch(error => {
          console.log(error);
        })
      }
  }, [])

    return (
      <React.Fragment>
      { loading ? 
        <h1> Cargando... </h1> :
        <div>
          <CssBaseline />
          <Container fixed>
            <div className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>{name}</Paper>
            </Grid>
            <Grid item xs={12}>
              <DialogAddProduct idStore={id} setProducts={setProducts} />
            </Grid> 
            { products  &&
                <ListProduct products={products} idStore={id} setProducts={setProducts}/>
            }     
          </Grid>
            </div>
          </Container>
        </div>
      }
    </React.Fragment>
    )
}

export default Store;
