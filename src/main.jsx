import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { MoviesSearch } from './components/MoviesSearch/MoviesSearch';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <MoviesSearch />
    <Footer />
  </React.StrictMode>
);
