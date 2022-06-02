
import React, { Component } from 'react';

import Product, { IProductProps } from "./Product";

import AppNavbar from '../AppNavbar';


import { Container, Row, Col } from 'react-bootstrap';


export interface IProductAppProps {

}

export interface IProductAppState {
    products: IProductProps[]
}

export default class ProductApp extends Component<IProductAppProps, IProductAppState> {

    getProductsInterval: any = undefined;

    constructor(props: any) {
        super(props);
        this.state = { products: [] };

    }

    componentDidMount() {

        this.getProducts();
        console.log("componentDidMount");

        if (typeof this.getProductsInterval === "undefined") {
            this.getProductsInterval = setInterval(() => {
                this.getProducts();
            }, 5000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.getProductsInterval);
        this.getProductsInterval = undefined;
    }


    getProducts() {
        fetch('http://localhost:5000/api/product', { method: "GET" })
            .then(res => res.json())
            .then(data => {
                let products = [];

                for (let product of data) {
                    let a_product: IProductProps = {
                        "id": product['id'],
                        "name": product['name'],
                        "create_user_id": product['create_user_id'],
                        "price": product['price'],
                        "describe": product['describe']
                    };

                    products.push(a_product);
                }

                this.setState({ products: products });
            })
            .catch(e => {
                console.log(e);
            })
    }

    render() {
        return (
            <React.Fragment>
                <AppNavbar />
                <Container>

                    <Row gap={2}>

                        {
                            this.state.products.map(product => {
                                return (
                                    <Col key={product.id} sm={6} md={4}>
                                        <Product id={product.id} name={product.name} create_user_id={product.create_user_id} price={product.price} describe={product.describe} />
                                    </Col>
                                );
                            })
                        }
                    </Row>
                </Container>
            </React.Fragment>
        );
    }

}
