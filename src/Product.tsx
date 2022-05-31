import * as React from 'react';

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
            <ul>
                <li>{this.props.id}</li>
                <li>{this.props.name}</li>
                <li>{this.props.create_user_id}</li>
                <li>{this.props.price}</li>
                <li>{this.props.describe}</li>
            </ul>
        );
    }
}

