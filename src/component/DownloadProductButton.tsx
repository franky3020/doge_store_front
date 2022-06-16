import * as React from 'react';

import { Button } from 'react-bootstrap';

import APIFacade from "../API/APIFacade";
import SuccessMessage from "./SuccessMessage";


export interface IDownloadProductButtonProps {
    product_id: number,
    product_name: string,
    overWriteClassName?: string
}

export interface IDownloadProductButtonState {
    showSuccessMessage: boolean,
}

// default button width is 100%
export default class DownloadProductButton extends React.Component<IDownloadProductButtonProps, IDownloadProductButtonState> {
    
    buttonClassName: string = "w-100"
    
    constructor(props: IDownloadProductButtonProps) {
        super(props);

        if(typeof this.props.overWriteClassName !== "undefined") {
            this.buttonClassName = this.props.overWriteClassName
        }

        this.state = {
            showSuccessMessage: false
        }
    }

    async handleDownloadZipfile(product_id: number, fileName: string) {

        try {
            await APIFacade.downloadProductZipFile(product_id, fileName);
            this.handleSuccessMessage();
        } catch (err) {
            console.error(err);
        }

    }

    handleSuccessMessage() {

        // TODO: 如果user按很快 會有重疊問題
        this.setState({
            showSuccessMessage: true
        });

        setTimeout(()=>{
            this.setState({
                showSuccessMessage: false
            });
        }, 4000)
    }


    public render() {
        return (
            <React.Fragment>
                {this.state.showSuccessMessage &&
                    <SuccessMessage />
                }
                <Button className={this.buttonClassName} variant="success" onClick={this.handleDownloadZipfile.bind(this, this.props.product_id, this.props.product_name)} >
                    下載 zip檔
                </Button>

            </React.Fragment>
        );
    }
}
