import * as React from 'react';
import AppNavbar from './AppNavbar';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import ImgCarousel from "./ImgCarousel";

import View3D from "./View3D";


export interface IProductDetailProps {

}

export interface IProductDetailState {
    name: string,
    create_user_id: number,
    price: number,
    describe: string
}

export default class ProductDetail extends React.Component<IProductDetailProps, IProductDetailState> {

    getProductInterval: any;
    constructor(props: IProductDetailProps) {
        super(props);

        this.state = {
            name: "nothing",
            create_user_id: 0,
            price: 0,
            describe: "nothing"
        }
    }

    componentDidMount() {

        this.getProduct();

        if (typeof this.getProductInterval === "undefined") {
            this.getProductInterval = setInterval(() => {
                this.getProduct();
            }, 1000);
        }

    }

    componentWillUnmount() {
        clearInterval(this.getProductInterval);
        this.getProductInterval = undefined;
    }

    getProduct() {
        let pathArray = window.location.pathname.split('/'); // Todo 這有bug 因為 Component 不會自動關閉
        let productId = pathArray[pathArray.length - 1];

        fetch('http://localhost:5000/api/product/' + productId, { method: "GET" })
            .then(res => res.json())
            .then(data => {
                let product = data;

                this.setState({
                    name: product["name"],
                    create_user_id: product["create_user_id"],
                    price: product["price"],
                    describe: product["describe"]
                });
            })
            .catch(e => {
                console.log(e);
            })
    }



    public render() {
        return (
            <React.Fragment>
                <AppNavbar />
                <Container>

                    {/* <Row  className="justify-content-center">
                        <Col>
                            <h1 className='align-middle'>{this.state.name}</h1>
                        </Col>
                    </Row> */}
                    {/* 未完成 */}

                    <Row >
                        <Col>
                            <ImgCarousel img_px_size="450px"/>
                        </Col>
                        <Col lg={8}>
                            {/* <View3D/> */}
                        </Col>

                    </Row>

                </Container>
            </React.Fragment>

        );
    }
}
