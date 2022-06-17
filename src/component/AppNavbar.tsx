import * as React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import AppLogin from "./AppLogin";
import UserInfoService from "../service/UserInfo";

export interface IAppNavbarProps {
}

export interface IAppNavbarState {
    isLogin: boolean

}

export default class AppNavbar extends React.Component<IAppNavbarProps, IAppNavbarState> {
    constructor(props: IAppNavbarProps) {
        super(props);

        let userInfoService = UserInfoService.getInstance();


        this.state = {
            isLogin: userInfoService.isExistUser()
        }
    }

    public render() {
        return (
            <Navbar className="mb-5" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Doge Store</Navbar.Brand>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/store_introduction">商店簡介</Nav.Link>

                        </Nav>

                        {this.state.isLogin &&

                        <Nav>
                            <Nav.Link href="/purchased_list">已購買商品</Nav.Link>
                        </Nav>
                        
                        }


                        <Nav>
                            <AppLogin />
                        </Nav>
                    </Navbar.Collapse>


                </Container>
            </Navbar>
        );
    }
}
