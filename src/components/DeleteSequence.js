import React, {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Button, Alert, Modal} from 'react-bootstrap';

function DeleteSequence() {

  const navigate = useNavigate()
  let {id} = useParams();

  const sequenceEndpoint = `https://powerasana.herokuapp.com/sequences/`

  const [sequenceData, setSequenceData] = useState([])
  const [show, setShow] = useState(false);

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

  const handleClose = () => {
    setShow(false)
  }
  const handleShow=() => {
    setShow(true);
  }

  return(
    <>

    <Button variant='secondary' onClick={handleShow}>
      Delete Sequence
    </Button>

    <Modal show={show} onHide={handleClose}>

      <Modal.Header closeButton>
        <Modal.Title>Delete Sequence</Modal.Title>
      </Modal.Header>

      <Modal.Body>
      <Alert variant='warning'>Are you sure you want to delete this sequence?</Alert>
      </Modal.Body>

      <Modal.Footer>
      <Button variant='warning' onClick={handleSubmit}>Delete</Button>

      {/* <a href={`/sequences/${sequenceData.id}`}> */}
      <Button variant='secondary' onClick={handleClose}>Cancel</Button>
      {/* </a> */}
      </Modal.Footer>

    </Modal>
    </>
  )
}

export default DeleteSequence;