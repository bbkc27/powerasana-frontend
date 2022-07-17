import React, { useEffect, useState } from "react";
import {useParams, Link} from 'react-router-dom';
import axiosInstance from "../utils/axios-utils";
import {Card} from 'react-bootstrap';

function PoseDetail() {

  let {id} = useParams();
  const poseEndpoint = `/poses/${id}`

  const [pose, setPose] = useState('')
  const [cues, setCues] = useState([])

  useEffect(() => {
    getPose()
  },[])

  const getPose = () => {
    axiosInstance.get(poseEndpoint)
    .then(res => {
      console.log(res.data)
      setPose(res.data)
      setCues(res.data.cues)
    })
  }

  return (
    <div className="poseDetails">

      <h3> {pose.english_name} Pose - {pose.sanskrit}</h3>

      <Card className="card" style={{width: '50vw'}}>
      <Card.Img variant="top" className="poseImage" src={pose.image_url} alt={pose.english_name} />      

      <Card.Body className="cardBody">
          {
            cues.map((cue) => {
              return (
                <Card.Text>{cue}</Card.Text>
              )
            })
          }
        </Card.Body>
      </Card>

      <Link className='form link' to='/poses'>Back to all poses</Link>

    </div>
  )

}

export default PoseDetail;