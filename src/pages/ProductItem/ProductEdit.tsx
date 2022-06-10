import * as React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';

import UserInfoService from '../../service/UserInfo';

import { BsFillPencilFill } from "react-icons/bs";

import { addProductImage } from "../../API/ProductAPI";
import { getProductImgAPI } from "../../API/ImgAPI";
import { addProductZipFile } from "../../API/PurchaseAPI";

export interface IProductEditProps {
    id: number,
    name: string,
    create_user_id: number,
    price: number,
    describe: string,
    deleteSelf: Function
}

export interface IProductEditState {
}

// TODO: 這元件做太多事了 需要一個單純顯示資料的 Product 元件
export default class ProductEdit extends React.Component<IProductEditProps, IProductEditState> {

    productImgFile: React.RefObject<any>;
    productZipFile: React.RefObject<any>;

    userInfoService: UserInfoService;

    imgSource: string = ""

    constructor(props: IProductEditProps) {
        super(props);

        this.productImgFile = React.createRef();
        this.productZipFile = React.createRef();

        this.userInfoService = UserInfoService.getInstance();

        this.loadProductImg();

        this.state = {
        }
    }

    style_img_size = {
        background: 'lightgray',
        objectFit: 'contain',
        height: "100px",
        width: "100px"
    } as any;

    loadProductImg() {
        getProductImgAPI(this.props.id).then((imgSource)=>{
            this.imgSource = imgSource;
        }).catch((err)=>{
            console.error(err);
        });
    }


    async deleteSelf() {
        this.props.deleteSelf(this.props.id);
    }

    async handleUploadImg() {

        let files = this.productImgFile.current.files;

        if(files.length === 0) {
            return;
        }

        try {

            let jwt = this.userInfoService.getJWT();
            if (jwt === null) {
                throw Error("not have jwt");
            }

            await addProductImage(jwt, this.props.id, files[0]);

            // TODO: 不會自動更新圖片
            this.loadProductImg();

        } catch (err) {
            console.error(err);
        }


    }

    async handleUploadZipfile() {

        let files = this.productZipFile.current.files;
        if(files.length === 0) {
            return;
        }

        try {
        
            let jwt = this.userInfoService.getJWT();
            if (jwt === null) {
                throw Error("not have jwt");
            }

            await addProductZipFile(jwt, this.props.id, files[0]);

        } catch (err) {
            console.error(err);
        }


    }

    public render() {
        return (
            <Row>
                <Col>
                    <h4>{this.props.name}</h4>

                    <img
                        style={this.style_img_size}
                        src={this.imgSource}
                        alt="First slide"
                    />


                    <label>
                        <input ref={this.productImgFile} onChange={this.handleUploadImg.bind(this)} className="invisible" type="file" />
                        <BsFillPencilFill />
                    </label>

                    <label>
                        <input ref={this.productZipFile} onChange={this.handleUploadZipfile.bind(this)} className="invisible" type="file" />
                        <p>ZIP: </p>
                        <BsFillPencilFill />
                    </label>


                    <p>Price: {this.props.price}</p>
                </Col>
                <Col>
                    <Button variant="danger" onClick={this.deleteSelf.bind(this)}>Delete</Button>
                </Col>
            </Row>
        );
    }
}
