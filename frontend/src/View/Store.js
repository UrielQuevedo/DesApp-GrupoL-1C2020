import React , { useState, useEffect } from 'react';
import ListProduct from './ListProduct';
import AddProduct from './AddProduct';
import useStore from '../Hooks/useStore';
import DialogAddProduct from './DialogAddProduct';
import { getStoreByIdUserRequest } from '../Service/Api';

const Store = () => {

  const [ id, setId ] = useState(null); 
  const [ name, setName ] = useState(null); 
  const [ products, setProducts] = useState(null);
  const [ productsSize, setProductsSize] = useState(0); 

  useEffect(() => {
      if(!id) {
      getStoreByIdUserRequest(1)
      .then(data => {
        console.log(data);
        const { id, name, products } = data;
        setId(id);
        setName(name);
        setProducts(products);
        setProductsSize(products.size);
      })
      .catch(error => {
        console.log(error);
      })
    }
else {
    if(productsSize != products.size) {
      console.log("agregue un producto");
    }
  }
    return () => console.log("hago un clear");

  }, [products])

    return (
          <div className="container">
            <h1> {name} </h1>
            <DialogAddProduct setProducts={setProducts}/>
            <div className="row">
              { products  &&
              <ListProduct products={products}/>
             }          
            </div>
          </div>
    )
}

export default Store;
