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

  useEffect(() => {
    getSequence()
    getPoses()
  }, [])

  const getSequence = () => {
    axiosInstance.get(sequenceEndpoint)
    .then(res => {
      setSequence(res.data)
      console.log(res.data.poses)
      setSequencePoses(res.data.poses)
    })
  }


  const [poses, setPoses] = useState([])


  const getPoses = () => {
    axiosInstance.get(poseListRestEndpoint)
    .then(res => {
      setPoses(res.data)
      console.log(res.data)
    })
  }







  return (
    <div className='poseDetails'>
      <p>{sequence.intention} | {sequence.duration} | {sequence.intensity} Intensity | Peak Pose: {sequence.peak_pose}</p>


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
                  
                  <td>{poses[poseId].cues}</td>
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