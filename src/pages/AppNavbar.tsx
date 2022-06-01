import * as React from 'react';
import { Button, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import AppLogin from "./AppLogin";

export interface IAppNavbarProps {
}

export interface IAppNavbarState {
}

export default class AppNavbar extends React.Component<IAppNavbarProps, IAppNavbarState> {
    constructor(props: IAppNavbarProps) {
        super(props);

        this.state = {
        }
    }

    public render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Doge Store</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#Introduction">商店簡介</Nav.Link>
                            
                        </Nav>
                        <Nav>
                            <Nav.Link href="#purchased_list">已購買商品</Nav.Link>
                            <AppLogin/>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}
