import React, {useEffect, useState} from 'react';
import EyeImageCard from '../components/atoms/EyeImageCard';
import { Picture } from "../models/model/Picture";
import { PictureViewModel } from "../models/view-model/PictureViewModel";
import { getDummyPictures } from "./DummyData";
import EyeMouse from '../components/mouse/EyeMouse';
import FaceMeshCam from '../components/faceMesh/FaseMeshCam';
import './EyeGallery.css'

const picture = new Picture();
const pictureViewModel = new PictureViewModel(picture);

const EyeGallery = () => {
    const MemberId = "test1"
    let [pictureUpdateState, setPictureUpdateState] = useState(false)
    let [privatePictures, setPrivatePictures] = useState([])
    let [publicPictures, setPublicPictures] = useState([])
    let [displayPictures, setDisplayPictures] = useState([])

    useEffect( () => {
        pictureViewModel.update(getDummyPictures())
        setPictureUpdateState(true)
    },[])

    useEffect( () => {
        if (pictureUpdateState) {
            setPrivatePictures(pictureViewModel.getPictures(MemberId, "private"))
            setPublicPictures(pictureViewModel.getPictures(MemberId, "public"))
        }
    }, [pictureUpdateState])

    useEffect( () => {
        if(pictureUpdateState){
            let pictures = []
            console.log(privatePictures)
    
            privatePictures.map( (picture) => {
                pictures.push(
                    <EyeImageCard
                        key={picture.blobName}
                        imageLink={picture.link}
                    />
                )
            })
            setDisplayPictures([...pictures])
        }
    }, [privatePictures, publicPictures])

    console.log(displayPictures)

    return (
        <div className = "main-container">
            <EyeMouse />
            <div className="picture-top-container">
                <div className = "picture-title">
                    Gallery
                </div>
                <div className="picture-cam">
                    <FaceMeshCam />
                </div>
            </div>

            <div className='picture-container'>
                {displayPictures}
            </div>
        </div>
    );
};

export default EyeGallery;