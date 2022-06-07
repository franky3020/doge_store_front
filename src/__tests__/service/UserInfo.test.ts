import UserInfoService from "../../service/UserInfo";
import UserEntity from "../../entity/UserEntity";
// import {expect, jest, test} from '@jest/globals';

const TEST_CORRECT_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1X2VtYWlsIiwibmlja25hbWUiOiJmcmFua3kiLCJpYXQiOjE2NTQwODg1NzJ9.qcnA-1txkH2JiOqGTum3qSGpsE-N92gONNcWDRY0Pys";

test('test decode jwt', () => {

    let userInfo = UserInfoService.getInstance();
    userInfo.setUserFromJWT(TEST_CORRECT_JWT);
     
    let userEntity: UserEntity|null = userInfo.getUser();
    
    if(userEntity) {
        expect(userEntity.id).toBe(1);
        expect(userEntity.email).toBe("u_email");
        expect(userEntity.nickname).toBe("franky");
    }

    expect(()=>{
        userInfo.setUserFromJWT("error text" + TEST_CORRECT_JWT);
    }).toThrow();


});

test('test setUserFromJWT()', () => {
    let userInfo = UserInfoService.getInstance();
    userInfo.setUserFromJWT(TEST_CORRECT_JWT);
    let jwtFromLocalStorage = localStorage.getItem(UserInfoService.TOKEN_NAME)
    expect(jwtFromLocalStorage).toBe(TEST_CORRECT_JWT);


    expect(()=>{
        userInfo.setUserFromJWT("add some error" + TEST_CORRECT_JWT);
    }).toThrow();

});