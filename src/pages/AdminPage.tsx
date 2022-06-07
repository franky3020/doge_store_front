import * as React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import AppNavbar from "./AppNavbar";
import ProductEdit from "./ProductItem/ProductEdit";
import ProductEntity from '../entity/ProductEntity';
import { getAllProducts } from "../API/ProductAPI";

import { deleteById } from '../API/ProductAPI';

import UserInfoService from '../service/UserInfo';
import { BiArrowFromBottom } from "react-icons/bi";


export interface IAdminPageProps {

}

export interface IAdminPageState {
    products: ProductEntity[]
}

export default class AdminPage extends React.Component<IAdminPageProps, IAdminPageState> {

    getProductsInterval: any = undefined;

    buttonStyle = {
        height: '5rem',
        width: '5rem',
        borderRadius: '50%',
    }

    buttonIconStyle = {
        height: '3rem',
        width: '3rem',
    }


    constructor(props: IAdminPageProps) {
        super(props);

        this.state = {
            products: []
        }
    }

    componentDidMount() {

        this.getProducts();

        if (typeof this.getProductsInterval === "undefined") {
            this.getProductsInterval = setInterval(() => {
                this.getProducts();
            }, 5000);
        }
    }

    async getProducts() {
        try {

            let products_json = await getAllProducts();
            let products = ProductEntity.createFromJson(products_json);

            this.setState({
                products: products
            })

        } catch (err) {
            console.error(err);
        }
    }

    async handleDelete(id: number) {
        try {
            let jwt = UserInfoService.getInstance().getJWT();
            if (jwt === null) {
                throw Error("don't have jwt");
            }

            await deleteById(id, jwt);

            // 用 filter 速度會快很多, 不要用deepclone的方法
            this.setState({
                products: this.state.products.filter((product, _) => product.id !== id)
            })

        } catch (err) {
            console.error(err);
        }
    }




    public render() {
        return (
            <React.Fragment>

                <AppNavbar />
                <ListGroup>

                    {
                        this.state.products.map(product => {
                            return (
                                <ListGroup.Item key={product.id}>
                                    <ProductEdit id={product.id} name={product.name} create_user_id={product.create_user_id}
                                        price={product.price} describe={product.describe} deleteSelf={this.handleDelete.bind(this)} />
                                </ListGroup.Item>
                            );
                        })

                    }


                </ListGroup>

                <Button className='position-fixed bottom-0 end-0 me-5 mb-5' style={this.buttonStyle} variant="primary" size="lg">
                    <BiArrowFromBottom style={this.buttonIconStyle}/>
                </Button>

            </React.Fragment>
        );
    }
}