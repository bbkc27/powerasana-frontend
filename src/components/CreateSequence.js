import React from "react";
import { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import axiosInstance from "../utils/axios-utils";

function NewSequence({userSignedIn}) {

  
  const navigate = useNavigate()
  const createSequenceEndpoint='sequences/'

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
    sequenceData.poses.pop()
    setPoseValues(newPoseValue)
    console.log(sequenceData.poses)
  }
 
  //Submit new sequence
  const handleSubmit = (e) => {
    
    e.preventDefault()

    axiosInstance
    .post(createSequenceEndpoint, sequenceData)
    .then(res => {
      getPoses()
      setSequenceData(initialState)
      console.log(res.data)
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
          console.log(sequenceData.poses)
      }
    }
  }

console.log(sequenceData)

  //GET poses for select options
  const poseListRestEndpoint = '/poses/'

  const [poses, setPoses] = useState([])

  useEffect(() => {
    getPoses()
  }, [])

  const getPoses = () => {
    axiosInstance.get(poseListRestEndpoint)
      .then(res => {
        setPoses(res.data)
        console.log(res.data)
      })
  }

  return (
    <div>
      <h3>Create a New Sequence</h3>
      <form onSubmit={handleSubmit}>

        <label>Intention: </label>
        <input id="intention" name='intention' type='text' onChange={handleChange} />
        <br />

        <label>Duration: </label>
        <select id="duration" onChange={handleChange} >
          <option value='60'>60</option>
          <option value='30'>30</option>
          <option value='15'>15</option>
          <option value='5'>5</option>
        </select>
        <br />


        <label>Intensity</label>
        <select id="intensity" onChange={handleChange} >
          <option value='All levels'>All levels</option>
          <option value='Low'>Low</option>
          <option value='Medium'>Medium</option>
          <option value='High'>High</option>
        </select>
        <br />

        <label>Peak Pose: </label>
        <input id="peak_pose" name='peak_pose' type='text' onChange={handleChange} default="N/A"/>
        <br />

        <label> Poses: </label>
        {poseValues.map((value, index) => (
          <div key={index} onChange={handlePoseChange} > 
            <select selected disable id="poses" key={index}>
                <option value=""> </option>
            {poses.map((pose, index) => (
                <option key={index} value={pose.english_name}>{pose.english_name}</option>
            ))}
            </select>
          </div>
        ))}
          <button type="button" onClick={() => addPoseFields()}>Add</button>
          <button type="button" onClick={() => removePoseFields()}>Remove</button>

        <br />
        
        <button type='submit'>Create Sequence</button>
        

      </form>
    </div>
  )

}

export default NewSequence;