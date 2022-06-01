import * as React from 'react';
import { Button, Modal, Form, Nav, NavDropdown } from 'react-bootstrap';


import {login_and_getJWT} from "../getDataApi/WebApi";

export interface IAppLoginProps {

}

export interface IAppLoginState {
    show: boolean
}

export default class AppLogin extends React.Component<IAppLoginProps, IAppLoginState> {
    constructor(props: IAppLoginProps) {
        super(props);



        this.state = {
            show: false
        }
    }

    handleShow() {
        this.setState({
            show: true
        });
    }

    handleClose() {
        this.setState({
            show: false
        });
    }

    handleLoginButton() {
        // login_and_getJWT();
    }



    public render() {
        return (
            <React.Fragment>

                <Button variant="secondary" onClick={this.handleShow.bind(this)}>
                    登入/註冊
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>登入</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="primary" onClick={this.handleClose.bind(this)}>
                            註冊
                        </Button>
                        <Button variant="primary" onClick={this.handleClose.bind(this)}>
                            登入
                        </Button>

                    </Modal.Footer>
                </Modal>

            </React.Fragment>
        );
    }
}
