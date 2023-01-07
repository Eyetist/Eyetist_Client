import React, { useContext, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { MOUSE_POS, IS_LEFT_EYE_BLINK } from '../../recoil/Atoms';

const CanvasContext = React.createContext();

export const CanvasProvider = ({ children }) => {
    let [mousePos, setMousePos] = useRecoilState(MOUSE_POS)
    let isLeftEyeBlink = useRecoilValue(IS_LEFT_EYE_BLINK)

    const [isDrawing, setIsDrawing] = useState(false)
    const canvasRef = useRef(null);
    const contextRef = useRef(null);


    const prepareCanvas = () => {
        const canvas = canvasRef.current
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        const context = canvas.getContext("2d")
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 30;
        context.scale(1, 1)
        contextRef.current = context;
    };


    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d")
        context.clearRect(0, 0, canvas.width, canvas.height)
    }

    const setDrawMode=()=>{
        const canvas=canvasRef.current;
        const context=canvas.getContext("2d");
        context.strokeStyle="black";
    }

    const setEraseMode=()=>{
        const canvas=canvasRef.current;
        const context=canvas.getContext("2d");
        context.strokeStyle="white";
    }

    const setColor=(color)=>{
        const canvas=canvasRef.current;
        const context=canvas.getContext("2d");
        context.strokeStyle=color;
    }

    const setWidth=(width)=>{
        const canvas=canvasRef.current;
        const context=canvas.getContext("2d");
        context.lineWidth=width;
    }

    const undo=(url)=>{
        const canvas=canvasRef.current;
        const context=canvas.getContext("2d");
        const lastImg=new Image();
        context.drawImage(lastImg,0,0,canvas.width,canvas.height);
        lastImg.src=url;
        lastImg.onload=function(){
            console.log(lastImg.src);
            context.clearRect(0,0,canvas.width,canvas.height);
            context.drawImage(lastImg,0,0);
        }
    }

    return (
        <CanvasContext.Provider
        value={{
            canvasRef,
            contextRef,
            prepareCanvas,
            clearCanvas,
            setDrawMode,
            setEraseMode,
            setColor,
            setWidth,
            undo,
        }}
        >
        {children}
        </CanvasContext.Provider>
    );
};

export const useCanvas = () => useContext(CanvasContext);