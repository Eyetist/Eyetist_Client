import React, { useContext, useRef,useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { STROKE_COLOR,LINE_WIDTH } from '../../recoil/Atoms';

const CanvasContext = React.createContext();

export const CanvasProvider = ({ children }) => {
    let strokeColor = useRecoilValue(STROKE_COLOR)
    let [lineWidth, setLineWidth]=useRecoilState(LINE_WIDTH);
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    
    const prepareCanvas = () => {
        const canvas = canvasRef.current
        canvas.width = window.innerWidth * 0.7;
        canvas.height = window.innerHeight - 70;
        canvas.style.width = `${canvas.width}px`;
        canvas.style.height = `${canvas.height}px`;

        const context = canvas.getContext("2d")
        context.fillStyle="white"
        context.fillRect(0,0,canvas.width,canvas.height);
        context.lineCap = "round";
        context.strokeStyle = "#000000";
        context.lineWidth = 10;
        context.scale(1, 1)
        contextRef.current = context;
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d")
        context.fillStyle="white"
        context.fillRect(0,0,canvas.width,canvas.height);
    }

    const setDrawMode=()=>{
        const canvas=canvasRef.current;
        const context=canvas.getContext("2d");
        context.strokeStyle=strokeColor;
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
        setLineWidth(width);
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
        if(ratio>5) return;
        const canvas=canvasRef.current;
        const context=canvas.getContext("2d");
        const lastImg=new Image();
        lastImg.src=url
        lastImg.onload=function(){
            canvas.width = window.innerWidth * 0.7*ratio*1.3;
            canvas.height = (window.innerHeight - 70)*ratio*1.3;
            canvas.style.width = `${canvas.width}px`;
            canvas.style.height = `${canvas.height}px`;
            context.lineCap = "round";
            context.fillStyle="white"
            context.lineWidth=lineWidth;
            context.fillRect(0,0,canvas.width,canvas.height);
            context.drawImage(lastImg,0,0,lastImg.width,lastImg.height,0,0,canvas.width,canvas.height);
            setRatio(ratio*1.3)
        }
    }

    const zoomOut=(url,ratio,setRatio)=>{
        if(ratio<=0.2) return;
        const canvas=canvasRef.current;
        const context=canvas.getContext("2d");
        const lastImg=new Image();
        lastImg.src=url;
        lastImg.onload=function(){
            canvas.width = window.innerWidth * 0.7*ratio/1.3;
            canvas.height = (window.innerHeight - 70)*ratio/1.3;
            canvas.style.width = `${canvas.width}px`;
            canvas.style.height = `${canvas.height}px`;
            context.lineCap = "round";
            context.fillStyle="white"
            context.lineWidth=lineWidth;
            context.fillRect(0,0,canvas.width,canvas.height);
            context.drawImage(lastImg,0,0,lastImg.width,lastImg.height,0,0,canvas.width,canvas.height);
            setRatio(ratio/1.3)
        }
    }

    function hexToRgbA(hex){
        var c;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length== 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
            return [(c>>16)&255, (c>>8)&255, c&255]
        }
        throw new Error('Bad Hex');
    }

    const getPixelPos = (x, y)=> {
        return (y * canvasRef.current.width + x) * 4;
    };

    const matchStartColor = (pixel, pos, startColor)=> {
        return (pixel.data[pos]   === startColor[0] &&
                pixel.data[pos+1] === startColor[1] &&
                pixel.data[pos+2] === startColor[2]);
    };

    const colorPixel = function (pixel, pos, color) {
        pixel.data[pos] = color[0];
        pixel.data[pos+1] = color[1];
        pixel.data[pos+2] = color[2];
    };

    const fillColor=(posX,posY)=>{
        const canvas=canvasRef.current;
        const context=canvas.getContext("2d");
        let pixel=context.getImageData(0,0,canvas.width,canvas.height);
        let startPos=getPixelPos(Math.round(posX),Math.round(posY));
        let startColor=[
            pixel.data[startPos],
            pixel.data[startPos+1],
            pixel.data[startPos+2]
        ]
        let todo = [[Math.round(posX),Math.round(posY)]];
        let colorToFill=hexToRgbA(strokeColor);

        if(startColor[0]===colorToFill[0]&&startColor[1]===colorToFill[1]&&startColor[2]===colorToFill[2]) return;

        while (todo.length>0) {
            let pos = todo.pop();
            let x = pos[0];
            let y = pos[1];    
            let currentPos = getPixelPos(x, y);
            
            while((y-- >= 0) && matchStartColor(pixel, currentPos, startColor)) {
                currentPos -= canvas.width * 4;
            }
            
            currentPos += canvas.width * 4;
            ++y;
            let reachLeft = false;
            let reachRight = false;
            
            while((y++ < canvas.height-1) && matchStartColor(pixel, currentPos, startColor)) {
            
            colorPixel(pixel, currentPos, colorToFill);
            
            if (x > 0) {
                if (matchStartColor(pixel, currentPos-4, startColor)) {
                    if (!reachLeft) {
                        todo.push([x-1, y]);
                        reachLeft = true;
                    }
                }
                else if (reachLeft) {
                    reachLeft = false;
                }
            }
            
            if (x < canvas.width-1) {
                if (matchStartColor(pixel, currentPos+4, startColor)) {
                    if (!reachRight) {
                        todo.push([x+1, y]);
                        reachRight = true;
                    }
                }
                else if (reachRight) {
                    reachRight = false;
                }
            }

            currentPos += canvas.width * 4;
            }
        }
        
        context.putImageData(pixel,0,0);
    }

    const getImageUrl = (url,extension) => {
        return url.replace("png",extension)
    }

    return (
        <CanvasContext.Provider
            value={{
                canvasRef,
                contextRef,
                getImageUrl,
                prepareCanvas,
                clearCanvas,
                setDrawMode,
                setEraseMode,
                setColor,
                setWidth,
                ReDoAndUnDo,
                zoomIn,
                zoomOut,
                fillColor,
            }}
        >
        {children}
        </CanvasContext.Provider>
    );
};

export const useCanvas = () => useContext(CanvasContext);