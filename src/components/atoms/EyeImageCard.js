import React, { useEffect, useRef, useState } from "react";
import EyeButton from "./EyeButton";
import { setLikePicture } from "../../api/member/MemberAPI";
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
    let [isHeartHover, setIsHeartHover] = useState(false)

    const imgRef = useRef(null);
    const heartRef = useRef(null);
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

    function isHeartOverlap(){
        if (heartRef.current){
            const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = heartRef.current;
            if (offsetTop !== imgRef.current.offsetHeight + 3){
                transTop.current = offsetTop
            }
            else{
                transTop.current = transTop.current + imgRef.current.offsetHeight + 3
            }

            if (offsetLeft !== 15){
                transLeft.current = offsetLeft
            }
            else{
                transLeft.current = transLeft.current + 15
            }
            
            let posX = mousePos.x + 15 // 15 is mouseCursorSize / 2
            let posY = mousePos.y + 15

            return (transLeft.current - 10 <= posX && posX <= transLeft.current + offsetWidth + 10) && (transTop.current - 10 <= posY && posY <= transTop.current + offsetHeight + 10);
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

        if(isHeartOverlap()){
            setIsHeartHover(true)
        }
        else{
            setIsHeartHover(false)
        }
    
        if (clickRef.current){
            if (!isRightEyeBlink){

                if (isHeartHover){
                    console.log("click Heart")
                    setLikePicture(props.blobName, props.member, props.isHeart)
                }
                else{
                    console.log("click Card")
                    console.log(props)
                }
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
                ref={imgRef}
                src={props.imageLink}
                alt="image"
                width={thumbnailImageWidth}
                height="auto"
                style={{borderTopLeftRadius:"10px", borderTopRightRadius:"10px"}}
            />
            {
                props.visibility === "public" ?
                    props.isHeart ? 
                    <motion.div animate={controls} ref={heartRef} style={{width:"20px", height:"20px", fontSize:"20px", marginLeft:"15px", backgroundColor:"inherit", color:isHeartHover ? "gray" : "red"}}>
                        <AiFillHeart />
                    </motion.div>
                    :
                    <motion.div animate={controls} ref={heartRef} style={{width:"20px", height:"20px", fontSize:"20px", marginLeft:"15px", backgroundColor:"inherit", color:isHeartHover ? "red" : "gray"}}>
                        <AiOutlineHeart />
                    </motion.div>
                :
                <></>
            }
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
                {/* Date:  */}
            </div>
        </motion.div>
    )

}

export default EyeImageCard