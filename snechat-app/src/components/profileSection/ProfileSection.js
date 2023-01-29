import React from 'react'
import LogoSearch from '../logoSearch/LogoSearch'
import FollowersCard from './followersCard/FollowersCard'
import ProfileCard from './profileCard/ProfileCard'
import './ProfileSection.css'

const ProfileSection = () => {
    return (
        <div className='profileSection'>
            <LogoSearch/>
            <ProfileCard/>
            <FollowersCard/>
        </div>
    )
}

export default ProfileSection