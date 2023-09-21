import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import { MovieSearch } from './components/MovieSearch/MovieSearch';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header></Header>
    <MovieSearch></MovieSearch>
    <Footer></Footer>
  </React.StrictMode>
);
