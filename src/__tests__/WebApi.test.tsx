


import {login_and_getJWT} from "../getDataApi/WebApi";


test('login and get jwt token', async () => {
    let jwt_not_exitUser = await login_and_getJWT("ff","dd");
    expect(jwt_not_exitUser).toBe(null);
});