import * as React from 'react';

export interface IProductDetailProps {
    
}

export interface IProductDetailState {
    name: string,
    create_user_id: number,
    price: number,
    describe: string
}

export default class ProductDetail extends React.Component<IProductDetailProps, IProductDetailState> {

    getProductInterval: any;
    constructor(props: IProductDetailProps) {
        super(props);

        this.state = {
            name: "nothing",
            create_user_id: 0,
            price: 0,
            describe: "nothing"
        }
    }

    componentDidMount() {

        this.getProduct();

        if(typeof this.getProductInterval === "undefined") {
            this.getProductInterval = setInterval(() => {
                this.getProduct();
            }, 1000);
        }

    }

    componentWillUnmount() {
        clearInterval(this.getProductInterval);
        this.getProductInterval = undefined;
    }

    getProduct() {
        let pathArray = window.location.pathname.split('/'); // Todo 這有bug 因為 Component 不會自動關閉
        let productId = pathArray[pathArray.length - 1];

        fetch('http://localhost:5000/api/product/' + productId, { method: "GET" })
            .then(res => res.json())
            .then(data => {
                let product = data;

                this.setState({
                    name: product["name"],
                    create_user_id: product["create_user_id"],
                    price: product["price"],
                    describe: product["describe"]
                });
            })
            .catch(e => {
                console.log(e);
            })
    }



    public render() {
        return (
            <div>
                <p>{this.state.name}</p>
                <p>{this.state.create_user_id}</p>
                <p>{this.state.price}</p>
                <p>{this.state.describe}</p>
            </div>
        );
    }
}
