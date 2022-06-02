import * as React from 'react';
import { Button, Row } from 'react-bootstrap';

import LoginFrom from './LoginFrom';
import UserInfoService from "../service/UserInfo";
import UserEntity from '../entity/UserEntity';


export interface IAppLoginProps {

}

export interface IAppLoginState {
    showLoginFrom: boolean,
    email: string,
    password: string,
    isLogin: boolean,
    isInputErrorPassword: boolean,
}

// Todo 應該要改名 因為不只負責login
export default class AppLogin extends React.Component<IAppLoginProps, IAppLoginState> {

    userInfoService: UserInfoService;
    userNickname: string = "";

    constructor(props: IAppLoginProps) {
        super(props);

        this.userInfoService = UserInfoService.getInstance();
        this.userInfoService.setUserFromLocalStorageJWT();

        let isLogin = false;
        if (this.userInfoService.isExistUser()) {
            isLogin = true;
            this.userNickname = this.userInfoService.getUserNickname();
        }

        this.state = {
            showLoginFrom: false,
            email: "",
            password: "",
            isLogin: isLogin,
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

    handleLoginComplete() {
        this.setState({
            isLogin: true
        });
    }

    handleLogout() {
        this.setState({
            isLogin: false
        });
        this.userInfoService.setUserWhenLogout();
    }



    public render() {
        return (
            <React.Fragment>

                {this.state.isLogin &&

                    <React.Fragment>

                        <div>
                            <p className="d-inline text-light align-middle">{"Hello: " + this.userNickname + " "} </p>
                            <Button variant="secondary" onClick={this.handleLogout.bind(this)}>
                                登出
                            </Button>
                        </div>

                    </React.Fragment>

                }

                {!this.state.isLogin &&
                    <Button variant="secondary" onClick={this.handleShowLoginFrom.bind(this)}>
                        登入/註冊
                    </Button>
                }

                {this.state.showLoginFrom &&
                    <LoginFrom closeItself={this.handleCloseLoginFrom.bind(this)} loginAction={this.handleLoginComplete.bind(this)} />
                }


            </React.Fragment >
        );
    }
}
