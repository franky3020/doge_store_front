
export async function login_and_getJWT(email: string, password: string): Promise<any|null> {

    // 須加上錯誤處理 解決如果後端根本不存在的情況

    try {
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
            if(typeof token_json.token !== "undefined") {
                return token_json.token;
            }
        }

    } catch(err) {
        // if server not exist
        console.log("server not exist");
    }

    return null;
    
}


export async function user_register_api(email: string, password: string, nickname: string): Promise<void> {

    try {
        let res = await fetch('http://localhost:5000/api/user/register', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
                nickname
            })
        });

        if(res.status !== 201) {
            throw Error("register failed");
        }

    } catch(err) {
        // if server not exist
        throw err;
    }
}