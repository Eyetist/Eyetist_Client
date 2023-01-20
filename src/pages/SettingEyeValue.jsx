import React, { useEffect, useState, useRef } from "react";
import EyeMouse from "../components/mouse/EyeMouse";
import FaceMeshCam from "../components/faceMesh/FaseMeshCam";
import EyeCard from "../components/atoms/EyeCard";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { SETTING_MODE, LEFT_EYE_BLINK_VALUE, RIGHT_EYE_BLINK_VALUE } from "../recoil/Atoms";
import { useStopwatch } from 'react-timer-hook';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { AiFillCheckCircle } from "react-icons/ai"
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
    let [isCorrectValue, setIsCorrectValue] = useState("nomal")
    let [receiveEyeValue, setReceiveEyeValue] = useState([])
    let [clickStartButton, setClickStartButton] = useState(false)
    const [openGazeTimer, setOpenGazeTimer] = useState(false)
    const checkIconSize = window.innerHeight / 10

    let step = useRef(1)
    let isStart = useRef(false)

    let [nomalEyeValue, setNomalEyeValue] = useState({
        left: 0,
        right: 0,
    })

    const {
        seconds,
        pause,
        reset,
    } = useStopwatch({ autoStart: false });

    let backContent = [
        "커스텀 셋팅을 마치고 뒤로 돌아가기."
    ]
    
    let startContent = [
        "커스텀 셋팅을 단계별로 진행해주세요",
    ]

    let firstStep = [
        "양쪽눈을 뜬 상태로 화면을 5초간 응시해주세요",
    ]
    let secondStep = [
        "왼쪽눈만 감은 상태로 화면을 5초간 응시해주세요",
    ]
    let thirdStep = [
        "오른쪽눈만 감은 상태로 화면을 5초간 응시해주세요",
    ]

    function getEyeValue(){
        if(!isStart.current, !openGazeTimer){
            reset()
            setReceiveEyeValue([])
            setOpenGazeTimer(true)
            setTimeout(function(){
                setOpenGazeTimer(false);
            }, 4999)
            isStart.current = true
        }
        else{
            setOpenGazeTimer(true)
            setTimeout(function(){
                setOpenGazeTimer(false);
            }, 2000)
        }
    }

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

    // useEffect( () => {
    //     console.log(receiveEyeValue)
    // }, [receiveEyeValue])

    useEffect( () => {
        console.log(seconds)
        if (seconds > 4){
            let leftValue = 0;
            let rightValue = 0;
            isStart.current = false
            pause()
            console.log(step.current)

            leftValue = getEyeValueAverage(0)
            rightValue = getEyeValueAverage(1)

            if (leftValue < 0.005){
                leftValue = 0.005
            }
            else{
                leftValue = leftValue * 1.5
            }

            if (rightValue < 0.005){
                rightValue = 0.005
            }
            else{
                rightValue = rightValue * 1.5
            }
            switch(step.current){
                case 1:
                    setNomalEyeValue({
                        left : leftValue,
                        right : rightValue
                    })
                    break
                case 2: // 왼쪽눈 감은상태
                    setLeftEyeBlinkValue({
                        left : leftValue,
                        right : rightValue
                    })
                    break
                case 3: // 오른쪽눈 감은상태
                    setRightEyeBlinkValue({
                        left : leftValue,
                        right : rightValue
                    })
                    break
            }
            step.current = step.current + 1
        }
    }, [seconds])
    
    useEffect( () => {
        if (step.current <= 4 && clickStartButton){
            getEyeValue()
        }
        // console.log("--------------------nomal------------------")
        // console.log(nomalEyeValue)
        // console.log("--------------------left------------------")
        // console.log(leftEyeBlinkValue)
        // console.log("--------------------right------------------")
        // console.log(rightEyeBlinkValue)
    },[ leftEyeBlinkValue, rightEyeBlinkValue, nomalEyeValue, clickStartButton ])

    return(
        <div className = "information-main-container">
            <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                open={openGazeTimer}
                onClose={() =>{setOpenGazeTimer(false)}}
            >
                {
                    step.current === 1 ?
                    "양쪽눈을 뜬 상태로 화면을 5초간 응시해주세요"
                    :
                    step.current === 2 ?
                    "왼쪽눈만 감은 상태로 화면을 5초간 응시해주세요"
                    :
                    step.current === 3 ?
                    "오른쪽눈만 감은 상태로 화면을 5초간 응시해주세요"
                    :
                    "커스텀 셋팅이 완료되었습니다."
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
            <EyeMouse />
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
                                navigate('/setting')
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
                                step.current = 1
                                setClickStartButton(true)
                            }}
                        />
                    </div>
                    <div style={{width: "80%", height:"100%"}}>
                        <div
                            className="step-card-content"
                            style={{
                                width: "100%",
                                height: "30%",
                                backgroundColor: step.current > 1 ? "green" : step.current === 1 ? "#f79393" : "grey",
                                borderRadius: "20px",
                                marginBottom: "1%",
                            }}
                        >
                            First Step <br/>{firstStep} {step.current > 1 ? <AiFillCheckCircle style={{fontSize:checkIconSize, marginLeft:checkIconSize}}/>: <></>}
                        </div>
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
                            Second Step <br/>{secondStep} {step.current > 2 ? <AiFillCheckCircle style={{fontSize:checkIconSize, marginLeft:checkIconSize}}/>: <></>}
                        </div>
                        <div 
                            className="step-card-content"
                            style={{
                                width: "100%",
                                height: "30%",
                                backgroundColor: step.current > 3 ? "green" : step.current === 3 ? "#f79393" : "grey",
                                borderRadius: "20px",
                                marginBottom: "1%",
                            }}
                        >
                            Third Step <br/>{thirdStep} {step.current > 3 ? <AiFillCheckCircle style={{fontSize:checkIconSize, marginLeft:checkIconSize}}/>: <></>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SettingEyeValue;