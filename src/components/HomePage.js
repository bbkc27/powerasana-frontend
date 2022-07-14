import React from 'react';

function HomePage(){

  return (
    <div>
      <div id ="nav-links">
        <a>Log In</a>
        <a>Register</a>
        <a>Sign Out</a>
      </div>

      <div id='button-container'>
        <button>All Poses</button>
        <button>All Sequences</button>
      </div>

      <button id="hamburger">Click Me!</button>
      <div id='square'>
        
      </div>
    </div>
  )
}

export default HomePage;