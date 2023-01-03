import React from "react";
import FaceMeshCam from "../components/faceMesh/FaseMeshCam";
import { Canvas } from '../components/canvas/Canvas'
import { ClearCanvasButton } from '../components/canvas/ClearCanvasButton';

const Main = () => {
    return (
        <div>
            <Canvas />
            <ClearCanvasButton />
            <FaceMeshCam />
        </div>
    )
}
export default Main