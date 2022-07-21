import React from 'react';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import SearchForm from './SearchForm';
import axios from 'axios';
import {Card} from 'react-bootstrap'

function PoseList(){

  const poseListRestEndpoint = 'https://powerasana.herokuapp.com/poses/'

  const [poses, setPoses] = useState([])
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(0)

  const posesPerPage= 12
  const pagesVisited = pageNumber * posesPerPage
  const pageCount = Math.ceil(poses.length / posesPerPage)

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

  const changePage = ({selected}) => {
    setPageNumber(selected)
  }

  // console.log(poses, pagesVisited)

  return (
    <div>
      <h3>All Poses</h3>

      <SearchForm query={query} setQuery={setQuery} pagesVisited={pagesVisited}/>
  
      

      <div className="poseCards">
        { (!poses)
          ? null
          : poses
          // eslint-disable-next-line
          .filter((pose) => {
            if (query === ""){
              return pose;
            } else if (pose.english_name.toLowerCase().includes(query.toLowerCase())){
              return pose;
            }
            })
          .slice(pagesVisited, pagesVisited + posesPerPage)
          .map((pose, id) =>{
            return (
            
            <Card className="poseCard" key={id} style={{width: '18rem'}}>
              <Link className="poseName" to={`/poses/${pose.id}`}>
              <Card.Img style={{width: '8rem'}} variant="top" src={pose.image_url} />
              <br />
              <Card.Title>{pose.english_name}</Card.Title>
              </Link>            
            </Card>

            )
          })
        }
      </div>
      <ReactPaginate 
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationButtons"}
        previousLinkClassName={"previousButton"}
        nextLinkClassName={"nextButton"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  )

}

export default PoseList;