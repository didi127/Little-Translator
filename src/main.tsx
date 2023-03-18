import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Button } from 'element-react';


import 'element-theme-default';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
