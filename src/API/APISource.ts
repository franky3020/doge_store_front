
export let SERVER_URL = "";
if(process.env.REACT_APP_SERVER_URL) {
    SERVER_URL = process.env.REACT_APP_SERVER_URL;
} else {
    SERVER_URL = "https://store.dogecoin.idv.tw/backend_server";
}

export const API_URL = SERVER_URL + "/api";
export const STATIC_SOURCE_URL = SERVER_URL + "/public";

export const RANDOM_IMG_URL = "https://picsum.photos/800/800";
