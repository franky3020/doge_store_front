import { BASE_URL } from "./APISource";


// inputFile is from html input file, e.g.  ( ..., input.files[0] )
export async function addProductZipFile(jwt: string, productId: number, inputFile: any): Promise<void> {

    let headers = new Headers();
    headers.append('Authorization', "Bearer" + " " +  jwt);


    let data = new FormData();
    data.append('uploaded_file', inputFile)


    let res = await fetch(`${BASE_URL}/purchase/productZipFile/${productId.toString()}`, { method: "POST", headers: headers, body: data});

    if (res.status !== 201) {
        throw Error("error on add new image of product");
    }

}

