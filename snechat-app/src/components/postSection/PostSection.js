import React from 'react'
import './PostSection.css'
import Posts from './postShare/posts/Posts'
import PostShare from './postShare/PostShare'

const PostSection = () => {
  return (
    <div className='postSection'>
        <PostShare/>
        <Posts/>
    </div>
  )
}

export default PostSection