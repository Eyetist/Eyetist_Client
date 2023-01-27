import React, { useEffect, useRef, useState } from "react"
import EyeButton from "../components/atoms/EyeButton"
import EyeKeyboard from "../components/keyboard/EyeKeyboard"
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { sendCanvas } from "../api/member/MemberAPI"
import './CanvasSave.css'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const CanvasSave = (props) => {
    const optionContainerRef = useRef("")

    const nameRef = useRef(null)
    const [inputName, setInputName] = useState("")
    const [nameFocused, setNameFocused] = useState(false)
    const onNameFocus = () => setNameFocused(true)
    const onNameBlur = () => setNameFocused(false)

    const [extention, setExtention] = useState()
    const [visible, setVisible] = useState()

    const [pngButtonColor, setPngButtonColor] = useState("gray")
    const [jpegButtonColor, setJpegButtonColor] = useState("gainsboro")
    const [svgButtonColor, setSvgButtonColor] = useState("gainsboro")
    const [privateButtonColor, setPrivateButtonColor] = useState("gray")
    const [publicButtonColor, setPublicButtonColor] = useState("gainsboro")

    const [openSaveSuccess, setOpenSaveSuccess] = useState(false)
    const [openSaveFail, setOpenSaveFail] = useState(false)
    const [openSaveOngoing, setOpenSaveOngoing] = useState(false)

    useEffect(() => {
        setExtention("png")
        setVisible("private")
        setInputName(props.inputName);
    }, []);

    function ClickPngButton(){
        setNameFocused(false)
        nameRef.current.blur()
        setPngButtonColor("gray")
        setJpegButtonColor("gainsboro")
        setSvgButtonColor("gainsboro")
        setExtention("png")
    }

    function ClickJpegButton(){
        setNameFocused(false)
        nameRef.current.blur()
        setPngButtonColor("gainsboro")
        setJpegButtonColor("gray")
        setSvgButtonColor("gainsboro")
        setExtention("jpeg")
    }

    function ClickSvgButton(){
        setNameFocused(false)
        nameRef.current.blur()
        setPngButtonColor("gainsboro")
        setJpegButtonColor("gainsboro")
        setSvgButtonColor("gray")
        setExtention("svg+xml")
    }

    function ClickPrivateButton(){
        setNameFocused(false)
        nameRef.current.blur()
        setPrivateButtonColor("gray")
        setPublicButtonColor("gainsboro")
        setVisible("private")
    }

    function ClickPublicButton(){
        setNameFocused(false)
        nameRef.current.blur()
        setPrivateButtonColor("gainsboro")
        setPublicButtonColor("gray")
        setVisible("public")
    }

    function downloadCanvas(){
        const image = (props.link).replace("image/png", "image/" + extention)
        const link = document.createElement("a");
        link.href = image;
        link.download = inputName;
        link.click();
    }

    function saveToServer() {
        if(inputName === ""){
            setOpenSaveFail(true)
            setTimeout(function(){
                setOpenSaveFail(false)
            }, 1000)
        }
        else{
            setOpenSaveOngoing(true)
            sendCanvas(localStorage.getItem('loginMemberId'), inputName, props.link, visible, 0)
            .then( (res) => {
                if (res.status === 200){
                    setOpenSaveOngoing(false)
                    setOpenSaveSuccess(true)
                    setTimeout(function(){
                        setOpenSaveSuccess(false)
                    }, 2000)
                    props.setBlobName(res.data);
                    props.setInputName(inputName);
                }
            })
        }
    }

    return(
        <div className="canvas-save-container">
            <div className="canvas-save-top-bar">
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
                    onClick={() => props.setIsOpen(false)}
                />
            </div>
            <div className="canvas-save-body-container">
                <div style={{display:'flex'}}>
                    <div className="canvas-save-image-container">
                        <img style={{width:"100%", height:'400px'}} src={props.link}/>
                    </div>
                    <div className="canvas-save-option-container">
                        <div className="option-container" ref={optionContainerRef}>
                            <div className="option-text">NAME</div>
                            <div style={{width:"100%", height:"100%"}}>
                                <EyeButton 
                                    style={{  
                                        height : optionContainerRef.current && optionContainerRef.current.clientHeight / 2,
                                        width: optionContainerRef.current && optionContainerRef.current.clientWidth,
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

                        <div className="option-container">
                            <div className="option-text">EXTENTION</div>
                            <div style={{display:'flex'}}>
                                <EyeButton 
                                    style={{    
                                        height : optionContainerRef.current && optionContainerRef.current.clientHeight / 2,
                                        width: optionContainerRef.current && optionContainerRef.current.clientWidth / 3,
                                        backgroundColor: pngButtonColor,
                                        border: "none",
                                        borderRadius: "10px",
                                    }}
                                    text="PNG"
                                    hoverColor="gray"
                                    clickColor="black"
                                    onClick={() => ClickPngButton()}
                                />
                                <EyeButton 
                                    style={{    
                                        height : optionContainerRef.current && optionContainerRef.current.clientHeight / 2,
                                        width: optionContainerRef.current && optionContainerRef.current.clientWidth / 3,
                                        backgroundColor: jpegButtonColor,
                                        border: "none",
                                        borderRadius: "10px",
                                    }}
                                    text="JPEG"
                                    hoverColor="gray"
                                    clickColor="black"
                                    onClick={() => ClickJpegButton()}
                                />
                                <EyeButton 
                                    style={{    
                                        height : optionContainerRef.current && optionContainerRef.current.clientHeight / 2,
                                        width: optionContainerRef.current && optionContainerRef.current.clientWidth / 3,
                                        backgroundColor: svgButtonColor,
                                        border: "none",
                                        borderRadius: "10px",
                                    }}
                                    text="SVG"
                                    hoverColor="gray"
                                    clickColor="black"
                                    onClick={() => ClickSvgButton()}
                                />
                            </div>
                        </div>

                        <div className="option-container">
                            <div className="option-text">VISIBLE</div>
                            <div style={{display:'flex'}}>
                                <EyeButton 
                                    style={{    
                                        height : optionContainerRef.current && optionContainerRef.current.clientHeight / 2,
                                        width: optionContainerRef.current && optionContainerRef.current.clientWidth / 2,
                                        backgroundColor: privateButtonColor,
                                        border: "none",
                                        borderRadius: "10px",
                                    }}
                                    text="PRIVATE"
                                    hoverColor="gray"
                                    clickColor="black"
                                    onClick={() => ClickPrivateButton()}
                                />
                                <EyeButton 
                                    style={{    
                                        height : optionContainerRef.current && optionContainerRef.current.clientHeight / 2,
                                        width: optionContainerRef.current && optionContainerRef.current.clientWidth / 2,
                                        backgroundColor: publicButtonColor,
                                        border: "none",
                                        borderRadius: "10px",
                                    }}
                                    text="PUBLIC"
                                    hoverColor="gray"
                                    clickColor="black"
                                    onClick={() => ClickPublicButton()}
                                />
                            </div>
                        </div>


                        <div className="option-container">
                            <div className="option-text">SAVE</div>
                            <div style={{display:'flex'}}>
                                <EyeButton 
                                    style={{    
                                        height : optionContainerRef.current && optionContainerRef.current.clientHeight / 2,
                                        width: optionContainerRef.current && optionContainerRef.current.clientWidth / 2,
                                        backgroundColor: "gainsboro",
                                        border: "none",
                                        borderRadius: "10px",
                                    }}
                                    text="SAVE AS"
                                    hoverColor="gray"
                                    clickColor="black"
                                    onClick={() => saveToServer()}
                                />
                                <EyeButton 
                                    style={{    
                                        height : optionContainerRef.current && optionContainerRef.current.clientHeight / 2,
                                        width: optionContainerRef.current && optionContainerRef.current.clientWidth / 2,
                                        backgroundColor: "gainsboro",
                                        border: "none",
                                        borderRadius: "10px",
                                    }}
                                    text="DOWNLOAD"
                                    hoverColor="gray"
                                    clickColor="black"
                                    onClick={() => downloadCanvas()}
                                />
                            </div>
                        </div>
                        <BootstrapDialog
                            className="MuiPaper-root"
                            aria-labelledby="customized-dialog-title"
                            open={openSaveFail}
                            onClose={() =>{setOpenSaveFail(false)}}
                        >Please enter a name for the image.</BootstrapDialog>
                        <BootstrapDialog
                            className="MuiPaper-root"                            
                            aria-labelledby="customized-dialog-title"
                            open={openSaveOngoing}
                            onClose={() =>{setOpenSaveOngoing(false)}}
                        >Saving image to server...</BootstrapDialog>
                        <BootstrapDialog
                            className="MuiPaper-root"
                            aria-labelledby="customized-dialog-title"
                            open={openSaveSuccess}
                            onClose={() =>{setOpenSaveSuccess(false)}}
                        >Saving image to server was successful.<br/>Saved images can be viewed in the gallery.</BootstrapDialog>

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
    )
}
export default CanvasSave