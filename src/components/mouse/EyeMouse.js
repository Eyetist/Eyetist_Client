import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import SensitivityController from "./SensitivityController";
import { BsCircle,BsPencilFill,BsEraser,BsZoomIn,BsZoomOut,BsPaintBucket } from "react-icons/bs"
import { FaRegHandPointUp } from "react-icons/fa"
import { MOUSE_POS, IS_RIGHT_EYE_BLINK, IS_LEFT_EYE_BLINK, IS_MOUSE_OPEN, STROKE_COLOR,CURRENT_FUNCTION } from '../../recoil/Atoms';

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
    let [abcde,setCursor]=useState(<BsPencilFill 
        style={{ position: 'absolute', left: mousePos.x, top: mousePos.y , width : "50px", height : "50px", zIndex:'999', color:strokeColor}}
    />);

    console.log(abcde)
    useEffect(() => {
        switch(currentFunction){
        case "draw":
            setCursor(<BsPencilFill 
                    style={{ position: 'absolute', left: mousePos.x, top: mousePos.y , width : "50px", height : "50px", zIndex:'999', color:strokeColor}}
                />)
            break;
        case "erase":
            setCursor(<BsEraser 
                    style={{ position: 'absolute', left: mousePos.x, top: mousePos.y , width : "50px", height : "50px", zIndex:'999'}}
                />)
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
            setCursor(<BsPaintBucket 
                    style={{ position: 'absolute', left: mousePos.x, top: mousePos.y , width : "50px", height : "50px", zIndex:'999',color:strokeColor}}
                />)
            break;
        }

    }, [mousePos]);

    return(
        <>
        <SensitivityController />
        {
        isMouseOpen ?
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
                <>{abcde}</>

        :
            mousePos.x<window.innerWidth*0.1 ?
                isRightEyeBlink ? 
                    <img
                        src={cursorImage.checkCursor}
                        alt="cursor"
                        style={{ position: 'absolute', left: mousePos.x, top: mousePos.y , width : "50px", height : "50px", zIndex:'999'}}
                    />
                :
                    <FaRegHandPointUp 
                        style={{ position: 'absolute', left: mousePos.x, top: mousePos.y , width : "50px", height : "50px", zIndex:'999', color:strokeColor}}
                    />
            :
                isRightEyeBlink ? 
                    <img
                        src={cursorImage.checkCursor}
                        alt="cursor"
                        style={{ position: 'absolute', left: mousePos.x, top: mousePos.y , width : "50px", height : "50px", zIndex:'999'}}
                    />
                :
                    isLeftEyeBlink ? 
                        // <img
                        //     src={cursorImage.leftEyeClickCursor}
                        //     alt="cursor"
                        //     style={{ position: 'absolute', left: mousePos.x, top: mousePos.y , width : "50px", height : "50px", zIndex:'999'}}
                        // />
                        <>{abcde}</>
                    :
                    <>{abcde}</>
        }
        </>
    )
}

export default EyeMouse