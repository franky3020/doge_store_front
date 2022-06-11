import * as React from 'react';
import { ListGroup, Button, Row, Col } from 'react-bootstrap';
import AppNavbar from "./AppNavbar";
import ProductEntity from '../entity/ProductEntity';

import { BiArrowFromBottom } from "react-icons/bi";

import AddProductModel from './AddProductModel';
import { getProductImgURLV2 } from "../API/ImgAPI";
import APIFacade from "../API/APIFacade";

export interface IAdminPageProps {

}

export interface IAdminPageState {
    products: ProductEntity[],
    addProductModelShow: boolean
}

export default class AdminPage extends React.Component<IAdminPageProps, IAdminPageState> {

    getProductsInterval: any = undefined;
    productsImgURL: { [product_id: number]: string };

    uploadProductButtonStyle = {
        height: '5rem',
        width: '5rem',
        borderRadius: '50%',
    }

    uploadProductButtonIconStyle = {
        height: '3rem',
        width: '3rem',
    }

    imgSizeStyle = {
        background: 'lightgray',
        objectFit: 'contain',
        height: "100px",
        width: "100px"
    } as any;


    constructor(props: IAdminPageProps) {
        super(props);

        this.productsImgURL = {};

        this.state = {
            products: [],
            addProductModelShow: false
        }
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

            let products = await APIFacade.getAllProducts();

            this.setState({
                products: products
            })

            this.productsImgURL = getProductImgURLV2(...products.map(p => p.id as number));

        } catch (err) {
            console.error(err);
        }
    }


    async handleDelete(id: number) {
        try {
            await APIFacade.deleteProductById(id);

            // 用 filter 速度會快很多, 不要用deepclone的方法
            this.setState({
                products: this.state.products.filter((product, _) => product.id !== id)
            })

        } catch (err) {
            console.error(err);
        }
    }

    handleAddProductModelShow() {
        this.setState({
            addProductModelShow: true
        })
    }

    handleAddProductModelClose() {
        this.setState({
            addProductModelShow: false
        })
    }

    // 如果沒指定 file, 則不執行 TODO: 等等檢查
    async handleUploadImg( product_id: number, files: FileList | null) {

        try {
            if(files){
                await APIFacade.addProductImage(product_id, files[0]);
            }
        } catch (err) {
            console.error(err);
        }
    }

    async handleUploadZipfile(product_id: number, files: FileList | null) {

        try {
            if(files){
                await APIFacade.addProductZipFile(product_id, files[0]);
            }
        } catch (err) {
            console.error(err);
        }
        

    }

    async handleDownloadZipfile(product_id: number, fileName: string) {

        try {
            await APIFacade.downloadProductZipFile(product_id, fileName);
        } catch (err) {
            console.error(err);
        }

    }




    public render() {
        return (
            <React.Fragment>

                <AppNavbar />
                <ListGroup>

                    {
                        this.state.products.map(product => {
                            return (
                                <ListGroup.Item key={product.id}>
                                    <Row>
                                        <Col sm={2}>
                                            <h4>{product.name}</h4>
                                            <img
                                                style={this.imgSizeStyle}
                                                src={this.productsImgURL[product.id]}
                                            />
                                        </Col>
                                        <Col sm={2}>
                                            <h5>price: {product.price}</h5>
                                            <p>describe: </p>
                                            <p>{product.describe}</p>

                                        </Col>
                                        <Col sm={2}>


                                            <label className="d-block" >
                                                <input onChange={(e) => { this.handleUploadImg(product.id, e.target.files); }} className="d-none" type="file" />
                                                <h3>上傳圖片:  <span className="badge bg-secondary">開啟</span></h3>
                                            </label>

                                            <label className="d-block" >
                                                <input onChange={(e) => { this.handleUploadZipfile(product.id, e.target.files); }} className="d-none" type="file" />
                                                <h3>上傳付費ZIP檔:  <span className="badge bg-secondary">開啟</span></h3>
                                            </label>

                                            <Button variant="danger" onClick={this.handleDownloadZipfile.bind(this, product.id, product.name)}>下載ZIP檔</Button>

                                        </Col>

                                        <Col sm={2}>
                                            <Button variant="danger" onClick={this.handleDelete.bind(this, product.id)}>Delete</Button>
                                        </Col>

                                        <Col sm={4}>

                                        </Col>
                                    </Row>

                                </ListGroup.Item>
                            );
                        })

                    }


                </ListGroup>

                <Button className='position-fixed bottom-0 end-0 me-5 mb-5' style={this.uploadProductButtonStyle} variant="primary" size="lg"
                    onClick={this.handleAddProductModelShow.bind(this)}
                >
                    <BiArrowFromBottom style={this.uploadProductButtonIconStyle} />
                </Button>
                <AddProductModel showModel={this.state.addProductModelShow} closeItself={this.handleAddProductModelClose.bind(this)} />

            </React.Fragment>
        );
    }
}
