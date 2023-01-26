import React, {useEffect, useState} from "react";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import EyeMouse from "../components/mouse/EyeMouse";
import FaceMeshCam from "../components/faceMesh/FaseMeshCam";
import EyeCard from "../components/atoms/EyeCard";
import MoveSelections from "../components/functionDetails/MoveSelection";
import { useNavigate } from "react-router-dom";
import ModeSelection from "../components/functionDetails/ModeSelection";
import './StartPage.css'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const StartPage = () =>{
    let navigate = useNavigate();
    const [openTutorial, setOpenTutorial] = useState(false)

    let tutorialContent = [
        "If you want to know how to use drawing tools and gallery, please press the button.",
    ]

    let paintContent = [
        "Use your face to paint picture!",
        "The aesthetic world awaits you."
    ]

    let galleryContent = [
        "Access the gallery and share your pictures with others!"
    ]

    return(
        <div className = "information-main-container">
            <ModeSelection />
            <MoveSelections 
                currentPage = "begin"
            />
            <ul className="lines">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            <EyeMouse />
            <div className="start-page-top-container">
                <div className='gallery-top-buttons'>
                </div>
                <div className = "start-page-title">
                    EyeTist
                </div>
                <div className="start-page-cam">
                    <FaceMeshCam />
                </div>
            </div>

            <div className = "start-page-body-container">
                <div className = "box-container">
                    <EyeCard 
                        style={{
                            width: "30%",
                            height: "100%",
                            backgroundColor: "#f79393",
                            borderRadius: "20px",
                            marginLeft: "30px",
                            marginRight: "30px"
                        }}
                        title="How to play"
                        content={tutorialContent}
                        hoverColor="#f46969"
                        clickColor="#f45555"
                        onClick={() => {
                            setOpenTutorial(true);
                            setTimeout(function(){
                                setOpenTutorial(false);
                            }, 1500)
                        }}
                    />
                    <EyeCard 
                        style={{
                            width: "30%",
                            height: "100%",
                            backgroundColor: "#f79393",
                            borderRadius: "20px",
                            marginLeft: "30px",
                            marginRight: "30px"
                        }}
                        title="Paint"
                        content={paintContent}
                        hoverColor="#f46969"
                        clickColor="#f45555"
                        onClick={() => {
                            navigate('/paint')
                        }}
                    />
                    <EyeCard 
                        style={{
                            width: "30%",
                            height: "100%",
                            backgroundColor: "#f79393",
                            borderRadius: "20px",
                            marginLeft: "30px",
                            marginRight: "30px"
                        }}
                        title="Gallery"
                        content={galleryContent}
                        hoverColor="#f46969"
                        clickColor="#f45555"
                        onClick={() => {
                            navigate('/gallery')
                        }}
                    />
                    <BootstrapDialog
                            aria-labelledby="customized-dialog-title"
                            open={openTutorial}
                            onClose={() =>{setOpenTutorial(false)}}
                        >Tutorial service is not yet ready. <br/> We will start the service soon.</BootstrapDialog>
                </div>
            </div>
        </div>
    );
}
export default StartPage;