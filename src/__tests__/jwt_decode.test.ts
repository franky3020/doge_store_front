

// declare function require(name:string);
// import jwt = require("jsonwebtoken");

import * as jwt from 'jsonwebtoken';


test('jwt.decode on the not format string', () => {
    let decode = jwt.decode("ddd");
    expect(decode).toBe(null);
});