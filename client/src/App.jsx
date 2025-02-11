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
import Payment from './component/Payment/Payment';

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <Nav />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/hotel/room' element={<Room />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/confirm' element={<Confirm />} />
          <Route path='/payment' element={<Payment />} />
        </Routes>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;
