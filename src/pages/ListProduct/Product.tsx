import React, { useState } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import "antd/dist/antd.css";

import { Button, Card } from 'react-bootstrap';



export interface IProductProps {
    id: number,
    name: string,
    create_user_id: number,
    price: number,
    describe: string
}

export interface IProductState {
}

export default class Product extends React.Component<IProductProps, IProductState> {


    constructor(props: IProductProps) {
        super(props);

        this.state = {

        }
    }

    onError() {
        // this.setState({
        //     imageUrl: "img/default.png"
        // })
        console.log("in onerror");
    }

    public render() {

        return (

            // <Card style={{ width: '18rem' }}>
            <Card>
                <Link  to={"/product/" + this.props.id}>
                    <Card.Img variant="top" src="https://random.imagecdn.app/250/250" />
                </Link>

                <Card.Body>
                    <Card.Title>{this.props.name}</Card.Title>
                    <Card.Text>
                        {this.props.describe}
                    </Card.Text>
                    <Link to={"/product/" + this.props.id}>
                        <Button className="w-100" variant="primary">Buy</Button>
                    </Link>
                </Card.Body>
            </Card>

        );
    }
}

