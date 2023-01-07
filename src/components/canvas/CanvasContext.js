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
        clearCanvas()
    };

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        // contextRef.current.moveTo(offsetX, offsetY);
        contextRef.current.moveTo(mousePos.x, mousePos.y);
        setIsDrawing(true);
    };

    const finishDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    };

    const draw = ({ nativeEvent }) => {
        if (!isLeftEyeBlink) {
        return;
        }
        // const { offsetX, offsetY } = nativeEvent;
        // contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.lineTo(mousePos.x, mousePos.y);
        contextRef.current.stroke();
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d")
        context.fillStyle = "white"
        context.fillRect(0, 0, canvas.width, canvas.height)
    }

    return (
        <CanvasContext.Provider
        value={{
            canvasRef,
            contextRef,
            prepareCanvas,
            startDrawing,
            finishDrawing,
            clearCanvas,
            draw,
        }}
        >
        {children}
        </CanvasContext.Provider>
    );
};

export const useCanvas = () => useContext(CanvasContext);