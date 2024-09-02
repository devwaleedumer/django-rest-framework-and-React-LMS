import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import { getRefreshToken } from '../utils/Services/LocalStorageTokenService'
import { useAppSelector } from '../redux/hooks'

const Anonymous = () => {

    const token = getRefreshToken()
    const user =  useAppSelector((state) => state.user.user)
    console.log(user)
    return (
      token ?  user.role!==null && user.role === "teacher" ? <Navigate to="/" /> : <Navigate to="/student" /> : <Outlet />
    )
}

export default Anonymous