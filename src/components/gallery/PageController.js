import React from "react";
import { useEffect, useState } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs"
import { VscCircleOutline, VscCircleFilled } from "react-icons/vsc"
import EyeButton from "../atoms/EyeButton";

const IMAGE_COUNT = 100;

const PageController = (props) => {

    let [pageButton, setPageButton] = useState([])

    useEffect( () => {
        let pageButtonDiv = []
        if (IMAGE_COUNT > 100){
            pageButtonDiv.push(
                <div style={{fontSize:"40px", backgroundColor:"inherit", color:"pink", paddingLeft:"10px", paddingRight:"5px"}}>
                    {props.page + 1}
                </div>
            )
            pageButtonDiv.push(
                <div style={{fontSize:"40px", backgroundColor:"inherit", color:"pink", paddingRight:"5px"}}>
                    /
                </div>
            )
            pageButtonDiv.push(
                <div style={{fontSize:"40px", backgroundColor:"inherit", color:"pink", paddingRight:"10px"}}>
                    {((IMAGE_COUNT / 10) + 1).toFixed(0)}
                </div>
            )
            setPageButton([...pageButtonDiv])
        }
        else{
            for(let index = 0; index < IMAGE_COUNT / 10; index++){
                pageButtonDiv.push(
                    <EyeButton 
                        style={{fontSize:"40px", backgroundColor:"inherit", color: props.page === index ? "pink" : "black"}}
                        text={props.page === index ? <VscCircleFilled /> : <VscCircleOutline />}
                        clickColor="inherit"
                        hoverFontColor = "pink"
                        onClick={() => {props.setPage(index)}}
                    />
                )
            }
            setPageButton([...pageButtonDiv])
        }
    }, [props.page])

    function clickPagePrevButton(){
        if (props.page > 0){
            props.setPage(props.page - 1)
        }
    }

    function clickPageNextButton(){
        if (props.page < IMAGE_COUNT / 10 - 1){
            props.setPage(props.page + 1)
        }
    }

    return(
        <div style={{display:'flex'}}>
            <EyeButton 
                style={{fontSize:"40px", backgroundColor:"inherit"}}
                text={<BsFillArrowLeftCircleFill />}
                clickColor="inherit"
                hoverFontColor = "pink"
                onClick={() => clickPagePrevButton()}
            />
            {pageButton}
            <EyeButton 
                style={{fontSize:"40px", backgroundColor:"inherit"}}
                text={<BsFillArrowRightCircleFill />}
                clickColor="inherit"
                hoverFontColor = "pink"
                onClick={() => clickPageNextButton()}
            />
        </div>
    )
}

export default PageController;