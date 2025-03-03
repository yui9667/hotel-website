import './App.css';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Landing from './component/Landing/Landing';
import Nav from './component/Nav/Nav';
import Room from './component/Room/Room';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import Confirm from './component/Confirm/Confirm';
import CheckoutSuccess from './component/Stripe/CheckoutSuccess';
import CheckoutCancel from './component/Stripe/CheckoutCancel';
import Footer from './component/Footer/Footer';
import Illustrations from './component/Footer/Illustrations';
import ScrollTop from './component/ScrollTop/ScrollTop';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = window.sessionStorage.getItem('token');
    const storedUser = window.sessionStorage.getItem('userLocalStorage');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const handleLogin = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
  };
  console.log(user);
  console.log(token);
  if (user === null || token === null) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <ScrollTop />
      <Nav user={user} token={token} setUser={setUser} setToken={setToken} />
      <Routes>
        <Route
          path='/'
          element={
            user && token ? <Landing /> : <Navigate to='/login' replace />
          }
        />
        <Route path='/hotel/room' element={<Room />} />
        <Route path='/login' element={<Login handleLogin={handleLogin} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/confirm' element={<Confirm />} />
        <Route path='/success' element={<CheckoutSuccess />} />
        <Route path='/canceled' element={<CheckoutCancel />} />
        <Route path='/illustration' element={<Illustrations />} />
      </Routes>

      <footer className='w-full ' style={{ background: 'var(--main-color)' }}>
        <div className='max-w-[1200px] mx-auto px-5'>
          <Footer />
        </div>
      </footer>
    </>
  );
}

export default App;
