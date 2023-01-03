import React, { useEffect, useRef } from "react";
import { useCanvas } from "./CanvasContext.js";
import { useRecoilValue } from "recoil";
import { IS_LEFT_EYE_BLINK, MOUSE_POS } from '../../recoil/Atoms';

export function Canvas(props) {
    let mousePos = useRecoilValue(MOUSE_POS)
    let isStartDrawing = useRef(false);
    let isLeftEyeBlink = useRecoilValue(IS_LEFT_EYE_BLINK)
    
    const {
        contextRef,
        canvasRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        draw,
    } = useCanvas();

    useEffect(() => {
        prepareCanvas();
    }, []);

    if(isLeftEyeBlink){
        isStartDrawing.current = true;
        contextRef.current.lineTo(mousePos.x, mousePos.y);
        contextRef.current.stroke();
    }
    else{
        if(isStartDrawing.current){
            contextRef.current.beginPath();
        }
    }

    return (
        <div>
            <canvas
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                draw={draw}
                ref={canvasRef}
            />
        </div>
    );
}