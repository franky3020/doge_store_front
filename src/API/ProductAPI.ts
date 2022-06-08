import { BASE_URL } from "./APISource";

/** 
 * @throws {Error}
 */
export async function deleteById(id: number, jwt: string): Promise<void> {

    let jwtHeader = new Headers();
    jwtHeader.append('Authorization', "Bearer" + " " +  jwt);

    let res = await fetch(`${BASE_URL}/product/${id.toString()}`, { method: "DELETE", headers: jwtHeader });

    if (res.status !== 200) {
        throw Error("error on delete product");
    }

}

export async function getAllProducts(): Promise<any> {

    let res = await fetch(`${BASE_URL}/product`, { method: "GET" });
    let products_json = await res.json();
    return products_json;

}

export async function addNewProduct(jwt: string, name: string, create_user_id: number, price: number, describe: string): Promise<void> {

    let headers = new Headers();
    headers.append('Authorization', "Bearer" + " " +  jwt);
    headers.append('Content-Type', "application/json");

    let body_json = JSON.stringify({
        name,
        create_user_id,
        price,
        describe
    });


    let res = await fetch(`${BASE_URL}/product`, { method: "POST", headers: headers, body: body_json});

    if (res.status !== 201) {
        throw Error("error on add new product");
    }

}

