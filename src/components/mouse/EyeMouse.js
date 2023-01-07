import React from "react";
import { useRecoilValue } from "recoil";
import { MOUSE_POS, IS_RIGHT_EYE_BLINK, IS_LEFT_EYE_BLINK, IS_MOUSE_OPEN} from '../../recoil/Atoms';

const cursorImage = {
    defaultCursor: require('./defaultCursor.png'),
    leftEyeClickCursor: require('./leftEyeClickCursor.png'),
    checkCursor: require('./checkCursor.png'),
    plusCursor: require('./plusCursor.png'),
    minusCursor: require('./minusCursor.png'),
}

const EyeMouse = () => {
    let mousePos = useRecoilValue(MOUSE_POS)
    let isLeftEyeBlink = useRecoilValue(IS_LEFT_EYE_BLINK)
    let isRightEyeBlink = useRecoilValue(IS_RIGHT_EYE_BLINK)
    let isMouseOpen = useRecoilValue(IS_MOUSE_OPEN)
    

    return(
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
                    <img
                        src={cursorImage.defaultCursor}
                        alt="cursor"
                        style={{ position: 'absolute', left: mousePos.x, top: mousePos.y , width : "50px", height : "50px", zIndex:'999'}}
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
                    <img
                        src={cursorImage.leftEyeClickCursor}
                        alt="cursor"
                        style={{ position: 'absolute', left: mousePos.x, top: mousePos.y , width : "50px", height : "50px", zIndex:'999'}}
                    />
                :
                    <img
                        src={cursorImage.defaultCursor}
                        alt="cursor"
                        style={{ position: 'absolute', left: mousePos.x, top: mousePos.y , width : "50px", height : "50px", zIndex:'999'}}
                    />
    )
}

export default EyeMouse