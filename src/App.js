// src/App.js
import React from 'react';
import './ImageGallery.css';
import ImageGallery from './ImageGallery';

function App() {
  const images = [
    '/assets/image-11.jpeg',
    '/assets/image-1.webp',
    '/assets/image-2.webp',
    '/assets/image-3.webp',
    '/assets/image-4.webp',
    '/assets/image-5.webp',
    '/assets/image-6.webp',
    '/assets/image-7.webp',
    '/assets/image-8.webp',
    '/assets/image-9.webp',
    '/assets/image-10.jpeg',


  ];

  return (
    <div className="App">
      <ImageGallery images={images} />
    </div>
  );
}

export default App;