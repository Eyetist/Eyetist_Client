import React, {useEffect, useState} from 'react';
import EyeButton from '../atoms/EyeButton';
import EyeImageCard from '../atoms/EyeImageCard';
import { motion, useAnimationControls } from "framer-motion"
import { Picture } from '../../models/model/Picture';
import { PictureViewModel } from '../../models/view-model/PictureViewModel';
import { getDummyPictures } from '../../pages/DummyData';
import './Gallery.css'

const picture = new Picture();
const pictureViewModel = new PictureViewModel(picture);
const MemberId = "test1"

const MyGallery = (props) => {
    let [privatePictures, setPrivatePictures] = useState([])
    let [publicPictures, setPublicPictures] = useState([])
    let [displayPrivatePictures, setDisplayPrivatePictures] = useState([])
    let [displayPublicPictures, setDisplayPublicPictures] = useState([])
    let [privatePictureCount, setPrivatePictureCount] = useState(0)
    let [publicPictureCount, setPublicPictureCount] = useState(0)

    const privateControls = useAnimationControls()
    const publicControls = useAnimationControls()

    async function modelUpdate(){
        pictureViewModel.update(getDummyPictures())
    }

    async function setPicture(){
        setPrivatePictures(pictureViewModel.getPictures(MemberId, "private"))
        setPublicPictures(pictureViewModel.getPictures(MemberId, "public"))
    }

    useEffect( () => {
        modelUpdate()
        .then( () => {
            setPicture()
            .then( () => {
                let privatePicturesDiv = []
                let publicPicturesDiv = []
        
                privatePictures.map( (picture, index) => {
                    privatePicturesDiv.push(
                        <EyeImageCard
                            key={index}
                            imageLink={picture.link}
                        />
                    )
                    setPrivatePictureCount(privatePictureCount + 1)
                })
    
                publicPictures.map( (picture, index) => {
                    publicPicturesDiv.push(
                        <EyeImageCard
                            key={index}
                            imageLink={picture.link}
                        />
                    )
                    setPublicPictureCount(publicPictureCount + 1)
                })
    
                setDisplayPrivatePictures([...privatePicturesDiv])
                setDisplayPublicPictures([...publicPicturesDiv])
            })
        })
    },[props.isMyGallery, privatePictures, publicPictures])


    useEffect( () => {
        if(props.visibility === "private"){
            privateControls.start({
                x: [-window.innerWidth / 2, 0],
                transition: { duration: 1 }
            })
        }
        else{
            publicControls.start({
                x: [window.innerWidth / 2, 0],
                transition: { duration: 1 }
            })
        }
    },[props.visibility])
    
    return (
        <div>
            {
                props.visibility === "private" ?
                <>
                    <motion.div animate={privateControls} className='picture-container'>
                        {displayPrivatePictures}
                    </motion.div >
                </>
                :
                <>
                    <motion.div animate={publicControls} className='picture-container'>
                        {displayPublicPictures}
                    </motion.div >
                </>
            }
        </div>
    )

};

export default MyGallery;