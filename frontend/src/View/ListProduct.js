import React from 'react';
import Product from './Product';
import Grid from '@material-ui/core/Grid';
import DialogUpdateProduct from './DialogUpdateProduct';
import DialogDeleteProduct from './DialogDeleteProduct';

const ListProduct = ({ products, idStore, setProducts }) => {   

    return (
        <React.Fragment>
         { console.log(products) }
        
        {    products.map(product =>
            <Grid item xs={3} key={product.id}>
                <Product name={product.name} price={product.price} 
                image_url ={product.image_url} brand={product.brand} stock={product.stock} category={product.category}/>
                <DialogUpdateProduct idStore={idStore} product={product} setProducts={setProducts}/>
                <DialogDeleteProduct idStore={idStore} idProduct={product.id} setProducts={setProducts}/>
            </Grid>
        )}
        </React.Fragment>
    )
}

export default ListProduct;
