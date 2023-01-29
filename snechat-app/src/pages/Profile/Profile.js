import React from 'react'
import PostSection from '../../components/postSection/PostSection'
import ProfileBannerSection from '../../components/profileBannerSection/ProfileBannerSection'
import ProfileInfoSection from '../../components/profileInfoSection/ProfileInfoSection'
import ProfileCard from '../../components/profileSection/profileCard/ProfileCard'
import RightSection from '../../components/rightSection/RightSection'
import './Profile.css'

const Profile = () => {
  return (
    <div className='Profile'>
        <ProfileInfoSection/>
        <ProfileBannerSection location= "profilePage"/>
        <RightSection/>
    </div>
  )
}

export default Profile