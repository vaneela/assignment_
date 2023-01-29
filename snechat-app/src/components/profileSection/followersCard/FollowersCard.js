import React, { useEffect, useState } from 'react'
import { FollowersData } from './followersData/FollowersData'
import './FollowersCard.css'
import Users from '../../usersSection/Users'
import { useSelector } from 'react-redux'
import { getAllUsers } from '../../../api/UserRequest'

const FollowersCard = () => {
  const [persons, setPersons] = useState([])
  const { user } = useSelector((state) => state.AuthReducer.authData);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await getAllUsers();
      setPersons(data);
    }
    fetchUsers();
  }, [])

  return (
    <div className='followersCard'>
      <span style={{ textAlign: 'left', fontWeight: 'bold' }}>Who's Following you</span>
      {persons.map((person, id) => {
        if (user?._id !== person._id) {
          return (
            <Users person={person} key={id} />
          )
        }
      })}
    </div>
  )
}

export default FollowersCard