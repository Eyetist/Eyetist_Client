import React, { useEffect, useRef,useState } from "react";
import { useCanvas } from "./CanvasContext.js";
import { useRecoilValue } from "recoil";
import { IS_LEFT_EYE_BLINK, MOUSE_POS, IS_RIGHT_EYE_BLINK, IS_MOUSE_OPEN,CURRENT_FUNCTION,SELECTED_SHAPE } from '../../recoil/Atoms';

export function Canvas(props) {
    let mousePos = useRecoilValue(MOUSE_POS)
    let isStartDrawing = useRef(false);
    let isLock=useRef(false);
    let isLeftEyeBlink = useRecoilValue(IS_LEFT_EYE_BLINK)
    let isRightEyeBlink = useRecoilValue(IS_RIGHT_EYE_BLINK)
    let isMouseOpen = useRecoilValue(IS_MOUSE_OPEN)
    let currentFunction=useRecoilValue(CURRENT_FUNCTION)
    let selectedShape=useRecoilValue(SELECTED_SHAPE)
    let [startPosX,setStartPosX]=useState();
    let [startPosY,setStartPosY]=useState();
    let [shapeImg,setShapeImg]=useState();

    const {
        contextRef,
        canvasRef,
        prepareCanvas,
        storeCanvas,
        fillColor,
        zoomIn,
        zoomOut,
        ReDoAndUnDo,
        saveImage,
    } = useCanvas();

    const cursorImage = {
        circle: require('../shapes/circle.png'),
        square: require('../shapes/square.png'),
        heart: require('../shapes/heart.png'),
        triangle: require('../shapes/triangle.png')
    }

    async function drawImage(currentX,currentY){
        contextRef.current.drawImage(shapeImg,0,0,shapeImg.width,shapeImg.height,startPosX,startPosY,currentX-startPosX,currentY-startPosY);
    }

    function save(){
        props.setBufferIdx(props.bufferIdx+1);
        var buffer=[...props.imgBuffer].slice(0,props.bufferIdx+1);
        var image=new Image();
        image.src=canvasRef.current.toDataURL();
        image.onload=function(){
            props.setImgBuffer([...buffer,image]);
        }
    }

    function dragging(){
        contextRef.current.fillStyle="white";
        contextRef.current.fillRect(0,0,canvasRef.current.width,canvasRef.current.height);
        contextRef.current.drawImage(props.imgBuffer[props.bufferIdx],0,0,props.imgBuffer[props.bufferIdx].width,props.imgBuffer[props.bufferIdx].height,0,0,canvasRef.current.width,canvasRef.current.height);
        // let image=new Image();
        // image.src=props.imgBuffer[props.bufferIdx];
        // image.onload=function(){
        //     contextRef.current.fillStyle="white";
        //     contextRef.current.fillRect(0,0,canvasRef.current.width,canvasRef.current.height);
        //     contextRef.current.drawImage(image,0,0,image.width,image.height,0,0,canvasRef.current.width,canvasRef.current.height);
        // }
    }

    useEffect(()=>{
        let Img=new Image();
        switch(selectedShape){
            case "circle":
                Img.src=cursorImage.circle;
                break;
            case "square":
                Img.src=cursorImage.square;
                break;
            case "heart":
                Img.src=cursorImage.heart;
                break;
            case "triangle":
                Img.src=cursorImage.triangle;
                break;
            default:
                break;
        }
        setShapeImg(Img);
    },[selectedShape])

    useEffect(() => {
        prepareCanvas();
        // props.setImgBuffer([...props.imgBuffer,canvasRef.current.toDataURL()]);
        var image=new Image();
        image.src=canvasRef.current.toDataURL();
        image.onload=function(){
            props.setImgBuffer([...[],image]);
        }
    }, []);

    useEffect( () => {
        let posX = (mousePos.x - (window.innerWidth / 10)) + 15;
        let posY = (mousePos.y - (window.innerHeight / 10)) + 15
        //console.log(posY);
        
        // console.log(posX+","+posY);
        // if(posX > 0 && posY > 0 && posX < canvasRef.current.width && posY < canvasRef.current.height){
        if(posX > 0 && posY > 0 && posX < window.innerWidth * 0.7 && posY < window.innerHeight - 70){
            if(currentFunction==="draw"||currentFunction==="erase"){
                if(isLeftEyeBlink && !isRightEyeBlink && !isMouseOpen){
                    isStartDrawing.current = true;
                    contextRef.current.lineTo(posX+props.canvasDivRef.current.scrollLeft, posY+props.canvasDivRef.current.scrollTop);
                    contextRef.current.stroke();
                }
                else{
                    if(isStartDrawing.current){
                        contextRef.current.beginPath();
                        // saveImage(props.setBufferIdx,props.bufferIdx,props.setImgBuffer,props.imgBuffer);
                        // props.setBufferIdx(props.bufferIdx+1);
                        // var buffer=[...props.imgBuffer].slice(0,props.bufferIdx+1);
                        // props.setImgBuffer([...buffer,canvasRef.current.toDataURL()]);
                        save();
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
                        fillColor(posX+props.canvasDivRef.current.scrollLeft,posY+props.canvasDivRef.current.scrollTop);
                        save();
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
                        zoomIn(props.imgBuffer[props.bufferIdx],props.ratio,props.setRatio,props.canvasDivRef,posX,posY);
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
                        zoomOut(props.imgBuffer[props.bufferIdx],props.ratio,props.setRatio,props.canvasDivRef,posX,posY);
                    }
                    isLock.current=false;
                }
            }
            else if(currentFunction==="shape"){
                if(isRightEyeBlink&&!isMouseOpen){
                    let currentX=posX+props.canvasDivRef.current.scrollLeft;
                    let currentY=posY+props.canvasDivRef.current.scrollTop;
                    if(!isLock.current){//좌표 저장
                        setStartPosX(currentX);
                        setStartPosY(currentY);
                    }
                    isLock.current=true;
                    // ReDoAndUnDo(props.imgBuffer[props.bufferIdx]);
                    dragging();
                    contextRef.current.drawImage(shapeImg,0,0,shapeImg.width,shapeImg.height,startPosX,startPosY,currentX-startPosX,currentY-startPosY);

                }
                else{
                    if(isLock.current){//그리기
                        let currentX=posX+props.canvasDivRef.current.scrollLeft;
                        let currentY=posY+props.canvasDivRef.current.scrollTop;
                        // ReDoAndUnDo(props.imgBuffer[props.bufferIdx]);
                        dragging();
                        drawImage(currentX,currentY).then(()=>{
                            save();
                            // canvasRef.current.re
                        });
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