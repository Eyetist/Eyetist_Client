import React, {useEffect, useState, useRef} from 'react';
import EyeMouse from '../components/mouse/EyeMouse';
import FaceMeshCam from '../components/faceMesh/FaseMeshCam';
import MyGallery from '../components/gallery/MyGallery';
import OthersGallery from '../components/gallery/OthersGallery';
import { useSetRecoilState } from 'recoil';
import { SCROLL_POS, CURRENT_FUNCTION } from '../recoil/Atoms';
import { motion, useAnimationControls } from "framer-motion"
import EyeButton from '../components/atoms/EyeButton';
import PageController from '../components/gallery/PageController';
import MoveSelections from '../components/functionDetails/MoveSelection';
import GallerySmartTools from '../components/functionDetails/GallerySmartTools';
import { useNavigate } from 'react-router-dom';
import './EyeGallery.css'

const EyeGallery = () => {
    let navigate = useNavigate();
    let SmartToolsPosition = useRef({x:0, y:0})
    let [isMyGallery, setIsMyGallery] = useState(true);
    let setCurrentFunction = useSetRecoilState(CURRENT_FUNCTION)
    let setScrollPos = useSetRecoilState(SCROLL_POS)
    let [page, setPage] = useState(0)
    let [imageCount, setImageCount] = useState(0)
    let [visibility, setVisibility] = useState("private")
    let [smartToolsOpen, setSmartToolsOpen] = useState(false)
    let [publicGalleryMode, setPublicGalleryMode] = useState("weekly")
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
        if (!localStorage.getItem('loginMemberId') && navigate){
            navigate('/login')
        }
        setCurrentFunction("default")
        handleScroll()
    },[])

    useEffect( () => {
        controls.start({ scale: [0.8, 1], transition: { duration: 0.5 } })
    },[isMyGallery])

    useEffect( () => {
        controls.start({ opacity: [0, 1], transition: { duration: 2 } })
    },[page])

    return (
        <div className = "main-container">
            <EyeMouse 
                SmartToolsPosition = {SmartToolsPosition}
                setSmartToolsOpen = {setSmartToolsOpen}
            />
            {
                smartToolsOpen ?
                <GallerySmartTools 
                    SmartToolsPosition = {SmartToolsPosition}
                    setSmartToolsOpen = {setSmartToolsOpen}
                    isMyGallery = {isMyGallery}
                    setIsMyGallery = {setIsMyGallery}
                    visibility = {visibility}
                    setVisibility ={setVisibility}
                />
                :
                <></>
            }
            <div className="gallery-top-container" style={{marginBottom:'-30px'}}>
                <div className='gallery-top-buttons'>
                    <MoveSelections 
                        currentPage = "gallery"
                    />
                </div>
                <div className = "gallery-title" style={{marginBottom:'30px'}}>
                    Gallery
                </div>
                <div className="gallery-cam">
                    <FaceMeshCam />
                </div>
            </div>
            
            <div style={{display:'flex', height:"auto"}}>
                <EyeButton 
                    style={{width:"auto", height:"30px", borderTopLeftRadius:"5px", borderTopRightRadius:"5px", backgroundColor: isMyGallery ? "rgb(49, 51, 54)" : "gainsboro", color:"white", paddingLeft:"10px", paddingRight:"10px"}}
                    text="MyGallery"
                    hoverColor="gray"
                    clickColor="black"
                    onClick={() => {
                        setIsMyGallery(true) 
                        setPage(0)
                    }}
                />
                <EyeButton 
                    style={{width:"auto", height:"30px", borderTopLeftRadius:"5px", borderTopRightRadius:"5px", backgroundColor: isMyGallery ? "gainsboro" : "rgb(49, 51, 54)", color:"white", marginLeft:"2px", paddingLeft:"10px", paddingRight:"10px"}}
                    text="OthersGallery"
                    hoverColor="gray"
                    clickColor="black"
                    onClick={() => {
                        setIsMyGallery(false)
                        setPage(0)

                    }}
                />
            </div>
            {
                isMyGallery ? 
                <div>
                    <div style={{display:'flex', paddingLeft:"5%", paddingTop:"1%", backgroundColor:"rgb(49, 51, 54)"}}>
                        <div style={{display:'flex'}}>
                            <EyeButton 
                                style={{width:"auto", height:"30px", fontSize:"30px", backgroundColor:visibility === "private" ? "black" : "inherit", color:visibility === "private" ? "pink" : "gray", borderRadius:"10px", paddingLeft:"10px", paddingRight:"10px"}}
                                text="Private"
                                hoverColor="gray"
                                clickColor="black"
                                hoverFontColor = "pink"
                                onClick={() => {setVisibility("private")
                                                setPage(0)}}
                            />
                            <EyeButton 
                                style={{width:"auto", height:"30px", fontSize:"30px", backgroundColor:visibility === "public" ? "black" : "inherit", color:visibility === "public" ? "pink" : "gray", borderRadius:"10px", paddingLeft:"10px", paddingRight:"10px"}}
                                text="Public"
                                hoverColor="gray"
                                clickColor="black"
                                hoverFontColor = "pink"
                                onClick={() => {setVisibility("public")
                                                setPage(0)}}
                            />
                        </div>
                    </div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:'center', marginTop:"-30px", backgroundColor:"rgb(49, 51, 54)"}}>
                        <PageController 
                            page = {page}
                            setPage = {setPage}
                            imageCount = {imageCount}
                        />
                    </div>
                </div>

                :
                <div>
                    <div style={{display:'flex', paddingLeft:"5%", paddingTop:"1%", backgroundColor:"rgb(49, 51, 54)"}}>
                        <div style={{display:'flex'}}>
                            <EyeButton 
                                style={{width:"auto", height:"30px", fontSize:"30px", backgroundColor:publicGalleryMode === "weekly" ? "black" : "inherit", color:publicGalleryMode === "weekly" ? "pink" : "gray", borderRadius:"10px", paddingLeft:"10px", paddingRight:"10px"}}
                                text="Weekly Top 10"
                                hoverColor="gray"
                                clickColor="black"
                                hoverFontColor = "pink"
                                onClick={() => {setPublicGalleryMode("weekly")
                                                setPage(0)}}
                            />
                            <EyeButton 
                                style={{width:"auto", height:"30px", fontSize:"30px", backgroundColor:publicGalleryMode === "rank" ? "black" : "inherit", color:publicGalleryMode === "rank" ? "pink" : "gray", borderRadius:"10px", paddingLeft:"10px", paddingRight:"10px"}}
                                text="Rank"
                                hoverColor="gray"
                                clickColor="black"
                                hoverFontColor = "pink"
                                onClick={() => {setPublicGalleryMode("rank")
                                                setPage(0)}}
                            />
                            <EyeButton 
                                style={{width:"auto", height:"30px", fontSize:"30px", backgroundColor:publicGalleryMode === "public" ? "black" : "inherit", color:publicGalleryMode === "public" ? "pink" : "gray", borderRadius:"10px", paddingLeft:"10px", paddingRight:"10px"}}
                                text="Newest"
                                hoverColor="gray"
                                clickColor="black"
                                hoverFontColor = "pink"
                                onClick={() => {setPublicGalleryMode("public")
                                                setPage(0)}}
                            />
                        </div>
                    </div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:'center', marginTop:"-30px", backgroundColor:"rgb(49, 51, 54)"}}>
                        <PageController 
                            page = {page}
                            setPage = {setPage}
                            imageCount = {imageCount}
                        />
                    </div>
                </div>
            }
            <div className='gallery-body-container' onScroll={handleScroll} ref={targetRef}>
                {
                    isMyGallery ? 
                    <motion.div animate={controls} style={{width:"100%", height:"100%"}}>
                        <MyGallery 
                            isMyGallery = {isMyGallery}
                            targetRef = {targetRef}
                            visibility = {visibility}
                            page = {page}
                            setPage = {setPage}
                            imageCount = {imageCount}
                            setImageCount = {setImageCount}
                        />
                    </motion.div>
                    :
                    <motion.div animate={controls} style={{width:"100%", height:"100%"}}>
                        <OthersGallery 
                            isMyGallery = {isMyGallery}
                            targetRef = {targetRef}
                            page = {page}
                            setPage = {setPage}
                            imageCount = {imageCount}
                            setImageCount = {setImageCount}
                            publicGalleryMode = {publicGalleryMode}
                        />
                    </motion.div>
                }
            </div>
        </div>
    );
};

export default EyeGallery;