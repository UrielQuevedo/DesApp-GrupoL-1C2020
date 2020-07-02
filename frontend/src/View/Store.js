import React , { useState, useEffect, useContext } from 'react';
import ListProduct from './ListProduct';
import DialogAddProduct from './DialogAddProduct';
import { getStoreByIdUserRequest } from '../Service/Api';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { UserContext } from '../Context/UserContext';
import DialogUploadFile from './DialogUploadFile';
import '../Styles/Store.css';

const Store = () => {

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
          <Grid container spacing={2}>
            <Grid item md={6} sm={12}>
              <DialogAddProduct idStore={id} setProducts={setProducts} />
            </Grid> 
            <Grid item md={3} sm={12}>
              <DialogUploadFile text="Modificar productos" setProducts={setProducts} isUpdate={true} />
            </Grid> 
            <Grid item md={3} sm={12}>
              <DialogUploadFile idStore={id} text="Agregar productos" setProducts={setProducts} />
            </Grid>  
            { products &&
                <ListProduct products={products} idStore={id} setProducts={setProducts} />
            }     
          </Grid>
          </Container>
        </div>
      }
    </React.Fragment>
    )
}

export default Store;
