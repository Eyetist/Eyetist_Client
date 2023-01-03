import React, { useEffect, useState } from "react";
import "./Main.css"
import FaceMeshCam from "../components/faceMesh/FaseMeshCam";
import { Canvas } from '../components/canvas/Canvas'
import { useRecoilState, useRecoilValue } from "recoil";
import { MOUSE_POS } from '../recoil/Atoms';

import { useRef } from "react";
import { ClearCanvasButton } from '../components/canvas/ClearCanvasButton';

const Main = () => {
    let mousePos = useRecoilValue(MOUSE_POS)
    // console.log(mousePos)
    return (
        <div className="whole-container">
            <img
                src='https://www.pngarts.com/files/10/Circle-PNG-Image-Background.png'
                alt="My Image"
                style={{ position: 'absolute', left: mousePos.x, top: mousePos.y , width : "100px", height : "100px"}}
            />
            <div className="top-bar"> {/*상단 바 div*/}
                <div className="eyetist-font">
                    EyeTist
                </div>
            </div>

            <div className="components-container">
                
                <div className="functions-container">
                    <ClearCanvasButton />
                </div>

                <div className="canvas-container">
                    <Canvas 
                    />
                </div>

                <div className="detail-container">
                    <FaceMeshCam/>
                </div>
            </div>
            {/* <Canvas />
            <ClearCanvasButton />
            <FaceMeshCam /> */}
        </div>
    )
}
export default Main