import * as React from 'react';
import AppNavbar from '../component/AppNavbar';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { getProductImgURLV2 } from "../API/ImgAPI";
import { getProductById } from "../API/ProductAPI";
import BuyProductButton from "../component/BuyProductButton";
import { MdOutlineAttachMoney } from "react-icons/md";
import APIFacade from "../API/APIFacade";
import UserInfoService from "../service/UserInfo";
import DownloadProductButton from '../component/DownloadProductButton';

export interface IProductDetailProps {

}

export interface IProductDetailState {
    id: number,
    name: string,
    create_user_id: number,
    price: number,
    describe: string,
    isLogin: boolean,
    userPurchaseList: number[]
}

export default class ProductDetail extends React.Component<IProductDetailProps, IProductDetailState> {

    getProductInterval: any;
    constructor(props: IProductDetailProps) {
        super(props);

        let userInfoService = UserInfoService.getInstance();


        this.state = {
            id: 0,
            name: "nothing",
            create_user_id: 0,
            price: 0,
            describe: "nothing",
            isLogin: userInfoService.isExistUser(),
            userPurchaseList: []
        }
    }

    imgSizeStyle = {
        background: 'lightgray',
        objectFit: 'contain',
        height: "400px",
        width: "100%"
    } as any


    productImgURL: string = "";



    componentDidMount() {

        this.updateProductInfo();

        if (typeof this.getProductInterval === "undefined") {
            this.getProductInterval = setInterval(() => {
                this.updateProductInfo();
            }, 1000);
        }

    }

    componentWillUnmount() {
        clearInterval(this.getProductInterval);
        this.getProductInterval = undefined;
    }

    async updateProductInfo() {
        let pathArray = window.location.pathname.split('/'); // Todo 這有bug 因為 Component 不會自動關閉
        let product_id = Number(pathArray[pathArray.length - 1]);

        if (isNaN(product_id)) {
            return;
        }

        this.setState({
            id: product_id
        });

        let imgsURL = await getProductImgURLV2(product_id);
        this.productImgURL = imgsURL[product_id];

        try {
            let product = await getProductById(product_id);
            this.setState({
                name: product["name"],
                create_user_id: product["create_user_id"],
                price: product["price"],
                describe: product["describe"]
            });
        } catch (err) {
            console.error(err);
        }

        this.getUserPurchaseList();

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
                <DownloadProductButton product_id={product_id} product_name={product_name} />
            );
        } else {
            return (
                <BuyProductButton product_id={product_id} />
            );
        }
    }




    public render() {
        return (
            <React.Fragment>

                <AppNavbar />

                <Container>

                    <Row>
                        <Col sm={12} lg={6}> 

                            <img
                                className='img-fluid'
                                style={this.imgSizeStyle}
                                src={this.productImgURL}
                            />

                        </Col>
                        <Col sm={12} lg={6}>
                            <Row>
                                <h1>{this.state.name}</h1>
                            </Row>

                            <Row>
                                <div>
                                    <h3 className="text-danger d-inline"><MdOutlineAttachMoney /></h3>
                                    <h3 className="text-danger d-inline">{this.state.price}</h3>
                                </div>
                            </Row>


                            <Row className='mt-3'>
                                <h4>產品描述: </h4>
                                <h5>{this.state.describe}</h5>
                            </Row>



                            <Row className='mt-5'>
                                {this.getProductsOperateButton(this.state.id, this.state.name)}
                            </Row>

                        </Col>

                    </Row>

                </Container>
            </React.Fragment>
        );
    }
}
