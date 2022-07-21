import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Form, FloatingLabel, Button} from 'react-bootstrap';


function UpdateSequence() {

  const navigate = useNavigate ()

  const updateSequenceEndpoint=`https://powerasana.herokuapp.com/sequences/`
  const poseListRestEndpoint = 'https://powerasana.herokuapp.com/poses/'

  const [sequenceData, setSequenceData] = useState([])
  // eslint-disable-next-line
  const [sequencePoses, setSequencePoses] = useState([])
  const [duration, setDuration] = useState('')
  const [poses, setPoses] = useState([])

  useEffect(() => {
    getSequence()
    getPoses()
    // eslint-disable-next-line
  }, [])

  const getSequence = () => {
    axios.get(updateSequenceEndpoint)
    .then(res => {
      setSequenceData(res.data[0])
      setSequencePoses(res.data[0].poses)
      if (res.data[0].duration === "01:00:00"){
        setDuration(res.data[0].duration.slice(0,2))
      } else {
        setDuration(res.data[0].duration.slice(3,5))
      }
      
    })
  }

  const getPoses = () => {
    axios.get(poseListRestEndpoint)
    .then(res => {
      setPoses(res.data)
    })
  }

  const [poseValues, setPoseValues] = useState([{poses: sequenceData.poses}])

  let addPoseFields = () => {
    setPoseValues([...poseValues, {pose: ''}])
    console.log(poseValues)
  }

  let removePoseFields = (i) => {
    let newPoseValue = [...poseValues];
    newPoseValue.splice(i, 1);
    sequenceData.poses.pop(1)
    setPoseValues(newPoseValue)
  }

  const handleSubmit = (e) => {
    
    e.preventDefault()
    
    setSequenceData({...sequenceData, [e.target.id]: e.target.value})
    console.log(sequenceData)

    axios
    .put(updateSequenceEndpoint + sequenceData.id, sequenceData)
    .then(res => {
      navigate(`/sequences/${sequenceData.id}`)
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
    console.log(sequenceData.poses)
  }

  return (
    <div className="createSequence">
      <h3>Update Sequence Details</h3>

      {
        (!sequenceData)
        ? null
        : 
        <Form className="form" onSubmit={handleSubmit}>

        <FloatingLabel label="Intention" className="mb-3"> 
        <Form.Control id="intention" name='intention' type='text' value={sequenceData.intention} onChange={handleChange}  />
        </FloatingLabel>
        <br />

        <Form.Select aria-label="Default select example" id="duration" value={duration*60} onChange={handleChange} >
          <option value='6000' >60 minutes</option>
          <option value='1800' >30 minutes</option>
          <option value='900' >15 minutes</option>
          <option value='300'>5 minutes</option>
        </Form.Select>
        <br />

        <Form.Select aria-label="Default select example" id="intensity" value={sequenceData.intensity} onChange={handleChange} >
          <option value=''>Intensity</option>
          <option value='All levels'>All levels</option>
          <option value='Low'>Low</option>
          <option value='Medium'>Medium</option>
          <option value='High'>High</option>
        </Form.Select>
        <br />

        <FloatingLabel label="Peak Pose" className="mb-3"> 
        <Form.Control id="peak_pose" name='peak_pose' type='text' value={sequenceData.peak_pose} onChange={handleChange} />
        </FloatingLabel>

        <Form.Label> <strong>Poses:</strong> </Form.Label>
        {poseValues.map((value, index) => (
          <div> 
            <Form.Select selected disable id="poses" onChange={handlePoseChange}>
                <option> </option>
            {poses.map((pose, index) => (
                <option key={index} value={index}>{pose.english_name}</option>
            ))}
            </Form.Select>
          </div>
           ))}
        <div className="poseBtn">
          <Button className="button" variant="warning" type="button" onClick={() => addPoseFields()}>Add Pose</Button>
          <Button className="button" variant="danger" type="button" onClick={() => removePoseFields()}>Remove Pose</Button>
        </div>
        <br />
        
        <Button variant="primary" type='submit'>Update Sequence</Button>
        

      </Form>
      }
      
    </div>
  )

}

export default UpdateSequence;