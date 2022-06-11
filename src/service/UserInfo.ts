

let jwt = require("jsonwebtoken");

import UserEntity from "../entity/UserEntity";


export default class UserInfoService {

    userEntity: UserEntity|null = null;

    private static instance: UserInfoService;
    static readonly TOKEN_NAME = "Doge-Store-JWT";


    private constructor() {
    }

    static getInstance(): UserInfoService {
        if (typeof UserInfoService.instance === "undefined") {
            UserInfoService.instance = new UserInfoService();
        }

        // Auto set jwt on each time getting instance
        UserInfoService.instance.setUserFromLocalStorageJWT();

        return UserInfoService.instance;
    }

    getUser(): UserEntity|null{
        return this.userEntity;
    }

    getJWT(): string {
        let jwt = localStorage.getItem(UserInfoService.TOKEN_NAME);

        if (jwt === null) {
            throw Error("don't have jwt");
        }

        return jwt
    }

    getUserNickname():string {
        if(this.userEntity) {
            return this.userEntity.nickname;
        } else {
            return "";
        }
    }

    isExistUser(): boolean {
        if(this.userEntity) {
            return true;
        } else {
            // Take jwt from LocalStorage and check again
            this.setUserFromLocalStorageJWT();
            if(this.userEntity) {
                return true;
            }
        }

        return false;

    }

    setUserFromLocalStorageJWT() {
        let jwt: string | null = localStorage.getItem(UserInfoService.TOKEN_NAME);
        if (jwt) {
            try {
                this.setUserFromJWT(jwt);
            } catch(err) {
                // Ignore error
            }
        }
    }

    /** 
     * @throws {Error}
     */
    setUserFromJWT(token: string) { // if token can't decode, throw Error
        // 因為行為沒有完成, 所以要拋出錯誤, 不要選擇忽視

        let decode = jwt.decode(token);

        if (decode) {

            let checkKeys = ['id', 'email', 'nickname'];
            for(const key of checkKeys) {
                if(typeof decode[key] === "undefined") {
                    throw new Error("error in jwt decode content");
                }
            }

            this.clearUserData();
            localStorage.setItem(UserInfoService.TOKEN_NAME, token);
            this.setUserWhenlogin(decode['id'], decode['email'], decode['nickname']);
        } else {
            throw new Error("error when jwt decode");
        }

    }

    setUserWhenlogin(id: number, email: string, nickname: string) {
        this.userEntity = new UserEntity(id, email, nickname);
    }

    setUserWhenLogout() {
        this.clearUserData();
    }

    clearUserData() {
        this.userEntity = null;
        localStorage.removeItem(UserInfoService.TOKEN_NAME);
    }

}