import React, { useEffect, useRef, useState } from "react";
import { useCanvas } from "./CanvasContext.js";
import { useRecoilValue } from "recoil";
import { IS_LEFT_EYE_BLINK, MOUSE_POS, IS_RIGHT_EYE_BLINK, IS_MOUSE_OPEN, CURRENT_FUNCTION, SELECTED_SHAPE } from '../../recoil/Atoms';

export function Canvas(props) {
    let mousePos = useRecoilValue(MOUSE_POS)
    let isStartDrawing = useRef(false);
    let isLock = useRef(false);
    let isLeftEyeBlink = useRecoilValue(IS_LEFT_EYE_BLINK)
    let isRightEyeBlink = useRecoilValue(IS_RIGHT_EYE_BLINK)
    let isMouseOpen = useRecoilValue(IS_MOUSE_OPEN)
    let currentFunction = useRecoilValue(CURRENT_FUNCTION)
    let selectedShape = useRecoilValue(SELECTED_SHAPE)
    let [startPosX, setStartPosX] = useState();
    let [startPosY, setStartPosY] = useState();
    let [shapeImg, setShapeImg] = useState();

    const {
        contextRef,
        canvasRef,
        prepareCanvas,
        fillColor,
        zoomIn,
        zoomOut,
    } = useCanvas();

    const cursorImage = {
        circle: require('../shapes/circle.png'),
        square: require('../shapes/square.png'),
        heart: require('../shapes/heart.png'),
        triangle: require('../shapes/triangle.png'),
        upArrow: require('../shapes/up-arrow.png'),
        downArrow: require('../shapes/down-arrow.png'),
        leftArrow: require('../shapes/left-arrow.png'),
        rightArrow: require('../shapes/right-arrow.png')
    }

    async function drawImage(currentX, currentY) {
        contextRef.current.drawImage(shapeImg, 0, 0, shapeImg.width, shapeImg.height, startPosX, startPosY, currentX - startPosX, currentY - startPosY);
    }

    function save() {
        props.setBufferIdx(props.bufferIdx + 1);
        var buffer = [...props.imgBuffer].slice(0, props.bufferIdx + 1);
        var image = new Image();
        image.src = canvasRef.current.toDataURL();
        image.onload = function () {
            props.setImgBuffer([...buffer, image]);
        }
    }

    function dragging(){
        if (props.imgBuffer[props.bufferIdx]){

            contextRef.current.fillStyle="white";
            contextRef.current.fillRect(0,0,canvasRef.current.width,canvasRef.current.height);
            contextRef.current.drawImage(props.imgBuffer[props.bufferIdx],0,0,props.imgBuffer[props.bufferIdx].width,props.imgBuffer[props.bufferIdx].height,0,0,canvasRef.current.width,canvasRef.current.height);
        }
    }

    useEffect(() => {
        let Img = new Image();
        switch (selectedShape) {
            case "Circle":
                Img.src = cursorImage.circle;
                break;
            case "Square":
                Img.src = cursorImage.square;
                break;
            case "Heart":
                Img.src = cursorImage.heart;
                break;
            case "Triangle":
                Img.src = cursorImage.triangle;
                break;
            case "UpArrow":
                Img.src = cursorImage.upArrow;
                break;
            case "DownArrow":
                Img.src = cursorImage.downArrow;
                break;
            case "LeftArrow":
                Img.src = cursorImage.leftArrow;
                break;
            case "RightArrow":
                Img.src = cursorImage.rightArrow;
                break;
            default:
                break;
        }
        setShapeImg(Img);
    }, [selectedShape])

    useEffect(() => {
        prepareCanvas(props.ratio);
        if (props.imgBuffer.length > 0) {
            contextRef.current.drawImage(props.imgBuffer[props.bufferIdx], 0, 0, props.imgBuffer[props.bufferIdx].width, props.imgBuffer[props.bufferIdx].height, 0, 0, canvasRef.current.width, canvasRef.current.height);
        }
        else {
            var image = new Image();
            image.src = canvasRef.current.toDataURL();
            image.onload = function () {
                props.setImgBuffer([...[], image]);
            }
        }
    }, []);

    useEffect(() => {
        let posX = (mousePos.x - (window.innerWidth / 10)) + 15;
        let posY = (mousePos.y - (window.innerHeight / 10)) + 15
        //console.log(posY);

        // console.log(posX+","+posY);
        // if(posX > 0 && posY > 0 && posX < canvasRef.current.width && posY < canvasRef.current.height){
        if (posX > 0 && posY > 0 && posX < window.innerWidth * 0.7 && posY < window.innerHeight * 0.9 && posX < canvasRef.current.width && posY < canvasRef.current.height) {
            if (currentFunction === "draw" || currentFunction === "erase") {
                if (isMouseOpen && !props.smartToolsOpen) {
                    isStartDrawing.current = true;
                    contextRef.current.lineTo(posX + props.canvasDivRef.current.scrollLeft, posY + props.canvasDivRef.current.scrollTop);
                    contextRef.current.stroke();
                }
                else {
                    if (isStartDrawing.current) {
                        contextRef.current.beginPath();
                        // saveImage(props.setBufferIdx,props.bufferIdx,props.setImgBuffer,props.imgBuffer);
                        // props.setBufferIdx(props.bufferIdx+1);
                        // var buffer=[...props.imgBuffer].slice(0,props.bufferIdx+1);
                        // props.setImgBuffer([...buffer,canvasRef.current.toDataURL()]);
                        save();
                    }
                    isStartDrawing.current = false;
                }
            }
            else if(currentFunction==="fill"){
                if(isLeftEyeBlink && !props.smartToolsOpen){
                    isLock.current=true;
                }
                else {
                    if (isLock.current) {
                        fillColor(posX + props.canvasDivRef.current.scrollLeft, posY + props.canvasDivRef.current.scrollTop);
                        save();
                    }
                    isLock.current = false;
                }
            }

            else if(currentFunction==="zoom in"){
                if(isLeftEyeBlink){
                    isLock.current=true;
                }
                else {
                    if (isLock.current) {
                        zoomIn(props.imgBuffer[props.bufferIdx], props.ratio, props.setRatio, props.canvasDivRef, posX, posY);
                    }
                    isLock.current = false;
                }
            }
            else if(currentFunction==="zoom out"){
                if(isLeftEyeBlink){
                    isLock.current=true;
                }
                else {
                    if (isLock.current) {
                        zoomOut(props.imgBuffer[props.bufferIdx], props.ratio, props.setRatio, props.canvasDivRef, posX, posY);
                    }
                    isLock.current = false;
                }
            }
            else if(currentFunction==="shape"){
                if(isMouseOpen && !props.smartToolsOpen){
                    let currentX=posX+props.canvasDivRef.current.scrollLeft;
                    let currentY=posY+props.canvasDivRef.current.scrollTop;
                    if(!isLock.current){//좌표 저장
                        setStartPosX(currentX);
                        setStartPosY(currentY);
                    }
                    else {
                        dragging();
                        if(selectedShape==="Line"){
                            contextRef.current.beginPath();
                            contextRef.current.moveTo(startPosX,startPosY);
                            contextRef.current.lineTo(currentX,currentY);
                            contextRef.current.stroke();
                        }
                        else{
                            contextRef.current.drawImage(shapeImg, 0, 0, shapeImg.width, shapeImg.height, startPosX, startPosY, currentX - startPosX, currentY - startPosY);
                        }
                    }
                    isLock.current = true;
                }
                else {
                    if (isLock.current) {//그리기
                        let currentX = posX + props.canvasDivRef.current.scrollLeft;
                        let currentY = posY + props.canvasDivRef.current.scrollTop;
                        // ReDoAndUnDo(props.imgBuffer[props.bufferIdx]);
                        dragging();
                        if (selectedShape==="Line"){
                            contextRef.current.beginPath();
                            contextRef.current.moveTo(startPosX,startPosY);
                            contextRef.current.lineTo(currentX,currentY);
                            contextRef.current.stroke();
                            save();
                        }
                        else{
                            drawImage(currentX, currentY).then(() => {
                                save();
                            });
                        }
                    }
                    isLock.current = false;
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