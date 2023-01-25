import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { MOUSE_POS, IS_RIGHT_EYE_BLINK } from '../../recoil/Atoms';
import "./EyeCard.css"

const EyeCard = (props) => {
    let mousePos = useRecoilValue(MOUSE_POS)
    let isRightEyeBlink = useRecoilValue(IS_RIGHT_EYE_BLINK)
    let clickRef = useRef(false);
    let [buttonStyle, setButtonStyle] = useState(props.style);
    let [contentDiv, setContentDiv] = useState([])
    const buttonRef = useRef(null);

    function isOverlap(){
        if (buttonRef.current){
            const { offsetTop, offsetLeft, offsetWidth, offsetHeight} = buttonRef.current;
            let posX = mousePos.x + 15 // 15 is mouseCursorSize / 2
            let posY = mousePos.y + 15
    
            return (offsetLeft <= posX && posX <= offsetLeft + offsetWidth) && (offsetTop <= posY && posY <= offsetTop + offsetHeight);
        }
    }

    useEffect( () => {
        let divs = []
        for (let index = 0; index < props.content.length; index++) {
            divs.push(<div className="eye-card-content">{props.content[index]}</div>)
        }
        setContentDiv([...divs])
    }, [])

    useEffect( () => {
        if (isOverlap()){
            setButtonStyle({...buttonStyle, backgroundColor: props.hoverColor})

            if (isRightEyeBlink){
                clickRef.current = true
                setButtonStyle({...buttonStyle, backgroundColor: props.clickColor})
            }
        }
        else{
            setButtonStyle(props.style)
        }
    
        if (clickRef.current){
            if (!isRightEyeBlink){
                props.onClick() 
                clickRef.current = false
            }
        }
    }, [mousePos])

    return(
        <div className="eye-card" ref={buttonRef} style={buttonStyle}>
            <div className="eye-card-title">{props.title}</div>
            <div className="eye-card-content-contianer">
                {contentDiv}
            </div>
        </div>
    )
}

export default EyeCard