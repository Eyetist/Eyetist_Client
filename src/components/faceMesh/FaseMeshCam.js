import { FaceMesh } from "@mediapipe/face_mesh";
import React, { useRef, useEffect, useState } from "react";
import * as Facemesh from "@mediapipe/face_mesh";
import * as cam from "@mediapipe/camera_utils";
import { drawConnectors } from '@mediapipe/drawing_utils';
import Webcam from "react-webcam";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { MOUSE_POS, MOUSE_SENSITIVITY, IS_LEFT_EYE_BLINK, IS_RIGHT_EYE_BLINK, IS_MOUSE_OPEN} from '../../recoil/Atoms';

const faceMesh = new FaceMesh({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
    },
});

function FaceMeshCam(props) {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const headSpot = [33, 263, 1, 61, 291, 199]
    let setMousePos = useSetRecoilState(MOUSE_POS)
    let setIsLeftEyeBlink = useSetRecoilState(IS_LEFT_EYE_BLINK)
    let setIsRightEyeBlick = useSetRecoilState(IS_RIGHT_EYE_BLINK)
    let setIsMouseOpen = useSetRecoilState(IS_MOUSE_OPEN)
    let mouseSensitivity = useRecoilValue(MOUSE_SENSITIVITY)

    let mousePosXRef = useRef(0)
    let mousePosYRef = useRef(0)

    let camera = null;

    useEffect( ()=> {
        faceMesh.setOptions({
            maxNumFaces: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
            refineLandmarks: true,
            selfieMode: true,
        });

        faceMesh.onResults(onResults);
    }, [mouseSensitivity])

    function onResults(results, currenPos) {
        const videoWidth =  window.innerWidth;
        const videoHeight = window.innerHeight;

        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        const face_3d = []
        const face_2d = []
        const nose_2d = []
        const nose_3d = []

        let p1_x = ""
        let p1_y = ""
        let p2_x = ""
        let p2_y = ""

        const canvasElement = canvasRef.current;
        const canvasCtx = canvasElement.getContext("2d");

        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.drawImage(
            results.image,
            0,
            0,
            canvasElement.width,
            canvasElement.height
        );
    
        if (results.multiFaceLandmarks[0]) {
            for (let index of headSpot){
                if (index === 1){
                    nose_2d.push([results.multiFaceLandmarks[0][index].x * videoWidth, results.multiFaceLandmarks[0][index].y * videoHeight])
                    nose_3d.push([results.multiFaceLandmarks[0][index].x * videoWidth, results.multiFaceLandmarks[0][index].y * videoHeight, results.multiFaceLandmarks[0][index].z * 3000])
                }

                let x = results.multiFaceLandmarks[0][index].x * videoWidth
                let y = results.multiFaceLandmarks[0][index].y * videoHeight

                face_2d.push([x, y])
                face_3d.push([x, y, results.multiFaceLandmarks[0][index].z])
            }
    
            if (face_2d.length === 6 && face_3d.length === 6 && nose_2d.length === 1 && nose_2d.length === 1){
                p2_x = nose_2d[0][0]
                p2_y = nose_2d[0][1]

                const left_eye = [results.multiFaceLandmarks[0][145].y, results.multiFaceLandmarks[0][159].y]
                const right_eye = [results.multiFaceLandmarks[0][374].y, results.multiFaceLandmarks[0][386].y]
                const mouse = [results.multiFaceLandmarks[0][14].y, results.multiFaceLandmarks[0][13].y]

                if (left_eye[0] - left_eye[1] < 0.005){ // 왼쪽 눈 클릭
                    setIsLeftEyeBlink(true)
                }
                else{
                    setIsLeftEyeBlink(false)
                }

                if (right_eye[0] - right_eye[1] < 0.005){ // 오른쪽 눈 클릭
                    setIsRightEyeBlick(true)
                }
                else{
                    setIsRightEyeBlick(false)
                }

                if (mouse[0] - mouse[1] < 0.03){ 
                    setIsMouseOpen(false)
                }
                else{
                    setIsMouseOpen(true)
                }

                p2_x = Math.round(p2_x - (((window.innerWidth / 2) - p2_x) * mouseSensitivity / 10))
                p2_y = Math.round(p2_y - (((window.innerHeight / 2) - p2_y) * mouseSensitivity / 10))

                if (Math.abs(mousePosXRef.current - p2_x) > 1){
                    mousePosXRef.current = p2_x
                }

                if (Math.abs(mousePosYRef.current - p2_y) > 1){
                    mousePosYRef.current = p2_y
                }

                setMousePos({
                    x: mousePosXRef.current,
                    y: mousePosYRef.current
                })
            }
            for (const landmarks of results.multiFaceLandmarks) {
    
                drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_TESSELATION, {
                    color: "#C0C0C070",
                    lineWidth: 30,
                });
                drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_EYE, {
                    color: "#FF3030",
                });
                drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_EYEBROW, {
                    color: "#FF3030",
                });
                drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_EYE, {
                    color: "#30FF30",
                });
                drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_EYEBROW, {
                    color: "#30FF30",
                });

                drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_IRIS, {
                    color: "#E0E0E0",
                    lineWidth: 5,
                });
                drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_IRIS, {
                    color: "#E0E0E0",
                    lineWidth: 5,
                });
                drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_LIPS, {
                    color: "#E0E0E0",
                });
            
            }
        }
        canvasCtx.restore();
    }

    useEffect(() => {
        faceMesh.setOptions({
            maxNumFaces: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
            refineLandmarks: true,
            selfieMode: true,
        });

        faceMesh.onResults(onResults);

        if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null) {
            camera = new cam.Camera(webcamRef.current.video, {
                onFrame: async () => {
                await faceMesh.send({ image: webcamRef.current.video });
                },
                width: window.innerWidth,
                height: window.innerHeight,
            });
            camera.start();
        }

    }, []);


    return (
        <div style={{position:"relative"}}>
            <Webcam
            ref={webcamRef}
            style={{
                position: "absolute",
                left: 0,
                right: 0,
                textAlign: "right",
                zindex: 9,
                width: "100%",
                height: window.innerHeight * 0.2,
            }}
            />{" "}
            <canvas
                ref={canvasRef}
                className="output_canvas"
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    textAlign: "right",
                    zindex: 9,
                    width: "100%",
                    height: window.innerHeight * 0.2,
                }}
            >
            </canvas>
        </div>
    );
}

export default FaceMeshCam;