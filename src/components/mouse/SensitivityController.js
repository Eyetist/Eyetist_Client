import React from "react";
import { useRecoilValue } from "recoil";
import { MOUSE_POS, MOUSE_SENSITIVITY, IS_SMART_TOOLS_OPEN} from '../../recoil/Atoms';

const SensitivityController = (props) => {
    let mousePos = useRecoilValue(MOUSE_POS)
    let mouseSensitivity = useRecoilValue(MOUSE_SENSITIVITY)
    let isSmartToolsOpen = useRecoilValue(IS_SMART_TOOLS_OPEN)
    return(
        isSmartToolsOpen ?
        <div
            style={{position: 'absolute', left: mousePos.x, top: mousePos.y - 60, width:"auto", height:"auto", borderRadius:"5px", backgroundColor:"white", zIndex:999, padding:"5px"}}
        >
            {`sensitivity = ${mouseSensitivity}`}
        </div>
        :
        <></>
    )
}

export default SensitivityController;