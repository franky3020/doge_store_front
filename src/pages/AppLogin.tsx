import * as React from 'react';
import { Button, Modal, Form, Nav, NavDropdown } from 'react-bootstrap';


import { login_and_getJWT } from "../getDataApi/WebApi";

import LoginFrom from './LoginFrom';

export interface IAppLoginProps {

}

export interface IAppLoginState {
    showLoginFrom: boolean,
    email: string,
    password: string,
    isLogin: boolean,
    isInputErrorPassword: boolean,
}

export default class AppLogin extends React.Component<IAppLoginProps, IAppLoginState> {
    constructor(props: IAppLoginProps) {
        super(props);



        this.state = {
            showLoginFrom: false,
            email: "",
            password: "",
            isLogin: false,
            isInputErrorPassword: false
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

    async handleLoginButton() {

        const TOKEN_NAME = "token";
        let email = this.state.email;
        let password = this.state.password;


        let jwt_json = await login_and_getJWT(email, password);
        if (jwt_json) {
            localStorage.setItem(TOKEN_NAME, jwt_json.token);
            this.setState({
                isLogin: true
            });

            this.handleCloseLoginFrom();

        } else {
            this.setState({
                isInputErrorPassword: true
            });
        }

    }

    handleLogout() {
        this.setState({
            isLogin: false
        });
    }

    handleLoginComplete() {
        this.setState({
            isLogin: true
        });
    }



    public render() {
        return (
            <React.Fragment>

                {this.state.isLogin &&
                    <Button variant="secondary" onClick={this.handleLogout.bind(this)}>
                        登出
                    </Button>
                }

                {!this.state.isLogin &&
                    <Button variant="secondary" onClick={this.handleShowLoginFrom.bind(this)}>
                        登入/註冊
                    </Button>
                }
                
                {this.state.showLoginFrom &&
                    <LoginFrom closeItself={this.handleCloseLoginFrom.bind(this)} loginAction={this.handleLoginComplete.bind(this)}/>
                }


            </React.Fragment >
        );
    }
}
