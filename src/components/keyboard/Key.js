import React from "react";
import EyeButton from "../atoms/EyeButton";
import "./Key.css"

const Key = (props) => {

    function keyPress(){
        switch(props.text){
            case "⌫": //backspace
                props.setInputState(props.inputState.slice(0, -1))
                break;
            case "⌨": //keyboard hide
                props.setShow(false)
                props.inputRef.current.blur()
                break;
            default:
                props.setInputState(props.inputState + props.text)
                break;
        }
    }

    return(
        <div className="key">
            {
                props.text === "⌨" ?
                <EyeButton
                    style = {{width:"40px", height:"40px", borderRadius:"5px", backgroundColor:"white", fontSize:"30px"}}
                    text = {props.text}
                    hoverColor = "gray"
                    clickColor = "black"
                    onClick={() => {keyPress()}}
                />
                :
                <EyeButton
                    style = {{width:"40px", height:"40px", borderRadius:"5px", backgroundColor:"white"}}
                    text = {props.text}
                    hoverColor = "gray"
                    clickColor = "black"
                    onClick={() => {keyPress()}}
                />
            }
        </div>
    )
}

export default Key