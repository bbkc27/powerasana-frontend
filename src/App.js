import './App.css';
import {useState} from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import PoseList from './components/PoseList';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
import LogIn from './components/LogIn';
import LogOut from './components/LogOut';
import NewSequence from './components/CreateSequence';
import SequenceList from './components/SequenceList';

function App() {

  const [userSignedIn, setUserSignedIn] = useState(localStorage.getItem('user'))
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'))

  return (
    <div className="App">

      <h1>PowerAsana</h1>
      <nav>
        <Link to = "/">Home | </Link>
        { userSignedIn 
        ? <Link to = "/logout">Log out</Link>
        : 
        <>
          <Link to = "/login">Log in | </Link>
          <Link to="/signup">Sign up</Link>
        </>
        }

      </nav>
      
      {userSignedIn ? (
        <nav>
          <span>Welcome back, {userSignedIn}</span>
        </nav>  
        ) : null
      }
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/poses' element={<PoseList />} />
      <Route path='/sequences' element={<SequenceList userSignedIn={userSignedIn}/>} />
      <Route path='/signup' element={<SignUp setUserSignedIn={setUserSignedIn}/>} />
      <Route path='/login' element={<LogIn setUserSignedIn={setUserSignedIn} setAccessToken={setAccessToken} />} />
      <Route path='/logout' element={<LogOut setUserSignedIn={setUserSignedIn} setAccessToken={setAccessToken} />} />
      <Route path='/createsequence' element={<NewSequence userSignedIn={userSignedIn} />} />
    </Routes>
    </div>
  );
}

export default App;
