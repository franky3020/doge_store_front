
import { STATIC_SOURCE_URL } from "./APISource";
import { RANDOM_IMG_URL } from "./APISource";


export async function getProductImgURL(productId: number): Promise<any> {

    let productImgSource = `${STATIC_SOURCE_URL}/productImg/${productId.toString()}/product_publicimg.png`;

    let isImgExist = ckeckSourceExistV2(productImgSource);
    if (isImgExist) {
        return productImgSource;
    } else {
        return RANDOM_IMG_URL;
    }
}

export function getProductImgURLV2(...productId: number[]): { [product_id: number]: string } {

    let productsImgURL: { [product_id: number]: string } = {};


    for (let p_id of productId) {

        let productImgSource = `${STATIC_SOURCE_URL}/productImg/${p_id.toString()}/product_publicimg.png`;

        productsImgURL[p_id] = "";

        let isImgExist = ckeckSourceExistV2(productImgSource);
        if (isImgExist) {
            productsImgURL[p_id] = productImgSource;
        } else {
            productsImgURL[p_id] = productImgSource;
        }
        
    }
    return productsImgURL;

}

// 使用同步版本圖片載入速度是最快的
function ckeckSourceExistV2(sourceURL: string): boolean {

    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', sourceURL, false);
    xhr.send();

    if (xhr.status != 404) {
        return true;
    } else {
        return false;
    }
}

// 非同步版本的會很慢 因為它需要等其它網頁同步的事情完成, 等於檔案只能在最後才載入
function ckeckSourceExist(sourceURL: string): Promise<any> {

    return new Promise((resolve, reject) => {

        try {
            var xhr = new XMLHttpRequest();
            xhr.open('HEAD', sourceURL, true);
            xhr.send();

            xhr.onload = () => {

                if (xhr.status != 404) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            }

        } catch (err) {
            return reject(err);
        }
    });

}



