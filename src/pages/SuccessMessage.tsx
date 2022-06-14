import * as React from 'react';

import './App.css';

export interface ISuccessMessageProps {
}

export interface ISuccessMessageState {
    imgAnimationType: string
}

export default class SuccessMessage extends React.Component<ISuccessMessageProps, ISuccessMessageState> {
    constructor(props: ISuccessMessageProps) {
        super(props);

        this.state = {
            imgAnimationType: "showItemAnimation"
        }
    }

    imgStyle = {
        zIndex: 1,
        width: "15%"
    } as any

    componentDidMount() {
        setTimeout(()=>{
            this.setState({
                imgAnimationType: "hideItemAnimation"
            })
        }, 1500);
    }

    
    public render() {
        return (
            <img className={`${this.state.imgAnimationType} position-fixed top-50 start-50 translate-middle `}
                style={this.imgStyle}
                src={require('../img/success-icon3.png')}
            />
        );
    }
}
