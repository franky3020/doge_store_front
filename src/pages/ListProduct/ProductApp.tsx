
import React, { Component } from 'react';

import ProductUI from "./ProductUI";

import AppNavbar from '../AppNavbar';
import UserInfoService from "../../service/UserInfo";

import { Container, Row, Col, Button } from 'react-bootstrap';
import { getAllProducts } from "../../API/ProductAPI";
import ProductEntity from '../../entity/ProductEntity';
import LoginFrom from "../LoginFrom";

import { getProductImgAPI } from "../../API/ImgAPI";

export interface IProductAppProps {

}

export interface IProductAppState {
    products: ProductEntity[],
    showLoginFrom: boolean,
    isLogin: boolean
}

export default class ProductApp extends Component<IProductAppProps, IProductAppState> {

    getProductsInterval: any = undefined;
    userInfoService: UserInfoService;
    productImg: {[key: number]: string};


    constructor(props: any) {
        super(props);

        



        this.productImg = {};

        let isLogin = false;
        this.userInfoService = UserInfoService.getInstance();
        if (this.userInfoService.isExistUser()) {
            isLogin = true;
        }

        this.state = { products: [],
            showLoginFrom: false,
            isLogin: isLogin };

        
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
            
            for(let p of products) {
                this.loadProductImg(p.id);
            }
            
            this.setState({ products: products });

        } catch(err) {
            console.error(err);
        }
    }

    loadProductImg(id: number) {

        getProductImgAPI(id).then((imgSource) => {
            this.productImg[id] = imgSource
        }).catch((err: any) => {
            console.error(err);
        });
    }

    getProductImg(id: number) {

        if(typeof this.productImg[id] !== "undefined") {
            return this.productImg[id];
        }
        return "";
      
    }

    handleBuy() {
        if (this.state.isLogin) {
            // Todo 將會要求輸入購買密碼
        } else {
            this.handleShowLoginFrom();
        }
    }

    handleShowLoginFrom() {
        this.setState({
            showLoginFrom: true
        });
    }

    handleCloseLoginFrom() {
        this.setState({
            showLoginFrom: false
        });
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

                                        <ProductUI id={product.id} name={product.name} create_user_id={product.create_user_id} 
                                        price={product.price} describe={product.describe} imgURL={this.getProductImg(product.id)}>

                                            <Button className="w-100" variant="primary" onClick={this.handleBuy.bind(this)} >Buy</Button>

                                        </ProductUI>
                                        
                                    </Col>
                                );
                            })
                        }
                        <LoginFrom showModel={this.state.showLoginFrom} closeItself={this.handleCloseLoginFrom.bind(this)} />
                    </Row>
                </Container>

            </React.Fragment>
        );
    }

}
