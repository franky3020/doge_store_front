import * as jwt from 'jsonwebtoken';


test('jwt.decode on the not format string', () => {
    let decode = jwt.decode("ddd");
    expect(decode).toBe(null);
});