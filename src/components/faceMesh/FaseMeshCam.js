import { FaceMesh } from "@mediapipe/face_mesh";
import React, { useRef, useEffect } from "react";
import * as Facemesh from "@mediapipe/face_mesh";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";

function FaceMeshCam() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const connect = window.drawConnectors;
    
    let camera = null;

    function onResults(results) {
        // const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        // Set canvas width
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        const canvasElement = canvasRef.current;
        const canvasCtx = canvasElement.getContext("2d");

        let face3dArray = [{x:1221122, y:12123}];
        let face2dArray = [];
        let nose2dArray = [];
        let nose3dArray = [];

        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.drawImage(
            results.image,
            0,
            0,
            canvasElement.width,
            canvasElement.height
        );
    
        if (results.multiFaceLandmarks) {
            for (const landmarks of results.multiFaceLandmarks) {
                connect(canvasCtx, landmarks, Facemesh.FACEMESH_TESSELATION, {
                    color: "#C0C0C070",
                    lineWidth: 1,
                });
                connect(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_EYE, {
                    color: "#FF3030",
                });
                connect(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_EYEBROW, {
                    color: "#FF3030",
                });
                connect(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_EYE, {
                    color: "#30FF30",
                });
                connect(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_EYEBROW, {
                    color: "#30FF30",
                });

                connect(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_IRIS, {
                    color: "#E0E0E0",
                    lineWidth: 2,
                });
                connect(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_IRIS, {
                    color: "#E0E0E0",
                    lineWidth: 2,
                });
                // connect(canvasCtx, landmarks, Facemesh.FACEMESH_FACE_OVAL, {
                //     color: "#E0E0E0",
                // });
                connect(canvasCtx, landmarks, Facemesh.FACEMESH_LIPS, {
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
        });

        faceMesh.onResults(onResults);

        if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null) {
            camera = new cam.Camera(webcamRef.current.video, {
                onFrame: async () => {
                await faceMesh.send({ image: webcamRef.current.video });
                },
                width: 640,
                height: 480,
            });
            camera.start();
        }
    }, []);

    return (
        <center>
        <div className="App">
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
                width: 640,
                height: 480,
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
                    width: 640,
                    height: 480,
                }}
            >
            </canvas>
        </div>
        </center>
    );
}

export default FaceMeshCam;