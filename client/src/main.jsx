import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { SearchProvider } from './Context/SearchContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SearchProvider>
      <App />
    </SearchProvider>
  </BrowserRouter>
);
