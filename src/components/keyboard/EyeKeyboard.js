import React from "react";
import Key from "./Key";
import './EyeKeyboard.css'

const EyeKeyboard = (props) => {
    return(
        <div className="eye-keyboard">
            <div>
                <Key text="1" inputState={props.inputState} setInputState={props.setInputState}/>
                <Key text="2" inputState={props.inputState} setInputState={props.setInputState}/>
                <Key text="3" inputState={props.inputState} setInputState={props.setInputState}/>
                <Key text="4" inputState={props.inputState} setInputState={props.setInputState}/>
                <Key text="5" inputState={props.inputState} setInputState={props.setInputState}/>
                <Key text="6" inputState={props.inputState} setInputState={props.setInputState}/>
                <Key text="7" inputState={props.inputState} setInputState={props.setInputState}/>
                <Key text="8" inputState={props.inputState} setInputState={props.setInputState}/>
                <Key text="9" inputState={props.inputState} setInputState={props.setInputState}/>
                <Key text="0" inputState={props.inputState} setInputState={props.setInputState}/>
            </div>
            <div>
                <Key text="q" inputState={props.inputState} setInputState={props.setInputState}/>
                <Key text="w" inputState={props.inputState} setInputState={props.setInputState}/>
                <Key text="e" inputState={props.inputState} setInputState={props.setInputState}/>
                <Key text="r" inputState={props.inputState} setInputState={props.setInputState}/>
                <Key text="t" inputState={props.inputState} setInputState={props.setInputState}/>
                <Key text="y" inputState={props.inputState} setInputState={props.setInputState}/>
                <Key text="u" inputState={props.inputState} setInputState={props.setInputState}/>
                <Key text="i" inputState={props.inputState} setInputState={props.setInputState}/>
                <Key text="o" inputState={props.inputState} setInputState={props.setInputState}/>
                <Key text="p" inputState={props.inputState} setInputState={props.setInputState}/>
            </div>
            <div>
                <Key text="a" inputState={props.inputState} setInputState={props.setInputState}/>
                <Key text="s" inputState={props.inputState} setInputState={props.setInputState}/>
                <Key text="d" inputState={props.inputState} setInputState={props.setInputState}/>
                <Key text="f" inputState={props.inputState} setInputState={props.setInputState}/>
                <Key text="g" inputState={props.inputState} setInputState={props.setInputState}/>
                <Key text="h" inputState={props.inputState} setInputState={props.setInputState}/>
                <Key text="j" inputState={props.inputState} setInputState={props.setInputState}/>
                <Key text="k" inputState={props.inputState} setInputState={props.setInputState}/>
                <Key text="l" inputState={props.inputState} setInputState={props.setInputState}/>
                <Key text="⌫" inputState={props.inputState} setInputState={props.setInputState}/>
            </div>
            <div>
                <Key text="z" inputState={props.inputState} setInputState={props.setInputState}/>
                <Key text="x" inputState={props.inputState} setInputState={props.setInputState}/>
                <Key text="c" inputState={props.inputState} setInputState={props.setInputState}/>
                <Key text="v" inputState={props.inputState} setInputState={props.setInputState}/>
                <Key text="b" inputState={props.inputState} setInputState={props.setInputState}/>
                <Key text="n" inputState={props.inputState} setInputState={props.setInputState}/>
                <Key text="m" inputState={props.inputState} setInputState={props.setInputState}/>
                <Key text="⇠" inputState={props.inputState} setInputState={props.setInputState} setShow={props.setShow} inputRef={props.inputRef}/>            
            </div>

        </div>
    )
}

export default EyeKeyboard