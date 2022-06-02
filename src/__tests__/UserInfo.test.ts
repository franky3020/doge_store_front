import UserInfoService from "../service/UserInfo";
import UserEntity from "../entity/UserEntity";

test.only('test decode jwt', () => {

    let userInfo = UserInfoService.getInstance();
    userInfo.setUserFromJWT("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1X2VtYWlsIiwibmlja25hbWUiOiJmcmFua3kiLCJpYXQiOjE2NTQwODg1NzJ9.qcnA-1txkH2JiOqGTum3qSGpsE-N92gONNcWDRY0Pys");
     
    let userEntity: UserEntity|null = userInfo.getUser();
    
    if(userEntity) {
        expect(userEntity.id).toBe(1);
        expect(userEntity.email).toBe("u_email");
        expect(userEntity.nickname).toBe("franky");
    }
    


    expect(()=>{
        // with space      here=>
        userInfo.setUserFromJWT(" eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1X2VtYWlsIiwibmlja25hbWUiOiJmcmFua3kiLCJpYXQiOjE2NTQwODg1NzJ9.qcnA-1txkH2JiOqGTum3qSGpsE-N92gONNcWDRY0Pys");
    }).toThrow();


});