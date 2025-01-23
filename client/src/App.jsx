import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SearchProvider } from './SearchContext';
import Landing from './component/Landing/Landing';
import Nav from './component/Nav/Nav';
import Room from './component/Room/Room';
function App() {
  return (
    <SearchProvider>
      <Router>
        <Nav />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/hotel/room' element={<Room />} />
        </Routes>
      </Router>
    </SearchProvider>
  );
}

export default App;
