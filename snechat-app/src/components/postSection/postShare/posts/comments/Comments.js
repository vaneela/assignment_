import React, { useState } from 'react'
import '../post/Post.css'
import '../comments/Comments.css'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../../../../actions/DeleteActions';

const Comments = (comment) => {
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const servePublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const [commentOption, setCommentOption] = useState(false);
  const [commentEditable, setCommentEditable] = useState(true);
  const dispatch = useDispatch();

  const reSizeTextArea = (e) => {
    console.log(e.target.scrollHeight);
    e.target.style.height = '16px';
    e.target.style.height = e.target.scrollHeight + 'px';
  }

  const handleCommentFunction = (e, action) => {

    switch (action.type) {
      case 'edit':
        setCommentOption((prev) => !prev);
        setCommentEditable((prev) => !prev);
        break;
      case 'update':
        setCommentOption((prev) => !prev);
        setCommentEditable((prev) => !prev);
        break;
      case 'delete':
        setCommentOption((prev) => !prev);
        setCommentEditable((prev) => !prev);
        dispatch(deleteComment(action.commentId));
        break;

      default:
        break;
    }
  }
      return (
        <div className='comment-cont'>
              <img className='commentor-image' src={comment.data?.commenterImage ? servePublic + comment.data.commenterImage : servePublic + 'defaultProfileImage.jpg'} alt=''></img>
              <span className='comment-box'>
                <div className='comment-header'>
                  <div className='commentor-details' >
                    <div className='names' >
                      <span>{comment.data?.commenter ? '@'+comment.data.commenter: "@author"}</span>
                      <span>{comment.data?.commenterName ? comment.data?.commenterName:"Author"}</span>
                    </div>
                    {comment.data.userId === user._id &&
                        <div className='author-tag'>
                            <span>Author</span>
                        </div>
                    }
                  </div>
                  <div className='comment-option' onClick={() => setCommentOption((prev) => !prev)} >
                    <MoreHorizIcon />
                  </div>
                </div>
                <div className='comment-options'>
                  {commentOption &&
                    <div className='comment-option-list'>
                      {commentEditable ?
                        <span name='edit' onClick={(e) => handleCommentFunction(e, {type:'edit'})} >Edit</span>
                        :
                        <span name='save' onClick={(e) => handleCommentFunction(e, {type:'update',commentId:comment.data._id,commentPostId:comment.data.postId})} >Save</span>
                      }
                      <hr style={{ width: '100%', margin: '0%' }} />
                      <span name='delete' onClick={(e) => handleCommentFunction(e, {type:'delete',commentId:comment.data._id,commentPostId:comment.data.postId})} >Delete</span>
                    </div>
                  }
                </div>
                <textarea id = {comment.data._id} className='comment-area' defaultValue={comment.data.comment} onChange={(e) => reSizeTextArea(e)} rows="1" cols="63" readOnly={commentEditable}>
                </textarea>
              </span>
            </div>
      )
  }

export default Comments