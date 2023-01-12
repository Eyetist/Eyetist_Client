import React, { useEffect, useRef } from "react";
import { useCanvas } from "./CanvasContext.js";
import { useRecoilValue } from "recoil";
import { IS_LEFT_EYE_BLINK, MOUSE_POS, IS_RIGHT_EYE_BLINK, IS_MOUSE_OPEN,CURRENT_FUNCTION } from '../../recoil/Atoms';

export function Canvas(props) {
    let mousePos = useRecoilValue(MOUSE_POS)
    let isStartDrawing = useRef(false);
    let isLock=useRef(false);
    let isLeftEyeBlink = useRecoilValue(IS_LEFT_EYE_BLINK)
    let isRightEyeBlink = useRecoilValue(IS_RIGHT_EYE_BLINK)
    let isMouseOpen = useRecoilValue(IS_MOUSE_OPEN)
    let currentFunction=useRecoilValue(CURRENT_FUNCTION)

    const {
        contextRef,
        canvasRef,
        prepareCanvas,
        storeCanvas,
        fillColor,
        zoomIn,
        zoomOut,
    } = useCanvas();

    useEffect(() => {
        prepareCanvas();
        props.setImgBuffer([...props.imgBuffer,canvasRef.current.toDataURL()]);
    }, []);

    useEffect( () => {
        let posX = (mousePos.x - (window.innerWidth / 10)) + 15;
        let posY = (mousePos.y - (window.innerHeight / 10)) + 15
        // console.log(posX+","+posY);
        // if(posX > 0 && posY > 0 && posX < canvasRef.current.width && posY < canvasRef.current.height){
        if(posX > 0 && posY > 0 && posX < window.innerWidth * 0.7 && posY < window.innerHeight - 70){
            if(currentFunction==="draw"||currentFunction==="erase"){
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
            else if(currentFunction==="fill"){
                if(isRightEyeBlink&&!isMouseOpen){
                    isLock.current=true;
                }
                else{
                    if(isLock.current){
                        fillColor(posX,posY);
                        props.setBufferIdx(props.bufferIdx+1);
                        var buffer=[...props.imgBuffer].slice(0,props.bufferIdx+1);
                        props.setImgBuffer([...buffer,canvasRef.current.toDataURL()]);
                    }
                    isLock.current=false;
                }
            }
            else if(currentFunction==="zoom in"){
                if(isRightEyeBlink&&!isMouseOpen){
                    isLock.current=true;
                }
                else{
                    if(isLock.current){
                        zoomIn(props.imgBuffer[props.bufferIdx],props.ratio,props.setRatio);
                    }
                    isLock.current=false;
                }
            }
            else if(currentFunction==="zoom out"){
                if(isRightEyeBlink&&!isMouseOpen){
                    isLock.current=true;
                }
                else{
                    if(isLock.current){
                        zoomOut(props.imgBuffer[props.bufferIdx],props.ratio,props.setRatio);
                    }
                    isLock.current=false;
                }
            }
        }
    }, [mousePos])

    return (
            <canvas
                ref={canvasRef}
            />
    );
}