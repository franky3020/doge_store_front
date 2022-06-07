export default class ProductEntity {

    id: number;
    name: string;
    create_user_id: number;
    price: number;
    describe: string;

    constructor(id: number, name: string, create_user_id: number, price: number, describe: string) {
        this.id = id;
        this.name = name;
        this.create_user_id = create_user_id;
        this.price = price;
        this.describe = describe;
    }

    static createFromJson(product_json: any): ProductEntity[] {


        let products: ProductEntity[] = [];

        for (let product of product_json) {

            let a_product = new ProductEntity(  product['id'],
                                                product['name'],
                                                product['create_user_id'],
                                                product['price'],
                                                product['describe'] );

            products.push(a_product);
        }
        return products;
    }



}