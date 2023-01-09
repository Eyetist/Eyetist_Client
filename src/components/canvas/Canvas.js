import React, { useEffect, useRef } from "react";
import { useCanvas } from "./CanvasContext.js";
import { useRecoilValue } from "recoil";
import { IS_LEFT_EYE_BLINK, MOUSE_POS, IS_RIGHT_EYE_BLINK, IS_MOUSE_OPEN } from '../../recoil/Atoms';

export function Canvas(props) {
    let mousePos = useRecoilValue(MOUSE_POS)
    let isStartDrawing = useRef(false);
    let isLeftEyeBlink = useRecoilValue(IS_LEFT_EYE_BLINK)
    let isRightEyeBlink = useRecoilValue(IS_RIGHT_EYE_BLINK)
    let isMouseOpen = useRecoilValue(IS_MOUSE_OPEN)

    const {
        contextRef,
        canvasRef,
        prepareCanvas,
        storeCanvas,
    } = useCanvas();

    useEffect(() => {
        prepareCanvas();
        props.setImgBuffer([...props.imgBuffer,canvasRef.current.toDataURL()]);
    }, []);

    useEffect( () => {
        let posX = (mousePos.x - (window.innerWidth / 10)) * 2 + 25 * 2
        let posY = (mousePos.y - 70) * 2 + 25 * 2
        if(posX>0 && posY>0&&props.currentFunction==="draw"){
            if(isLeftEyeBlink && !isRightEyeBlink && !isMouseOpen){
                isStartDrawing.current = true;
                contextRef.current.lineTo(posX, posY);
                contextRef.current.stroke();
            }
            else{
                if(isStartDrawing.current){
                    contextRef.current.beginPath();
                    props.setBufferIdx(props.bufferIdx+1);
                    var buffer=[...props.imgBuffer].slice(0,props.bufferIdx+1);
                    props.setImgBuffer([...buffer,canvasRef.current.toDataURL()]);
                }
                isStartDrawing.current=false;
            }
        }
    }, [mousePos])

    return (
            <canvas
                ref={canvasRef}
            />
    );
}