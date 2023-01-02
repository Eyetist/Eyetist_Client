import './App.css';
import React from "react";
import FaceMeshCam from "./components/faceMesh/FaseMeshCam";
import { Canvas } from './components/canvas/Canvas'
import { ClearCanvasButton } from './components/canvas/ClearCanvasButton';

const App = () => {
  return (
    <div>
      <Canvas />
      <ClearCanvasButton />
      <FaceMeshCam />
    </div>
  )
}

export default App

