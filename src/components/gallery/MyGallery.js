import React, {useEffect, useState, useRef} from 'react';
import EyeImageCard from '../atoms/EyeImageCard';
import { motion, useAnimationControls } from "framer-motion"
import { Picture } from '../../models/model/Picture';
import { PictureViewModel } from '../../models/view-model/PictureViewModel';
import { getMyPictures } from '../../api/member/MemberAPI';
import './Gallery.css'

const picture = new Picture();
const pictureViewModel = new PictureViewModel(picture);

const MyGallery = (props) => {
    let [privatePictures, setPrivatePictures] = useState([])
    let [publicPictures, setPublicPictures] = useState([])
    let [displayPrivatePictures, setDisplayPrivatePictures] = useState([])
    let [displayPublicPictures, setDisplayPublicPictures] = useState([])
    let [privatePictureCount, setPrivatePictureCount] = useState(0)
    let [publicPictureCount, setPublicPictureCount] = useState(0)
    let [galleryUpdateState, setGalleryUpdateState] = useState("")

    const privateControls = useAnimationControls()
    const publicControls = useAnimationControls()

    async function modelUpdate(data){
        pictureViewModel.update(data)
    }

    async function setPicture(){
        setPrivatePictures(pictureViewModel.getPictures(localStorage.getItem('loginMemberId'), "private"))
        setPublicPictures(pictureViewModel.getPictures(localStorage.getItem('loginMemberId'), "public"))
    }

    useEffect( () => {
        props.imageCardActionRef.current = props.modifyCardOpen
    }, [props.modifyCardOpen])

    useEffect( () => {
        if (props.modifyCardOpen){
            props.setModifyCardOpen(false)
        }
        getMyPictures(localStorage.getItem('loginMemberId'),)
        .then( (res) => {
            if (res.status !== 200) return
            modelUpdate(res.data)
            .then( () => {
                setPicture()
            })
        })
    },[props.isMyGallery, galleryUpdateState, props.modifyUpdateState])

    useEffect( () => {
        if (props.modifyCardOpen){
            props.setModifyCardOpen(false)
        }
        setPrivatePictureCount(privatePictures.length)
        setPublicPictureCount(publicPictures.length)
        let privatePicturesDiv = []
        let publicPicturesDiv = []

        privatePictures.map( (picture, index) => {
            if (props.page * 10 <= index && index < (props.page + 1) * 10){
                privatePicturesDiv.push(
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
            }
        })
        setDisplayPrivatePictures([...privatePicturesDiv])

        publicPictures.map( (picture, index) => {
            if (props.page * 10 <= index && index < (props.page + 1) * 10){
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
            }
        })
        setDisplayPublicPictures([...publicPicturesDiv])

    }, [props.page, publicPictures, privatePictures])

    useEffect( () => {
        if (props.modifyCardOpen){
            props.setModifyCardOpen(false)
        }
        if(props.visibility === "private"){
            props.setImageCount(privatePictureCount)
        }
        else{
            props.setImageCount(publicPictureCount)
        }
    }, [privatePictureCount, publicPictureCount])

    useEffect( () => {
        if (props.modifyCardOpen){
            props.setModifyCardOpen(false)
        }
        if(props.visibility === "private"){
            props.setImageCount(privatePictureCount)
            privateControls.start({
                x: [-window.innerWidth / 2, 0],
                transition: { duration: 1 }
            })
        }
        else{
            props.setImageCount(publicPictureCount)
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