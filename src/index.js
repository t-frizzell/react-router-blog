import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Upgrading from react-router v5: https://reactrouter.com/en/main/upgrading/v5#remove-redirects-inside-switch
  // 'useHistory' has changed to 'useNavigate'
  // 'Switch' has changed to 'Routes'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Change the App component to use Router */}
        {/* Switch to use catch-all */}
        <Route path="*" element={<App/>} />
      </Routes>
    </Router>
  </React.StrictMode>
);