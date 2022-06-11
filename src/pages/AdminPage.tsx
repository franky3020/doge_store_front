import * as React from 'react';
import { ListGroup, Button, Row, Col } from 'react-bootstrap';
import AppNavbar from "./AppNavbar";
import ProductEntity from '../entity/ProductEntity';
import { getAllProducts } from "../API/ProductAPI";

import { deleteById } from '../API/ProductAPI';

import UserInfoService from '../service/UserInfo';
import { BiArrowFromBottom } from "react-icons/bi";

import AddProductModel from './AddProductModel';
import { getProductImgURLV2 } from "../API/ImgAPI";
import { addProductImage } from "../API/ProductAPI";
import { addProductZipFile, downloadProductZipFile} from "../API/PurchaseAPI";


export interface IAdminPageProps {

}

export interface IAdminPageState {
    products: ProductEntity[],
    addProductModelShow: boolean
}

export default class AdminPage extends React.Component<IAdminPageProps, IAdminPageState> {

    getProductsInterval: any = undefined;
    productsImgURL: { [product_id: number]: string };

    buttonStyle = {
        height: '5rem',
        width: '5rem',
        borderRadius: '50%',
    }

    buttonIconStyle = {
        height: '3rem',
        width: '3rem',
    }

    style_img_size = {
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

        // TODO: 需刪除 Interval
        if (typeof this.getProductsInterval === "undefined") {
            this.getProductsInterval = setInterval(() => {
                this.getProducts();
            }, 5000);
        }
    }

    async getProducts() {
        try {

            let products_json = await getAllProducts();
            let products = ProductEntity.createFromJson(products_json);

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
            let jwt = UserInfoService.getInstance().getJWT();
            if (jwt === null) {
                throw Error("don't have jwt");
            }

            await deleteById(id, jwt);

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

    async handleUploadImg(files: FileList | null, product_id: number) {

        if (files === null || files.length === 0) {
            return;
        }

        try {
            let jwt = UserInfoService.getInstance().getJWT();
            if (jwt === null) {
                throw Error("don't have jwt");
            }

            await addProductImage(jwt, product_id, files[0]);

            // TODO: 以下不會自動更新圖片
            // this.loadProductImg();

        } catch (err) {
            console.error(err);
        }
    }

    async handleUploadZipfile(files: FileList | null, product_id: number) {

        if (files === null || files.length === 0) {
            return;
        }

        try {
            let jwt = UserInfoService.getInstance().getJWT();
            if (jwt === null) {
                throw Error("don't have jwt");
            }

            await addProductZipFile(jwt, product_id, files[0]);
       
        } catch (err) {
            console.error(err);
        }

    }

    async handleDownloadZipfile(product_id: number, fileName: string) {

      
        try {
            let jwt = UserInfoService.getInstance().getJWT();
            if (jwt === null) {
                throw Error("don't have jwt");
            }

            await downloadProductZipFile(jwt, product_id, fileName);
       
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
                                                style={this.style_img_size}
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
                                                <input onChange={(e) => { this.handleUploadImg(e.target.files, product.id); }} className="d-none" type="file" />
                                                <h3>上傳圖片:  <span className="badge bg-secondary">開啟</span></h3>
                                            </label>

                                            <label className="d-block" >
                                                <input onChange={(e) => { this.handleUploadZipfile(e.target.files, product.id); }} className="d-none" type="file" />
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

                <Button className='position-fixed bottom-0 end-0 me-5 mb-5' style={this.buttonStyle} variant="primary" size="lg"
                    onClick={this.handleAddProductModelShow.bind(this)}
                >
                    <BiArrowFromBottom style={this.buttonIconStyle} />
                </Button>
                <AddProductModel showModel={this.state.addProductModelShow} closeItself={this.handleAddProductModelClose.bind(this)} />

            </React.Fragment>
        );
    }
}
