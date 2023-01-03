import React, { useEffect } from "react";
import { useCanvas } from "./CanvasContext.js";

export function Canvas() {
    const {
        canvasRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        draw,
    } = useCanvas();

    useEffect(() => {
        prepareCanvas();
    }, []);

    return (
        <div style={{width:'100px', height:'100px'}}>
            <canvas
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                ref={canvasRef}
            />
        </div>
    );
}