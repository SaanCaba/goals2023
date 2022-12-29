import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Home from './components/Home';

function App() {
  return (
    <div className='relative overflow-hidden' >
      <Home />
      <div style={{bottom:'0px'}} className='w-full absolute'>
      <Footer  />
      </div>
    </div>
  );
}

export default App;
