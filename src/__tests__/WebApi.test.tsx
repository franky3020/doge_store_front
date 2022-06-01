


import {login_and_getJWT} from "../getDataApi/WebApi";


test('login and get jwt token', async () => {
    let jwt_not_exitUser = await login_and_getJWT("ff","dd");
    expect(jwt_not_exitUser).toBe(null);
    
    let jwt_exitUser = await login_and_getJWT("u_email","ya");
    expect(jwt_exitUser).not.toBe(null);
    expect(jwt_exitUser.token).not.toBeUndefined();

});