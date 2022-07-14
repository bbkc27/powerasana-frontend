import React from 'react'
import {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"

function LogOut({userSignedIn, setUserSignedIn, setAccessToken}) {

    const navigate = useNavigate()

    const [userName, setUserName] = useState(userSignedIn)
    useEffect(() => {
        localStorage.removeItem('user')
        localStorage.removeItem('access_token')
        setUserSignedIn(null)
        setAccessToken(null)
        navigate('/')
    }, [])
  return (
    <div>You're now logged out.</div>
  )
}

export default LogOut