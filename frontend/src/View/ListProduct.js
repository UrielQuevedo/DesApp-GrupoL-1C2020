import React from 'react';
import Product from './Product';

const ListProduct = ({ products }) => (
    
    <div class="row row-cols-1 row-cols-md-3">
        { products.map(product => 
            <Product key={product.id} name={product.name} price={product.price} 
            image_url ={product.image_url} brand={product.brand} stock={product.stock}/> 
        )}
    </div>
)

export default ListProduct;