import React from "react";
import "./Main.css"
import FaceMeshCam from "../components/faceMesh/FaseMeshCam";
import { Canvas } from '../components/canvas/Canvas'
import { ClearCanvasButton } from '../components/canvas/ClearCanvasButton';

const Main = () => {
    return (
        <div className="whole-container">
            <div className="top-bar"> {/*상단 바 div*/}
                <div className="eyetist-font">
                    EyeTist
                </div>
            </div>

            <div className="components-container">
                
                <div className="functions-container">

                </div>

                <div className="canvas-container">
                    <Canvas />
                </div>

                <div className="detail-container">
                    <FaceMeshCam />
                </div>
            </div>
            {/* <Canvas />
            <ClearCanvasButton />
            <FaceMeshCam /> */}
        </div>
    )
}
export default Main