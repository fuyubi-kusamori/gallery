import React from 'react';
import Gallery from './Gallery';

const App = () => {
  return (
    <div className="app">
      <p id="title">Gallery</p>
      <p id="subtitle">&hellip; something like an album leaf &hellip;</p>
      <Gallery />
    </div>
  );
};

export default App;
