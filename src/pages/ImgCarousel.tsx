import * as React from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';

export interface IImgCarouselProps {
}

export interface IImgCarouselState {
}

export default class ImgCarousel extends React.Component<IImgCarouselProps, IImgCarouselState> {
    constructor(props: IImgCarouselProps) {
        super(props);

        this.state = {
        }
    }

    public render() {
        return (

            <Carousel interval={null}>
                <Carousel.Item>
                    <img
                        className="d-block img-fluid"
                        src="https://picsum.photos/450/450"
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block img-fluid"
                        src="https://random.imagecdn.app/450/450"
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block img-fluid"
                        src="https://picsum.photos//450/450"
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
        );
    }
}
