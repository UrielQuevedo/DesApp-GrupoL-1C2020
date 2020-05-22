import React , { useState, useEffect } from 'react';
import ListProduct from './ListProduct';
import DialogAddProduct from './DialogAddProduct';
import { getStoreByIdUserRequest } from '../Service/Api';

const Store = () => {

  const [ id, setId ] = useState(null); 
  const [ name, setName ] = useState(null); 
  const [ products, setProducts] = useState(null);

  useEffect(() => {
      if(!id) {
      getStoreByIdUserRequest(1)
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
        <div className="container">
            <h1> {name} </h1>
            <DialogAddProduct setProducts={setProducts}/>
              { products  &&
              <ListProduct products={products}/>
              }
           
        </div>
    )
}

export default Store;
