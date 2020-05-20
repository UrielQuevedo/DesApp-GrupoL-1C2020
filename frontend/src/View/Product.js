import React from 'react';
 
const Product = ( { name, price, image_url, brand, stock} ) => {

        return (
            <div className="col mb-4">
                <div className="card h-100">
                    <img src={image_url} height="210px" className="card-img-top"/>
                    <div className="card-body"> 
                        <h5 className="card-title">{brand} - {name}</h5>
                        <p className="card-text">$ {price} </p>
                        <p className="card-text">Stock: {stock} </p>
                    </div>
                </div>
             </div>
        )
}

export default Product;
