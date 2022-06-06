import * as React from 'react';
import { Button, Modal, Form, Nav, NavDropdown } from 'react-bootstrap';
import { user_register_api, login_and_getJWT } from "../getDataApi/WebApi";
import UserInfoService from "../service/UserInfo";


export interface IRegisterFromProps {
    showModel: boolean,
    closeItself: Function
}

export interface IRegisterFromState {

    email: string,
    password: string,
    nickname: string,
    repeatPassword: string,
    isInputErrorRepeatPassword: boolean,
    isOnRegisterUserError: boolean
}

export default class RegisterFrom extends React.Component<IRegisterFromProps, IRegisterFromState> {
    constructor(props: IRegisterFromProps) {
        super(props);

        this.state = {
            email: "",
            nickname: "",
            password: "",
            repeatPassword: "",
            isInputErrorRepeatPassword: false,
            isOnRegisterUserError: false,
        }


    }

    handleClose() {
        this.props.closeItself();
    }

    async handleRegister() {
        let email = this.state.email;
        let nickname = this.state.nickname;
        let password = this.state.password;
        let repeatPassword = this.state.repeatPassword;

        if (password !== repeatPassword) {
            this.setState({ isInputErrorRepeatPassword: true });
            return;
        }


        // Todo 需要改成檢查email 存在 與 是否為空值
        try {
            await user_register_api(email, password, nickname);
            let jwt = await login_and_getJWT(email, password);
            if (jwt) {
                UserInfoService.getInstance().setUserFromJWT(jwt);
                window.location.reload();
            } else {
                throw Error("not register success");
            }

        } catch (err) {
            this.setState({ isOnRegisterUserError: true });
        }


    }

    clearInputWarn() {
        this.setState({
            isInputErrorRepeatPassword: false,
            isOnRegisterUserError: false
        });
    }

    handleEmailInput(e: any) {
        this.setState({ email: e.target.value });
        this.clearInputWarn();
    }

    handleNicknameInput(e: any) {
        this.setState({ nickname: e.target.value });
        this.clearInputWarn();
    }

    handlePasswordInput(e: any) {
        this.setState({ password: e.target.value });
        this.clearInputWarn();
    }
    

    handleRepeatPasswordInput(e: any) {
        this.setState({ repeatPassword: e.target.value });
        this.clearInputWarn();
    }


    public render() {
        return (
            <Modal show={this.props.showModel} onHide={this.handleClose.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>註冊</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={this.handleEmailInput.bind(this)} type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Nickname</Form.Label>
                            <Form.Control onChange={this.handleNicknameInput.bind(this)} type="text" placeholder="nickname" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={this.handlePasswordInput.bind(this)} type="password" placeholder="Password" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Repeat Password</Form.Label>
                            <Form.Control onChange={this.handleRepeatPasswordInput.bind(this)} type="password" placeholder="Password" />
                        </Form.Group>

                        {
                            this.state.isInputErrorRepeatPassword &&
                            <Form.Text className="text-danger">
                                Incorrect on Repeat Password
                            </Form.Text>
                        }

                        {
                            this.state.isOnRegisterUserError &&
                            <Form.Text className="text-danger">
                                Register Error
                            </Form.Text>
                        }

                    </Form>

                </Modal.Body>
                <Modal.Footer>

                    <Button variant="primary" onClick={this.handleRegister.bind(this)}>
                        送出
                    </Button>

                </Modal.Footer>
            </Modal>
        );
    }
}
