import { addProductImage } from "./ProductAPI";
import UserInfoService from '../service/UserInfo';
import { addProductZipFile, downloadProductZipFile, purchase } from "../API/PurchaseAPI";
import { deleteProductById, getAllProducts } from '../API/ProductAPI';
import ProductEntity from '../entity/ProductEntity';


const notHavafileErrorStr = "don't hava file";
export default class APIFacade {


    static async addProductImage(product_id: number, file: File | null) {

        if (file === null) {
            throw Error(notHavafileErrorStr);
        }

        let jwt = UserInfoService.getInstance().getJWT();
        await addProductImage(jwt, product_id, file);

    }

    static async addProductZipFile(product_id: number, file: File | null) {

        if (file === null) {
            throw Error(notHavafileErrorStr);
        }

        let jwt = UserInfoService.getInstance().getJWT();
        await addProductZipFile(jwt, product_id, file);

    }

    static async downloadProductZipFile(product_id: number, fileName: string) {

        let jwt = UserInfoService.getInstance().getJWT();
        await downloadProductZipFile(jwt, product_id, fileName);

    }

    static async deleteProductById(product_id: number) {

        let jwt = UserInfoService.getInstance().getJWT();
        await deleteProductById(product_id, jwt);
    }

    static async getAllProducts(): Promise< ProductEntity[] > {
        
        let products_json = await getAllProducts();
        let products = ProductEntity.createFromJson(products_json);
        return products;
    }
    
    static async purchase(product_id: number) {
        
        let jwt = UserInfoService.getInstance().getJWT();
        await purchase(jwt, product_id);
    }














}