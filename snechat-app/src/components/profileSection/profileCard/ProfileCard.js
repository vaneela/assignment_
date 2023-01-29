import React from 'react'
import {Link} from 'react-router-dom';
import './ProfileCard.css'
import { useSelector } from 'react-redux';
const ProfileCard = ({location}) => {
  const ProfilePage = location === "profilePage";
  const servePublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const posts = useSelector((state)=>state.PostReducer.posts);
  return (
    <div className='profileCard'>
      <div className='profileImages'>
        <img src={user?.coverImage ? servePublic + user.coverImage : servePublic + "defaultCoverImage.jpg"} alt="Cover"></img>
        <img src={user?.profileImage ? servePublic + user.profileImage : servePublic + "defaultProfileImage.jpg"} alt="Profile"></img>
      </div>

      <div className='profileName'>
        <span className='personName'>{user?.firstname}</span>
        <span className='personRole'>{user?.worksAt ? user.worksAt : "About Yourself"}</span>
      </div>

      <div className='followStatus'>
        <hr />
        <div>
          <div className='follow'>
            <span>{user?.followers.length}</span>
            <span>Followers</span>
          </div>
          {/* <div className='v-line'>
            
          </div> */}
          <div className='follow'>
            <span>{user?.following.length}</span>
            <span>Following</span>
          </div>
          {ProfilePage &&
            <div className='follow'>
              <span>{posts.filter((post)=>post.userId).length}</span>
              <span>Posts</span>
            </div>}
        </div>
        <hr />
      </div>
      {ProfilePage ? '' : <span>
        <Link style={{textDecoration:'none',color:'inherit'}} to={`/profile/${user?._id}`} >
          My Profile
        </Link>
      </span>}
    </div>
  )
}

export default ProfileCard