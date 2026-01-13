import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/custom-button.css';
import './styles/dropdown.css';
import './styles/table.css';
import './styles/chart.css';
import App from './App';
import { DataState } from './context/data/dataState';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DataState>
      <App />
    </DataState>
  </React.StrictMode>
);
