import EyeButton from "../atoms/EyeButton"
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai"
import { useCanvas } from "../canvas/CanvasContext";
import { useRecoilState, useRecoilValue } from "recoil";
import { LINE_WIDTH, STROKE_COLOR } from "../../recoil/Atoms";
import { useEffect } from "react";

const widthControllButtonSize = window.innerWidth / 10 / 7;

const WidthSelection=()=>{
    const { setWidth } = useCanvas()
    let [lineWidth, setLineWidth] = useRecoilState(LINE_WIDTH)
    let strokeColor = useRecoilValue(STROKE_COLOR)

    function clickWidthPlusButton(){
        if (lineWidth < 30){
            setLineWidth(lineWidth + 1)
        }
    }

    function clickWidthMinusButton(){
        if (lineWidth > 1){
            setLineWidth(lineWidth - 1)
        }
    }

    useEffect( () => {
        setWidth(lineWidth)
    }, [lineWidth])

    return(
        <div style={{width:"100%", borderRadius:"10px", marginBottom:"10px"}}>
            <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                Width :
                <EyeButton 
                    style={{width:widthControllButtonSize, height:widthControllButtonSize, borderRadius:widthControllButtonSize, fontSize:widthControllButtonSize, backgroundColor:"white", color:"black", marginLeft:"10px", marginRight:"10px"}}
                    text={<AiFillMinusCircle />}
                    hoverFontColor="pink"
                    clickColor="black"
                    onClick={() => clickWidthMinusButton()}
                />

                {lineWidth}

                <EyeButton 
                    style={{width:widthControllButtonSize, height:widthControllButtonSize, borderRadius:widthControllButtonSize, fontSize:widthControllButtonSize, backgroundColor:"white", color:"black", marginLeft:"10px"}}
                    text={<AiFillPlusCircle />}
                    hoverFontColor="pink"
                    clickColor="black"
                    onClick={() => clickWidthPlusButton()}
                />
            </div>
            <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                <div style={{width:"70%", height:lineWidth, backgroundColor:strokeColor, borderRadius:lineWidth}} />
            </div>
        </div>
    )
}

export default WidthSelection;