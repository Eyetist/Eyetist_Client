import React, { useEffect, useState, useRef } from "react";
import EyeMouse from "../components/mouse/EyeMouse";
import FaceMeshCam from "../components/faceMesh/FaseMeshCam";
import EyeCard from "../components/atoms/EyeCard";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { SETTING_MODE, LEFT_EYE_BLINK_VALUE, RIGHT_EYE_BLINK_VALUE, MOUTH_OPEN_VALUE, IS_SMART_TOOLS_OPEN } from "../recoil/Atoms";
import { useStopwatch } from 'react-timer-hook';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { AiFillCheckCircle } from "react-icons/ai"
import ModeSelection from "../components/functionDetails/ModeSelection";
import MoveSelections from "../components/functionDetails/MoveSelection";
import SensitivitySmartTools from "../components/functionDetails/SensitivitySmartTools";
import './SettingEyeValue.css'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const SettingEyeValue = () =>{
    let navigate = useNavigate();
    let [settingMode, setSettingMode] = useRecoilState(SETTING_MODE)
    let [leftEyeBlinkValue, setLeftEyeBlinkValue] = useRecoilState(LEFT_EYE_BLINK_VALUE)
    let [rightEyeBlinkValue, setRightEyeBlinkValue] = useRecoilState(RIGHT_EYE_BLINK_VALUE)
    let [mouthOpenValue, setMouthOpenValue] = useRecoilState(MOUTH_OPEN_VALUE)

    let [isCorrectValue, setIsCorrectValue] = useState("nomal")
    let [receiveMouthValue, setReceiveMouthValue] = useState([])
    let [receiveEyeValue, setReceiveEyeValue] = useState([])
    let [clickStartButton, setClickStartButton] = useState(false)

    const [openGazeTimer, setOpenGazeTimer] = useState(false)
    const checkIconSize = window.innerHeight / 10

    let step = useRef(1)
    let isStart = useRef(false)

    let smartToolsOpen = useRecoilValue(IS_SMART_TOOLS_OPEN)
    let SmartToolsPosition = useRef({x:0, y:0})

    const {
        seconds,
        pause,
        reset,
    } = useStopwatch({ autoStart: false });

    let backContent = [
        "Back out of custom settings"
    ]
    
    let startContent = [
        "Start custom sets step by step on the right",
    ]

    let firstStep = [
        "Keep your mouth open and stare at the screen for 5 seconds.",
    ]
    let secondStep = [
        "With only your left eye closed, please stare at the screen for 5 seconds.",
    ]
    let thirdStep = [
        "With only your right eye closed, please stare at the screen for 5 seconds.",
    ]

    function getEyeValueAverage(eyeIndex){
        let sum = 0;
        if (eyeIndex === 0){
            for (let index = 0; index < receiveEyeValue.length; index++){
                sum = sum + receiveEyeValue[index].left
            }
        }
        else{
            for (let index = 0; index < receiveEyeValue.length; index++){
                sum = sum + receiveEyeValue[index].right
            }
        }

        return sum / receiveEyeValue.length
    }   

    function getMouthValueAverage(){
        let sum = 0;
        for (let index = 0; index < receiveMouthValue.length; index++){
            sum = sum + receiveMouthValue[index]
        } 

        return receiveMouthValue.length > 0 ? sum / receiveMouthValue.length : 0.02
    }

    useEffect( () => {
        if (seconds > 4){
            let leftValue = 0;
            let rightValue = 0;
            let mouthValue = 0;
            isStart.current = false
            pause()
            
            leftValue = getEyeValueAverage(0)
            rightValue = getEyeValueAverage(1)

            switch(step.current){
                case 2:
                    mouthValue = getMouthValueAverage()
                    setMouthOpenValue(mouthValue * 0.8)
                    break
                case 4: // 왼쪽눈 감은상태
                    setLeftEyeBlinkValue({
                        left : leftValue,
                        right : rightValue * 0.5
                    })
                    break
                case 6: // 오른쪽눈 감은상태
                    setRightEyeBlinkValue({
                        left : leftValue * 0.5,
                        right : rightValue
                    })
                    break
                default:
                    break
            }
            step.current = step.current + 1
        }
    }, [seconds])
    
    useEffect( () => {
        if (step.current < 7 && clickStartButton){
            reset()
            switch(step.current){
                case 2:
                    setReceiveMouthValue([])
                    break
                case 4:
                case 6:
                    setReceiveEyeValue([])
                    break
            }
            isStart.current = true
            setOpenGazeTimer(true)

        }
        else if (step.current === 7){
            setTimeout(function(){
                setOpenGazeTimer(false)
                navigate('/setting')
            }, 2000)
        }
    },[ step.current, clickStartButton ])

    return(
        <div className = "information-main-container">
            <ModeSelection />
            <MoveSelections 
                currentPage = "customSetting"
            />
            <EyeMouse 
                SmartToolsPosition = {SmartToolsPosition}
            />
            {
                smartToolsOpen ?
                <SensitivitySmartTools 
                    currentPage = "customSetting"
                    SmartToolsPosition = {SmartToolsPosition}
                />
                :
                <></>
            }
            <BootstrapDialog
                className="MuiPaper-root"
                aria-labelledby="customized-dialog-title"
                open={openGazeTimer}
                onClose={() =>{setOpenGazeTimer(false)}}
            >
                {
                    step.current % 2 === 1  && step.current < 7?
                        `The step ${Math.round(step.current / 2) } will begin soon. Get ready please. ${5-seconds}` 
                    :
                        step.current === 2 ?
                            `Keep your mouth open and stare at the screen for ${5-seconds} seconds.` 
                        :
                            step.current === 4 ?
                                `With only your left eye closed, please stare at the screen for ${5-seconds} seconds.`
                            :
                                step.current === 6 ?
                                    `With only your right eye closed, please stare at the screen for ${5-seconds} seconds.`
                                :
                                    "Custom settings are complete. "
                }
            
            </BootstrapDialog>
            <ul className="lines">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            <div className="information-top-container">
                <div className = "information-title">
                    EyeTist
                </div>
                <div className="information-cam" 
                    style={{
                        marginTop:"3%", 
                        marginRight:"1%", 
                        border: isCorrectValue === "nomal" ? "" : isCorrectValue === "true" ? "5px solid green" : "5px solid red"
                    }}
                >
                    <FaceMeshCam 
                        settingMode = {true}
                        setIsCorrectValue = {setIsCorrectValue}
                        step = {step}
                        setReceiveEyeValue = {setReceiveEyeValue}
                        setReceiveMouthValue = {setReceiveMouthValue}
                        isStart = {isStart}
                    />
                </div>
            </div>

            <div className = "start-page-body-container">
                <div className = "box-container">
                    <div style={{width: "40%", height:"100%"}}>
                        <EyeCard 
                            style={{
                                width: "90%",
                                height: "30%",
                                backgroundColor: settingMode === "default" ? "#f46969" : "#f79393",
                                borderRadius: "20px",
                                marginBottom: "3%",
                            }}
                            title="< BACK >"
                            content={backContent}
                            hoverColor="#f46969"
                            clickColor="#f45555"
                            onClick={() => {
                                if (!clickStartButton || step.current > 3){
                                    navigate('/setting')
                                }
                            }}
                        />
                        <EyeCard 
                            style={{
                                width: "90%",
                                height: "60%",
                                backgroundColor: settingMode === "default" ? "#f46969" : "#f79393",
                                borderRadius: "20px",
                            }}
                            title="< START >"
                            content={startContent}
                            hoverColor="#f46969"
                            clickColor="#f45555"
                            onClick={() => {
                                if (!clickStartButton){
                                    step.current = 1
                                    setClickStartButton(true)
                                }
                            }}
                        />
                    </div>
                    <div style={{width: "80%", height:"100%"}}>
                        <div
                            className="step-card-content"
                            style={{
                                width: "100%",
                                height: "30%",
                                backgroundColor: step.current > 2 ? "green" : step.current === 2 ? "#f79393" : "grey",
                                borderRadius: "20px",
                                marginBottom: "1%",
                            }}
                        >
                            {"< First Step >"} <br/>{firstStep} {step.current > 2 ? <AiFillCheckCircle style={{fontSize:checkIconSize, marginLeft:checkIconSize}}/>: <></>}
                        </div>
                        <div
                            className="step-card-content"
                            style={{
                                width: "100%",
                                height: "30%",
                                backgroundColor: step.current > 4 ? "green" : step.current === 4 ? "#f79393" : "grey",
                                borderRadius: "20px",
                                marginBottom: "1%",
                            }}
                        >
                            {"< Second Step >"} <br/>{secondStep} {step.current > 4 ? <AiFillCheckCircle style={{fontSize:checkIconSize, marginLeft:checkIconSize}}/>: <></>}
                        </div>
                        <div 
                            className="step-card-content"
                            style={{
                                width: "100%",
                                height: "30%",
                                backgroundColor: step.current > 6 ? "green" : step.current === 6 ? "#f79393" : "grey",
                                borderRadius: "20px",
                                marginBottom: "1%",
                            }}
                        >
                            {"< Third Step >"} <br/>{thirdStep} {step.current > 6 ? <AiFillCheckCircle style={{fontSize:checkIconSize, marginLeft:checkIconSize}}/>: <></>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SettingEyeValue