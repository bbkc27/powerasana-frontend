import React from 'react';

function HomePage(){

  return (
    <div>
      <div id ="nav-links">
 
      </div>

      <div id='button-container'>
        <a className='homeButton' href="/poses">POSES  </a>
        <a className='homeButton' href="/sequences"> SEQUENCES</a>
        <hr />
      </div>

      <button id="hamburger">Click Me!</button>

      <h1 className="title">PowerAsana</h1>

    </div>
  )
}

export default HomePage;