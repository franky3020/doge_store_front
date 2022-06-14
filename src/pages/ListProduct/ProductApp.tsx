import React, { Component } from 'react';
import ProductUI from "./ProductUI";
import AppNavbar from '../AppNavbar';
import UserInfoService from "../../service/UserInfo";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { getAllProducts } from "../../API/ProductAPI";
import ProductEntity from '../../entity/ProductEntity';
import LoginFrom from "../LoginFrom";
import { getProductImgURLV2 } from "../../API/ImgAPI";
import APIFacade from "../../API/APIFacade";
import { API_POLLING_TIMEOUT } from "../../config";
import SuccessMessage from "../SuccessMessage";

export interface IProductAppProps {

}

export interface IProductAppState {
    products: ProductEntity[],
    userPurchaseList: number[], // save products id list
    showLoginFrom: boolean,
    showSuccessMessage: boolean,
    isLogin: boolean
}

export default class ProductApp extends Component<IProductAppProps, IProductAppState> {

    updateInfoAPIInterval: any = undefined;
    productImg: { [key: number]: string };

    constructor(props: any) {
        super(props);

        this.productImg = {};

        let userInfoService = UserInfoService.getInstance();

        let isLogin = false;
        if (userInfoService.isExistUser()) {
            isLogin = true;
        }

        this.state = {
            products: [],
            userPurchaseList: [],
            showLoginFrom: false,
            showSuccessMessage: false,
            isLogin: isLogin
        };

    }

    componentDidMount() {

        if (typeof this.updateInfoAPIInterval === "undefined") {
            this.updateInfoFromAPI();
            this.updateInfoAPIInterval = setInterval(() => {
                this.updateInfoFromAPI();
            }, API_POLLING_TIMEOUT);
        }
    }

    componentWillUnmount() {
        clearInterval(this.updateInfoAPIInterval);
        this.updateInfoAPIInterval = undefined;
    }

    async updateInfoFromAPI() {

        try {
            let products_json = await getAllProducts();
            let products = ProductEntity.createFromJson(products_json);

            this.productImg = getProductImgURLV2(...products.map(p => p.id as number));
            this.getUserPurchaseList();

            this.setState({ products: products });

        } catch (err) {
            console.error(err);
        }

    }

    async getUserPurchaseList() {

        if (this.state.isLogin === false) {
            return;
        }

        // if user login
        try {

            let userPurchaseList = await APIFacade.getPurchaseList();
            this.setState({ userPurchaseList: userPurchaseList });

        } catch (err) {
            console.error(err);
        }
    }

    getProductsOperateButton(product_id: number, product_name: string) {

        if (this.state.userPurchaseList.includes(product_id)) {
            return (
                <Button className="w-100" variant="primary" onClick={this.handleDownloadZipfile.bind(this, product_id, product_name)} >下載ZIP檔</Button>
            );
        } else {
            return (
                <Button className="w-100" variant="primary" onClick={this.handleBuy.bind(this, product_id)} >購買ZIP檔</Button>
            );
        }
    }

    async handleDownloadZipfile(product_id: number, fileName: string) {

        try {
            await APIFacade.downloadProductZipFile(product_id, fileName);
            this.handleSuccessMessage();
        } catch (err) {
            console.error(err);
        }

    }

    getProductImg(id: number) {

        if (typeof this.productImg[id] !== "undefined") {
            return this.productImg[id];
        }
        return "";

    }

    async handleBuy(product_id: number) {
        try {
            if (this.state.isLogin) {
                await APIFacade.purchase(product_id);
                this.handleSuccessMessage();
            } else { // if not login, show LoginFrom
                this.handleShowLoginFrom();
            }
        } catch (err) {
            console.error(err);
        }
    }


    handleSuccessMessage() {

        // TODO: 如果user按很快 會有問題
        this.setState({
            showSuccessMessage: true
        });

        setTimeout(()=>{
            this.setState({
                showSuccessMessage: false
            });
        }, 4000)
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

                {this.state.showSuccessMessage &&
                    <SuccessMessage />
                }


                <AppNavbar />
                <Container>

                    <Row gap={3}>

                        {
                            this.state.products.map(product => {
                                return (
                                    <Col className="mt-2 mb-2" key={product.id} sm={6} md={4} lg={3}>

                                        <ProductUI id={product.id} name={product.name} create_user_id={product.create_user_id}
                                            price={product.price} describe={product.describe} imgURL={this.getProductImg(product.id)}>


                                            {this.getProductsOperateButton(product.id, product.name)}

                                        </ProductUI>

                                    </Col>
                                );
                            })
                        }

                        {/* // if user not login and click buy, then show  <LoginFrom> */}
                        <LoginFrom showModel={this.state.showLoginFrom} closeItself={this.handleCloseLoginFrom.bind(this)} />

                    </Row>
                </Container>

            </React.Fragment>
        );
    }

}
