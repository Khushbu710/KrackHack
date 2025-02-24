// import React from 'react';
// import { Routes, Route } from 'react-router-dom'; // Remove BrowserRouter import
// import Home from './pages/Home';
// import CreateCapsule from './pages/CreateCapsule';
// import Profile from './pages/Profile';
// import CapsuleDetail from './pages/CapsuleDetail';

// function App() {
//   return (
//     <Routes> {/* No need for BrowserRouter here */}
//       <Route path="/" element={<Home />} />
//       <Route path="/create" element={<CreateCapsule />} />
//       <Route path="/profile" element={<Profile />} />
//       <Route path="/capsule/:id" element={<CapsuleDetail />} />
//     </Routes>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import CreateCapsule from './pages/CreateCapsule';
import Profile from './pages/Profile';
import CapsuleDetail from './pages/CapsuleDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import './Navbar.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if the user is logged in on initial render
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token
    setIsLoggedIn(false); // Update authentication state
    navigate('/login'); // Redirect to login page
  };

  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {isLoggedIn ? (
            <>
              <li><Link to="/create">Create Capsule</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateCapsule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/capsule/:id" element={<CapsuleDetail />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;