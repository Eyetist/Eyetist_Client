import React from "react";
import FaceMeshCam from "../components/faceMesh/FaseMeshCam";
import { Canvas } from '../components/canvas/Canvas'
import { ClearCanvasButton } from '../components/canvas/ClearCanvasButton';
import './Main.css'

const Main = () => {
    return (
        <div className="mainContainer">
            <div className="container-top">
                EyeTist
            </div>

            <div className="first-col">
                <ClearCanvasButton />
            </div>

            <div className="second-col">
                <Canvas />
            </div>
            <div className="third-col">
                <FaceMeshCam />
            </div>
        </div>
    )
}
export default Main