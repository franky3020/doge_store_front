import * as React from 'react';
import { Button, Modal, Form, Nav, NavDropdown } from 'react-bootstrap';
import {user_register_api, login_and_getJWT} from "../getDataApi/WebApi";
import UserInfoService from "../service/UserInfo";


export interface IRegisterFromProps {
    closeItself: Function
}

export interface IRegisterFromState {

    email: string,
    password: string,
    nickname: string,
    repeatPassword: string,
    isInputErrorRepeatPassword: boolean,
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

        if(password !== repeatPassword) {
            this.setState({isInputErrorRepeatPassword: true});
        }


        // Todo 需要改成檢查email 存在 與 是否為空值
        try {
            await user_register_api(email, password, nickname);
            let jwt = await login_and_getJWT(email, password);
            if(jwt) {
                UserInfoService.getInstance().setUserFromJWT(jwt);
                window.location.reload();
            } else {
                throw Error("not login");
            }

        } catch(err) {
            this.setState({isInputErrorRepeatPassword: true});
        }


    }


    public render() {
        return (
            <Modal show={true} onHide={this.handleClose.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>註冊</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={e => this.setState({ email: e.target.value, isInputErrorRepeatPassword: false})} type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Nickname</Form.Label>
                            <Form.Control onChange={e => this.setState({ nickname: e.target.value, isInputErrorRepeatPassword: false })} type="text" placeholder="nickname" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={e => this.setState({ password: e.target.value, isInputErrorRepeatPassword: false })} type="password" placeholder="Password" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Repeat Password</Form.Label>
                            <Form.Control onChange={e => this.setState({ repeatPassword: e.target.value, isInputErrorRepeatPassword: false })} type="password" placeholder="Password" />
                        </Form.Group>

                        {
                            this.state.isInputErrorRepeatPassword &&
                            <Form.Text className="text-danger">
                                Incorrect on Repeat Password
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
