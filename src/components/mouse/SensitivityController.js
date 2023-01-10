import React, { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { MOUSE_POS, MOUSE_SENSITIVITY, IS_MOUSE_OPEN, IS_LEFT_EYE_BLINK, IS_RIGHT_EYE_BLINK} from '../../recoil/Atoms';

const SensitivityController = (props) => {
    let mousePos = useRecoilValue(MOUSE_POS)
    let isMouseOpen = useRecoilValue(IS_MOUSE_OPEN)
    let isLeftEyeBlink = useRecoilValue(IS_LEFT_EYE_BLINK)
    let isRightEyeBlink = useRecoilValue(IS_RIGHT_EYE_BLINK)
    let [mouseSensitivity, setMouseSensitivity] = useRecoilState(MOUSE_SENSITIVITY)

    useEffect( () => {
        setTimeout(function(){
            if (isMouseOpen && isLeftEyeBlink){
                if (mouseSensitivity <= 1){
                    setMouseSensitivity(1)
                }
                else{
                    setMouseSensitivity(Number((mouseSensitivity - 0.1).toFixed(1)))
                }
            }

            if (isMouseOpen && isRightEyeBlink){
                if (mouseSensitivity >= 5){
                    setMouseSensitivity(5)
                }
                else{
                    setMouseSensitivity(Number((mouseSensitivity + 0.1).toFixed(1)))
                }
            }
        }, 100)
    }, [mousePos])

    return(
        isMouseOpen ?
        <div
            style={{position: 'absolute', left: mousePos.x, top: mousePos.y - 30, width:"140px", height:"30px", borderRadius:"5px", backgroundColor:"none", zIndex:999}}
        >
            {`sensitivity = ${mouseSensitivity}`}
        </div>
        :
        <></>
    )
}

export default SensitivityController;