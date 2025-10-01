import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Chatbot from './components/Chatbot';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div id='main_container'>
      <App />
    <Chatbot/>
    </div>
  </React.StrictMode>
);
