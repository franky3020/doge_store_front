import React, { Component } from 'react';
import ProductUI from "../component/ProductUI";
import AppNavbar from '../component/AppNavbar';
import UserInfoService from "../service/UserInfo";
import { Container, Row, Col } from 'react-bootstrap';
import { getAllProducts } from "../API/ProductAPI";
import ProductEntity from '../entity/ProductEntity';
import { getProductImgURLV2 } from "../API/ImgAPI";
import APIFacade from "../API/APIFacade";
import { API_POLLING_TIMEOUT } from "../config";
import SuccessMessage from "../component/SuccessMessage";
import BuyProductButton from "../component/BuyProductButton";
import DownloadProductButton from '../component/DownloadProductButton';


export interface IProductAppProps {

}

export interface IProductAppState {
    products: ProductEntity[],
    userPurchaseList: number[], // save products id list
    showLoginFrom: boolean,
    isLogin: boolean
}

export default class ProductApp extends Component<IProductAppProps, IProductAppState> {

    updateInfoAPIInterval: any = undefined;
    productImg: { [key: number]: string };

    constructor(props: any) {
        super(props);

        this.productImg = {};

        let userInfoService = UserInfoService.getInstance();

        this.state = {
            products: [],
            userPurchaseList: [],
            showLoginFrom: false,
            isLogin: userInfoService.isExistUser()
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
                <DownloadProductButton product_id={product_id} product_name={product_name}/>
            );
        } else {
            return (
                <BuyProductButton product_id={product_id}/>
            );
        }
    }


    getProductImg(id: number) {

        if (typeof this.productImg[id] !== "undefined") {
            return this.productImg[id];
        }
        return "";

    }



    render() {
        return (
            <React.Fragment>


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
                        
                    </Row>
                </Container>

            </React.Fragment>
        );
    }

}
