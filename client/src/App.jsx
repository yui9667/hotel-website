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
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const storedToken = window.sessionStorage.getItem('token');
    const storedUser = window.sessionStorage.getItem('userLocalStorage');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsLogin(true);
    }
  }, []);
  const switchLogin = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    setIsLogin(true);
    window.sessionStorage.setItem('token', tokenData);
    window.sessionStorage.setItem('userLocalStorage', JSON.stringify(userData));
  };
  return (
    <>
      <ScrollTop />
      <Nav user={user} token={token} setUser={setUser} setToken={setToken} />

      <Routes>
        <Route
          path='/'
          element={isLogin ? <Landing /> : <Navigate to='/login' />}
        />

        <Route path='/hotel/room' element={<Room />} />
        <Route path='/login' element={<Login switchLogin={switchLogin} />} />
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
