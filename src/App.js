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
import PoseDetail from './components/PoseDetail';
import SequenceDetail from './components/SequenceDetail';
import UpdateSequence from './components/UpdateSequence';
import DeleteSequence from './components/DeleteSequence';
import Footer from './components/Footer';
import FooterLogo from './components/FooterLogo.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Navbar} from 'react-bootstrap';
import {slide as Menu } from 'react-burger-menu';

function App() {

  const [userSignedIn, setUserSignedIn] = useState(localStorage.getItem('user'))
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'))

  return (
    <div className="App">

      <Navbar bg="warning" variant="success">
        <Container>
      <Navbar.Brand className="brand" href='/'><img className='headerLogo' src={FooterLogo} alt="Power Asana Logo"/></Navbar.Brand>

      <Navbar.Toggle />
      <Navbar.Collapse className='justify-content-end'>
      <Navbar.Text>
      {userSignedIn ? (
          <span className='menu'>Welcome back, {userSignedIn}!  </span>
        ) : null
      }

        { userSignedIn
        ? 
          <div>
            <Link className='jsLink menu' to = "/logout">Log out</Link>

            <div className="hamburger">
            <Menu right>
              <p>{userSignedIn}</p>
              <Link className='menu-item' to="/poses">Poses</Link>
              <Link className='menu-item' to='/sequences'>Sequences</Link>
              <Link className=' menu-item' to='/logout'>Log out</Link>
            </Menu>
            </div>
          </div>
        : 
        <>
          <Link className='jsLink menu' to = "/login">Log in | </Link>
          <Link className='jsLink menu' to="/signup">Sign up</Link>

          <div className="hamburger">
          <Menu right>
              <p>{userSignedIn}</p>
              <a className='menu-item' href="/poses">Poses</a>
              <a className='menu-item' href='/sequences'>Sequences</a>
              <a className='menu-item' href='/login'>Log in</a>
              <a className='menu-item' href='/signup'>Sign up</a>
            </Menu>
            </div>
        </>
        }
       
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar> 

    <div>
      <Routes>
       <Route path='/' element={<HomePage />} />
        <Route path='/poses' element={<PoseList />} />
        <Route path='/poses/:id' element={<PoseDetail />} />
        <Route path='/sequences' element={<SequenceList userSignedIn={userSignedIn}/>} />
        <Route path='sequences/:id' element={<SequenceDetail userSignedIn={userSignedIn} />} />
        <Route path='/sequences/:id/edit' element={<UpdateSequence userSignedIn={userSignedIn}  />} />
        <Route path='/sequences/:id/delete' element={<DeleteSequence />} />
        <Route path='/signup' element={<SignUp setUserSignedIn={setUserSignedIn}/>} />
        <Route path='/login' element={<LogIn setUserSignedIn={setUserSignedIn} setAccessToken={setAccessToken} accessToken={accessToken}/>} />
        <Route path='/logout' element={<LogOut setUserSignedIn={setUserSignedIn} setAccessToken={setAccessToken} />} />
        <Route path='/createsequence' element={<NewSequence userSignedIn={userSignedIn} />} />
     </Routes>
     </div>

     <Footer />

    </div>
  );
}

export default App;
