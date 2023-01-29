import React, { useState } from 'react'
import './Post.css'
import FavoriteBorderOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import Favorite from '@material-ui/icons/Favorite';
import InsertCommentOutlined from '@material-ui/icons/InsertCommentOutlined';
import ShareOutlined from '@material-ui/icons/ShareOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch, useSelector } from 'react-redux';
import { likePost } from '../../../../../api/PostRequest';
import { deletePost } from '../../../../../actions/DeleteActions';
import { uploadComment } from '../../../../../actions/UploadActions';
import Comments from '../comments/Comments';
import { getTimeLineComments } from '../../../../../actions/GetTimelineComments';
import CommentField from '../commentField/CommentField';


const Post = ({ data }) => {
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const comments = useSelector((state)=>state.CommentReducer.comments[data._id]);
  const servePublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const [liked, setLiked] = useState(data.likes.includes(user?._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [postOption, setPostOption] = useState(false);
  const [commentField, setCommentField] = useState(false);
  const [fetchComments, setFetchComments] = useState(true);
  const [reload, setReload] = useState(false);
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
  const handleLike = () => {
    setLiked((prev) => !prev);
    likePost(data._id, user?._id);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  const handlePostFunction = (action) => {
    setPostOption((prev) => !prev);
    switch (action.type) {
      case 'delete':
        const tempPostId = action.postData._id;
        const tempPostImage = action.postData.image;
        dispatch(deletePost(action.postData._id, user._id));
        break;
      default:
        break;
    }
  }

  const getComments = async (e,postId) => {
    if(e.target.innerText !== "Hide Comments"){
      await dispatch(getTimeLineComments(postId));
      e.target.innerText = "Hide Comments";
    } else {
      await dispatch({type:"CLEAR_COMMENTS",data:postId});
      e.target.innerText = "0 Comments";
    }
    setReload((prev)=>!prev);
  }

  return (
    <div className='post'>
      <div className='post-header'>
        <div className='post-header-bar'>
          <div className='post-author-tag'>
            <img className='post-author-img' src={data.authorImage ? servePublic + data.authorImage : servePublic + 'defaultProfileImage.jpg'} alt='post'></img>
            <div className='post-author-detail'>
              <span className='post-author-username'>{data?.author ? '@' + data?.author : '@author'}</span>
              <span className='post-author-name'>{data?.authorName ? data?.authorName : 'Author'}</span>
            </div>
          </div>
          <div>
            <MoreHorizIcon className='post-option' onClick={() => setPostOption((prev) => !prev)} />
          </div>
        </div>
        <div className='post-options'>
          {postOption &&
            <div className='post-option-list'>
              <span name='delete' onClick={() => handlePostFunction({type:'delete',postData:data})} >Delete</span>
            </div>
          }
        </div>
      </div>
      <img src={data.image ? servePublic + data.image : ""} alt=''></img>
      <div className='post-detail'>
        <span> <b>{data.name}</b></span>
        <span> {data.desc} </span>
      </div>
      <div className='postReact'>
        <div className='post-reactions'>
          <div className='post-like' onClick={handleLike}>
            {liked ? <Favorite id='like-icon' /> : <FavoriteBorderOutlined id='unlike-icon' />}
            <span>{likes} Likes</span>
          </div>
          <div className='post-comment' onClick={() => setCommentField(prev => !prev)}>
            <InsertCommentOutlined />
            <span>Comment</span>
          </div>
          <div className='post-share'>
            <ShareOutlined />
            <span>Share</span>
          </div>
        </div>
        <div className='post-comments'>
          <span onClick={(e)=>getComments(e,data._id)} >0 Comments</span>
        </div>
      </div>
      {commentField &&
        <div className='comment-field-cont'>
        <img className='user-image' src={data.authorImage ? servePublic + data.authorImage : servePublic + 'defaultProfileImage.jpg'} alt=''></img>
        <div className='comment-field'>
            <textarea type='text' className='comment-input' onChange={(e) => reSizeTextArea(e)} rows='1'></textarea>
            <span name='save' onClick={(e) => handleComment(e, { type: 'save' })} >Save</span>
            <span name='cancel' onClick={() => setCommentField(prev => !prev)} >Cancel</span>
        </div>
    </div>
      }
      { comments &&
        comments.map((comment)=>{
        return <Comments data={comment} id={comment._id}/>
      })}
    </div>
  )
}

export default Post