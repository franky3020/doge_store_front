import { addProductImage } from "./ProductAPI";
import UserInfoService from '../service/UserInfo';
import { addProductZipFile, downloadProductZipFile} from "../API/PurchaseAPI";


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





    








}