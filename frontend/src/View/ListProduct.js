import React from 'react';
import Product from './Product';
import DialogDeleteProduct from './DialogDeleteProduct';
import { deleteProductRequest } from '../Service/Api';
import '../Styles/Button.css';

const ListProduct = ({ products, idStore }) => {   


   /* const deleteProduct = (id) => {
        deleteProductRequest(idStore, id)
        .then(data => {
            console.log("se elimino correctamente");
        })
        .catch(error => {
            console.log(error);
        })    
    } 
*/
    return (
         <div className="row">
                { products.map(product =>
                    <div  className="col-md-4" key={product.id}> 
                        <Product name={product.name} price={product.price} 
                        image_url ={product.image_url} brand={product.brand} stock={product.stock}/>
                        <div className="button">
                            <button type="button" className="btn btn-primary">Modificar</button>
                        </div>
                            <DialogDeleteProduct idStore={idStore} idProduct={product.id} />
                        <br/>
                    </div>
                    
                )}
            </div>
    )
}

export default ListProduct;
