import React from 'react';
import {useState, useEffect} from 'react';
import axiosInstance from '../utils/axios-utils';

function PoseList(){

  const poseListRestEndpoint = '/poses/'

  const [poses, setPoses] = useState([])

  useEffect(() => {
    getPoses()
  }, [])

  const getPoses = () => {
    axiosInstance.get(poseListRestEndpoint)
      .then(res => {
        console.log(res.data)
        setPoses(res.data)
      })
  }

  console.log(poses)

  return (
    <div>
      <h3>All Poses</h3>
      <ul>
        {
          poses.map((pose, id) =>{
            return (
            <li key={id}>{pose.sanskrit}</li>
            )
          })
        }
      </ul>
    </div>
  )

}

export default PoseList;