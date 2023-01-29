import React from 'react'
import PostSection from '../postSection/PostSection'
import ProfileCard from '../profileSection/profileCard/ProfileCard'
import './ProfileBannerSection.css'

const ProfileBannerSection = ({location}) => {
  return (
    <div className='profileBannerSection'>
        <ProfileCard location = {location}/>
        <PostSection/>
    </div>
  )
}

export default ProfileBannerSection