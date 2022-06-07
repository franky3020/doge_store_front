import * as React from 'react';
import { Button, Modal, Form, Nav, NavDropdown } from 'react-bootstrap';

export interface IAddProductModelProps {
    showModel: boolean,
    closeItself: Function
}

export interface IAddProductModelState {
    isInputError: boolean
}

export default class AddProductModel extends React.Component<IAddProductModelProps, IAddProductModelState> {
  constructor(props: IAddProductModelProps) {
    super(props);

    this.state = {
        isInputError: false
    }
  }

  handleClose() {

  }

  handleAddProductButton() {

  }

  public render() {
    return (
        <Modal show={this.props.showModel} onHide={this.props.closeItself.bind(this)}>
        <Modal.Header closeButton>
            <Modal.Title>上傳產品</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>1</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>2</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                {
                    this.state.isInputError &&
                    <Form.Text className="text-danger">
                        輸入錯誤
                    </Form.Text>
                }
            </Form>

        </Modal.Body>
        <Modal.Footer>

            <Button variant="primary" onClick={this.handleAddProductButton.bind(this)}>
                送出
            </Button>

        </Modal.Footer>
    </Modal>
    );
  }
}
