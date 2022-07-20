import React from "react";
import { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Form, FloatingLabel, Button} from 'react-bootstrap';

function NewSequence({userSignedIn}) {

  
  const navigate = useNavigate()
  const createSequenceEndpoint='https://powerasana.herokuapp.com/sequences/'

  const initialState = {
    intention: '',
    duration: 60,
    intensity: 'Low',
    peak_pose: '',
    poses: [],
    author: userSignedIn
  }

  const [sequenceData, setSequenceData] = useState(initialState)
  
 //Functions to create add and remove fields
  const [poseValues, setPoseValues] = useState([{poses: sequenceData.poses}])

  let addPoseFields = () => {
    setPoseValues([...poseValues, {pose: ''}])
  }

  let removePoseFields = (i) => {
    let newPoseValue = [...poseValues];
    newPoseValue.splice(i, 1);
    sequenceData.poses.pop(1)
    setPoseValues(newPoseValue)
  }
 
  //Submit new sequence
  const handleSubmit = (e) => {
    
    e.preventDefault()

    axios
    .post(createSequenceEndpoint, sequenceData)
    .then(res => {
      getPoses()
      setSequenceData(initialState)
      navigate("/sequences/")
    })
    .catch(err => {
      console.log(err)
    })


  }

  const handleChange = (e) => {
    setSequenceData({...sequenceData, [e.target.id]: e.target.value})
  }

  const handlePoseChange = (e) => {
    let options = e.target.options
    for (let i=0, l=options.length; i<l; i++){
      if (options[i].selected){
          setSequenceData({...sequenceData, [sequenceData.poses]: sequenceData.poses.push(options[i].value)})
          e.target.disabled = true
      }
    }
  }


  //GET poses for select options
  const poseListRestEndpoint = 'https://powerasana.herokuapp.com/poses/'

  const [poses, setPoses] = useState([])

  useEffect(() => {
    getPoses()
  }, [])

  const getPoses = () => {
    axios.get(poseListRestEndpoint)
      .then(res => {
        setPoses(res.data)
      })
  }


  return (
    <div>
      <h3>Create a New Sequence</h3>
      <Form className="form" onSubmit={handleSubmit}>

        <Form.Select aria-label="Default select example" id="author" onChange={handleChange}>
          <option  value={userSignedIn}>{userSignedIn}</option>
        </Form.Select>
        <br />

        <FloatingLabel label="Intention" className="mb-3"> 
        <Form.Control id="intention" name='intention' type='text' placeholder='Intention' onChange={handleChange} />
        </FloatingLabel>
        <br />

        <Form.Select aria-label="Default select example" id="duration" onChange={handleChange} >
          <option value=''>Duration</option>
          <option value='6000'>60 minutes</option>
          <option value='1800'>30 minutes</option>
          <option value='900'>15 minutes</option>
          <option value='300'>5 minutes</option>
        </Form.Select>
        <br />

        <Form.Select aria-label="Default select example" id="intensity" onChange={handleChange} >
          <option value=''>Intensity</option>
          <option value='All levels'>All levels</option>
          <option value='Low'>Low</option>
          <option value='Medium'>Medium</option>
          <option value='High'>High</option>
        </Form.Select>
        <br />

        <FloatingLabel label="Peak Pose" className="mb-3"> 
        <Form.Control id="peak_pose" name='peak_pose' type='text' placeholder='Peak Pose' onChange={handleChange} />
        </FloatingLabel>

        <Form.Label> <strong>Poses:</strong> </Form.Label>
        {poseValues.map((value, index) => (
          <div> 
            <Form.Select selected disable id="poses" onChange={handlePoseChange} >
                <option value=""> </option>
            {
              (!poses)
              ? null
              :
              <>
              {poses.map((pose, index) => (
                <option key={index} value={index}>{pose.english_name}</option>
              ))}
              </>
            }
            
            </Form.Select>
          </div>
           ))}
        <div className="poseBtn">
          <Button className="button" variant="warning" type="button" onClick={() => addPoseFields()}>Add Pose</Button>
          <Button className="button" variant="danger" type="button" onClick={() => removePoseFields()}>Remove Pose</Button>
        </div>
        <br />
        
        <Button variant="primary" type='submit'>Create Sequence</Button>
        

      </Form>
    </div>
  )

}

export default NewSequence;