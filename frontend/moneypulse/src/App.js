import { Routes, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar.js'
import Home from './pages/Home.js'
import Login from './pages/Login.js'
import SignUp from './pages/SignUp.js'
import Dashboard from './pages/Dashboard.js'


function App() {
  // Check if the user is signed in
  const isUserSignedIn = !!localStorage.getItem('token')

  return (
    <div className="App">
      <Navbar />
      <Routes>
        
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        {/* Below code is using protected route. If user is signed in, dashboard page will show up */}
        {isUserSignedIn && <Route path='/dashboard' element={<Dashboard />} /> }
      </Routes>
    </div>
  );
}

export default App;
