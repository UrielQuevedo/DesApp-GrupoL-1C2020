import React from 'react';
import Product from './Product';
import '../Styles/Button.css';

const ListProduct = ({ products }) => {   
    
    return (
         <div className="row">
                { products.map(product =>
                    <div  className="col-md-4" key={product.id}> 
                    <Product name={product.name} price={product.price} 
                    image_url ={product.image_url} brand={product.brand} stock={product.stock}/>
                    <div className="button">
                    <button type="button" className="btn btn-primary">Modificar</button>
                    </div>
                    <div className="button">
                    <button type="button" className="btn btn-danger">Eliminar</button>
                    </div>
                    <br/>
                    </div>
                    
                )}
            </div>
    )
}

export default ListProduct;