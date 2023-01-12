import EyeButton from "../atoms/EyeButton"
import ColorButton from "../atoms/ColorButton";
import WidthSelection from "./WidthSelection";
import { useEffect, useState } from "react";
import { useRecoilValue,useRecoilState } from "recoil";
import { STROKE_COLOR, CURRENT_FUNCTION } from "../../recoil/Atoms";
import * as ColorCode from './ColorCode'
import { RiEraserFill } from "react-icons/ri"
import { BsPencilFill, BsZoomIn, BsZoomOut, BsPaintBucket } from "react-icons/bs"


const ColorSelection=()=>{
    let [strokeColor, setStrokeColor] = useRecoilState(STROKE_COLOR)
    let [colorButtonList, setColorButtonList] = useState([]);
    let currentFunction = useRecoilValue(CURRENT_FUNCTION)
    let [showMode, setShowMode] = useState()

    useEffect( () => {
        switch(currentFunction){
            case "draw":
                setShowMode(<BsPencilFill />)
                break
            case "erase":
                setShowMode(<RiEraserFill />)
                break
            case "fill":
                setShowMode(<BsPaintBucket />)
                break
            case "zoom in":
                setShowMode(<BsZoomIn />)
                break
            case "zoom out":
                setShowMode(<BsZoomOut />)
                break
        }
    }, [currentFunction])

    useEffect( () => {
        setColorButtonList([])
        let allColorCodes = []

        allColorCodes.push(ColorCode.RedColors())
        allColorCodes.push(ColorCode.OrangeColors())
        allColorCodes.push(ColorCode.YellowColors())
        allColorCodes.push(ColorCode.GreenColors())
        allColorCodes.push(ColorCode.BlueColors())
        allColorCodes.push(ColorCode.IndigoColors())
        allColorCodes.push(ColorCode.PurpleColors())
        allColorCodes.push(ColorCode.GreyColors())

        allColorCodes.map( (color, index) => {
            let colorButtons = []
            color.map( (code) => {
                colorButtons.push(
                    <ColorButton
                        key={code.key}
                        style={{
                            width: window.innerWidth / 10 / 5, 
                            height: window.innerWidth / 10 / 5, 
                            borderRadius: window.innerWidth / 10 / 5, 
                            backgroundColor: code.color, 
                            margin:"2px",
                            boxShadow: "0 0 0 2px rgb(32, 33, 35) inset"
                        }}
                        hoverBoxShadow="0 0 0 0px rgb(32, 33, 35) inset"
                        clickBoxShadow="0 0 0 4px white inset"
                        color={code.color}
                        setStrokeColor={setStrokeColor}
                    />
                )
            })
            setColorButtonList(prevList => [...prevList, <div key={index}>{[...colorButtons]}</div>])
        })
    }, [])

    return(
        <div style={{width: "100%", height:"100%"}}>
            <div style={{color:"white", display:"flex", lineHeight:"40px", alignItems:"center", justifyContent:"center", borderBottom:"1px solid #B4A5A5"}}>
                <div>
                    Mode : 
                </div>
                <div style={{marginLeft:"5px"}}>
                    {showMode} 
                </div>
            </div>
            {
                currentFunction === "draw" ? 
                <div style={{color:"white", display:"flex", lineHeight:"40px", alignItems:"center", justifyContent:"center", borderBottom:"1px solid #B4A5A5"}}>
                    <WidthSelection />
                </div>
                :
                <></>
            }
            <div style={{color:"white", display:"flex", lineHeight:"40px", alignItems:"center", justifyContent:"center"}}>
                Stroke Color
                <EyeButton 
                    style={{width:window.innerWidth / 10 / 7, height: window.innerWidth / 10 / 7, borderRadius: window.innerWidth / 10 / 7, backgroundColor:strokeColor, margin:"5px"}}
                    text=""
                    hoverColor={strokeColor}
                    clickColor={strokeColor}
                    onClick={() => {}}
                />
            </div>
    
            <div style={{display:"flex", alignItems:"center", justifyContent:"center", backgroundColor:"rgb(32, 33, 35)", borderRadius:"10px", paddingTop:'10px', paddingBottom:'10px'}}>
                { colorButtonList }
            </div>
        </div>
    )
}

export default ColorSelection;