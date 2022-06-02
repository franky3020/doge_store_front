
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
            return token_json;
        } else {
            return null;
        }

    } catch(err) {
        // if server not exist
        console.log("server not exist");
    }

    return null;
    
}