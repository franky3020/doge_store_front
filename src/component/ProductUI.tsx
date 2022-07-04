import React, { useState } from 'react';

import { Link } from "react-router-dom";
import "antd/dist/antd.css";

import { Button, Card } from 'react-bootstrap';

import { MdOutlineAttachMoney } from "react-icons/md";
import View3D from './View3D';


export interface IProductUIProps {
    id: number,
    name: string,
    create_user_id: number,
    price: number,
    describe: string,
    imgURL: string,
    children?: React.ReactNode
}

export interface IProductUIState {

}

export default class ProductUI extends React.Component<IProductUIProps, IProductUIState> {


    isLogin: boolean = false;

    imgSource: string = "";

    imgSizeStyle = {
        background: 'lightgray',
        objectFit: 'contain',
        height: "300px",
        width: "100%"
    } as any

    view3dSizeRef: React.RefObject<HTMLDivElement>;

    view3dHeight: number = 100;
    view3dWidth: number = 100;
    

    constructor(props: IProductUIProps) {
        super(props);

        this.view3dSizeRef = React.createRef();

    }

    componentDidMount() {
    }


    public render() {
        return (

            <React.Fragment>
                <Card>
                    <Link to={"/product/" + this.props.id}>

                        {/* <Card.Img style={this.imgSizeStyle} variant="top" src={this.props.imgURL} /> */}

                        <div style={this.imgSizeStyle} ref={this.view3dSizeRef}></div>

                        {this.view3dSizeRef.current &&
                        
                        <View3D height={this.view3dSizeRef.current.offsetHeight} width={this.view3dSizeRef.current.offsetWidth}/>
                        }


                    </Link>

                    <Card.Body>
                        <Card.Title>{this.props.name}</Card.Title>
                        <Card.Text>
                            {this.props.describe}
                        </Card.Text>

                        <div className="mb-2">
                            <h4 className="text-danger d-inline"><MdOutlineAttachMoney /></h4>
                            <h5 className="text-danger d-inline">{this.props.price}</h5>
                        </div>

                        {this.props.children}
                        {/* // props.children use width 100% is good */}


                    </Card.Body>
                </Card>
            </React.Fragment>
        );
    }
}

