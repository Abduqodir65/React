import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {

    const getUser = useSelector(state=>state.auth)
  return (
    <div>
        <h1>Username: {getUser.user.username}</h1>

    </div>
  )
}

export default Profile