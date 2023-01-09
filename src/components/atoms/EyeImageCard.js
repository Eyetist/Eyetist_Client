import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { motion, useAnimationControls } from "framer-motion"
import { MOUSE_POS, IS_RIGHT_EYE_BLINK } from '../../recoil/Atoms';
import "./EyeImageCard.css"

const MAX_THUMBNAIL_IMAGE_HEIGHT = window.innerHeight / 4;
let isHover = false;

const EyeImageCard = (props) => {
    let mousePos = useRecoilValue(MOUSE_POS)
    let isRightEyeBlink = useRecoilValue(IS_RIGHT_EYE_BLINK)
    let clickRef = useRef(false);
    
    const buttonRef = useRef(null);
    const controls = useAnimationControls()

    const thumbnailImage = new Image();
    let [thumbnailImageHeight, setThumbnailImageHeight] = useState(0);

    let transLeft = useRef(0)
    let transTop = useRef(0)

    function isOverlap(){
        if (buttonRef.current){
            const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = buttonRef.current;
            if (offsetTop !== 0){
                transTop.current = offsetTop
            }

            if (offsetLeft !== 0){
                transLeft.current = offsetLeft
            }

            let posX = mousePos.x + 25 // 25 is mouseCursorSize / 2
            let posY = mousePos.y + 25
    
            return (transLeft.current <= posX && posX <= transLeft.current + offsetWidth) && (transTop.current <= posY && posY <= transTop.current + offsetHeight);
        }
    }

    useEffect( () => {
        thumbnailImage.src = props.imageLink;
        if (thumbnailImage.height < MAX_THUMBNAIL_IMAGE_HEIGHT){
            setThumbnailImageHeight(thumbnailImage.height)
        }
        else{
            setThumbnailImageHeight(MAX_THUMBNAIL_IMAGE_HEIGHT)
        }
    },[])

    useEffect( () => {
        if (isOverlap()){
            controls.set({ scale: 1.2 })

            if (isRightEyeBlink){
                clickRef.current = true
            }
        }
        else{
            controls.set({ scale: 1 })
        }
    
        if (clickRef.current){
            if (!isRightEyeBlink){
                // props.onClick()
                console.log(props.imageLink)
                clickRef.current = false
            }
        }
    }, [mousePos])

    return(
        <motion.div animate={controls}>
            <img 
                src={props.imageLink} 
                width="auto"
                height={thumbnailImageHeight}
                className="eye-image-card" 
                ref={buttonRef} 
            />
        </motion.div>
    )
}

export default EyeImageCard