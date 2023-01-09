import axios from "axios"
import { BACK_BASE_URL } from "../../Config";
axios.defaults.withCredentials = true;

export const sendLogin = async(inputId, inputPw) =>{
    const { data } = await axios({
        method: "POST",
        url: BACK_BASE_URL + "/user/login",
        mode: "cors",
        headers: {
          "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
        },
        data : {"email" : inputId, "password" : inputPw}
    });
    console.log(data);
}

export const sendJoin = async(inputId, inputPw) =>{
    const { data } = await axios({
        method: "POST",
        url: BACK_BASE_URL + "/user/join",
        mode: "cors",
        headers: {
          "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
        },
        data : {"email" : inputId, "password" : inputPw}
    });
    console.log(data);
}

export const sendCanvas = async(userId, paintName, paintUrl, visibility, likeCount) =>{
    const { data } = await axios({
        method: "POST",
        url: BACK_BASE_URL + "/blob/storeImage",
        mode: "cors",
        headers: {
          "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
        },
        data : {
            "userId" : userId,
            "paintName" : paintName, 
            "paintUrl" : paintUrl,
            "visibility" : visibility,
            "likeCount" : likeCount,
        }
    });
    console.log(data);
}