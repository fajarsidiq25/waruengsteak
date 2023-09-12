import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from './hooks/context'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { init as initFullStory } from '@fullstory/browser';
import * as setup from './setup'
import axios from 'axios';
import './styles/index.scss'

// initFullStory({ orgId: '1ENq' });

// public url
const { PUBLIC_URL } = process.env

// setting axios
setup.setupAxios(axios)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppProvider>
      <App basename={PUBLIC_URL} />
    </AppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
