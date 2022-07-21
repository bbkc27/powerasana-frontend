import React from 'react';
import YogaAtHome from './YogaAtHome.jpeg';


function HomePage(){

  return (
    <div>
      <div id ="nav-links">
    
      </div>

      <h1 className="title">PowerAsana</h1>
      

      <div id='button-container'>
        <a className='homeButton' href="/poses">POSES  </a>
        <a className='homeButton' href="/sequences"> SEQUENCES</a>
        <hr />
      </div>

      <div className="aboutSection">
        <p>Power your vinyasa practice at home and the sequences you teach in the studio!</p>
      </div>

      <div className='homeImage'>
      <img className='yogaAtHome' src={YogaAtHome} />
      </div>
      

      

      <button id="hamburger">Click Me!</button>



    </div>
  )
}

export default HomePage;