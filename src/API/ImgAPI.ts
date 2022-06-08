
import { STATIC_SOURCE_URL } from "./APISource";


export async function getProductImg(productId: number): Promise<any> {

    let productImgSource = `${STATIC_SOURCE_URL}/productImg/${productId.toString()}/product_publicimg.png`;

    let isImgExist = await ckeckSourceExist(productImgSource);
    if (isImgExist) {
        return productImgSource;
    } else {

        let randomImgSource = 'https://picsum.photos/800/800';
        return randomImgSource;
    }
}




export async function ckeckSourceExist(sourceURL: string): Promise<any> {

    let res = await fetch(sourceURL, { method: "GET" });

    if (res.status !== 404) {
        return true;
    }
    return false;
}