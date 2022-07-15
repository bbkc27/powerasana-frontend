import React from 'react';
import {useState, useEffect} from 'react';
import axiosInstance from '../utils/axios-utils';

function SequenceList({userSignedIn}){

  const sequnceListEndpoint = '/sequences'

  const [sequences, setSequences] = useState([])

  useEffect(() => {
    getSequences()
  }, [])

  const getSequences = () => {
    axiosInstance.get(sequnceListEndpoint)
    .then(res => {
      // if (res.data.author === 'PowerAsanaAdmin'){
      console.log(res.data)
      setSequences(res.data)
      // }
    })
  }

console.log(sequences)

return (
  <div>
    
    <h3>All Sequences</h3>

    <ul>
      {
        sequences.map((sequence, id) => {
          if (sequence.author === 'PowerAsanaAdmin' || userSignedIn){
          return (
            <li key={id}>{sequence.intention} | {sequence.author}</li>
          )
          }
        })
      }
    </ul>

    <a href='/createsequence'>Create New Sequence</a>
  </div>
)

}

export default SequenceList;