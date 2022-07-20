// import React, {useState} from "react";
// import {useNavigate} from "react-router-dom";
// import axios from "axios";
// import {Button, Alert} from 'react-bootstrap';

// function DeleteSequence() {

//   const navigate = useNavigate()

//   const sequenceEndpoint = `https://powerasana.herokuapp.com/sequences/`

//   const [sequenceData, setSequenceData] = useState([])

//   const getSequence = () => {
//     axios.get(sequenceEndpoint)
//     .then(res => {
//       setSequenceData(res.data[0])
      
//     })
//   }
  
//   const handleSubmit = () => {

//   }

//   return(
//     <div>
//       <Alert variant='warning'>Are you sure you want to delete this sequence?</Alert>

//       <Button>Delete</Button>

//       <a href='/sequences'>
//       <Button>Cancel</Button>
//       </a>

//     </div>
//   )
// }

// export default DeleteSequence;