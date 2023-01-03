import React, { useEffect } from "react";
import { useCanvas } from "./CanvasContext.js";
import { CanvasProvider } from "./CanvasContext";

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
        // <div style={{width:'100px', height:'100px'}}>
        <CanvasProvider>
            <canvas
                onMouseDown={startDrawing}
                width={"100px"}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                ref={canvasRef}
            />
        </CanvasProvider>
        // </div>
    );
}