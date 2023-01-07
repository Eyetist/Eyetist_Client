import React, { useEffect, useRef } from "react";
import { useCanvas } from "./CanvasContext.js";
import { useRecoilValue } from "recoil";
import { IS_LEFT_EYE_BLINK, MOUSE_POS, IS_RIGHT_EYE_BLINK } from '../../recoil/Atoms';

export function Canvas(props) {
    let mousePos = useRecoilValue(MOUSE_POS)
    let isStartDrawing = useRef(false);
    let isLeftEyeBlink = useRecoilValue(IS_LEFT_EYE_BLINK)
    let isRightEyeBlink = useRecoilValue(IS_RIGHT_EYE_BLINK)
    
    const {
        contextRef,
        canvasRef,
        prepareCanvas
    } = useCanvas();

    useEffect(() => {
        prepareCanvas();
    }, []);

    // console.log(`${window.innerWidth}px`)
    // console.log(mousePos)
    if(isLeftEyeBlink && !isRightEyeBlink){
        isStartDrawing.current = true;
        let posX = (mousePos.x - (window.innerWidth / 10)) * 2 + 25 * 2
        let posY = (mousePos.y - 70) * 2 + 25 * 2

        contextRef.current.lineTo(posX, posY);
        contextRef.current.stroke();
    }
    else{
        if(isStartDrawing.current){
            console.log("A")
        }
        isStartDrawing.current=false;
        contextRef.current.beginPath();
        
    }

    return (
        <div>
            <canvas
                ref={canvasRef}
            />
        </div>
    );
}