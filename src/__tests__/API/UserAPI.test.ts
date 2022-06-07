import { login_and_getJWT, user_register_api } from "../../API/UserAPI";


test('test login_and_getJWT()', async () => {

    global.fetch = jest.fn(() =>
        Promise.resolve({
            status: 200,
            json: () => Promise.resolve({ token: "fake token Content" }),
        })
    ) as jest.Mock;

    let jwt = await login_and_getJWT("test", "test");
    expect(jwt).toBe("fake token Content");


    // on not login
    global.fetch = jest.fn(() =>
        Promise.resolve({
            status: 401
        })
    ) as jest.Mock;

    jwt = await login_and_getJWT("test", "test");
    expect(jwt).toBe(null);

});


test('test user_register_api()', async () => {

    global.fetch = jest.fn(() =>
        Promise.resolve({
            status: 400,
        })
    ) as jest.Mock;

    try {
        await user_register_api("test", "test", "test");
        fail("need to throw error");
    } catch (err) {
        // PASS
    }
});