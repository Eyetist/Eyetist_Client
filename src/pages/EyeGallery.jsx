import React, {useEffect, useState, useRef} from 'react';
import EyeMouse from '../components/mouse/EyeMouse';
import FaceMeshCam from '../components/faceMesh/FaseMeshCam';
import MyGallery from '../components/gallery/MyGallery';
import OthersGallery from '../components/gallery/OthersGallery';
import { useSetRecoilState } from 'recoil';
import { SCROLL_POS } from '../recoil/Atoms';
import { motion, useAnimationControls } from "framer-motion"
import EyeButton from '../components/atoms/EyeButton';
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from "react-icons/bs"
import './EyeGallery.css'

const EyeGallery = () => {
    let [isMyGallery, setIsMyGallery] = useState(true);
    let setScrollPos = useSetRecoilState(SCROLL_POS)
    let [MyGalleryButtonColor, setMyGalleryButtonColor] = useState("rgb(49, 51, 54)")
    let [OthersGalleryButtonColor, setOthersGalleryButtonColor] = useState("gainsboro")
    let [visibility, setVisibility] = useState("private")
    const controls = useAnimationControls()
    const targetRef = useRef(null);  

    // const checkOverFlow = () => {
    //     return targetRef.current.offsetHeight < targetRef.current.scrollHeight
    // }
    const handleScroll = () => {
        setScrollPos({
            x : targetRef.current.scrollLeft,
            y : targetRef.current.scrollTop
        })
    };

    const clickNextScroll = () => {
        if (!targetRef.current) return;
        targetRef.current.scrollTo({
            top : targetRef.current.scrollTop + targetRef.current.offsetHeight / 2,
            behavior: 'smooth',
        });
    }

    const clickPrevScroll = () => {
        if (!targetRef.current) return;
        targetRef.current.scrollTo({
            top : targetRef.current.scrollTop - targetRef.current.offsetHeight / 2,
            behavior: 'smooth',
        });
    }

    useEffect( () => {
        handleScroll()
    },[])

    useEffect( () => {
        controls.start({ scale: [0.8, 1], transition: { duration: 0.5 } })
    },[isMyGallery])

    return (
        <div className = "main-container">
            <EyeMouse />
            <div className="gallery-top-container">
                <div className = "gallery-title">
                    Gallery
                </div>
                <div className="gallery-cam">
                    <FaceMeshCam />
                </div>
            </div>
            
            <div style={{display:'flex', height:"auto"}}>
                <EyeButton 
                    style={{width:"auto", height:"30px", borderTopLeftRadius:"5px", borderTopRightRadius:"5px", backgroundColor: MyGalleryButtonColor, color:"white", paddingLeft:"10px", paddingRight:"10px"}}
                    text="MyGallery"
                    hoverColor="gray"
                    clickColor="black"
                    onClick={() => {
                        setIsMyGallery(true) 
                        setOthersGalleryButtonColor("gainsboro")
                        setMyGalleryButtonColor("rgb(49, 51, 54)")
                    }}
                />
                <EyeButton 
                    style={{width:"auto", height:"30px", borderTopLeftRadius:"5px", borderTopRightRadius:"5px", backgroundColor: OthersGalleryButtonColor, color:"white", marginLeft:"2px", paddingLeft:"10px", paddingRight:"10px"}}
                    text="OthersGallery"
                    hoverColor="gray"
                    clickColor="black"
                    onClick={() => {
                        setIsMyGallery(false)
                        setMyGalleryButtonColor("gainsboro")
                        setOthersGalleryButtonColor("rgb(49, 51, 54)")

                    }}
                />
            </div>
            {
                isMyGallery ? 
                <div style={{display:'flex', paddingLeft:"5%", paddingTop:"1%", paddingBottom:"1%", backgroundColor:"rgb(49, 51, 54)"}}>
                    <EyeButton 
                        style={{width:"100px", height:"30px", fontSize:"30px", backgroundColor:visibility === "private" ? "black" : "inherit", color:visibility === "private" ? "pink" : "gray", borderRadius:"10px"}}
                        text="Private"
                        hoverColor="gray"
                        clickColor="black"
                        hoverFontColor = "pink"
                        onClick={() => setVisibility("private")}
                    />
                    <EyeButton 
                        style={{width:"100px", height:"30px", fontSize:"30px", backgroundColor:visibility === "public" ? "black" : "inherit", color:visibility === "public" ? "pink" : "gray", borderRadius:"10px"}}
                        text="Public"
                        hoverColor="gray"
                        clickColor="black"
                        hoverFontColor = "pink"
                        onClick={() => setVisibility("public")}
                    />
                    <EyeButton 
                        style={{fontSize:"40px", backgroundColor:"inherit", marginLeft:window.innerWidth * 0.3}}
                        text={<BsFillArrowUpCircleFill />}
                        clickColor="inherit"
                        hoverFontColor = "pink"
                        onClick={() => clickPrevScroll()}
                    />
                    <EyeButton 
                        style={{fontSize:"40px", backgroundColor:"inherit", marginLeft:"10px"}}
                        text={<BsFillArrowDownCircleFill />}
                        clickColor="inherit"
                        hoverFontColor = "pink"
                        onClick={() => clickNextScroll()}
                    />
                </div>
                :
                <div style={{display:'flex', paddingLeft:"5%", paddingTop:"1%", paddingBottom:"1%", backgroundColor:"rgb(49, 51, 54)"}}>
                    <div 
                        style={{width:"100px", height:"30px", fontSize:"30px", backgroundColor:"inherit", color:"pink", borderRadius:"10px", display: "flex", alignItems: "center", justifyContent: "center"}}
                    >
                        Public
                    </div>
                </div>
            }
            <div className='gallery-body-container' onScroll={handleScroll} ref={targetRef}>
                {
                    isMyGallery ? 
                    <>
                        <motion.div animate={controls} style={{width:"100%", height:"100%"}}>
                            <MyGallery 
                                isMyGallery = {isMyGallery}
                                targetRef = {targetRef}
                                visibility = {visibility}
                            />
                        </motion.div>
                    </>
                    :
                        <motion.div animate={controls} style={{width:"100%", height:"100%"}}>
                            <OthersGallery 
                                isMyGallery = {isMyGallery}
                                targetRef = {targetRef}
                            />
                        </motion.div>
                }
            </div>
        </div>
    );
};

export default EyeGallery;