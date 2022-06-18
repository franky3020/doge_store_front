
import { STATIC_SOURCE_URL } from "./APISource";
import { RANDOM_IMG_URL } from "./APISource";

export async function getProductImgURLV2(...productId: number[]): Promise<{ [product_id: number]: string }> {

    let productsImgURL: { [product_id: number]: string } = {};

    let allPromises = [];

    for (let p_id of productId) {

        let productImgSource = `${STATIC_SOURCE_URL}/productImg/${p_id.toString()}/product_publicimg.png`;

        productsImgURL[p_id] = "";

        let checkSourcePromise = ckeckSourceExist(productImgSource).then((hasSource) => {
            if (hasSource) {
                productsImgURL[p_id] = productImgSource;
            } else {
                productsImgURL[p_id] = RANDOM_IMG_URL;
            }
        });

        allPromises.push(checkSourcePromise);


    }
    await Promise.all(allPromises); // 一定要用 promise.all 才會同時載入, 如果在 ckeckSourceExist 那行加上 await 會是依序載入

    return productsImgURL;

}

function ckeckSourceExist(sourceURL: string): Promise<boolean> {

    return new Promise((resolve) => {

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
            return resolve(false);
        }
    });

}



