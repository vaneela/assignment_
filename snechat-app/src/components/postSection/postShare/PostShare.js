import React, { useRef, useState } from 'react'
import './PostShare.css'
import InsertPhotoOutlined from '@material-ui/icons/InsertPhotoOutlined';
import OndemandVideoOutlined from '@material-ui/icons/OndemandVideoOutlined';
import LocationOnOutlined from '@material-ui/icons/LocationOnOutlined';
import DateRangeOutlined from '@material-ui/icons/DateRangeOutlined';
import CloseOutlined from '@material-ui/icons/CloseOutlined';
import { useDispatch, useSelector } from 'react-redux'; 
import { uploadImage, uploadPost } from '../../../actions/UploadActions';

const PostShare = () => {
    const servePublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const isLoading = useSelector((state)=>state.PostReducer.uploading);
    const [image, setImage] = useState(null);
    const imageRef = useRef();
    const descRef = useRef();
    const dispatch = useDispatch();
    const {user} = useSelector((state)=>state.AuthReducer.authData);
    const onImageChange = (event)=>{
        if(event.target.files && event.target.files[0]){
            let img = event.target.files[0];
            setImage(img);
        }
    }

    const HandleSubmit = (e)=>{
        e.preventDefault();
        const newPost  = {
            userId:user._id,
            author:user.username,
            authorName: user.firstname+' '+user.lastname,
            authorImage:user.profileImage,
            desc : descRef.current.value
        }
        if(image){
            const data = new FormData();
            const fileName = Date.now()+'_'+user._id+'_'+image.name;
            data.append("name",fileName);
            data.append("file",image);
            newPost.username= 
            newPost.userFullName=
            newPost.userProfileImage=
            newPost.image = fileName;
            console.log(newPost);
            try {
                dispatch(uploadImage(data));
            } catch (error) {
                console.log(error);
            }
        }
        dispatch(uploadPost(newPost));
        reset(); 
    }

    const reset = ()=>{
        setImage(null);
        descRef.current.value = ""; 
    }

    return (
        <div className='postShare'>
            <div className='postInput'>
                <img src={user?.profileImage ? servePublic + user.profileImage : servePublic + "defaultProfileImage.jpg"} alt=''></img>
                <input ref={descRef} required type='text' placeholder="What's Happening?"></input>
            </div>
            <div className='postOptions'>
                <div className='postOption' style={{ color: "var(--photo)" }} onClick={()=>{imageRef.current.click()}}>
                    <InsertPhotoOutlined />
                    Photo
                </div>
                <div className='postOption' style={{ color: "var(--video)" }}>
                    <OndemandVideoOutlined />
                    Video
                </div>
                <div className='postOption' style={{ color: "var(--location)" }}>
                    <LocationOnOutlined />
                    Location
                </div>
                <div className='postOption' style={{ color: "var(--shedule)" }}>
                    <DateRangeOutlined />
                    Schedule
                </div>
                <button className='button postShare-btn' disabled = {isLoading} onClick={HandleSubmit} >
                    {isLoading?"Sharing...":"Share"}
                </button>
                <div className='postUpload' style={{display:'none'}}>
                    <input type="file" name='image' ref={imageRef} onChange={onImageChange}></input>
                </div>
            </div>
            {image &&(
                <div className='previewImage'>
                    <CloseOutlined onClick={() => setImage(null)} />
                    <img src={URL.createObjectURL(image)} alt=''></img>
                </div>
            )}
        </div>
    )
}

export default PostShare
