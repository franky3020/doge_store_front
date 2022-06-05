import * as React from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import './App.css';

export interface IImgCarouselProps {
    img_px_size?: string
}

export interface IImgCarouselState {
}

export default class ImgCarousel extends React.Component<IImgCarouselProps, IImgCarouselState> {

    
    ImgCarousel_ImgSize = {
        height: "450px",
        width: "450px"
    };

    constructor(props: IImgCarouselProps) {
        super(props);

        this.state = {
        }

        if(props.img_px_size) {
            this.ImgCarousel_ImgSize = {
                height: props.img_px_size,
                width: props.img_px_size
            }
        }
        

    }

    public render() {
        return (

            <Carousel interval={null} className="img-contaoin" style={this.ImgCarousel_ImgSize}>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        style={this.ImgCarousel_ImgSize}
                        src="https://picsum.photos/800/800"
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        style={this.ImgCarousel_ImgSize}
                        src="https://random.imagecdn.app/600/200"
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        style={this.ImgCarousel_ImgSize}
                        src="https://picsum.photos/300/400"
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
        );
    }
}
