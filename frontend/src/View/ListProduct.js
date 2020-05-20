import React from 'react';
import Product from './Product';

const ListProduct = ({ products }) => {   
    return (
        
            <div className="row row-cols-1 row-cols-md-3">
            { products.map(product =>
                <div key={product.id}>
                <Product name={product.name} price={product.price} 
                image_url ={product.image_url} brand={product.brand} stock={product.stock}/>
                <button type="button" className="btn btn-primary">Modificar</button>
                <button type="button" className="btn btn-danger">Eliminar</button>
                </div>
            )}
            </div>
        
    )
}

export default ListProduct;