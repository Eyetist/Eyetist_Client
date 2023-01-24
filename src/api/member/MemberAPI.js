import axios from "axios"
axios.defaults.withCredentials = true;
const BACK_BASE_URL = process.env.REACT_APP_BACK_URL;

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

export const getOthersPictures = async (visibility, page, member) =>{
    const data = await axios.get(BACK_BASE_URL + '/blob/publicImage',{
        params: {
            "visibility" : visibility, 
            "page" : page,
            "member" : member
        }
    })
    return data;
}

export const getTopsLikesPictures = async (visibility, page, member) =>{
    const data = await axios.get(BACK_BASE_URL + '/blob/getTopLikes',{
        params: {
            "visibility" : visibility, 
            "page" : page,
            "member" : member
        }
    })
    return data;
}

export const getWeeklyLikesPictures = async (visibility, page, member) =>{
    const data = await axios.get(BACK_BASE_URL + '/blob/getTopLikes',{
        params: {
            "visibility" : visibility, 
            "page" : page,
            "member" : member
        }
    })
    return data;
}

export const getOtherPicturesCount = async () =>{
    const data = await axios.get(BACK_BASE_URL + '/blob/imageCount')
    return data;
}

export const setLikePicture = async(blobName, member, heart) =>{
    const data = await axios({
        method: "POST",
        url: BACK_BASE_URL + "/like/store",
        mode: "cors",
        headers: {
          "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
        },
        data : {
            "likesBlobName" : blobName,
            "member" : member,
            "heart" : heart, 
        }
    });
    return data
}

export const modifyPictrue = async(blobName, title, visibility) =>{
    const data = await axios({
        method: "POST",
        url: BACK_BASE_URL + "/blob/modify",
        mode: "cors",
        headers: {
          "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
        },
        data : {
            "azureBlobName" : blobName,
            "title" : title,
            "visibility" : visibility, 
        }
    });
    return data
}

export const deletePictrue = async(member, blobName) =>{
    const data = await axios({
        method: "POST",
        url: BACK_BASE_URL + "/blob/deleteImage",
        mode: "cors",
        headers: {
          "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
        },
        data : {
            "member" : member,
            "azureBlobName" : blobName,
        }
    });
    return data
}

export const reSavePicture = async(url, blobName, member, title, visibility) => {
    const data = await axios({
        method: "POST",
        url: BACK_BASE_URL + "/blob/modify",
        mode: "cors",
        headers: {
          "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
        },
        data : {
            "file" : url,
            "azureBlobName" : blobName,
            "member" : member,
            "title" : title,
            "visibility" : visibility,
        }
    });
    return data
}