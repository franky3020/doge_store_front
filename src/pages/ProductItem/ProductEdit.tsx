import * as React from 'react';
import { Row, Col, Button, Nav, NavDropdown } from 'react-bootstrap';
import { deleteById } from '../../API/ProductAPI';

import UserInfoService from '../../service/UserInfo';

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

export default class ProductEdit extends React.Component<IProductEditProps, IProductEditState> {
    constructor(props: IProductEditProps) {
        super(props);

        this.state = {
        }
    }

    style_img_size = {
        background: 'lightgray',
        objectFit: 'contain',
        height: "100px",
        width: "100px"
    } as any;


    async deleteSelf() {
        this.props.deleteSelf(this.props.id);
    }



    public render() {
        return (
            <Row>
                <Col>
                    <h4>{this.props.name}</h4>
                    <img
                        className=""
                        style={this.style_img_size}
                        src="https://picsum.photos/800/800"
                        alt="First slide"
                    />
                    <p>{this.props.price}</p>
                </Col>
                <Col>
                    <Button variant="danger" onClick={this.deleteSelf.bind(this)}>Delete</Button>
                </Col>
            </Row>
        );
    }
}
