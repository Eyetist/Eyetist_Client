import React, {useEffect, useState, useRef} from 'react';
import EyeImageCard from '../atoms/EyeImageCard';
import { motion } from "framer-motion"
import { Picture } from '../../models/model/Picture';
import { PictureViewModel } from '../../models/view-model/PictureViewModel';
import { getOthersPictures, getTopsLikesPictures, getWeeklyLikesPictures ,getOtherPicturesCount } from '../../api/member/MemberAPI';
import './Gallery.css'

const picture = new Picture();
const pictureViewModel = new PictureViewModel(picture);

const OthersGallery = (props) => {
    let [publicPictures, setPublicPictures] = useState([])
    let [displayPublicPictures, setDisplayPublicPictures] = useState([])
    let [galleryUpdateState, setGalleryUpdateState] = useState("")

    async function modelUpdate(data){
        pictureViewModel.update(data)
    }

    async function setPicture(){
        setPublicPictures(pictureViewModel.getAll())
    }

    // useEffect( () => {
    //     getOtherPicturesCount()
    //     .then((res) => {
    //         props.setImageCount(res.data)
    //     })
    // }, [])

    useEffect( () => {
        props.imageCardActionRef.current = props.modifyCardOpen
    }, [props.modifyCardOpen])

    useEffect( () => {
        if (props.modifyCardOpen){
            props.setModifyCardOpen(false)
        }
        switch(props.publicGalleryMode){
            case "public":
                getOtherPicturesCount()
                .then((res) => {
                    props.setImageCount(res.data)
                })
                getOthersPictures("public", props.page, localStorage.getItem("loginMemberId"))
                .then( (res) => {
                    modelUpdate(res.data)
                    .then(() => {
                        setPicture()
                    })
                })
                break
            case "weekly":
                props.setImageCount(10)
                getWeeklyLikesPictures("public", props.page, localStorage.getItem("loginMemberId"))
                .then( (res) => {
                    modelUpdate(res.data)
                    .then(() => {
                        setPicture()
                    })
                })
                break
            case "rank":
                getOtherPicturesCount()
                .then((res) => {
                    props.setImageCount(res.data)
                })
                getTopsLikesPictures("public", props.page, localStorage.getItem("loginMemberId"))
                .then( (res) => {
                    modelUpdate(res.data)
                    .then(() => {
                        setPicture()
                    })
                })
                break
        }
    },[props.isMyGallery, props.page, props.publicGalleryMode, galleryUpdateState])

    useEffect( () => {
        if (props.modifyCardOpen){
            props.setModifyCardOpen(false)
        }
        let publicPicturesDiv = []
        publicPictures.map( (picture, index) => {
            publicPicturesDiv.push(
                <EyeImageCard
                    key={index}
                    blobName={picture.blobName}
                    azureBlobName={picture.azureBlobName}
                    likesBlobName={picture.likesBlobName}
                    eyeTist={picture.member}
                    title={picture.title}
                    likes={picture.likes}
                    imageLink={picture.link}
                    visibility={picture.visibility}
                    date={picture.date}
                    heart={picture.heart}
                    setGalleryUpdateState = {setGalleryUpdateState}
                    setClickedImageInfo = {props.setClickedImageInfo}
                    setModifyCardOpen = {props.setModifyCardOpen}
                    imageCardActionRef = {props.imageCardActionRef}   
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