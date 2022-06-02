import * as React from 'react';
import { Button, Modal, Form, Nav, NavDropdown } from 'react-bootstrap';

import UserInfoService from "../service/UserInfo";

import { login_and_getJWT } from "../getDataApi/WebApi";

export interface ILoginFromProps {
    closeItself: Function,
    loginAction: Function
}

export interface ILoginFromState {
    email: string,
    password: string,
    isInputErrorPassword: boolean,
}

export default class LoginFrom extends React.Component<ILoginFromProps, ILoginFromState> {
    constructor(props: ILoginFromProps) {
        super(props);

        this.state = {
            email: "",
            password: "",
            isInputErrorPassword: false
        }
    }

    handleClose() {
        this.props.closeItself();
    }

    loginAction() {
        this.props.loginAction();
    }


    async handleLoginButton() {

        let email = this.state.email;
        let password = this.state.password;


        let jwt = await login_and_getJWT(email, password);
        if (jwt) {
            this.loginAction();
            UserInfoService.getInstance().setUserFromJWT(jwt);

            window.location.reload();

        } else {
            this.setState({
                isInputErrorPassword: true
            });
        }

    }

    public render() {
        return (

                <Modal show={true} onHide={this.handleClose.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>登入</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control onChange={e => this.setState({ email: e.target.value, isInputErrorPassword: false })} type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={e => this.setState({ password: e.target.value, isInputErrorPassword: false })} type="password" placeholder="Password" />
                            </Form.Group>

                            {
                            this.state.isInputErrorPassword &&
                            <Form.Text className="text-danger">
                                Incorrect email or password
                            </Form.Text>
                            }
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="primary" onClick={this.handleClose.bind(this)}>
                            註冊
                        </Button>
                        <Button variant="primary" onClick={this.handleLoginButton.bind(this)}>
                            登入
                        </Button>

                    </Modal.Footer>
                </Modal>

        );
    }
}
