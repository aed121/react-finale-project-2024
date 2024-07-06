import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FavoritesProvider } from './context/FavoritesContext';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <FavoritesProvider>
    <App />
  </FavoritesProvider>,
  document.getElementById('root')
);

