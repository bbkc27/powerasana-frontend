import React from 'react';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axiosInstance from '../utils/axios-utils';
import {Card, Button} from 'react-bootstrap'

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


  return (
    <div>
      <h3>All Poses</h3>
      <div className="poseCards">
        {
          poses.map((pose, id) =>{
            return (
            
            <Card className="poseCard" key={id} style={{width: '18rem'}}>
              <Link to={`/poses/${pose.id}`}>
              <Card.Img style={{width: '8rem'}} variant="top" src={pose.image_url} />
              <br />
              <Card.Title>{pose.english_name}</Card.Title>
              </Link>            
            </Card>

            )
          })
        }
      </div>
    </div>
  )

}

export default PoseList;