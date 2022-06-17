import * as React from 'react';
import { ListGroup, Row, Col } from 'react-bootstrap';
import AppNavbar from "../component/AppNavbar";
import ProductEntity from '../entity/ProductEntity';
import { getProductImgURLV2 } from "../API/ImgAPI";
import { getAllProducts } from "../API/ProductAPI";
import APIFacade from "../API/APIFacade";
import UserInfoService from "../service/UserInfo";
import LoginFrom from "../component/LoginFrom";
import SuccessMessage from '../component/SuccessMessage';
import DownloadProductButton from '../component/DownloadProductButton';
import { Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';


export interface IPurchaseListPageProps {

}

export interface IPurchaseListPageState {
    products: ProductEntity[],
    showSuccessMessage: boolean,
    isLogin: boolean,
    hasAnyProduct: boolean
}

export default class PurchaseListPage extends React.Component<IPurchaseListPageProps, IPurchaseListPageState> {

    getPurchaseProductsInterval: any = undefined;
    productsImgURL: { [product_id: number]: string };

    imgSizeStyle = {
        background: 'lightgray',
        objectFit: 'contain',
        height: "100px",
        width: "100px"
    } as any;


    constructor(props: IPurchaseListPageProps) {
        super(props);

        let userInfoService = UserInfoService.getInstance();

        this.productsImgURL = {};

        this.state = {
            products: [],
            showSuccessMessage: false,
            isLogin: userInfoService.isExistUser(),
            hasAnyProduct: true
        }
    }

    componentDidMount() {

        if (this.state.isLogin === false) {
            return;
        }

        this.getPurchaseProducts();

        if (typeof this.getPurchaseProductsInterval === "undefined") {
            this.getPurchaseProductsInterval = setInterval(() => {
                this.getPurchaseProducts();
            }, 5000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.getPurchaseProductsInterval);
        this.getPurchaseProductsInterval = undefined;
    }

    ifNotLoginShowLoginFrom() {
        if (this.state.isLogin === false) {
            return (
                <LoginFrom showModel={true} closeItself={() => { }} hasCloseBuuton={false} />
            )
        }
    }

    async getPurchaseProducts() {
        try {

            let userPurchaseList = await APIFacade.getPurchaseList();
            let products_json: ProductEntity[] = await getAllProducts();

            let products = products_json.filter((product, _) => userPurchaseList.includes(product.id));
            if (products.length === 0) {
                this.setState({
                    hasAnyProduct: false
                });
            } else {
                this.setState({
                    hasAnyProduct: true
                });
            }


            this.setState({
                products: products
            })

            this.productsImgURL = getProductImgURLV2(...products.map(p => p.id as number));

        } catch (err) {
            console.error(err);
        }
    }


    handleSuccessMessage() {
        this.setState({
            showSuccessMessage: true
        });

        setTimeout(() => {
            this.setState({
                showSuccessMessage: false
            });
        }, 4000)
    }

    public render() {
        return (
            <React.Fragment>

                <AppNavbar />

                {this.ifNotLoginShowLoginFrom()}

                {this.state.showSuccessMessage &&
                    <SuccessMessage />
                }
               

                {!this.state.hasAnyProduct &&

                    <Alert variant="danger">
                        未購買任何產品
                    </Alert>
                }



                <ListGroup className="gap-4">

                    {
                        this.state.products.map(product => {
                            return (
                                <ListGroup.Item key={product.id}>
                                    <h4>{product.name}</h4>

                                    <Row>
                                        <Col sm={2}>
                                            

                                            <Link to={"/product/" + product.id}>
                                                <img
                                                    style={this.imgSizeStyle}
                                                    src={this.productsImgURL[product.id]}
                                                />
                                            </Link>

                                        </Col>
                                        <Col sm={2}>
                                            <p>產品描述: </p>
                                            {product.describe}
                                        </Col>
                                        <Col sm={4}>
                                            <DownloadProductButton overWriteClassName="" product_id={product.id} product_name={product.name} />
                                        </Col>

                                        <Col sm={2}>

                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            );
                        })
                    }
                </ListGroup>
            </React.Fragment>
        );
    }
}
