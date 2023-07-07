import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'semantic-ui-css/semantic.min.css'
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));

const domain = process.env.AUTH0_DOMAIN;
const clientId = process.env.AUTH0_CLIENT_ID;

console.log(domain, clientId);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain={
          domain
        }
        clientId={clientId}
        responseType="code"
        authorizationParams={{
          redirect_uri: "https://localhost:5173" 
        }}
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);