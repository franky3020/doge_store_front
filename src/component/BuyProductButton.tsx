import * as React from 'react';

import { Button } from 'react-bootstrap';
import UserInfoService from "../service/UserInfo";

import APIFacade from "../API/APIFacade";
import SuccessMessage from "./SuccessMessage";
import LoginFrom from "./LoginFrom";


export interface IBuyProductButtonProps {
    product_id: number
}

export interface IBuyProductButtonState {
    showSuccessMessage: boolean,
    showLoginFrom: boolean,
    isLogin: boolean
}

export default class BuyProductButton extends React.Component<IBuyProductButtonProps, IBuyProductButtonState> {
    constructor(props: IBuyProductButtonProps) {
        super(props);

        let userInfoService = UserInfoService.getInstance();

        let isLogin = false;
        if (userInfoService.isExistUser()) {
            isLogin = true;
        }

        this.state = {
            showSuccessMessage: false,
            showLoginFrom: false,
            isLogin: isLogin
        }
    }

    async handleBuy(product_id: number) {
        try {
            if (this.state.isLogin) {
                await APIFacade.purchase(product_id);
                this.handleSuccessMessage();
            } else { // if not login, show LoginFrom
                this.handleShowLoginFrom();
            }

        } catch (err) {
            console.error(err);
        }
    }

    handleSuccessMessage() {

        // TODO: 如果user按很快 會有重疊問題
        this.setState({
            showSuccessMessage: true
        });

        setTimeout(()=>{
            this.setState({
                showSuccessMessage: false
            });
        }, 4000)
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


    public render() {
        return (
            <React.Fragment>
                {this.state.showSuccessMessage &&
                    <SuccessMessage />
                }
                <Button className="w-100" variant="primary" onClick={this.handleBuy.bind(this, this.props.product_id)} >購買產品</Button>
                
                {/* // if user not login and click buy, then show  <LoginFrom> */}
                <LoginFrom showModel={this.state.showLoginFrom} closeItself={this.handleCloseLoginFrom.bind(this)} />

            </React.Fragment>
        );
    }
}
