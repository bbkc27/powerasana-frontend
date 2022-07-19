import React from 'react';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Card} from 'react-bootstrap'

function PoseList(){

  const poseListRestEndpoint = 'https://powerasana.herokuapp.com/poses/'

  const [poses, setPoses] = useState([])
  // const [query, setQuery] = useState('');

  useEffect(() => {
    getPoses()
  }, [])

  const getPoses = () => {
    axios.get(poseListRestEndpoint)
      .then(res => {
        console.log(res.data)
        setPoses(res.data)
      })

  }

  console.log(poses)

  return (
    <div>
      <h3>All Poses</h3>
      <div className="poseCards">
        { (!poses)
          ? null
          : poses.map((pose, id) =>{
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