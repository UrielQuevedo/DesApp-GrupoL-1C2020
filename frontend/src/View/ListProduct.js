import React from 'react';
import Product from './Product';
import DialogDeleteProduct from './DialogDeleteProduct';
import '../Styles/Button.css';
import Grid from '@material-ui/core/Grid';

  
const ListProduct = ({ products, idStore }) => {   

    return (
        <React.Fragment>
         { products.map(product =>
            <Grid item xs={3} key={product.id}>
                <Product name={product.name} price={product.price} 
                image_url ={product.image_url} brand={product.brand} stock={product.stock}/>
                <div className="buttonM">
                    <button type="button" className="btn btn-primary">Modificar</button>
                </div>
                <DialogDeleteProduct idStore={idStore} idProduct={product.id} />
            </Grid>
        )}
        </React.Fragment>
    )
}

export default ListProduct;
