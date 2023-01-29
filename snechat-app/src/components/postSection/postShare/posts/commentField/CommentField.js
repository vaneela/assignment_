import React, { useState } from 'react'
import '../post/Post.css'
import { useDispatch, useSelector } from 'react-redux';
import { uploadComment } from '../../../../../actions/UploadActions';

const CommentField = ({data,commentField,setCommentField}) => {
    const { user } = useSelector((state) => state.AuthReducer.authData);
    const servePublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const [reload, setReload] = useState(false);
    const [showCommentField, setShowCommentField] = useState(true);
    const dispatch = useDispatch();

    const reSizeTextArea = (e) => {
        e.target.style.height = '16px';
        e.target.style.height = e.target.scrollHeight + 'px';
    }
    const handleComment = async (e, action) => {
        switch (action.type) {
            case 'save':
                const comment = document.getElementsByClassName('comment-input')[0].value;
                if (comment) {
                    const newComment = {
                        userId: user._id,
                        postId: data._id,
                        comment: comment
                    }
                    await dispatch(uploadComment(newComment));
                    document.getElementsByClassName('comment-input')[0].value = "";
                    setReload((prev) => !prev);
                }
                break;
            default:
                break;
        }
    }
    return (
        <div className='comment-field-cont'>
            <img className='user-image' src={data.authorImage ? servePublic + data.authorImage : servePublic + 'defaultProfileImage.jpg'} alt=''></img>
            <div className='comment-field'>
                <textarea type='text' className='comment-input' onChange={(e) => reSizeTextArea(e)} rows='1'></textarea>
                <span name='save' onClick={(e) => handleComment(e, { type: 'save' })} >Save</span>
                <span name='cancel' onClick={() => setCommentField(prev => !prev)} >Cancel</span>
            </div>
        </div>
    )
}

export default CommentField