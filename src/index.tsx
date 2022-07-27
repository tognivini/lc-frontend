import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigRoutes } from './routes';
import { AuthProvider } from './contexts/auth.context'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <AuthProvider>
      <ConfigRoutes />
    </AuthProvider>

  </React.StrictMode>
);

reportWebVitals();
