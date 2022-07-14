import React, {useState} from 'react';
import {useNavigate} from "react-router-dom"
import axiosInstance from '../utils/axios-utils';

function LogIn({setUserSignedIn, setAccessToken}){

  const navigate = useNavigate()
  const loginEndpoint = 'api/token/'

  const initialState = {
    username:'', 
    password:''
  }

  const [formData, setFormData] = useState(initialState)
  const [networkErrMsg, setNetworkErrMsg] = useState(null)
  const [clientErrMsg, setClientErrMsg] = useState(null)

  const statusCodeToErr = (responseObj) => {
    setNetworkErrMsg(`Network Error of code: ${responseObj.status}`)
  }

  const clientFormValidation = (formData) => {
    const blankFields = Object.entries(formData)
                              .filter(kv => kv[1] === '')
    if (blankFields.length >0) {
      setClientErrMsg(`${blankFields[0][0]} can not be blank`)
      return false
    }
    setClientErrMsg(null)
    return true
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setNetworkErrMsg(null)

    if(!clientFormValidation(formData)){
      return
    }

    axiosInstance
    .post(loginEndpoint, formData)
    .then(res => {
      setUserSignedIn(formData.username)
      localStorage.setItem('user', formData.username)
      setAccessToken(res.data.access)
      localStorage.setItem('access_token', res.data.access)
      setFormData(initialState)
      navigate('/')
    })
    .catch(err => {
      console.log(err)
      navigate('/login')
    })



  }

  return (
    <div>
      <h3>Login</h3>
        <form onSubmit={handleLogin}>
            <label>username:</label>
            <input id="username" name="username" type="text" onChange={handleChange}/>
            <label>password:</label>
            <input id="password" name="password" type="password" onChange={handleChange}/>
            <button type="submit">Login</button>
        </form>
      <p>{networkErrMsg}</p>
      <p>{clientErrMsg}</p>
    </div>
  )

}

export default LogIn