import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import SensitivityController from "./SensitivityController";
import { BsCircle,BsPencilFill,BsEraser,BsZoomIn,BsZoomOut,BsPaintBucket } from "react-icons/bs"
import { RiEraserFill } from "react-icons/ri"
import { FaRegHandPointUp, FaHandPointUp } from "react-icons/fa"
import { MOUSE_POS, IS_RIGHT_EYE_BLINK, IS_LEFT_EYE_BLINK, IS_MOUSE_OPEN, STROKE_COLOR,CURRENT_FUNCTION } from '../../recoil/Atoms';
import { useStopwatch } from 'react-timer-hook';

const cursorImage = {
    defaultCursor: require('./defaultCursor.png'),
    leftEyeClickCursor: require('./leftEyeClickCursor.png'),
    checkCursor: require('./checkCursor.png'),
    plusCursor: require('./plusCursor.png'),
    minusCursor: require('./minusCursor.png'),
}

const EyeMouse = (props) => {
    let strokeColor = useRecoilValue(STROKE_COLOR)
    let mousePos = useRecoilValue(MOUSE_POS)
    let isLeftEyeBlink = useRecoilValue(IS_LEFT_EYE_BLINK)
    let isRightEyeBlink = useRecoilValue(IS_RIGHT_EYE_BLINK)
    let isMouseOpen = useRecoilValue(IS_MOUSE_OPEN)
    let currentFunction=useRecoilValue(CURRENT_FUNCTION)
    let [cursor,setCursor]=useState();
    const {
        seconds,
        pause,
        reset,
    } = useStopwatch({ autoStart: false });

    useEffect( () => {
        if (seconds >= 1 && props.SmartToolsPosition && !isMouseOpen && !props.isOpenSensitivity){
            props.SmartToolsPosition.current = {x: mousePos.x, y: mousePos.y}
            props.setSmartToolsOpen(true)
        }
    },[seconds])

    useEffect( () => {  
        if (isRightEyeBlink && isLeftEyeBlink){
            reset()
        }
        else{
            pause()
        }
    }, [isRightEyeBlink])

    useEffect(() => {
        switch(currentFunction){
        case "draw":
            setCursor(
                <>
                    <BsCircle 
                        style={{ position: 'absolute', left: mousePos.x, top: mousePos.y , width : "30px", height : "30px", zIndex:'998',color:strokeColor , borderRadius:"50px" ,border: "1px solid white"}}
                    />
                    <BsPencilFill 
                        style={{ position: 'absolute', left: mousePos.x + 16, top: mousePos.y - 31 , width : "50px", height : "50px", zIndex:'999', color:strokeColor}}
                    />
                </>
            )
            break;
        case "erase":
            setCursor(
                <>
                    <BsCircle 
                        style={{ position: 'absolute', left: mousePos.x, top: mousePos.y , width : "30px", height : "30px", zIndex:'998', borderRadius:"50px" ,border: "1px solid white"}}
                    />
                    <RiEraserFill 
                        style={{ position: 'absolute', left: mousePos.x + 10, top: mousePos.y - 27, width : "50px", height : "50px", zIndex:'999'}}
                    />
                </>
            )
            break;
        
        case "zoom in":
            setCursor(<BsZoomIn 
                style={{ position: 'absolute', left: mousePos.x, top: mousePos.y , width : "50px", height : "50px", zIndex:'999'}}
            />)
            break;
        
        case "zoom out":
            setCursor(<BsZoomOut 
                style={{ position: 'absolute', left: mousePos.x, top: mousePos.y , width : "50px", height : "50px", zIndex:'999'}}
            />)
            break;

        case "fill":
            setCursor(
                <>
                    <BsCircle 
                        style={{ position: 'absolute', left: mousePos.x, top: mousePos.y , width : "30px", height : "30px", zIndex:'998', color:strokeColor , borderRadius:"50px" ,border: "1px solid white"}}
                    />
                    <BsPaintBucket 
                        style={{ position: 'absolute', left: mousePos.x - 26, top: mousePos.y - 18 , width : "50px", height : "50px", zIndex:'999',color:strokeColor}}
                    />
                </>
            )
            break;

        default:
            setCursor(
                <>
                    <BsCircle 
                        style={{ position: 'absolute', left: mousePos.x, top: mousePos.y , width : "30px", height : "30px", zIndex:'998', borderRadius:"50px" ,border: "1px solid white"}}
                    />
                    <FaRegHandPointUp 
                        style={{ position: 'absolute', left: mousePos.x, top: mousePos.y + 15 , width : "50px", height : "50px", zIndex:'999', color:"black"}}
                    />
                </>
            )
            break;
        }

    }, [mousePos]);

    return(
        <>
        <SensitivityController 
            isOpenSensitivity = {props.isOpenSensitivity}
        />
        {
        props.isOpenSensitivity ?
            isRightEyeBlink ? 
                <img
                    src={cursorImage.plusCursor}
                    alt="cursor"
                    style={{ position: 'absolute', left: mousePos.x, top: mousePos.y , width : "50px", height : "50px", zIndex:'999'}}
                />
            :
                isLeftEyeBlink ? 
                    <img
                        src={cursorImage.minusCursor}
                        alt="cursor"
                        style={{ position: 'absolute', left: mousePos.x, top: mousePos.y , width : "50px", height : "50px", zIndex:'999'}}
                    />
                :
                <>{cursor}</>

        :
            mousePos.x < window.innerWidth * 0.1 ? // || mousePos.x > window.innerWidth * 0.79 
                isRightEyeBlink ? 
                    <>
                        <BsCircle 
                            style={{ position: 'absolute', left: mousePos.x, top: mousePos.y , width : "30px", height : "30px", zIndex:'998', borderRadius:"50px" ,border: "1px solid white"}}
                        />
                        <FaHandPointUp 
                            style={{ position: 'absolute', left: mousePos.x, top: mousePos.y + 15 , width : "50px", height : "50px", zIndex:'999', color:"black"}}
                        />
                    </>
                :
                    <>
                        <BsCircle 
                            style={{ position: 'absolute', left: mousePos.x, top: mousePos.y , width : "30px", height : "30px", zIndex:'998', borderRadius:"50px" ,border: "1px solid white"}}
                        />
                        <FaRegHandPointUp 
                            style={{ position: 'absolute', left: mousePos.x, top: mousePos.y + 15 , width : "50px", height : "50px", zIndex:'999', color:"black"}}
                        />
                    </>
            :
                isLeftEyeBlink ? 
                    <>{cursor}</>
                :
                    isRightEyeBlink ? 
                        <>
                            <BsCircle 
                                style={{ position: 'absolute', left: mousePos.x, top: mousePos.y , width : "30px", height : "30px", zIndex:'998', borderRadius:"50px" ,border: "1px solid white"}}
                            />
                            <FaHandPointUp 
                                style={{ position: 'absolute', left: mousePos.x, top: mousePos.y + 15 , width : "50px", height : "50px", zIndex:'999', color:"black"}}
                            />
                        </>
                    :
                    <>{cursor}</>
        }
        </>
    )
}

export default EyeMouse