import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

window.addEventListener("DOMContentLoaded", function(){
  const Agent = navigator.userAgent.toLowerCase();
  if(Agent.includes("kakao")){
      if(navigator.userAgent.match(/iPhone|iPad/i)){
        console.log("iphone")
      }
      else {
        console.log("android")
      }
  }
  if ( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i)){
    console.log("mobile");
  }
  else{
    console.log("desktop");
    const desktopEmoji= String.fromCodePoint(0x1F609);
    alert("스마트폰으로 서로랑영주랑.cards에 접속해주세요"+ desktopEmoji);
    window.open('about:blank','_self').close(); 	    
  } 
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();