import { API_URL } from "./APISource";
let download = require('downloadjs');

// TODO: 要想一下這 API 放這裡好不好
// inputFile is from html input file, e.g.  ( ..., input.files[0] )
export async function addProductZipFile(jwt: string, productId: number, inputFile: any): Promise<void> {

    let headers = new Headers();
    headers.append('Authorization', "Bearer" + " " +  jwt);


    let data = new FormData();
    data.append('uploaded_file', inputFile)


    let res = await fetch(`${API_URL}/purchase/productZipFile/${productId.toString()}`, { method: "POST", headers: headers, body: data});

    if (res.status !== 201) {
        throw Error("error on add new zip product file");
    }

}

export async function downloadProductZipFile(jwt: string, productId: number, fileName: string): Promise<void> {

    let headers = new Headers();
    headers.append('Authorization', "Bearer" + " " +  jwt);



    let res = await fetch(`${API_URL}/purchase/productZipFile/${productId.toString()}`, { method: "GET", headers: headers});

    if (res.status !== 200) {
        throw Error("error on get product zip file");
    }

    let res_blob = await res.blob();
    download(res_blob, fileName + ".zip" ,"application/zip");

}


// TODO: 我有遇到忘記加上 Content-Type 而 api 出現錯誤, 像這樣情況 就需要寫測試來輔助
export async function purchase(jwt: string, product_id: number): Promise<void> {

    let headers = new Headers();
    headers.append('Authorization', "Bearer" + " " +  jwt);
    headers.append('Content-Type', "application/json");


    let body_json = JSON.stringify({
        product_id
    });

    let res = await fetch(`${API_URL}/purchase`, { method: "POST", headers: headers, body: body_json});

    if (res.status !== 201) {
        throw Error("error on purchase");
    }

}

export async function getPurchaseList(jwt: string): Promise<number[]> {

    let headers = new Headers();
    headers.append('Authorization', "Bearer" + " " +  jwt);


    let res = await fetch(`${API_URL}/purchase`, { method: "GET", headers: headers});

    if (res.status !== 200) {
        throw Error("error on get purchaseList");
    }

    let idList = await res.json();
    return idList;
}
