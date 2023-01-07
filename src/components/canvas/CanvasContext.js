import React, { useContext, useRef } from "react";

const CanvasContext = React.createContext();

export const CanvasProvider = ({ children }) => {
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
        context.fillStyle = "white"
        context.fillRect(0, 0, canvas.width, canvas.height)
    }

    const saveCanvas = () => {
        const canvas = canvasRef.current;
        const image = canvas.toDataURL(); // default -> png
        const link = document.createElement("a");
        link.href = image;
        link.download = "EyeTist[🎨]";
        link.click();
    }

    const getImageUrl = () => {
        const canvas = canvasRef.current;
        const image = canvas.toDataURL(); // default -> png
        return image
    }

    return (
        <CanvasContext.Provider
            value={{
                canvasRef,
                contextRef,
                prepareCanvas,
                clearCanvas,
                saveCanvas,
                getImageUrl,
            }}
        >
        {children}
        </CanvasContext.Provider>
    );
};

export const useCanvas = () => useContext(CanvasContext);