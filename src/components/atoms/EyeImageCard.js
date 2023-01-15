import React, { useEffect, useRef, useState } from "react";
import EyeButton from "./EyeButton";
import { useRecoilValue } from "recoil";
import { motion, useAnimationControls } from "framer-motion"
import { MOUSE_POS, IS_RIGHT_EYE_BLINK, SCROLL_POS } from '../../recoil/Atoms';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import "./EyeImageCard.css"

const MAX_THUMBNAIL_IMAGE_HEIGHT = window.innerHeight / 5;
const MAX_THEMBNAIL_IMAGE_WIDTH = window.innerWidth / 6;

const EyeImageCard = (props) => {
    let mousePos = useRecoilValue(MOUSE_POS)
    let scrollPos = useRecoilValue(SCROLL_POS)
    let isRightEyeBlink = useRecoilValue(IS_RIGHT_EYE_BLINK)
    let clickRef = useRef(false);

    const buttonRef = useRef(null);
    const controls = useAnimationControls()

    const thumbnailImage = new Image();
    let [thumbnailImageHeight, setThumbnailImageHeight] = useState();
    let [thumbnailImageWidth, setThumbnailImageWidth] = useState();


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

            
            let posX = mousePos.x + 15 // 15 is mouseCursorSize / 2
            let posY = mousePos.y + 15
    
            return (transLeft.current <= posX && posX <= transLeft.current + offsetWidth) && (transTop.current <= posY && posY <= transTop.current + offsetHeight);
        }
    }

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

        if(thumbnailImage.src === "" && props.imageLink){
            thumbnailImage.src = props.imageLink;
            if (thumbnailImage.width < MAX_THEMBNAIL_IMAGE_WIDTH){
                setThumbnailImageWidth(thumbnailImage.width)
            }
            else{
                setThumbnailImageWidth(MAX_THEMBNAIL_IMAGE_WIDTH)
            }
        }
    }, [mousePos])

    return(
        <motion.div animate={controls} ref={buttonRef} className="eye-image-card">
            <img 
                src={props.imageLink}
                alt="image"
                width={thumbnailImageWidth}
                height="auto"
                style={{borderTopLeftRadius:"10px", borderTopRightRadius:"10px"}}
            />
            <div style={{display:"flex"}}>
                <div className="picture-information">
                    Title: {props.title}
                </div>
            </div>
            <div className="picture-information">
                EyeTist: {props.eyeTist}
            </div>
            {
                props.visibility === "public" ?
                    <div className="picture-information">
                        Likes: {props.likes}
                    </div>
                :
                    <></>
            }
            <div className="picture-information">
                Date: {props.date}
            </div>
        </motion.div>
    )

}

export default EyeImageCard