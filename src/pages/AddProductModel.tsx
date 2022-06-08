import * as React from 'react';
import { Button, Modal, Form, Nav, NavDropdown } from 'react-bootstrap';

import { addNewProduct } from "../API/ProductAPI";
import UserInfoService from "../service/UserInfo";



export interface IAddProductModelProps {
    showModel: boolean,
    closeItself: Function
}

export interface IAddProductModelState {
    isInputError: boolean
}

export default class AddProductModel extends React.Component<IAddProductModelProps, IAddProductModelState> {

    userInfoService: UserInfoService;



    productName: React.RefObject<any>;
    productPrice: React.RefObject<any>;
    productDescribe: React.RefObject<any>;





    constructor(props: IAddProductModelProps) {
        super(props);

        this.productName = React.createRef();
        this.productPrice = React.createRef();
        this.productDescribe = React.createRef();
        



        this.userInfoService = UserInfoService.getInstance();


        this.state = {
            isInputError: false
        }




    }

    handleShowInputError() {
        this.setState({ isInputError: true });
    }
    
    handleCloseInputError() {
        this.setState({ isInputError: false });
    }

    async handleAddProductButton() {

        try {

            if (this.userInfoService.isExistUser() === false) {
                throw Error("you need login first");
            }


            let jwt = this.userInfoService.getJWT();
            if (jwt === null) {
                throw Error("not have jwt");
            }

            let create_user_id = null;

            let UserEntity = this.userInfoService.getUser();
            if (UserEntity && UserEntity.id) {
                create_user_id = UserEntity.id;
            } else {
                throw Error("not have UserEntity");
            }

            let name = this.productName.current.value;
            let price = this.productPrice.current.value;
            let describe = this.productDescribe.current.value;

            await addNewProduct(jwt, name, create_user_id, price, describe)

            this.props.closeItself();

        } catch (err) {
            this.handleShowInputError()
            console.error(err);
        }


    }

    public render() {
        return (
            <Modal show={this.props.showModel} onHide={this.props.closeItself.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>上傳產品</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group controlId="formBasicName" className="mb-3" >
                            <Form.Label>名稱</Form.Label>
                            <Form.Control ref={this.productName} onChange={this.handleCloseInputError.bind(this)} type="text" placeholder="產品名稱" />
                        </Form.Group>

                        <Form.Group  controlId="formBasicPrice" className="mb-3">
                            <Form.Label>價錢</Form.Label>
                            <Form.Control ref={this.productPrice} onChange={this.handleCloseInputError.bind(this)} type="number" placeholder="價錢" />
                        </Form.Group>

                        <Form.Group controlId="formBasicDescribe" className="mb-3">
                            <Form.Label>產品描述</Form.Label>
                            <Form.Control ref={this.productDescribe} onChange={this.handleCloseInputError.bind(this)} as="textarea" rows={3} />
                        </Form.Group>

                        <Form.Group controlId="formBasicFile" className="mb-3">
                            <Form.Label>檔案上傳</Form.Label>
                            <Form.Control type="file" onChange={this.handleCloseInputError.bind(this)} />
                        </Form.Group>

                        {
                            this.state.isInputError &&
                            <Form.Text className="text-danger">
                                輸入格式錯誤
                            </Form.Text>
                        }
                    </Form>

                </Modal.Body>
                <Modal.Footer>

                    <Button variant="primary" onClick={this.handleAddProductButton.bind(this)}>
                        送出
                    </Button>

                </Modal.Footer>
            </Modal>
        );
    }
}
