import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { MOUSE_POS, IS_MOUSE_OPEN, IS_LEFT_EYE_BLINK, IS_RIGHT_EYE_BLINK} from '../../recoil/Atoms';

const SensitivityController = (props) => {
    let mousePos = useRecoilValue(MOUSE_POS)
    let isMouseOpen = useRecoilValue(IS_MOUSE_OPEN)
    let isLeftEyeBlink = useRecoilValue(IS_LEFT_EYE_BLINK)
    let isRightEyeBlink = useRecoilValue(IS_RIGHT_EYE_BLINK)

    useEffect( () => {
        setTimeout(function(){
            if (isMouseOpen && isLeftEyeBlink && props.sensitivity){
                if (props.sensitivity <= 1){
                    props.setSensitivity(1)
                }
                else{
                    props.setSensitivity(Number((props.sensitivity - 0.1).toFixed(1)))
                }
            }

            if (isMouseOpen && isRightEyeBlink && props.sensitivity){
                if (props.sensitivity >= 10){
                    props.setSensitivity(10)
                }
                else{
                    props.setSensitivity(Number((props.sensitivity + 0.1).toFixed(1)))
                }
            }
        }, 100)
    }, [mousePos])

    return(
        isMouseOpen ?
        <div
            style={{position: 'absolute', left: mousePos.x, top: mousePos.y - 30, width:"140px", height:"30px", borderRadius:"5px", backgroundColor:"inherit"}}
        >
            {`sensitivity = ${props.sensitivity}`}
        </div>
        :
        <></>
    )
}

export default SensitivityController;