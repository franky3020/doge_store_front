
import React, { Component } from 'react';

import Product, {IProductProps} from "./Product";

export interface IProductAppProps {
    
}

export interface IProductAppState {
    products: IProductProps[]
}

export default class ProductApp extends Component<IProductAppProps, IProductAppState> {

    constructor(props: any) {
        super(props);
        this.state = {products: []};
    }

    componentDidMount(){
        
        this.getProducts();

        setInterval(() => {
            this.getProducts();
          }, 1000);


    }

    getProducts() {
        fetch( 'http://localhost:5000/api/product',{method:"GET"})
        .then(res => res.json())
        .then(data => {
            let products = [];

            for(let product of data ) {
                let a_product: IProductProps = {"id": product['id'], 
                                                "name": product['name'],
                                                "create_user_id": product['create_user_id'],
                                                "price": product['price'],
                                                "describe": product['describe']};

                products.push(a_product);
            }
            
            this.setState({products: products});
        })
        .catch(e => {
            console.log(e);
        })
    }

    render() {
        return (
            <div>
                {this.state.products.map(product => (
                    <div>
                    <Product id={product.id} name={product.name} create_user_id={product.create_user_id} price={product.price} describe={product.describe} />
                    <p>----------------------------</p>
                    </div>
                ))}
            </div>
        );
    }

}
