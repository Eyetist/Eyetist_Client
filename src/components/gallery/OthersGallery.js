import React, {useEffect, useState} from 'react';
import EyeImageCard from '../atoms/EyeImageCard';
import { motion } from "framer-motion"
import { Picture } from '../../models/model/Picture';
import { PictureViewModel } from '../../models/view-model/PictureViewModel';
import { getDummyPictures } from '../../pages/DummyData';
import './Gallery.css'

const picture = new Picture();
const pictureViewModel = new PictureViewModel(picture);
const MemberId = "test1"

const OthersGallery = (props) => {
    let [privatePictures, setPrivatePictures] = useState([])
    let [publicPictures, setPublicPictures] = useState([])
    let [displayPrivatePictures, setDisplayPrivatePictures] = useState([])
    let [displayPublicPictures, setDisplayPublicPictures] = useState([])
    let [privatePictureCount, setPrivatePictureCount] = useState(0)
    let [publicPictureCount, setPublicPictureCount] = useState(0)

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

    return (
        <motion.div 
            animate={{
                x: [window.innerWidth / 2, 0],
                transition: { duration: 1 }
            }} 
            className='picture-container'
        >
            {displayPublicPictures}
        </motion.div>
    )

};

export default OthersGallery;