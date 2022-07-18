import React from 'react'
import { useEffect} from 'react'
import {useNavigate} from "react-router-dom"

function LogOut({ setUserSignedIn, setAccessToken}) {

    const navigate = useNavigate()

    useEffect(() => {
        localStorage.removeItem('user')
        localStorage.removeItem('access_token')
        setUserSignedIn(null)
        setAccessToken(null)
        navigate('/login')
        // eslint-disable-next-line
    }, [])
  return (
    <div>You're now logged out.</div>
  )
}

export default LogOut