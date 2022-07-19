import React, {useState} from 'react';
import {useNavigate} from "react-router-dom"
import axiosInstance from '../utils/axios-utils';
import {Form, Button, FloatingLabel, Alert} from 'react-bootstrap';


function LogIn({setUserSignedIn, setAccessToken, accessToken}){

  const navigate = useNavigate()
  const loginEndpoint = 'api/token/'

  const initialState = {
    username:'', 
    password:''
  }

  const [formData, setFormData] = useState(initialState)
  const [networkErrMsg, setNetworkErrMsg] = useState(null)
  const [clientErrMsg, setClientErrMsg] = useState(null)

  // const statusCodeToErr = (responseObj) => {
  //   setNetworkErrMsg(`Network Error of code: ${responseObj.status}`)
  // }

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
      console.log(res.data.access)
      setUserSignedIn(formData.username)
      sessionStorage.setItem('user', formData.username)
      setAccessToken(res.data.access)
      sessionStorage.setItem('access_token', res.data.access)
      setFormData(initialState)
      navigate('/')
    })
    .catch(err => {
      console.log(err)
      setClientErrMsg("The username or password you entered is incorrect.")
      navigate('/login')
    })



  }

  return (
    <div>
      <h3>Login</h3>

      {
        clientErrMsg
        ? <Alert variant="warning" className="form">{clientErrMsg}</Alert>
        : null
      }

      
      <Form className="form" onSubmit={handleLogin}>
        
        <FloatingLabel label="Username" className="mb-3">
          <Form.Control id="username" type="username" placeholder="Username" onChange={handleChange} />
        </FloatingLabel>
        
        <FloatingLabel label="Password" className="mb-3">
          <Form.Control type="password" id="password" placeholder="Password" onChange={handleChange} />
        </FloatingLabel>
        
        <br/>

        <Button variant="secondary" type="submit">Login</Button>
        
      </Form>
      <p>{networkErrMsg}</p>
    </div>
  )

}

export default LogIn;