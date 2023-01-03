import { FaceMesh } from "@mediapipe/face_mesh";
import React, { useRef, useEffect } from "react";
import * as Facemesh from "@mediapipe/face_mesh";
import * as cam from "@mediapipe/camera_utils";
import { drawConnectors } from '@mediapipe/drawing_utils';
import Webcam from "react-webcam";
import { getHeadPoseEst } from "../../api/vision/VisionAPI";

const CAM_WIDTH = 360;
const CAM_HEIGHT = 270;

function FaceMeshCam() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const headSpot = [33, 263, 1, 61, 291, 199]

    let camera = null;

    function onResults(results) {
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        // Set canvas width
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
                getHeadPoseEst(videoWidth, videoHeight, face_2d, face_3d, nose_2d, nose_3d)
                .then(
                    (res) => {
                        p1_x = res.data[0][0]
                        p1_y = res.data[0][1]
                        p2_x = res.data[1][0]
                        p2_y = res.data[1][1]

                        const left_eye = [results.multiFaceLandmarks[0][145].y * videoHeight, results.multiFaceLandmarks[0][159].y * videoHeight]
                        const right_eye = [results.multiFaceLandmarks[0][374].y * videoHeight, results.multiFaceLandmarks[0][386].y * videoHeight]

                        canvasCtx.beginPath();
                        canvasCtx.moveTo(p1_x, p1_y);
                        canvasCtx.lineTo(p2_x, p2_y);
                        canvasCtx.strokeStyle = 'blue';
                        canvasCtx.lineWidth = 6;
                    
                        if (left_eye[0] - left_eye[1] < 5){ // 왼쪽 눈 클릭
                            canvasCtx.strokeStyle = "#FF3030";
                        }
                        if (right_eye[0] - right_eye[1] < 5){ // 오른쪽 눈 클릭
                            canvasCtx.strokeStyle = "#30FF30";
                        }
                        console.log(p2_x, p2_y)
        
                        canvasCtx.stroke();
                    }
                )
            }
            for (const landmarks of results.multiFaceLandmarks) {
    
                drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_TESSELATION, {
                    color: "#C0C0C070",
                    lineWidth: 1,
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
                    lineWidth: 2,
                });
                drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_IRIS, {
                    color: "#E0E0E0",
                    lineWidth: 2,
                });
                // connect(canvasCtx, landmarks, Facemesh.FACEMESH_FACE_OVAL, {
                //     color: "#E0E0E0",
                // });
                drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_LIPS, {
                    color: "#E0E0E0",
                });
            
            }
        }
        canvasCtx.restore();
    }

    useEffect(() => {
        const faceMesh = new FaceMesh({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
            },
        });

        faceMesh.setOptions({
            maxNumFaces: 2,
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
                width: CAM_WIDTH,
                height: CAM_HEIGHT,
            });
            camera.start();
        }
    }, []);

    return (
        <div>
            <Webcam
            ref={webcamRef}
            style={{
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 0,
                textAlign: "right",
                zindex: 9,
                width: CAM_WIDTH,
                height: CAM_HEIGHT,
            }}
            />{" "}
            <canvas
                ref={canvasRef}
                className="output_canvas"
                style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "right",
                    zindex: 9,
                    width: CAM_WIDTH,
                    height: CAM_HEIGHT,
                }}
            >
            </canvas>
        </div>
    );
}

export default FaceMeshCam;