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

