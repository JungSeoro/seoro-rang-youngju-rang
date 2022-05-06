import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

window.addEventListener("DOMContentLoaded", function(){
  var Agent = navigator.userAgent.toLowerCase();
  if(Agent.includes("kakao")){
      window.location.href = 'kakaotalk://inappbrowser/close';
      if(navigator.userAgent.match(/iPhone|iPad/i)){
          window.location.href='ftp://'+window.location.href.replace(/https?:\/\//i,'');
      }
      else {
          window.location.href='intent://'+window.location.href.replace(/https?:\/\//i,'')+'#Intent;scheme=http;package=com.android.chrome;end';
      }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();