import axios from "axios"
axios.defaults.withCredentials = true;

export const sendLogin = async(inputId, inputPw) =>{
    const { data } = await axios({
        method: "POST",
        url: `http://localhost:8080/user/login`,
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
        url: `http://localhost:8080/user/join`,
        mode: "cors",
        headers: {
          "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
        },
        data : {"email" : inputId, "password" : inputPw}
});
    console.log(data);
}