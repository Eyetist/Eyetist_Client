import axios from "axios"
import { BACK_BASE_URL } from "../../Config";
axios.defaults.withCredentials = true;

export const sendLogin = async(inputId, inputPw) =>{
    const data = await axios({
        method: "POST",
        url: BACK_BASE_URL + "/user/login",
        mode: "cors",
        headers: {
          "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
        },
        data : {"id" : inputId, "password" : inputPw}
    });
    return data
}

export const sendJoin = async(inputId, inputPw) =>{
    const data = await axios({
        method: "POST",
        url: BACK_BASE_URL + "/user/join",
        mode: "cors",
        headers: {
          "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
        },
        data : {"id" : inputId, "password" : inputPw}
    });
    return data
}

export const sendCanvas = async(userId, paintName, paintUrl, visibility, likeCount) =>{
    const data = await axios({
        method: "POST",
        url: BACK_BASE_URL + "/blob/store",
        mode: "cors",
        headers: {
          "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
        },
        data : {
            "file" : paintUrl,
            "member" : userId,
            "title" : paintName, 
            "likes" : likeCount,
            "visibility" : visibility,
        }
    });
    return data
}

export const getMyPictures = async(userId) =>{
    const data = await axios({
        method: "POST",
        url: BACK_BASE_URL + "/blob/getImageList",
        mode: "cors",
        headers: {
          "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
        },
        data : {
            "member" : userId, 
        }
    });
    return data
}

export const getOthersPictures = async (visibility, page) =>{
    const data = await axios.get(BACK_BASE_URL + '/blob/publicImage',{
        params: {
            "visibility" : visibility, 
            "page" : page
        }
    })
    return data;
}

export const getOtherPicturesCount = async () =>{
    const data = await axios.get(BACK_BASE_URL + '/blob/imageCount')
    return data;
}