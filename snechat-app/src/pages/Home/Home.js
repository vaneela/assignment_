import React from 'react'
import PostSection from '../../components/postSection/PostSection'
import ProfileSection from '../../components/profileSection/ProfileSection'
import RightSection from '../../components/rightSection/RightSection'
import './Home.css'

const Home = () => {
  return (
    <div className='Home'>
        <ProfileSection/>
        <PostSection/>
        <RightSection/>
    </div>
  )
}

export default Home