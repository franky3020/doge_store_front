
import React, { Component } from 'react';

import Product, { IProductProps } from "./Product";

import AppNavbar from '../AppNavbar';
import UserInfoService from "../../service/UserInfo";
import UserEntity from '../../entity/UserEntity';

import { Container, Row, Col } from 'react-bootstrap';
import { getAllProducts } from "../../API/ProductAPI";
import ProductEntity from '../../entity/ProductEntity';


export interface IProductAppProps {

}

export interface IProductAppState {
    products: ProductEntity[]
}

export default class ProductApp extends Component<IProductAppProps, IProductAppState> {

    getProductsInterval: any = undefined;

    constructor(props: any) {
        super(props);
        this.state = { products: [] };
    }

    componentDidMount() {

        this.getProducts();

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


    async getProducts() {

        try {
            let products_json = await getAllProducts();
            let products = ProductEntity.createFromJson(products_json);
            this.setState({ products: products });
        } catch(err) {
            console.error(err);
        }
    }

    render() {
        return (
            <React.Fragment>
                <AppNavbar/>
                <Container>

                    <Row gap={3}>

                        {
                            this.state.products.map(product => {
                                return (
                                    <Col className="mt-2 mb-2" key={product.id} sm={6} md={4} lg={3}>
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
