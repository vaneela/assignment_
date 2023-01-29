import React, { useEffect, useState } from 'react'
import './ProfileInfoCard.css'
import Edit from '@material-ui/icons/Edit'
import ProfileModal from '../../profileModal/ProfileModal'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as UserApi from '../../../actions/UserActions';
import { logOut } from '../../../actions/AuthActions'

const ProfileInfoCard = () => {
  const [infoForm, setInfoForm] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const {user} = useSelector((state)=>state.AuthReducer.authData);

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
      }
    };
    fetchProfileUser();
  }, [user]);

  const logOutHandler = ()=>{
    dispatch(logOut());
  }

  return (
    <div className='profileInfoCard'>
          <div className='profileInfoHead'>
              <h4>Profile Info </h4>
              {user._id === profileUserId ? (
                  <div>
                      <Edit style={{cursor:'pointer'}} onClick={() => setInfoForm(true)} />
                      <ProfileModal infoForm={infoForm} setInfoForm={setInfoForm} data={user}/>
                  </div>
              ) : ("") }
          </div>
        <div className='profileInfos'>
            <span><b>Status </b></span>
            <span>{profileUser.relationship}</span>
        </div>
        <div className='profileInfos'>
            <span><b>Lives In </b></span>
            <span>{profileUser.livesIn}</span>
        </div>
        <div className='profileInfos'>
            <span><b>Works At </b></span>
            <span>{profileUser.worksAt}</span>
        </div>
        <button className='button logout-btn' onClick={logOutHandler} >Logout</button>
    </div>
  )
}

export default ProfileInfoCard