import * as React from 'react';
import { Button, Row } from 'react-bootstrap';

import LoginFrom from './LoginFrom';
import UserInfoService from "../service/UserInfo";
import RegisterFrom from './RegisterFrom';

export interface IAppLoginProps {

}

export interface IAppLoginState {
    showLoginFrom: boolean,
    showRegisterFrom: boolean,
    isLogin: boolean
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
            showRegisterFrom: false,
            isLogin: isLogin,
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

    handleLogout() {
        this.setState({
            isLogin: false
        });
        this.userInfoService.setUserWhenLogout();
        window.location.reload();

    }

    handleShowRegisterFrom() {
        this.setState({
            showRegisterFrom: true
        });
    }

    handleCloseRegisterFrom() {
        this.setState({
            showRegisterFrom: false
        });
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
                    <div>
                        <Button variant="secondary" onClick={this.handleShowRegisterFrom.bind(this)}>
                            註冊
                        </Button>

                        <Button variant="secondary" onClick={this.handleShowLoginFrom.bind(this)}>
                            登入
                        </Button>
                    </div>
                }

                {/* // TODO: 元件內直接呼叫 closeItself */}
                <LoginFrom showModel={this.state.showLoginFrom} closeItself={this.handleCloseLoginFrom.bind(this)} />
                <RegisterFrom showModel={this.state.showRegisterFrom} closeItself={this.handleCloseRegisterFrom.bind(this)} />

            </React.Fragment >
        );
    }
}
