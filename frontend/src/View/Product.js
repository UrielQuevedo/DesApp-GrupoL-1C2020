import React from 'react';
import '../Styles/Product.css';
 
class Product extends React.Component {

    constructor() {
        super();
    }

    render() {
        const { name, price, image_url , brand, stock } = this.props;

        return (
            <div class="col mb-4">
                <div class="card h-100">
                    <img src={image_url} height="200px" class="card-img-top"/>
                    <div class="card-body">
                        <h5 class="card-title">{brand} - {name}</h5>
                        <p class="card-text">$ {price} </p>
                        <p class="card-text">Stock: {stock} </p>
                    </div>
                    <button type="button" class="btn btn-primary">Modificar</button>
                </div>
             </div>
        )
    }
}

export default Product;
