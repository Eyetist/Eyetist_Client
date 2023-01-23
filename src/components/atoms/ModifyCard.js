import React, { useEffect, useRef, useState } from "react"
import EyeButton from "./EyeButton";
import EyeKeyboard from "../keyboard/EyeKeyboard";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import './ModifyCard.css'
import { Link } from "@material-ui/core";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const ModifyCard = (props) => {
    const nameRef = useRef(null)
    const [inputName, setInputName] = useState("")
    const [nameFocused, setNameFocused] = useState(false)
    const onNameFocus = () => setNameFocused(true)
    const onNameBlur = () => setNameFocused(false)

    const [extention, setExtention] = useState()
    const [visible, setVisible] = useState()

    const modifyContainerRef = useRef(null)

    useEffect( () => {
        setInputName(props.clickedImageInfo.title)
        setExtention("png")
        setVisible(props.clickedImageInfo.visibility)
    }, [props.clickedImageInfo])

    function download(){
        const image = (props.clickedImageInfo.imageLink)
        const link = document.createElement("a");
        link.href = image;
        link.download = props.clickedImageInfo.title;
        console.log(Link)
        // link.click();
    }

    return(
        <div className="modify-container" style={{ paddingTop: modifyContainerRef.current ? (window.innerHeight - modifyContainerRef.current.offsetHeight) / 2 : 0,
                                                    paddingLeft: modifyContainerRef.current ? (window.innerWidth - modifyContainerRef.current.offsetWidth) / 2 : 0 }}>
            <div ref={modifyContainerRef}>
            <div className="modify-top-bar">
                <EyeButton 
                    style={{
                        width: "30px",
                        height: "30px",
                        backgroundColor: "inherit",
                        borderRadius: "10px",
                        color: "black",
                        float: "right"
                    }}
                    text="X"
                    hoverColor="gray"
                    clickColor="black"
                    onClick={() => props.setModifyCardOpen(false)}
                />
            </div>
            <div className="modify-body-container">
                <div style={{display:'flex'}}>
                    <div className="modify-image-container">
                        <img style={{width:"100%", height:'100%'}} src={props.clickedImageInfo.imageLink}/>
                    </div>
                    <div className="modify-option-container">
                        {
                            props.isMyGallery ?
                            <>
                                <div className="modify-option">
                                    <div className="option-text">NAME</div>
                                    <div>
                                        <EyeButton 
                                            style={{  
                                                height : "5vh",
                                                width: "8vw",
                                                backgroundColor: "inherit",
                                                border: "none",
                                                position: "absolute"
                                            }}
                                            text=""
                                            hoverColor="inherit"
                                            clickColor="inherit"
                                            onClick={() => {nameRef.current.focus()}}
                                        />
                                        <input 
                                            ref={nameRef}
                                            value={ inputName }
                                            onChange={e => setInputName(e.target.value)}
                                            onFocus={onNameFocus}
                                            onBlur={onNameBlur}
                                            type="text" 
                                            className="option" 
                                        />
                                    </div>
                                </div>

                                <div className="modify-option">
                                    <div className="option-text">EXTENTION</div>
                                    <div style={{display:'flex'}}>
                                        <EyeButton 
                                            style={{    
                                                height : "5vh",
                                                width: "8vw",
                                                backgroundColor: extention === "png" ? "gray" : "gainsboro",
                                                border: "none",
                                                borderRadius: "10px",
                                            }}
                                            text="PNG"
                                            hoverColor="gray"
                                            clickColor="black"
                                            onClick={() => setExtention("png")}
                                        />
                                        <EyeButton 
                                            style={{    
                                                height : "5vh",
                                                width: "8vw",
                                                backgroundColor: extention === "jpeg" ? "gray" : "gainsboro",
                                                border: "none",
                                                borderRadius: "10px",
                                            }}
                                            text="JPEG"
                                            hoverColor="gray"
                                            clickColor="black"
                                            onClick={() => setExtention("jpeg")}
                                        />
                                        <EyeButton 
                                            style={{    
                                                height : "5vh",
                                                width: "8vw",
                                                backgroundColor: extention === "svg" ? "gray" : "gainsboro",
                                                border: "none",
                                                borderRadius: "10px",
                                            }}
                                            text="SVG"
                                            hoverColor="gray"
                                            clickColor="black"
                                            onClick={() => setExtention("svg")}
                                        />
                                    </div>
                                </div>

                                <div className="modify-option">
                                    <div className="option-text">VISIBLE</div>
                                    <div style={{display:'flex'}}>
                                        <EyeButton 
                                            style={{    
                                                height : "5vh",
                                                width: "12vw",
                                                backgroundColor: visible === "private" ? "gray" : "gainsboro",
                                                border: "none",
                                                borderRadius: "10px",
                                            }}
                                            text="PRIVATE"
                                            hoverColor="gray"
                                            clickColor="black"
                                            onClick={() => setVisible("private")}
                                        />
                                        <EyeButton 
                                            style={{    
                                                height : "5vh",
                                                width: "12vw",
                                                backgroundColor: visible === "public" ? "gray" : "gainsboro",
                                                border: "none",
                                                borderRadius: "10px",
                                            }}
                                            text="PUBLIC"
                                            hoverColor="gray"
                                            clickColor="black"
                                            onClick={() => setVisible("public")}
                                        />
                                    </div>
                                </div>


                                <div className="modify-option">
                                    <div className="option-text">MODIFY</div>
                                    <div style={{display:'flex'}}>
                                        <EyeButton 
                                            style={{    
                                                height : "5vh",
                                                width: "12vw",
                                                backgroundColor: "gainsboro",
                                                border: "none",
                                                borderRadius: "10px",
                                            }}
                                            text="MODIFY"
                                            hoverColor="gray"
                                            clickColor="black"
                                            onClick={() => {}}
                                        />
                                        <EyeButton 
                                            style={{    
                                                height : "5vh",
                                                width: "12vw",
                                                backgroundColor: "gainsboro",
                                                border: "none",
                                                borderRadius: "10px",
                                            }}
                                            text="DRAW OVER"
                                            hoverColor="gray"
                                            clickColor="black"
                                            onClick={() => {}}
                                        />
                                    </div>
                                </div>
                                <div className="modify-option">
                                    <div className="option-text" style={{color :"red"}}>WARNING</div>
                                    <div style={{display:'flex'}}>
                                        <EyeButton 
                                            style={{    
                                                height : "5vh",
                                                width: "12vw",
                                                backgroundColor: "gainsboro",
                                                border: "none",
                                                borderRadius: "10px",
                                            }}
                                            text="DELETE"
                                            hoverColor="red"
                                            clickColor="black"
                                            onClick={() => {}}
                                        />
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <div className="other-eyetist-option" style={{marginTop:"5%"}}>
                                    <div className="other-eyetist-info-text">Eyetist : {props.clickedImageInfo.eyeTist}</div>
                                </div>
                                <div className="other-eyetist-option">
                                    <div className="other-eyetist-info-text">Title : {props.clickedImageInfo.title}</div>
                                </div>
                                <div className="other-eyetist-option">
                                    <div className="other-eyetist-info-text">Likes : {props.clickedImageInfo.likes}</div>
                                </div>
                                <div className="other-eyetist-option">
                                    <div className="other-eyetist-info-text">Date : {props.clickedImageInfo.date}</div>
                                </div>
                                <div className="other-eyetist-option">
                                    <div style={{display:'flex'}}>
                                        <EyeButton 
                                            style={{    
                                                height : "5vh",
                                                width: "24vw",
                                                backgroundColor: "gainsboro",
                                                border: "none",
                                                borderRadius: "10px",
                                            }}
                                            text="DOWNLOAD"
                                            hoverColor="gray"
                                            clickColor="black"
                                            onClick={() => {download()}}
                                        />
        
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
                <div style={{float:'right'}}>
                {
                    nameFocused ?
                    <EyeKeyboard 
                        inputState = {inputName}
                        setInputState = {setInputName}
                        setShow = {setNameFocused}
                        inputRef = {nameRef}
                    />
                    :
                    <></>
                }
                </div>
            </div>
            </div>
        </div>
    )
}


export default ModifyCard