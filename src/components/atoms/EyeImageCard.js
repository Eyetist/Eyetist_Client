import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { motion, useAnimationControls } from "framer-motion"
import { MOUSE_POS, IS_RIGHT_EYE_BLINK, SCROLL_POS } from '../../recoil/Atoms';
import "./EyeImageCard.css"

const MAX_THUMBNAIL_IMAGE_HEIGHT = window.innerHeight * 0.2;

const EyeImageCard = (props) => {
    let mousePos = useRecoilValue(MOUSE_POS)
    let scrollPos = useRecoilValue(SCROLL_POS)
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

            transLeft.current = transLeft.current - scrollPos.x
            transTop.current = transTop.current - scrollPos.y

            
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

        if(!thumbnailImageHeight){
            thumbnailImage.src = props.imageLink;
            if (thumbnailImage.height < MAX_THUMBNAIL_IMAGE_HEIGHT){
                setThumbnailImageHeight(thumbnailImage.height)
            }
            else{
                setThumbnailImageHeight(MAX_THUMBNAIL_IMAGE_HEIGHT)
            }
        }
    }, [mousePos])
    
    return(
        thumbnailImageHeight ?
        <motion.div animate={controls} ref={buttonRef} className="eye-image-card">
            <img 
                src={props.imageLink}
                alt="image"
                width="auto"
                height={thumbnailImageHeight}
                style={{borderTopLeftRadius:"10px", borderTopRightRadius:"10px"}}
            />
            <div className="picture-information">
                Title: Picture1
            </div>
            <div className="picture-information">
                EyeTist: test1
            </div>
            <div className="picture-information">
                Date: 2023/01/01
            </div>
        </motion.div>
        :
        <></>
    )

}

export default EyeImageCard