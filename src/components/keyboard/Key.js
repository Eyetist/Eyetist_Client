import React from "react";
import EyeButton from "../atoms/EyeButton";
import "./Key.css"

const Key = (props) => {

    return(
        <div className="key">
            <EyeButton
                style = {{width:"30px", height:"30px", borderRadius:"5px", backgroundColor:"white"}}
                text = {props.text}
                hoverColor = "gray"
                clickColor = "black"
                onClick={() => {console.log(props.text)}}
            />
        </div>
    )
}

export default Key