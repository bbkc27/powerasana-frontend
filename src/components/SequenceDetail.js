import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';
import {Table, Alert, Button} from 'react-bootstrap';

function SequenceDetail({userSignedIn}) {

  let {id} = useParams();
  const sequenceEndpoint = `https://powerasana.herokuapp.com/sequences/${id}`
  const poseListRestEndpoint = 'https://powerasana.herokuapp.com/poses/'

  const [sequence, setSequence] = useState([])
  const [sequencePoses, setSequencePoses] = useState([])
  const [duration, setDuration] = useState('')

  useEffect(() => {
    getSequence()
    getPoses()
    // eslint-disable-next-line
  }, [])

  const getSequence = () => {
    axios.get(sequenceEndpoint)
    .then(res => {
      console.log(id)
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
    axios.get(poseListRestEndpoint)
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
      
        {
          (!userSignedIn)
          ? null
          :
          <div>
          {
            (!sequence.author)
            ? null
            : 
            <div>
            {
              (userSignedIn === sequence.author.username)
              ? <div>
              <a href={`/sequences/${id}/edit`}>
              <Button variant="warning">Edit Sequence</Button>
              </a>
    
              <span>  </span>
    
              <a href={`/sequences/${id}/delete`}>
              <Button variant="secondary">Delete Sequence</Button>
              </a>
            </div>
              : null
            }
            </div>
          }
          </div>
        }
        

      

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
                  <td><img className="tableImage" src={poses[poseId].image_url} alt={poses[poseId].english_name} /></td>
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