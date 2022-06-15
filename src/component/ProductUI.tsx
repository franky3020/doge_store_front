import React, { useState } from 'react';

import { Link } from "react-router-dom";
import "antd/dist/antd.css";

import { Button, Card } from 'react-bootstrap';

import { MdOutlineAttachMoney } from "react-icons/md";



export interface IProductUIProps {
    id: number,
    name: string,
    create_user_id: number,
    price: number,
    describe: string,
    imgURL: string,
    children?: React.ReactNode
}

export interface IProductUIState {

}

export default class ProductUI extends React.Component<IProductUIProps, IProductUIState> {


    isLogin: boolean = false;

    imgSource: string = "";

    imgSizeStyle = {
        background: 'lightgray',
        objectFit: 'contain',
        height: "300px",
        width: "100%"
    } as any


    constructor(props: IProductUIProps) {
        super(props);

    }

    public render() {

        return (

            <React.Fragment>
                <Card>
                    <Link to={"/product/" + this.props.id}>
                        <Card.Img style={this.imgSizeStyle} variant="top" src={this.props.imgURL} />
                    </Link>

                    <Card.Body>
                        <Card.Title>{this.props.name}</Card.Title>
                        <Card.Text>
                            {this.props.describe}
                        </Card.Text>

                        <div className="mb-2">
                            <h4 className="text-danger d-inline"><MdOutlineAttachMoney /></h4>
                            <h5 className="text-danger d-inline">{this.props.price}</h5>
                        </div>

                        {this.props.children}
                        {/* // props.children use width 100% is good */}


                    </Card.Body>
                </Card>
            </React.Fragment>
        );
    }
}

