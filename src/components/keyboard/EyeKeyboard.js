import React from "react";
import Key from "./Key";
import './EyeKeyboard.css'

const EyeKeyboard = (props) => {
    return(
        <div className="eye-keyboard">
            <div>
                <Key text="q"/>
                <Key text="w"/>
                <Key text="e"/>
                <Key text="r"/>
                <Key text="t"/>
                <Key text="y"/>
                <Key text="u"/>
                <Key text="i"/>
                <Key text="o"/>
                <Key text="p"/>
            </div>
            <div>
                <Key text="a"/>
                <Key text="s"/>
                <Key text="d"/>
                <Key text="f"/>
                <Key text="g"/>
                <Key text="h"/>
                <Key text="j"/>
                <Key text="k"/>
                <Key text="l"/>
                <Key text="<-"/>
            </div>
            <div>
                <Key text="z"/>
                <Key text="x"/>
                <Key text="c"/>
                <Key text="v"/>
                <Key text="b"/>
                <Key text="n"/>
                <Key text="m"/>
                <Key text="enter"/>
            </div>

        </div>
    )
}

export default EyeKeyboard