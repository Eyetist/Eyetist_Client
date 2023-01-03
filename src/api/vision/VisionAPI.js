import axios from "axios"
axios.defaults.withCredentials = true;

export const getHeadPoseEst =async function(frame_w, frame_h, face_2d, face_3d, nose_2d, nose_3d){
    const data=await axios.post("http://127.0.0.1:5000" + "/pose",
        {
            frame_w: frame_w,
            frame_h: frame_h,
            face_2d: face_2d,
            face_3d: face_3d,
            nose_2d: nose_2d,
            nose_3d: nose_3d,
        },
        {
            headers: {
            'Access-Control-Allow-Origin': '*',
            },
            withCredentials: true
        
        })
    return data;
}