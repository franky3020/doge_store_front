import * as React from 'react';

export interface IProductDetailProps {
}

export interface IProductDetailState {
}

export default class ProductDetail extends React.Component<IProductDetailProps, IProductDetailState> {
  constructor(props: IProductDetailProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    return (
      <div>
        <p>detail</p>
      </div>
    );
  }
}
