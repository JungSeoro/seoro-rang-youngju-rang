import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

window.addEventListener("DOMContentLoaded", function(){
  const Agent = navigator.userAgent.toLowerCase();
  if(Agent.includes("kakao")){
      // window.location.href = 'kakaotalk://inappbrowser/close';
      if(navigator.userAgent.match(/iPhone|iPad/i)){
          // window.location.href='ftp://'+window.location.href.replace(/https?:\/\//i,'');
      }
      else {
          // window.location.href = 'kakaotalk://inappbrowser/close';
          // window.location.href='intent://'+window.location.href.replace(/https?:\/\//i,'')+'#Intent;scheme=http;package=com.android.chrome;end';
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