import React, {useEffect, useState} from 'react';
import EyeImageCard from '../atoms/EyeImageCard';
import { motion } from "framer-motion"
import { Picture } from '../../models/model/Picture';
import { PictureViewModel } from '../../models/view-model/PictureViewModel';
import { getOthersPictures, getOtherPicturesCount } from '../../api/member/MemberAPI';
import './Gallery.css'

const picture = new Picture();
const pictureViewModel = new PictureViewModel(picture);

const OthersGallery = (props) => {
    let [publicPictures, setPublicPictures] = useState([])
    let [displayPublicPictures, setDisplayPublicPictures] = useState([])

    async function modelUpdate(data){
        pictureViewModel.update(data)
    }

    async function setPicture(){
        setPublicPictures(pictureViewModel.getAll())
    }

    useEffect( () => {
        getOtherPicturesCount()
        .then((res) => {
            props.setImageCount(res.data)
        })
    }, [])

    useEffect( () => {
        getOthersPictures("public", props.page)
        .then( (res) => {
            modelUpdate(res.data)
            .then(() => {
                setPicture()
            })
        })
    },[props.isMyGallery, props.page])

    useEffect( () => {
        let publicPicturesDiv = []
        publicPictures.map( (picture, index) => {
            publicPicturesDiv.push(
                <EyeImageCard
                    key={index}
                    eyeTist={picture.member}
                    title={picture.title}
                    likes={picture.likes}
                    imageLink={picture.link}
                    visibility={picture.visibility}
                    date={picture.date}
                />
            )
        })
        setDisplayPublicPictures([...publicPicturesDiv])
    }, [publicPictures])


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