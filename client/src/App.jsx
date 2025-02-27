import './App.css';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Landing from './component/Landing/Landing';
import Nav from './component/Nav/Nav';
import Room from './component/Room/Room';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import { AuthContext } from './Context/AuthContext';
import Confirm from './component/Confirm/Confirm';
import CheckoutSuccess from './component/Stripe/CheckoutSuccess';
import CheckoutCancel from './component/Stripe/CheckoutCancel';
import Footer from './component/Footer/Footer';
import Illustrations from './component/Footer/Illustrations';
import ScrollTop from './component/ScrollTop/ScrollTop';
import { useContext } from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
function App() {
  const { user, token } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (user && token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [user, token]);
  return (
    <>
      <ScrollTop />
      <Nav />
      <Routes>
        <Route
          path='/'
          element={isLogin ? <Landing /> : <Navigate to='/login' replace />}
        />
        <Route path='/hotel/room' element={<Room />} />
        <Route path='/login' element={<Login />} />
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
