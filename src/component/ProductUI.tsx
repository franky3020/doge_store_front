import React, { useState } from 'react';

import { Link } from "react-router-dom";
import "antd/dist/antd.css";

import { Card } from 'react-bootstrap';

import { MdOutlineAttachMoney } from "react-icons/md";
import View3D from './View3D';
var ToggleButton = require('react-toggle-button');




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
    isShow3DView: boolean
}

export default class ProductUI extends React.Component<IProductUIProps, IProductUIState> {


    isLogin: boolean = false;

    imgSource: string = "";

    cardImgorModelHeight = '300px';

    imgSizeStyle = {
        background: 'lightgray',
        objectFit: 'contain',
        height: this.cardImgorModelHeight,
        width: "100%",
        position: 'relative'
    } as any

    view3dSizeRef: React.RefObject<HTMLDivElement>;
    cardImgSizeRef: React.RefObject<HTMLDivElement>;

    constructor(props: IProductUIProps) {
        super(props);

        this.state = {
            isShow3DView: false
        };

        this.view3dSizeRef = React.createRef();
        this.cardImgSizeRef = React.createRef();

    }


    show3DView() {
        return this.state.isShow3DView;
    }


    public render() {
        return (

            <React.Fragment>
                <Card>
                    <Link to={"/product/" + this.props.id}>

                        <Card.Img style={this.imgSizeStyle} variant="top" src={this.props.imgURL} />


                        <div style={{ height: this.cardImgorModelHeight, width: '100%', position: 'absolute', top: '0px', left: '0px' }} ref={this.view3dSizeRef}></div>
                        {this.show3DView() && this.view3dSizeRef.current &&

                            <View3D height={this.view3dSizeRef.current.offsetHeight} width={this.view3dSizeRef.current.offsetWidth}
                                style={{ position: 'absolute', top: '0px', left: '0px' }} />
                        }


                    </Link>

                    <Card.Body>


                        <div className='d-flex justify-content-between'>

                            <Card.Title>{this.props.name}</Card.Title>

                            <div >
                                
                                <ToggleButton
                                    value={this.state.isShow3DView || false}
                                    onToggle={(value: boolean) => {
                                        this.setState({
                                            isShow3DView: !value,
                                        })
                                    }} />
                            </div>

                        </div>


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

