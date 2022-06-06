import React, { useState } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import "antd/dist/antd.css";

import { Button, Card } from 'react-bootstrap';

import UserInfoService from "../../service/UserInfo";
import UserEntity from '../../entity/UserEntity';
import LoginFrom from "../LoginFrom";

export interface IProductProps {
    id: number,
    name: string,
    create_user_id: number,
    price: number,
    describe: string
}

export interface IProductState {
    showLoginFrom: boolean
}

export default class Product extends React.Component<IProductProps, IProductState> {


    userInfoService: UserInfoService;
    isLogin: boolean = false;

    constructor(props: IProductProps) {
        super(props);

        this.userInfoService = UserInfoService.getInstance();
        if (this.userInfoService.isExistUser()) {
            this.isLogin = true;
        }

        this.state = {
            showLoginFrom: false
        }
    }

    handleShowLoginFrom() {
        this.setState({
            showLoginFrom: true
        });
    }

    handleCloseLoginFrom() {
        this.setState({
            showLoginFrom: false
        });
    }

    handleBuy() {
        if(this.isLogin) {
            // Todo 將會要求輸入購買密碼
        } else {
            this.handleShowLoginFrom();
        }
    }


    public render() {

        return (

            <React.Fragment>
                <Card>
                    <Link to={"/product/" + this.props.id}>
                        <Card.Img variant="top" src="https://random.imagecdn.app/250/250" />
                    </Link>

                    <Card.Body>
                        <Card.Title>{this.props.name}</Card.Title>
                        <Card.Text>
                            {this.props.describe}
                        </Card.Text>

                        <Button className="w-100" variant="primary" onClick={this.handleBuy.bind(this)}>Buy</Button>
                    </Card.Body>
                </Card>

                <LoginFrom showModel={this.state.showLoginFrom} closeItself={this.handleCloseLoginFrom.bind(this)}/>

            </React.Fragment>
        );
    }
}

