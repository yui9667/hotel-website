import './App.css';
import { useEffect, Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Landing = lazy(() => import('./component/Landing/Landing'));
const Nav = lazy(() => import('./component/Nav/Nav'));
const Room = lazy(() => import('./component/Room/Room'));
const Login = lazy(() => import('./component/Login/Login'));
const Register = lazy(() => import('./component/Register/Register'));
const Confirm = lazy(() => import('./component/Confirm/Confirm'));
const CheckoutSuccess = lazy(() =>
  import('./component/Stripe/CheckoutSuccess')
);
const CheckoutCancel = lazy(() => import('./component/Stripe/CheckoutCancel'));
const Footer = lazy(() => import('./component/Footer/Footer'));
const Illustrations = lazy(() => import('./component/Footer/Illustrations'));
const ScrollTop = lazy(() => import('./component/ScrollTop/ScrollTop'));
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
      <Suspense
        fallback={
          <div className='flex justify-center flex-col gap-3 items-center h-screen'>
            <p className='text-blue-800'>Loading...</p>

            <div
              className='inline-block h-32 w-32 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]'
              role='status'
            ></div>
          </div>
        }
      >
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
      </Suspense>
    </>
  );
}

export default App;
