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

  <div>
    <p className="listName">PowerAsana Sequences: </p>
    <div className="sequenceCards">
      {
        // eslint-disable-next-line
        sequences.map((sequence, id) => {
          if (sequence.author.username === 'PowerAsanaAdmin'){
          return (
              <Card className="sequenceCard" key={id} style={{width: '10rem'}}>
                <Link className="link" to={`/sequences/${sequence.id}`}>
                  <Card.Title>{sequence.intention}</Card.Title>
                  {
                    sequence.duration === "01:00:00"
                    ? <Card.Text>{sequence.duration.slice(0,2)} hour</Card.Text>
                    : <Card.Text>{sequence.duration.slice(3,5)} minutes</Card.Text>
                  }
                  {
                    sequence.intensity === "All levels"
                    ? <Card.Text>{sequence.intensity}</Card.Text>
                    : <Card.Text>{sequence.intensity} Intensity</Card.Text>
                  }
                </Link>
              </Card>
            )
          }
        })
      }
      </div>
    </div>

    <div>
      {
        userSignedIn
        ?
        <div>
        <p className="listName">My Sequences: </p>
        <div className="sequenceCards">
          {
            // eslint-disable-next-line
            sequences.map((sequence, id) => {
              if (sequence.author.username === userSignedIn){
              return (
                  <Card className="sequenceCard" key={id} style={{width: '10rem'}}>
                    <Link className="link" to={`/sequences/${sequence.id}`}>
                      <Card.Title>{sequence.intention}</Card.Title>
                      {
                        sequence.duration === "01:00:00"
                        ? <Card.Text>{sequence.duration.slice(0,2)} hour</Card.Text>
                        : <Card.Text>{sequence.duration.slice(3,5)} minutes</Card.Text>
                      }
                      {
                        sequence.intensity === "All levels"
                        ? <Card.Text>{sequence.intensity}</Card.Text>
                        : <Card.Text>{sequence.intensity} Intensity</Card.Text>
                      }
                    </Link>
                  </Card>
                )
              }
            })
          }
          </div>
        </div>
        :
        null        
      }

    </div>


  </div>
)

}

export default SequenceList;