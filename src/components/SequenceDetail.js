import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import axiosInstance from '../utils/axios-utils';
import {Table, Alert} from 'react-bootstrap';

function SequenceDetail() {

  let {id} = useParams();
  const sequenceEndpoint = `/sequences/${id}`
  const poseListRestEndpoint = '/poses/'

  const [sequence, setSequence] = useState([])
  const [sequencePoses, setSequencePoses] = useState([])
  const [duration, setDuration] = useState('')

  useEffect(() => {
    getSequence()
    getPoses()
  }, [])

  const getSequence = () => {
    axiosInstance.get(sequenceEndpoint)
    .then(res => {
      setSequence(res.data)
      setSequencePoses(res.data.poses)
      if (res.data.duration === "01:00:00"){
        setDuration(res.data.duration.slice(0,2))
      } else {
        setDuration(res.data.duration.slice(3,5))
      }
    })
  }


  const [poses, setPoses] = useState([])


  const getPoses = () => {
    axiosInstance.get(poseListRestEndpoint)
    .then(res => {
      setPoses(res.data)
    })
  }


  return (
    <div className='poseDetails'>
      <div className='sequenceHeader'>
      <p>

        <span className='sequenceInfo'>
          <strong>{sequence.intention} </strong>  
        </span>

        <span className='sequenceInfo'>|</span>

        <span className='sequenceInfo'>
          {duration}
          {
            sequence.duration === "01:00:00"
            ? <span className="durationHour"> hour</span>
            : <span className=""> minutes</span>
          }
          </span>

          <span className='sequenceInfo'>|</span>

          <span className='sequenceInfo'>
          {sequence.intensity} 
          {
            sequence.intensity === 'All levels'
            ? <span></span>
            :<span> Intensity  </span>
          }
          </span>
          
          <span className='sequenceInfo'>|</span>

          <span className='sequenceInfo'>
          Peak Pose: <strong>{sequence.peak_pose}</strong>
          </span>
      </p>
      </div>

      <Table className='sequenceTable'  bordered hover>
        <thead>
          <tr>
            <th>Pose</th>
            <th>Cues</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
        {
            sequencePoses && poses.length > 0 
            ? sequencePoses.map((poseId) => {
              return (
                <tr className='tableRow'>
                  
                  <td><Link className='link' to={`/poses/${poseId}`}>{poses[poseId].english_name}</Link></td>
                  
                  <td>{poses[poseId].cues[0]}<br/>{poses[poseId].cues[1]}<br />{poses[poseId].cues[2]}</td>
                  <td><img className="tableImage" src={poses[poseId].image_url} /></td>
                </tr>
              )
            })
            : <Alert variant='info'> Sequence Loading ... </Alert>
          }
        </tbody>
      </Table>
    </div>
  )

}


export default SequenceDetail;