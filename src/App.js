import './App.css';
import {useState} from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import PoseList from './components/PoseList';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
import LogIn from './components/LogIn';
import LogOut from './components/LogOut';
import NewSequence from './components/CreateSequence';

function App() {

  const [userSignedIn, setUserSignedIn] = useState(localStorage.getItem('user'))
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'))

  return (
    <div className="App">

      <h1>PowerAsana</h1>
      <nav>
        <Link to = "/">Home | </Link>
        <Link to = "/poses">All Poses | </Link>
        <Link to = "/logout">Log out</Link>
      </nav>
      
      {userSignedIn ? (
        <nav>
          <span>signed in as: {userSignedIn}</span>
        </nav>  
        ) : null
      }
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/poses' element={<PoseList />} />
      <Route path='/signup' element={<SignUp setUserSignedIn={setUserSignedIn}/>} />
      <Route path='/login' element={<LogIn setUserSignedIn={setUserSignedIn} setAccessToken={setAccessToken} />} />
      <Route path='/logout' element={<LogOut setUserSignedIn={setUserSignedIn} setAccessToken={setAccessToken} />} />
      <Route path='/createsequence' element={<NewSequence userSignedIn={userSignedIn} />} />
    </Routes>
    </div>
  );
}

export default App;
