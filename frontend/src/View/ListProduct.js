import React from 'react';
import Product from './Product';
import Grid from '@material-ui/core/Grid';

const ListProduct = ({ products, idStore, setProducts }) => {   

    return (
        <React.Fragment>
        {  products.map(product =>
            <Grid item xs={12} sm={4} md={3} key={product.id}>
                <Product idStore={idStore} product={product} setProducts={setProducts} />
            </Grid>
        )}
        </React.Fragment>
    )
}

export default ListProduct;
