import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { SearchProvider } from './Context/SearchContext.jsx';
import { AuthProvider } from './Context/AuthContext.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SearchProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </SearchProvider>
  </BrowserRouter>
);
