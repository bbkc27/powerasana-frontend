import React from 'react'

function SearchForm({query, setQuery, pagesVisited}) {


  const handleChange = (event) => {
    setQuery(event.target.value)
  }


  return (
    <div>
      {
        pagesVisited !== 0
        ? null
        : 
        <div className='search'>
         <label htmlFor='searchInput'>Search Poses: </label>
          <input type="text" id="searchInput" onChange={handleChange} />
        </div>
      }

    </div>
  )
}

export default SearchForm