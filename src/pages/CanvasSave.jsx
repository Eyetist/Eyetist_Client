import React, { useEffect, useRef, useState } from "react"
import EyeButton from "../components/atoms/EyeButton"
import EyeKeyboard from "../components/keyboard/EyeKeyboard"
import { useRecoilValue } from "recoil"
import { MOUSE_POS } from "../recoil/Atoms"
import './CanvasSave.css'

const CanvasSave = ({setIsOpen,link}) => {
    let mousePos = useRecoilValue(MOUSE_POS)
    const optionContainerRef = useRef("")
    const nameRef = useRef(null)
    const [inputName, setInputName] = useState("")
    const [nameFocused, setNameFocused] = useState(false)
    const onNameFocus = () => setNameFocused(true)
    const onNameBlur = () => setNameFocused(false)
        
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
                    onClick={() => setIsOpen(false)}
                />
            </div>
            <div className="canvas-save-body-container">
                <div style={{display:'flex'}}>
                    <div className="canvas-save-image-container">
                        <img style={{width:"100%", height:'400px'}} src={link}/>
                    </div>
                    <div className="canvas-save-option-container">
                        <div className="option-container" ref={optionContainerRef}>
                            <div className="option-text">NAME</div>
                            <div style={{width:"100%", height:"100%"}}>
                                <EyeButton 
                                    style={{  
                                        height : optionContainerRef.current.clientHeight / 2,
                                        width: optionContainerRef.current.clientWidth * 0.9,
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
                                        height : optionContainerRef.current.clientHeight / 2,
                                        width: optionContainerRef.current.clientWidth / 2,
                                        backgroundColor: "gainsboro",
                                        border: "none",
                                        borderRadius: "10px",
                                    }}
                                    text="PNG"
                                    hoverColor="gray"
                                    clickColor="inherit"
                                    onClick={() => console.log("PNG")}
                                />
                                <EyeButton 
                                    style={{    
                                        height : optionContainerRef.current.clientHeight / 2,
                                        width: optionContainerRef.current.clientWidth / 2,
                                        backgroundColor: "gainsboro",
                                        border: "none",
                                        borderRadius: "10px",
                                    }}
                                    text="JPG"
                                    hoverColor="gray"
                                    clickColor="inherit"
                                    onClick={() => console.log("JPG")}
                                />
                            </div>
                        </div>

                        <div className="option-container">
                            <div className="option-text">VISIBLE</div>
                            <div style={{display:'flex'}}>
                                <EyeButton 
                                    style={{    
                                        height : optionContainerRef.current.clientHeight / 2,
                                        width: optionContainerRef.current.clientWidth / 2,
                                        backgroundColor: "gainsboro",
                                        border: "none",
                                        borderRadius: "10px",
                                    }}
                                    text="PRIVATE"
                                    hoverColor="gray"
                                    clickColor="inherit"
                                    onClick={() => console.log("PRIVATE")}
                                />
                                <EyeButton 
                                    style={{    
                                        height : optionContainerRef.current.clientHeight / 2,
                                        width: optionContainerRef.current.clientWidth / 2,
                                        backgroundColor: "gainsboro",
                                        border: "none",
                                        borderRadius: "10px",
                                    }}
                                    text="PUBLIC"
                                    hoverColor="gray"
                                    clickColor="inherit"
                                    onClick={() => console.log("PUBLIC")}
                                />
                            </div>
                        </div>


                        <div className="option-container">
                            <div className="option-text">SAVE</div>
                            <div style={{display:'flex'}}>
                                <EyeButton 
                                    style={{    
                                        height : optionContainerRef.current.clientHeight / 2,
                                        width: optionContainerRef.current.clientWidth / 2,
                                        backgroundColor: "gainsboro",
                                        border: "none",
                                        borderRadius: "10px",
                                    }}
                                    text="SAVE"
                                    hoverColor="gray"
                                    clickColor="inherit"
                                    onClick={() => console.log("PRIVATE")}
                                />
                                <EyeButton 
                                    style={{    
                                        height : optionContainerRef.current.clientHeight / 2,
                                        width: optionContainerRef.current.clientWidth / 2,
                                        backgroundColor: "gainsboro",
                                        border: "none",
                                        borderRadius: "10px",
                                    }}
                                    text="DOWNLOAD"
                                    hoverColor="gray"
                                    clickColor="inherit"
                                    onClick={() => console.log("PUBLIC")}
                                />
                            </div>
                        </div>

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