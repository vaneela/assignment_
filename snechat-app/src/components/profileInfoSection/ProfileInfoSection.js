import React from 'react'
import LogoSearch from '../logoSearch/LogoSearch'
import FollowersCard from '../profileSection/followersCard/FollowersCard'
import ProfileInfoCard from './profileInfoCard/ProfileInfoCard'
import './ProfileInfoSection.css'

const ProfileInfoSection = () => {
  return (
    <div className='profileInfoSection'>
        <LogoSearch/>
        <ProfileInfoCard/>
        <FollowersCard/>
    </div>
  )
}

export default ProfileInfoSection