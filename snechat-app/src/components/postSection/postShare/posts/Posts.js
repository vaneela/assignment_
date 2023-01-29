import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTimeLinePosts } from '../../../../actions/GetTimeLinePosts'
import Post from './post/Post'
import './Posts.css'

const Posts = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.AuthReducer.authData);
  let {posts,loading} = useSelector((state)=>state.PostReducer);
  useEffect(()=>{
    dispatch(getTimeLinePosts(user._id));
  },[])

  if(!posts) return "No Posts Available!";
  return (
    <div className='posts'>
        { loading ?"Loading...":posts.map((post,id)=>{
            return <Post data={post} id={id} />
        })}
    </div>
  )
}

export default Posts