
export async function login_and_getJWT(email: string, password: string) {

    let res = await fetch('http://localhost:5000/api/user/login', {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        })
    });

    if(res.status === 200) {
        let token_json = await res.json();
        return token_json;
    } else {
        return null;
    }
        


}