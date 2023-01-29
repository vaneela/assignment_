import React, { useState } from 'react'
import './RightSection.css'
import HomeIcon from '@material-ui/icons/Home'
import SettingsOutlined from '@material-ui/icons/SettingsOutlined'
import NotificationsOutlined from '@material-ui/icons/NotificationsOutlined'
import ChatBubbleOutlineOutlined from '@material-ui/icons/ChatBubbleOutlineOutlined'
import TrendCard from './trendCard/TrendCard'
import ShareModal from '../shareModal/ShareModal'
import { Link } from 'react-router-dom'

const RightSection = () => {
  const [shareModal, setShareModal] = useState(false);
  return (
    <div className='rightSection'>
      <div className='nav-bar'>
        <Link to="../home">
        <HomeIcon />
        </Link>
        <SettingsOutlined />
        <NotificationsOutlined />
        <ChatBubbleOutlineOutlined />
      </div>
      <TrendCard />
      <button className='button share-btn' onClick={() => setShareModal(true)}>Share</button>
      <ShareModal shareModal={shareModal} setShareModal={setShareModal} />

    </div>
  )
}

export default RightSection