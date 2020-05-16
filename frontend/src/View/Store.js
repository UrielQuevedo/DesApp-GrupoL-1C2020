import React from 'react';
import { getStoreByIdUser } from '../Service/Api';
import Product from './Product';
import ListProduct from './ListProduct';
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';

class Store extends React.Component {

    constructor() {
        super();
        this.state = {
            name: null,
            products: null
        }
    }

    componentDidMount() {
        getStoreByIdUser(1)
        .then(data => {
            console.log(data); 
            this.setState({ name: data.name, products: data.products});
        })
        .catch(error => console.log(error));
    }


    render() {
        const { name, products } = this.state;
        return (
            <div className="container">
            <div className="row">
                <h1>{name}</h1>
            </div>
            <div className="row">
                { products && 
                 <ListProduct products={products}/>}
            </div>
        </div>
        )
    }
}

export default Store;