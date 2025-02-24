import './App.css';
import { Route, Routes } from 'react-router-dom';
import { SearchProvider } from './Context/SearchContext';
import Landing from './component/Landing/Landing';
import Nav from './component/Nav/Nav';
import Room from './component/Room/Room';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import { AuthProvider } from './Context/AuthContext';
import Confirm from './component/Confirm/Confirm';
import CheckoutSuccess from './component/Stripe/CheckoutSuccess';
import CheckoutCancel from './component/Stripe/CheckoutCancel';
import Footer from './component/Footer/Footer';
import Illustrations from './component/Footer/Illustrations';
import ScrollTop from './component/ScrollTop/ScrollTop';
function App() {
  return (
    <SearchProvider>
      <AuthProvider>
        <ScrollTop />
        <Nav />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/hotel/room' element={<Room />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/confirm' element={<Confirm />} />
          <Route path='/success' element={<CheckoutSuccess />} />
          <Route path='/canceled' element={<CheckoutCancel />} />
          <Route path='/illustration' element={<Illustrations />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </SearchProvider>
  );
}

export default App;
