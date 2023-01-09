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

    const ReDoAndUnDo=(url)=>{
        const canvas=canvasRef.current;
        const context=canvas.getContext("2d");
        const lastImg=new Image();
        lastImg.src=url;
        lastImg.onload=function(){
            context.clearRect(0,0,canvas.width,canvas.height);
            context.drawImage(lastImg,0,0);
        }
    }

    const zoomIn=(url,ratio,setRatio)=>{
        const canvas=canvasRef.current;
        const context=canvas.getContext("2d");
        const lastImg=new Image();
        lastImg.src=url
        lastImg.onload=function(){
            context.clearRect(0,0,canvas.width,canvas.height);
            context.drawImage(lastImg,0,0,lastImg.width,lastImg.height,0,0,canvas.width*ratio*2,canvas.height*ratio*2);
            setRatio(ratio*2)
        }
    }

    const zoomOut=(url,ratio,setRatio)=>{
        const canvas=canvasRef.current;
        const context=canvas.getContext("2d");
        const lastImg=new Image();
        lastImg.src=url;
        lastImg.onload=function(){
            context.clearRect(0,0,canvas.width,canvas.height);
            context.drawImage(lastImg,0,0,lastImg.width,lastImg.height,0,0,canvas.width*ratio/2,canvas.height*ratio/2);
            setRatio(ratio/2)
        }
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
                setDrawMode,
                setEraseMode,
                setColor,
                setWidth,
                ReDoAndUnDo,
                zoomIn,
                zoomOut,
            }}
        >
        {children}
        </CanvasContext.Provider>
    );
};

export const useCanvas = () => useContext(CanvasContext);