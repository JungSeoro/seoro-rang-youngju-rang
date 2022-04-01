import React, {useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
useEffect(()=>{
  document.title = "서로랑 영주랑"
});


  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          서로랑 영주랑
        </p>
      </header>
    </div>
  );
}

export default App;
