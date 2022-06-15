import * as React from 'react';
import { Button, Modal, Form, Nav, NavDropdown } from 'react-bootstrap';

import UserInfoService from "../service/UserInfo";

import { login_and_getJWT } from "../API/UserAPI";

export interface ILoginFromProps {
    showModel: boolean,
    closeItself: Function, // Todo 這會要求每個呼叫者 要自行處理此元件的關閉
    hasCloseBuuton?: boolean
}

export interface ILoginFromState {
    email: string,
    password: string,
    isInputErrorPassword: boolean,
}

export default class LoginFrom extends React.Component<ILoginFromProps, ILoginFromState> {

    public static defaultProps = {
        hasCloseBuuton: true
    };

    constructor(props: ILoginFromProps) {
        super(props);

        this.state = {
            email: "",
            password: "",
            isInputErrorPassword: false
        }
    }


    async handleLoginButton() {

        try {
            let email = this.state.email;
            let password = this.state.password;


            let jwt = await login_and_getJWT(email, password);
            UserInfoService.getInstance().setUserFromJWT(jwt);
            window.location.reload();
        } catch (err) {
            console.error(err);
            this.setState({
                isInputErrorPassword: true
            });
        }

    }

    clearFormWarn() {
        this.setState({ isInputErrorPassword: false });
    }


    handleEmailInput(e: any) {
        this.setState({ email: e.target.value });
        this.clearFormWarn();
    }


    handlePasswordInput(e: any) {
        this.setState({ password: e.target.value });
        this.clearFormWarn();
    }





    public render() {
        return (

            <Modal show={this.props.showModel} onHide={this.props.closeItself.bind(this)}>


                {this.props.hasCloseBuuton &&

                    <Modal.Header closeButton>
                        <Modal.Title>登入</Modal.Title>
                    </Modal.Header>

                }  {/* else */}
                {!this.props.hasCloseBuuton &&
                    <Modal.Header>
                        <Modal.Title>登入</Modal.Title>
                    </Modal.Header>
                }



                <Modal.Body>

                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={this.handleEmailInput.bind(this)} type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>密碼</Form.Label>
                            <Form.Control onChange={this.handlePasswordInput.bind(this)} type="password" placeholder="Password" />
                        </Form.Group>

                        {
                            this.state.isInputErrorPassword &&
                            <Form.Text className="text-danger">
                                密碼或信箱錯誤
                            </Form.Text>
                        }
                    </Form>

                </Modal.Body>
                <Modal.Footer>

                    <Button variant="primary" onClick={this.handleLoginButton.bind(this)}>
                        登入
                    </Button>

                </Modal.Footer>
            </Modal>

        );
    }
}
