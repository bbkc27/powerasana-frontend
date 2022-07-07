import './App.css';
import {useState} from 'react'
import {Route, Link} from 'react-router-dom'

function App() {

  const [userSignedIn, setUserSignedIn] = useState(localStorage.getItem('user'))
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'))

  return (
    <div className="App">

      <h1>PowerAsana</h1>

      {userSignedIn ? (
        <nav>
          <span>signed in as: {userSignedIn}</span>
        </nav>  
        ) : null
      }

      <Route exact  path="/">
        <HomePage userSignedIn={userSignedIn} accessToken={accessToken} />
      </Route>
      <Route  exact path="/signup">
          <SignUp setUserSignedIn={setUserSignedIn} />
      </Route> 
      <Route   path="/login">
          <Login setUserSignedIn={setUserSignedIn} setAccessToken={setAccessToken} />
      </Route>
      <Route   path="/logout">
          <LogOut
            userSignedIn={userSignedIn}
            setUserSignedIn={setUserSignedIn}
            setAccessToken={setAccessToken}
          />
      </Route>
    </div>
  );
}

export default App;
