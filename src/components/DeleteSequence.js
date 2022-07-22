import React, {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Button, Alert} from 'react-bootstrap';

function DeleteSequence() {

  const navigate = useNavigate()
  let {id} = useParams();

  const sequenceEndpoint = `https://powerasana.herokuapp.com/sequences/`

  const [sequenceData, setSequenceData] = useState([])

  useEffect(() => {
    getSequence()
    // eslint-disable-next-line
  },[])

  const getSequence = async () => {
    const response = await axios
                          .get(`${sequenceEndpoint}${id}`)
                          console.log(response.data)
                          setSequenceData(response.data)
  }
  
  console.log(sequenceData.id)

  const handleSubmit = (e) => {
    e.preventDefault()

    axios
    .delete(sequenceEndpoint + sequenceData.id, sequenceData)
    .then(res => {
      navigate('/sequences/')
    })
  }

  return(
    <div>
      <Alert variant='warning'>Are you sure you want to delete this sequence?</Alert>

      <Button onClick={handleSubmit}>Delete</Button>

      <a href='/sequences'>
      <Button>Cancel</Button>
      </a>

    </div>
  )
}

export default DeleteSequence;