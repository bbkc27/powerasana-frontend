import React from 'react';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axiosInstance from '../utils/axios-utils';
import {Card, Button} from 'react-bootstrap';

function SequenceList({userSignedIn}){

  const sequnceListEndpoint = '/sequences/'

  const [sequences, setSequences] = useState([])

  useEffect(() => {
    getSequences()
  }, [])

  const getSequences = () => {
    axiosInstance.get(sequnceListEndpoint)
    .then(res => {
      console.log(res.data)
      setSequences(res.data)
    })
  }


return (
  <div>
    
    <div className="createSeqHead">
    <h3>Discover Sequences</h3>
    {
      userSignedIn
      ? <Button className="createSeqBtn" variant='info'><a className="link" href='/createsequence'>Create New Sequence</a></Button>
      : null
    }
    </div>

  <div className="sequenceCards">
    <p>PowerAsana Sequences: </p>
      {
        sequences.map((sequence, id) => {
          if (sequence.author.username === 'PowerAsanaAdmin'){
          return (
              <Card className="sequenceCard" key={id} style={{width: '10rem'}}>
                <Link className="link" to={`/sequences/${sequence.id}`}>
                  <Card.Title>{sequence.intention}</Card.Title>
                </Link>
              </Card>
            )
          }
        })
      }
    </div>

    <div>
      <p>My Sequences: </p>
      <ul>
      {
        sequences.map((sequence) => {
        if (sequence.author.username === userSignedIn){
        return (
        <li key={sequence.id}>{sequence.intention} | {sequence.author.username}</li>
        )
        }
        })
      }
      </ul>
    </div>


  </div>
)

}

export default SequenceList;