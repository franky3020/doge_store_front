import React, { useState } from 'react';
import { Card } from 'antd';
import { Image, Button, Space, Descriptions } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import "antd/dist/antd.css";

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

    // random: any;
    // setRandom: any;

    constructor(props: IProductProps) {
        super(props);

        this.state = {
        }

        // [this.random, setRandom] = useState<number>();

    }

    public render() {

        return (

            <div className="card">
                <Link to={"/product/" + this.props.id}>
                    <img className='img-thumbnail' src='https://random.imagecdn.app/250/250' />
                </Link>

                <div className="card-body">
                    <h5 className="card-title">{this.props.name}</h5>
                    <p className="card-text">{this.props.describe}</p>
                    <p className="card-text"><small className="text-muted">Price: {this.props.price}</small></p>
                    <Link to={"/product/" + this.props.id}>
                        <Button type="primary" shape="round" icon={<DownloadOutlined />} size="small" />
                    </Link>
                </div>
            </div>

        );
    }
}

