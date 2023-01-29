import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';

function App() {
  const user = useSelector((state) => state.AuthReducer.authData);
  return (
    <div className="App">
      <div className='blur' style={{ top: '-18%', right: '0' }}></div>
      <div className='blur' style={{ top: '36%', left: '-8rem' }}></div>
      <Routes>
        <Route path='/' element={user ? <Navigate to='home' /> : <Navigate to='auth' />} />
      </Routes>
      <Routes>
        <Route path='/home' element={user ? <Home/>  : <Navigate to='../auth' />} />
      </Routes>
      <Routes>
        <Route path='/auth' element={user ? <Navigate to='../home' /> : <Auth/>} />
      </Routes>
      <Routes>
        <Route path='/profile/:id' element={user ? <Profile/> : <Navigate to='../auth' />} />
      </Routes>
      {/* <Profile/> */}
    </div>
  )
}

export default App;
