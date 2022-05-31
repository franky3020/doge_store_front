import * as React from 'react';
import { Card } from 'antd';
import { Outlet, Link } from "react-router-dom";
export interface IProductProps {
    id: number,
    name: string,
    create_user_id: number,
    price: number,
    describe: string
}

export interface IProductState {
}

export default class Product extends React.Component<IProductProps, IProductState> {
    constructor(props: IProductProps) {
        super(props);

        this.state = {
        }
    }

    public render() {
        return (
            <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
                <Card.Meta title={this.props.name} description={this.props.describe}/>
                <Link to={"/product/" + this.props.id}>GO</Link>
            </Card>
        );
    }
}

