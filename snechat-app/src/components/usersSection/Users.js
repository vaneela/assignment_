import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unFollowUser } from '../../actions/UserActions';
import './Users.css'
const servePublic = process.env.REACT_APP_PUBLIC_FOLDER;


const Users = ({ person }) => {
    const { user } = useSelector((state) => state.AuthReducer.authData);
    const dispatch = useDispatch();
    const [following, setFollowing] = useState(person.followers.includes(user._id));
    const handleFollow = () => {
        following ? dispatch(unFollowUser(person._id, user)) : dispatch(followUser(person._id, user));
        setFollowing((prev)=>!prev);
    }

    return (
        <div className='followers'>
            <img src={person.profileImage ? servePublic + person.profileImage : servePublic + "defaultProfileImage.jpg"} alt="" className='followerImage'></img>
            <div className='followerName'>
                <span>{person.firstname}</span>
                <span>@{person.username}</span>
            </div>
            <button className= {following ? 'button unfollow-btn':'button follow-btn'} onClick={handleFollow}>
                {following ? "UnFollow" : "Follow"}
            </button>

        </div>
    )
}

export default Users