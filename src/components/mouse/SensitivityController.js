import React, { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { MOUSE_POS, MOUSE_SENSITIVITY, IS_LEFT_EYE_BLINK, IS_RIGHT_EYE_BLINK} from '../../recoil/Atoms';

const SensitivityController = (props) => {
    let mousePos = useRecoilValue(MOUSE_POS)
    let isLeftEyeBlink = useRecoilValue(IS_LEFT_EYE_BLINK)
    let isRightEyeBlink = useRecoilValue(IS_RIGHT_EYE_BLINK)
    let [mouseSensitivity, setMouseSensitivity] = useRecoilState(MOUSE_SENSITIVITY)

    useEffect( () => {
        setTimeout(function(){
            if (props.isOpenSensitivity && isLeftEyeBlink){
                if (mouseSensitivity <= 1){
                    setMouseSensitivity(1)
                }
                else{
                    setMouseSensitivity(mouseSensitivity - 1)
                }
            }

            if (props.isOpenSensitivity && isRightEyeBlink){
                if (mouseSensitivity >= 10){
                    setMouseSensitivity(10)
                }
                else{
                    setMouseSensitivity(mouseSensitivity + 1)
                }
            }
        }, 100)
    }, [mousePos])

    return(
        props.isOpenSensitivity ?
        <div
            style={{position: 'absolute', left: mousePos.x, top: mousePos.y - 60, width:"140px", height:"30px", borderRadius:"5px", backgroundColor:"none", zIndex:999}}
        >
            {`sensitivity = ${mouseSensitivity}`}
        </div>
        :
        <></>
    )
}

export default SensitivityController;